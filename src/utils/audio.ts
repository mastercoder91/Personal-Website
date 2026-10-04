// Web Audio API Synthesizer for Melodious Retro Sound FX & Ambient Chords
// Carefully engineered with musical harmonics, warm filtering, and gentle dynamics to eliminate harshness.

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

      // Soft, transparent dynamics compressor for polished studio sound
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(12, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(3, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.005, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.3, this.ctx.currentTime);

      this.masterGain = this.ctx.createGain();
      // Well-calibrated comfortable master volume (no clipping or ear fatigue)
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.45, this.ctx.currentTime);

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
      const targetGain = this.isMuted ? 0 : this.volume * 0.45;
      this.masterGain.gain.setValueAtTime(targetGain, this.ctx.currentTime);
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ctx && this.masterGain) {
      const targetGain = this.isMuted ? 0 : this.volume * 0.45;
      this.masterGain.gain.setValueAtTime(targetGain, this.ctx.currentTime);
    }
  }

  private getDestinationNode(): AudioNode {
    if (this.compressor) return this.compressor;
    return this.ctx!.destination;
  }

  /**
   * Melodious Acoustic Marimba / Celesta Chime Click
   * Replaced harsh square-wave electronic beeps with warm pure-sine bell harmonics.
   */
  public playClick(pitch: number = 523.25) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Primary tone: warm sine wave with smooth attack and decay
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      
      // Overtone: gentle pure octave overtone for crystalline warmth
      const overtone = this.ctx.createOscillator();
      const overtoneGain = this.ctx.createGain();

      // Lowpass warmth filter to remove any harsh digital edge
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2600, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 0.12);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now);
      // Gentle subtle frequency drift down 2% for organic physical feel
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.98, now + 0.1);

      overtone.type = 'sine';
      overtone.frequency.setValueAtTime(pitch * 2, now);

      // Micro attack (0.003s) to eliminate pop, followed by smooth exponential decay
      oscGain.gain.setValueAtTime(0.0001, now);
      oscGain.gain.linearRampToValueAtTime(0.24, now + 0.003);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      overtoneGain.gain.setValueAtTime(0.0001, now);
      overtoneGain.gain.linearRampToValueAtTime(0.06, now + 0.003);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc.connect(oscGain);
      overtone.connect(overtoneGain);

      oscGain.connect(filter);
      overtoneGain.connect(filter);
      filter.connect(this.getDestinationNode());

      osc.start(now);
      overtone.start(now);
      osc.stop(now + 0.15);
      overtone.stop(now + 0.15);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Tactile Parchment Wax Stamp Thud
   * Replaced overwhelming 0.75 sub-bass blast with a warm, organic woodblock & soft parchment seal.
   */
  public playStampThud() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Resonant body (smooth acoustic wood thud)
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

      oscGain.gain.setValueAtTime(0.0001, now);
      oscGain.gain.linearRampToValueAtTime(0.32, now + 0.004);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      // Soft paper tap texture (filtered gentle noise)
      const bufferSize = this.ctx.sampleRate * 0.04;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 420;
      noiseFilter.Q.value = 1.5;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.12, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(oscGain);
      oscGain.connect(this.getDestinationNode());

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.getDestinationNode());

      osc.start(now);
      noise.start(now);
      osc.stop(now + 0.15);
      noise.stop(now + 0.05);
    } catch {}
  }

  /**
   * Cozy Lo-Fi Vinyl Needle Drop & Slide
   * Replaced screeching white noise with warm, cushioned analog vinyl crackle & soft glide.
   */
  public playVinylScratch() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Soft brown noise buffer
      const bufferSize = this.ctx.sampleRate * 0.16;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5 * Math.exp(-i / (bufferSize * 0.5));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 850;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

      // Subtle warm vinyl pitch glide
      const glideOsc = this.ctx.createOscillator();
      const glideGain = this.ctx.createGain();
      glideOsc.type = 'sine';
      glideOsc.frequency.setValueAtTime(240, now);
      glideOsc.frequency.exponentialRampToValueAtTime(160, now + 0.14);

      glideGain.gain.setValueAtTime(0.06, now);
      glideGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.getDestinationNode());

      glideOsc.connect(glideGain);
      glideGain.connect(this.getDestinationNode());

      noise.start(now);
      glideOsc.start(now);
      glideOsc.stop(now + 0.15);
    } catch {}
  }

  /**
   * Melodious 1984 Rhythm Box & Synth Pads
   * Replaced harsh static bursts with smooth, warm analog percussion.
   */
  public playDrumPad(type: 'kick' | 'snare' | 'hihat' | 'synth') {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      if (type === 'kick') {
        // Warm 808 acoustic kick
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(135, now);
        osc.frequency.exponentialRampToValueAtTime(38, now + 0.18);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.42, now + 0.004);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

        osc.connect(gain);
        gain.connect(this.getDestinationNode());
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === 'snare') {
        // Warm acoustic 80s snare (warm body + filtered snap)
        const toneOsc = this.ctx.createOscillator();
        const toneGain = this.ctx.createGain();
        toneOsc.type = 'triangle';
        toneOsc.frequency.setValueAtTime(190, now);
        toneOsc.frequency.exponentialRampToValueAtTime(80, now + 0.1);

        toneGain.gain.setValueAtTime(0.2, now);
        toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

        const noise = this.ctx.createBufferSource();
        const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.14, this.ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (data.length * 0.4));
        noise.buffer = buf;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1600;
        filter.Q.value = 1.8;

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.18, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

        toneOsc.connect(toneGain);
        toneGain.connect(this.getDestinationNode());
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.getDestinationNode());

        toneOsc.start(now);
        noise.start(now);
        toneOsc.stop(now + 0.12);
      } else if (type === 'hihat') {
        // Silky acoustic brushed brass hi-hat
        const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.05, this.ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (data.length * 0.2));
        const noise = this.ctx.createBufferSource();
        noise.buffer = buf;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 7500;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.getDestinationNode());
        noise.start(now);
      } else {
        // Velvety 1984 Indo-Disco Major 9th chord stab (C Maj9: C4, E4, G4, B4, D5)
        const chordFrequencies = [261.63, 329.63, 392.00, 493.88, 587.33];
        chordFrequencies.forEach((f, i) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();

          // Warm filtered triangle with subtle detune for analog warmth
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now + i * 0.012);
          osc.detune.setValueAtTime((i - 2) * 4, now);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1600, now);
          filter.frequency.exponentialRampToValueAtTime(750, now + 0.35);

          gain.gain.setValueAtTime(0.0001, now + i * 0.012);
          gain.gain.linearRampToValueAtTime(0.08, now + i * 0.012 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.getDestinationNode());
          osc.start(now + i * 0.012);
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
    }, 3400);
  }

  /**
   * Warm, Lush, Atmospheric Ambient Chords
   * Tuned with gentle envelope attacks and smooth lowpass filtration for soothing background listening.
   */
  private playNextChord() {
    if (!this.isAmbientPlaying || this.isMuted || !this.currentTrackChords.length) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const chord = this.currentTrackChords[this.chordIndex % this.currentTrackChords.length];
      this.chordIndex++;

      const now = this.ctx.currentTime;
      const duration = 3.2;

      chord.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        // Warm pure sines and soft triangles
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        osc.detune.setValueAtTime((idx - 1.5) * 3, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1100, now);
        filter.frequency.exponentialRampToValueAtTime(550, now + duration);

        // Gentle, gradual envelope swell and long velvety release
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.09, now + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

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

  /**
   * Joyful Indian Santoor & Celesta Bell Chime (Raag Bhupali Pentatonic)
   * Sa (C5), Ga (E5), Pa (G5), Dha (A5), Sa' (C6)
   * Delicately arpeggiated with crystalline, resonant bell envelopes.
   */
  public playMascotChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      const notes = [523.25, 659.25, 783.99, 880.0, 1046.5];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const noteStart = now + idx * 0.055;
        const osc = this.ctx.createOscillator();
        const overtone = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const overtoneGain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        overtone.type = 'sine';
        overtone.frequency.setValueAtTime(freq * 2, noteStart);

        gain.gain.setValueAtTime(0.0001, noteStart);
        gain.gain.linearRampToValueAtTime(0.16, noteStart + 0.004);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.45);

        overtoneGain.gain.setValueAtTime(0.0001, noteStart);
        overtoneGain.gain.linearRampToValueAtTime(0.04, noteStart + 0.004);
        overtoneGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.25);

        osc.connect(gain);
        overtone.connect(overtoneGain);
        gain.connect(this.getDestinationNode());
        overtoneGain.connect(this.getDestinationNode());

        osc.start(noteStart);
        overtone.start(noteStart);
        osc.stop(noteStart + 0.5);
        overtone.stop(noteStart + 0.3);
      });
    } catch {}
  }

  /**
   * Melodious Classical Indian Tabla Sound
   * Dayan: Singing resonant "Tin/Na" bell ring at 440Hz with natural harmonic overtones.
   * Bayan: Velvety smooth bass modulation ("Ghe") gliding smoothly from 105Hz to 72Hz.
   */
  public playTablaTap() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      // Bayan (bass drum slide "Ghe")
      const bayanOsc = this.ctx.createOscillator();
      const bayanGain = this.ctx.createGain();
      bayanOsc.type = 'sine';
      bayanOsc.frequency.setValueAtTime(105, now);
      bayanOsc.frequency.exponentialRampToValueAtTime(72, now + 0.22);

      bayanGain.gain.setValueAtTime(0.0001, now);
      bayanGain.gain.linearRampToValueAtTime(0.26, now + 0.005);
      bayanGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);

      bayanOsc.connect(bayanGain);
      bayanGain.connect(this.getDestinationNode());
      bayanOsc.start(now);
      bayanOsc.stop(now + 0.25);

      // Dayan (singing harmonic treble rim "Tin")
      const dayanOsc = this.ctx.createOscillator();
      const dayanGain = this.ctx.createGain();
      dayanOsc.type = 'sine';
      dayanOsc.frequency.setValueAtTime(440, now + 0.03);
      dayanOsc.frequency.exponentialRampToValueAtTime(435, now + 0.28);

      const harmonicOsc = this.ctx.createOscillator();
      const harmonicGain = this.ctx.createGain();
      harmonicOsc.type = 'sine';
      harmonicOsc.frequency.setValueAtTime(880, now + 0.03);

      dayanGain.gain.setValueAtTime(0.0001, now + 0.03);
      dayanGain.gain.linearRampToValueAtTime(0.18, now + 0.035);
      dayanGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

      harmonicGain.gain.setValueAtTime(0.0001, now + 0.03);
      harmonicGain.gain.linearRampToValueAtTime(0.05, now + 0.035);
      harmonicGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

      dayanOsc.connect(dayanGain);
      harmonicOsc.connect(harmonicGain);
      dayanGain.connect(this.getDestinationNode());
      harmonicGain.connect(this.getDestinationNode());

      dayanOsc.start(now + 0.03);
      harmonicOsc.start(now + 0.03);
      dayanOsc.stop(now + 0.32);
      harmonicOsc.stop(now + 0.22);
    } catch {}
  }

  /**
   * Melodious Masala Chai Waterdrop Chime
   * Replaced harsh laser sweep with a pleasant, singing melodic droplet chord.
   */
  public playChaiSip() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Two warm harmonious droplet chimes (D5 to A5)
      [587.33, 880.00].forEach((freq, i) => {
        if (!this.ctx) return;
        const noteStart = now + i * 0.06;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * 0.9, noteStart);
        osc.frequency.exponentialRampToValueAtTime(freq, noteStart + 0.04);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.96, noteStart + 0.2);

        gain.gain.setValueAtTime(0.0001, noteStart);
        gain.gain.linearRampToValueAtTime(0.14, noteStart + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.22);

        osc.connect(gain);
        gain.connect(this.getDestinationNode());

        osc.start(noteStart);
        osc.stop(noteStart + 0.24);
      });
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
