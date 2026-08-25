// Web Audio API Synthesizer for Retro Sound FX & Ambient Chords

class RetroAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  public isMuted: boolean = false;
  public volume: number = 1.0;
  private isAmbientPlaying: boolean = false;
  private ambientInterval: number | null = null;
  private currentTrackChords: number[][] = [];
  private chordIndex: number = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master dynamics compressor to prevent clipping while maintaining loud, punchy analog dynamics
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-12, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(8, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 1.5, this.ctx.currentTime);

      this.compressor.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1.5, vol));
    if (this.ctx && this.masterGain) {
      const targetGain = this.isMuted ? 0 : this.volume * 1.5;
      this.masterGain.gain.setValueAtTime(targetGain, this.ctx.currentTime);
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ctx && this.masterGain) {
      const targetGain = this.isMuted ? 0 : this.volume * 1.5;
      this.masterGain.gain.setValueAtTime(targetGain, this.ctx.currentTime);
    }
  }

  private getDestinationNode(): AudioNode {
    if (this.compressor) return this.compressor;
    return this.ctx!.destination;
  }

  public playClick(pitch: number = 440) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const subOsc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.35, this.ctx.currentTime + 0.05);

      subOsc.type = 'square';
      subOsc.frequency.setValueAtTime(pitch * 0.5, this.ctx.currentTime);
      subOsc.frequency.exponentialRampToValueAtTime(pitch * 0.2, this.ctx.currentTime + 0.03);

      // Boosted punchy volume
      gain.gain.setValueAtTime(0.28, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      subOsc.connect(gain);
      gain.connect(this.getDestinationNode());

      osc.start();
      subOsc.start();
      osc.stop(this.ctx.currentTime + 0.05);
      subOsc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public playStampThud() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const subOsc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.16);

      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(90, this.ctx.currentTime);
      subOsc.frequency.exponentialRampToValueAtTime(25, this.ctx.currentTime + 0.18);

      // Substantially boosted physical thud volume
      gain.gain.setValueAtTime(0.75, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      subOsc.connect(gain);
      gain.connect(this.getDestinationNode());

      osc.start();
      subOsc.start();
      osc.stop(this.ctx.currentTime + 0.18);
      subOsc.stop(this.ctx.currentTime + 0.18);
    } catch {}
  }

  public playVinylScratch() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      // Noise buffer for prominent vintage scratch & needle drop
      const bufferSize = this.ctx.sampleRate * 0.2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1600;
      filter.Q.value = 2.5;

      const gain = this.ctx.createGain();
      // Boosted needle contact volume
      gain.gain.setValueAtTime(0.38, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.getDestinationNode());

      whiteNoise.start();
    } catch {}
  }

  public playDrumPad(type: 'kick' | 'snare' | 'hihat' | 'synth') {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      if (type === 'kick') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(32, now + 0.22);
        // Boosted heavy kick volume
        gain.gain.setValueAtTime(0.9, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(this.getDestinationNode());
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'snare') {
        const noise = this.ctx.createBufferSource();
        const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.18, this.ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        noise.buffer = buf;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 900;

        const gain = this.ctx.createGain();
        // Boosted snappy snare volume
        gain.gain.setValueAtTime(0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.getDestinationNode());
        noise.start(now);
      } else if (type === 'hihat') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(9500, now);
        // Boosted crisp hi-hat volume
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain);
        gain.connect(this.getDestinationNode());
        osc.start(now);
        osc.stop(now + 0.06);
      } else {
        // Boosted retro 80s synth chord stab
        [440, 554.37, 659.25, 880].forEach((f, i) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(f, now);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(2200, now);
          filter.frequency.exponentialRampToValueAtTime(800, now + 0.35);

          // Boosted synth chord stab volume
          gain.gain.setValueAtTime(0.2, now + i * 0.015);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.getDestinationNode());
          osc.start(now + i * 0.015);
          osc.stop(now + 0.4);
        });
      }
    } catch {}
  }

  public startAmbientTrack(trackChords: number[][]) {
    this.currentTrackChords = trackChords;
    this.chordIndex = 0;
    this.isAmbientPlaying = true;
    this.stopAmbientLoop();

    this.playNextChord();
    this.ambientInterval = window.setInterval(() => {
      if (this.isAmbientPlaying && !this.isMuted) {
        this.playNextChord();
      }
    }, 3200);
  }

  private playNextChord() {
    if (!this.isAmbientPlaying || this.isMuted || !this.currentTrackChords.length) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const chord = this.currentTrackChords[this.chordIndex % this.currentTrackChords.length];
      this.chordIndex++;

      const now = this.ctx.currentTime;
      const duration = 3.0;

      chord.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        // Warm 80s analog synth feel
        osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Subtle detune for analog chorus warmth
        osc.detune.setValueAtTime((idx - 1.5) * 5, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, now);
        filter.frequency.exponentialRampToValueAtTime(650, now + duration);

        // Boosted rich chord envelope volume
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.35);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.getDestinationNode());

        osc.start(now);
        osc.stop(now + duration);
      });
    } catch {}
  }

  public stopAmbient() {
    this.isAmbientPlaying = false;
    this.stopAmbientLoop();
  }

  public playMascotChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Joyful Indian pentatonic raga arpeggio (Sa, Ga, Pa, Dha, Sa')
      const notes = [523.25, 659.25, 783.99, 880.0, 1046.5];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.2, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.3);
        osc.connect(gain);
        gain.connect(this.getDestinationNode());
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.32);
      });
    } catch {}
  }

  public playTablaTap() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      // Bayan (bass tabla slide)
      const bayanOsc = this.ctx.createOscillator();
      const bayanGain = this.ctx.createGain();
      bayanOsc.type = 'sine';
      bayanOsc.frequency.setValueAtTime(120, now);
      bayanOsc.frequency.exponentialRampToValueAtTime(70, now + 0.2);
      bayanGain.gain.setValueAtTime(0.5, now);
      bayanGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      bayanOsc.connect(bayanGain);
      bayanGain.connect(this.getDestinationNode());
      bayanOsc.start(now);
      bayanOsc.stop(now + 0.2);

      // Dayan (high ring rim)
      const dayanOsc = this.ctx.createOscillator();
      const dayanGain = this.ctx.createGain();
      dayanOsc.type = 'triangle';
      dayanOsc.frequency.setValueAtTime(440, now + 0.04);
      dayanOsc.frequency.exponentialRampToValueAtTime(320, now + 0.18);
      dayanGain.gain.setValueAtTime(0.28, now + 0.04);
      dayanGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      dayanOsc.connect(dayanGain);
      dayanGain.connect(this.getDestinationNode());
      dayanOsc.start(now + 0.04);
      dayanOsc.stop(now + 0.19);
    } catch {}
  }

  public playChaiSip() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.linearRampToValueAtTime(850, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.28);
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(this.getDestinationNode());
      osc.start(now);
      osc.stop(now + 0.3);
    } catch {}
  }

  private stopAmbientLoop() {
    if (this.ambientInterval !== null) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }
}

export const audio = new RetroAudioEngine();
