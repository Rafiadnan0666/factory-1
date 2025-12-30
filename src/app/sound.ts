class SoundSystem {
  private context: AudioContext | null = null
  private sounds: Map<string, AudioBuffer> = new Map()
  private enabled: boolean = true

  constructor() {
    if (typeof window !== 'undefined') {
      this.context = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      this.generateSounds()
    }
  }

  private generateSounds() {
    if (!this.context) return

    // Click sound
    const clickBuffer = this.context.createBuffer(1, this.context.sampleRate * 0.1, this.context.sampleRate)
    const clickData = clickBuffer.getChannelData(0)
    for (let i = 0; i < clickData.length; i++) {
      clickData[i] = Math.sin(2 * Math.PI * 800 * i / this.context.sampleRate) * 
                     Math.exp(-i / this.context.sampleRate * 10)
    }
    this.sounds.set('click', clickBuffer)

    // Upgrade sound
    const upgradeBuffer = this.context.createBuffer(1, this.context.sampleRate * 0.3, this.context.sampleRate)
    const upgradeData = upgradeBuffer.getChannelData(0)
    for (let i = 0; i < upgradeData.length; i++) {
      const t = i / this.context.sampleRate
      upgradeData[i] = Math.sin(2 * Math.PI * (440 + t * 440) * t) * 
                      Math.exp(-t * 2) * 0.5
    }
    this.sounds.set('upgrade', upgradeBuffer)

    // Error sound
    const errorBuffer = this.context.createBuffer(1, this.context.sampleRate * 0.2, this.context.sampleRate)
    const errorData = errorBuffer.getChannelData(0)
    for (let i = 0; i < errorData.length; i++) {
      const t = i / this.context.sampleRate
      errorData[i] = (Math.random() - 0.5) * Math.exp(-t * 5)
    }
    this.sounds.set('error', errorBuffer)

    // Victory sound
    const victoryBuffer = this.context.createBuffer(1, this.context.sampleRate * 1, this.context.sampleRate)
    const victoryData = victoryBuffer.getChannelData(0)
    for (let i = 0; i < victoryData.length; i++) {
      const t = i / this.context.sampleRate
      victoryData[i] = (Math.sin(2 * Math.PI * 523 * t) * 0.3 +
                       Math.sin(2 * Math.PI * 659 * t) * 0.3 +
                       Math.sin(2 * Math.PI * 784 * t) * 0.4) * 
                      Math.sin(t * Math.PI)
    }
    this.sounds.set('victory', victoryBuffer)

    // Boss battle sound
    const bossBuffer = this.context.createBuffer(1, this.context.sampleRate * 0.5, this.context.sampleRate)
    const bossData = bossBuffer.getChannelData(0)
    for (let i = 0; i < bossData.length; i++) {
      const t = i / this.context.sampleRate
      bossData[i] = Math.sin(2 * Math.PI * 100 * t) * Math.sin(t * 20) * 0.7
    }
    this.sounds.set('boss', bossBuffer)

    // Combo sound
    const comboBuffer = this.context.createBuffer(1, this.context.sampleRate * 0.15, this.context.sampleRate)
    const comboData = comboBuffer.getChannelData(0)
    for (let i = 0; i < comboData.length; i++) {
      const t = i / this.context.sampleRate
      comboData[i] = Math.sin(2 * Math.PI * (880 + t * 1760) * t) * Math.exp(-t * 3) * 0.6
    }
    this.sounds.set('combo', comboBuffer)

    // Party sound
    const partyBuffer = this.context.createBuffer(1, this.context.sampleRate * 0.8, this.context.sampleRate)
    const partyData = partyBuffer.getChannelData(0)
    for (let i = 0; i < partyData.length; i++) {
      const t = i / this.context.sampleRate
      partyData[i] = (Math.sin(2 * Math.PI * 523 * t) * 0.2 +
                       Math.sin(2 * Math.PI * 659 * t) * 0.2 +
                       Math.sin(2 * Math.PI * 784 * t) * 0.3 +
                       Math.sin(2 * Math.PI * 1047 * t) * 0.3) * 
                      Math.sin(t * Math.PI * 2) * 0.7
    }
    this.sounds.set('party', partyBuffer)

    // Disco sound
    const discoBuffer = this.context.createBuffer(1, this.context.sampleRate * 0.6, this.context.sampleRate)
    const discoData = discoBuffer.getChannelData(0)
    for (let i = 0; i < discoData.length; i++) {
      const t = i / this.context.sampleRate
      discoData[i] = (Math.sin(2 * Math.PI * 220 * t) * Math.sin(t * 20) +
                       Math.sin(2 * Math.PI * 440 * t) * Math.sin(t * 15) +
                       Math.sin(2 * Math.PI * 880 * t) * 0.3) * 0.6
    }
    this.sounds.set('disco', discoBuffer)

    // Power-up sound
    const powerUpBuffer = this.context.createBuffer(1, this.context.sampleRate * 0.4, this.context.sampleRate)
    const powerUpData = powerUpBuffer.getChannelData(0)
    for (let i = 0; i < powerUpData.length; i++) {
      const t = i / this.context.sampleRate
      powerUpData[i] = Math.sin(2 * Math.PI * (440 + t * 880) * t) * 
                        Math.sin(2 * Math.PI * 880 * t) * 
                        Math.exp(-t * 1.5) * 0.7
    }
    this.sounds.set('powerup', powerUpBuffer)

    // Cosmic explosion sound
    const explosionBuffer = this.context.createBuffer(1, this.context.sampleRate * 1.2, this.context.sampleRate)
    const explosionData = explosionBuffer.getChannelData(0)
    for (let i = 0; i < explosionData.length; i++) {
      const t = i / this.context.sampleRate
      explosionData[i] = (Math.sin(2 * Math.PI * 55 * t) * Math.sin(t * 30) * 0.8 +
                         (Math.random() - 0.5) * 0.3 * Math.exp(-t * 5)) * 
                        Math.exp(-t * 0.8)
    }
    this.sounds.set('explosion', explosionBuffer)

    // Quantum sound
    const quantumBuffer = this.context.createBuffer(1, this.context.sampleRate * 0.3, this.context.sampleRate)
    const quantumData = quantumBuffer.getChannelData(0)
    for (let i = 0; i < quantumData.length; i++) {
      const t = i / this.context.sampleRate
      quantumData[i] = (Math.sin(2 * Math.PI * 1760 * t) * Math.sin(t * 50) +
                        Math.sin(2 * Math.PI * 3520 * t) * 0.3) * 
                       Math.exp(-t * 4) * 0.6
    }
    this.sounds.set('quantum', quantumBuffer)
  }

  play(soundName: string, volume: number = 0.5) {
    if (!this.enabled || !this.context) return

    const sound = this.sounds.get(soundName)
    if (!sound) return

    const source = this.context.createBufferSource()
    source.buffer = sound

    const gainNode = this.context.createGain()
    gainNode.gain.value = volume

    source.connect(gainNode)
    gainNode.connect(this.context.destination)

    source.start(0)
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
  }

  isEnabled(): boolean {
    return this.enabled
  }
}

export const soundSystem = new SoundSystem()