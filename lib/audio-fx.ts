// Elegant & Minimal Interactive Sound Effects Engine
// Filosofi: satu nada pendek, tanpa glide ekstrem, gain rendah, konsisten.

class ElegantSoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("porto_sound_muted");
      this.isMuted = saved === "true";
    }
  }

  private initContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("porto_sound_muted", String(this.isMuted));
      window.dispatchEvent(new CustomEvent("porto-sound-toggle", { detail: { isMuted: this.isMuted } }));
    }
    if (!this.isMuted) this.playClick();
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // ── Helper: nada sine tunggal, pendek, tanpa glide ──
  private playTone(freq: number, startTime: number, gainPeak: number, duration: number, attack = 0.006) {
    const ctx = this.initContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(gainPeak, startTime + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  // ── Helper: filtered noise "whoosh" untuk transisi ──
  private playWhoosh(startTime: number, gainPeak: number, duration: number, filterFreq = 1200) {
    const ctx = this.initContext();
    if (!ctx) return;

    const bufferSize = Math.ceil(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(filterFreq, startTime);
    filter.Q.value = 0.7;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(gainPeak, startTime + duration * 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(startTime);
    noise.stop(startTime + duration + 0.02);
  }

  // ── 1. CLICK — satu nada pendek, jernih ──
  public playClick() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    this.playTone(880, ctx.currentTime, 0.06, 0.035, 0.004);
  }

  // ── 2. HOVER — nyaris tak terdengar ──
  public playHover() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    this.playTone(1400, ctx.currentTime, 0.025, 0.015, 0.003);
  }

  // ── 3. SUCCESS — interval kuint bersih, 2 nada ──
  public playSuccess() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [659.25, 987.77].forEach((freq, i) => {
      this.playTone(freq, now + i * 0.09, 0.07, 0.2, 0.01);
    });
  }

  // ── 4. SWEEP / CURTAIN — whoosh halus ──
  public playCurtainSweep() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    this.playWhoosh(ctx.currentTime, 0.05, 0.25, 900);
  }

  public playSweep() {
    this.playCurtainSweep();
  }

  // ── 5. PIXEL POP (avatar transition) — 1 nada + harmonik tipis ──
  public playPixelPop() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    this.playTone(523.25, now, 0.07, 0.15, 0.006); // C5
    this.playTone(1046.5, now + 0.01, 0.02, 0.08, 0.004); // harmonik oktaf, sangat pelan
  }

  // ── 6. LANYARD DROP — whoosh singkat + 1 nada rendah ──
  public playLanyardDrop() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    this.playWhoosh(now, 0.035, 0.18, 500);
    this.playTone(220, now + 0.08, 0.05, 0.12, 0.008);
  }

  // ── 7. LANYARD GRAB — pluck pendek ──
  public playLanyardGrab() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    this.playTone(196, ctx.currentTime, 0.06, 0.08, 0.003);
  }

  // ── 8. LANYARD RELEASE — 1 nada lembut naik sedikit ──
  public playLanyardRelease() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    this.playTone(329.63, ctx.currentTime, 0.05, 0.15, 0.008);
  }

  // ── 9. JELLY BOUNCE — 1 nada rendah, swell pendek ──
  public playJellyBounce() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    this.playTone(110, ctx.currentTime, 0.06, 0.18, 0.015);
  }

  // ── 10. THEME TOGGLE — 2 nada, arah beda utk dark/light ──
  public playThemeToggle(toDark?: boolean) {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const freqs = toDark ? [587.33, 440.0] : [440.0, 587.33];
    freqs.forEach((freq, i) => {
      this.playTone(freq, now + i * 0.05, 0.05, 0.1, 0.006);
    });
  }

  // ── 11. ALARM KLAXON — peringatan darurat self-destruct ──
  public playAlarmKlaxon() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [880, 440, 880, 440].forEach((freq, i) => {
      this.playTone(freq, now + i * 0.14, 0.07, 0.1, 0.008);
    });
  }

  // ── 12. GLASS CRACK — retakan kaca presisi ──
  public playGlassCrack() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    this.playWhoosh(now, 0.06, 0.12, 3200);
    this.playTone(1760, now + 0.01, 0.04, 0.06, 0.002);
  }

  // ── 13. SYSTEM REBOOT — suara booting pemulihan terminal ──
  public playSystemReboot() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [440, 554.37, 659.25, 880].forEach((freq, i) => {
      this.playTone(freq, now + i * 0.06, 0.06, 0.18, 0.005);
    });
  }

  // ── 14. MECHANICAL KEY CLICK — ketikan keyboard mekanik linear yang sangat halus ──
  public playKeyClick() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Sedikit random pitch 760Hz - 840Hz agar ketikan terdengar organik
    const randomFreq = 780 + Math.random() * 80;
    this.playTone(randomFreq, now, 0.018, 0.015, 0.002);
  }

  // ── 15. TERMINAL OPEN — chime futuristik halus ──
  public playTerminalOpen() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [587.33, 880.0].forEach((freq, i) => {
      this.playTone(freq, now + i * 0.06, 0.045, 0.12, 0.005);
    });
  }

  // ── 16. TERMINAL CLOSE — nada turun lembut ──
  public playTerminalClose() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [659.25, 440.0].forEach((freq, i) => {
      this.playTone(freq, now + i * 0.05, 0.035, 0.09, 0.005);
    });
  }

  // ── 17. MESSAGE SENT — blip pesan terkirim ──
  public playMessageSent() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    this.playTone(1046.5, now, 0.04, 0.04, 0.003);
  }
}

export const soundFx = new ElegantSoundManager();


