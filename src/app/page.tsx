"use client"
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { soundSystem } from './sound'

const Factory404 = () => {
  // Game state
  const [clicks, setClicks] = useState(0)
  const [items, setItems] = useState<string[]>([])
  const [credits, setCredits] = useState(0)
  const [autoClickers, setAutoClickers] = useState(0)
  const [upgrades, setUpgrades] = useState({
    overclock: 0,
    bugExploiter: 0,
    systemPatch: 0,
    quantumCore: 0,
    neuralNetwork: 0,
    singularityDrive: 0
  })
  const [messages, setMessages] = useState<string[]>([
    "> [SYSTEM BOOT] Factory 404 initializing...",
    "> [MEMTEST] 640K RAM OK",
    "> [DISK] Floppy drive seek... done",
    "> [VIDEO] CGA mode activated",
    "> [STATUS] Awaiting user input...",
    "> [PROMPT] _"
  ])
  const [corruptionLevel, setCorruptionLevel] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)
  const [terminalInput, setTerminalInput] = useState('')
  const [showHelp, setShowHelp] = useState(false)
  const [factoryHealth, setFactoryHealth] = useState(100)
  const [scanLinePos, setScanLinePos] = useState(0)
  const [activeAnimation, setActiveAnimation] = useState(0)
  const [showLore, setShowLore] = useState(true)
  const [showVictory, setShowVictory] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)
  const [showShop, setShowShop] = useState(false)
    const [showResearch, setShowResearch] = useState(false)
const [showHackGame, setShowHackGame] = useState(false)
    const [hackSequence, setHackSequence] = useState<string[]>([])
    const [playerSequence, setPlayerSequence] = useState<string[]>([])
    const [hackActive, setHackActive] = useState(false)
    const [hackReward, setHackReward] = useState(0)
  const [galaxyRotation, setGalaxyRotation] = useState(0)
  const [graphData, setGraphData] = useState<number[]>([])
    const [particles, setParticles] = useState<Array<{x: number, y: number, vx: number, vy: number, life: number, size: number, type: string, color: string, rotation: number, rotationSpeed: number}>>([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [particleEffects, setParticleEffects] = useState(true)
  const [lastAction, setLastAction] = useState('')
  const [autoSave, setAutoSave] = useState(true)
  const [theme, setTheme] = useState<'matrix' | 'cyber' | 'retro'>('matrix')
  const [research, setResearch] = useState({
    nanotechnology: 0,
    quantumComputing: 0,
    artificialIntelligence: 0,
    darkMatter: 0,
    timeManipulation: 0
  })
  const [achievements, setAchievements] = useState({
    firstItem: false,
    hundredClicks: false,
    thousandClicks: false,
    masterBuilder: false,
    quantumEngineer: false,
    singularityAchieved: false,
    efficiencyExpert: false,
    corruptionMaster: false
  })
  const [stats, setStats] = useState({
    totalClicks: 0,
    totalItems: 0,
    totalCredits: 0,
    playTime: 0,
    highestCorruption: 0,
    itemsPerSecond: 0,
    creditsPerSecond: 0
  })
  const [megaCombo, setMegaCombo] = useState(0)
  const [comboTimer, setComboTimer] = useState(0)
  const [bossBattle, setBossBattle] = useState(false)
  const [bossHealth, setBossHealth] = useState(1000)
  const [tournament, setTournament] = useState(false)
  const [tournamentRank] = useState('Rookie')
  const [epicLevel, setEpicLevel] = useState(1)
  const [specialAbilities, setSpecialAbilities] = useState({
    timeWarp: false,
    matterDuplicator: false,
    realityHack: false
  })
  const [alienInvasion, setAlienInvasion] = useState(false)
  const [spaceBattle, setSpaceBattle] = useState(false)
    const [hiddenAchievements, setHiddenAchievements] = useState({
    legendaryBuilder: false,
    quantumMaster: false,
    interdimensionalExplorer: false,
    ultimateWinner: false
  })

   // New entertainment states
  const [partyMode, setPartyMode] = useState(false)
  const [discoMode, setDiscoMode] = useState(false)
   const [powerUps, setPowerUps] = useState({
     rainbowBlast: false,
     timeFreeze: false,
     multiplierX10: false,
     particleStorm: false
  })

  // Additional missing state variables (used in effects and animations)
  const [confettiActive, setConfettiActive] = useState(false) // eslint-disable-line @typescript-eslint/no-unused-vars
  const [showFireworks, setShowFireworks] = useState(false) // eslint-disable-line @typescript-eslint/no-unused-vars
  const [isTransitioning, setIsTransitioning] = useState(false) // eslint-disable-line @typescript-eslint/no-unused-vars

   // Function declarations moved up to fix dependency issues

   // Function declarations moved up to fix dependency issues
  const addMessage = useCallback((msg: string, useTypewriter = true) => {
    if (useTypewriter && msg.includes('> [') && !msg.includes('> [PROMPT]')) {
      // Typewriter effect for system messages
      let currentText = ''
      const targetText = msg
      let charIndex = 0
      
      const typeInterval = setInterval(() => {
        if (charIndex <= targetText.length) {
          currentText = targetText.substring(0, charIndex)
          
          setMessages(prev => {
            const newMsgs = [...prev]
            // Remove the last prompt if it exists
            if (newMsgs[newMsgs.length - 1].endsWith('_')) {
              newMsgs.pop()
            }
            // Add or update the typewriter message
            if (newMsgs.length > 0 && newMsgs[newMsgs.length - 1].startsWith('> [') && !newMsgs[newMsgs.length - 1].endsWith('_')) {
              newMsgs[newMsgs.length - 1] = currentText
            } else {
              newMsgs.push(currentText)
            }
            // Add new prompt if message is complete
            if (charIndex === targetText.length) {
              newMsgs.push("> [PROMPT] _")
            }
            // Keep only last 15 messages
            return newMsgs.slice(-15)
          })
          
          charIndex++
        } else {
          clearInterval(typeInterval)
        }
      }, 30) // Speed of typewriter effect
    } else {
      // Instant message for user input and prompts
      setMessages(prev => {
        const newMsgs = [...prev]
        // Remove the last prompt if it exists
        if (newMsgs[newMsgs.length - 1].endsWith('_')) {
          newMsgs.pop()
        }
        newMsgs.push(msg)
        // Add new prompt if it's not a prompt itself
        if (!msg.endsWith('_')) {
          newMsgs.push("> [PROMPT] _")
        }
        // Keep only last 15 messages
        return newMsgs.slice(-15)
      })
    }
  }, [])





  const playSound = useCallback((soundType: string) => {
    if (!soundEnabled) return

    // Visual feedback for sound
    setLastAction(soundType)
    setTimeout(() => setLastAction(''), 500)

    // Play actual sound
    try {
      soundSystem.play(soundType, 0.3)
    } catch {
      console.log(`Playing sound: ${soundType}`)
    }
  }, [soundEnabled])

  const createParticleExplosion = useCallback(() => {
      if (!particleEffects) return
      
      const colors = ['#00ff88', '#00d9ff', '#ff006e', '#9d00ff', '#ffea00', '#ff1493', '#00ffff']
      const particleContainer = document.createElement('div')
      particleContainer.className = 'particle-container'
      document.body.appendChild(particleContainer)
      
      // Enhanced particle explosion with more variety
      const particleCount = partyMode ? 40 : 20
      const shapes = ['circle', 'square', 'triangle', 'star']
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div')
        particle.style.position = 'absolute'
        particle.style.left = '50%'
        particle.style.top = '50%'
        
        const size = 2 + Math.random() * 6
        const shape = shapes[Math.floor(Math.random() * shapes.length)]
        
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        particle.style.borderRadius = shape === 'circle' ? '50%' : shape === 'star' ? '50%' : '2px'
        particle.style.pointerEvents = 'none'
        particle.style.boxShadow = `0 0 ${size * 2}px ${particle.style.backgroundColor}`
        
        // Add rotation for stars and triangles
        if (shape === 'star' || shape === 'triangle') {
          particle.style.clipPath = shape === 'star' ? 
            'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' :
            'polygon(50% 0%, 0% 100%, 100% 100%)'
        }
        
        const angle = (Math.PI * 2 * i) / particleCount
        const velocity = partyMode ? 100 + Math.random() * 200 : 50 + Math.random() * 100
        const lifetime = 500 + Math.random() * 1000
        const rotationSpeed = (Math.random() - 0.5) * 10
      
        particle.style.transform = `translate(-50%, -50%) rotate(0deg)`
        
        particleContainer.appendChild(particle)
        
        const startTime = Date.now()
        const animate = () => {
          const elapsed = Date.now() - startTime
          if (elapsed > lifetime) {
            particle.remove()
            return
          }
          
          const progress = elapsed / lifetime
          const distance = velocity * progress
          const opacity = 1 - (progress * progress) // Quadratic fade
          const rotation = rotationSpeed * elapsed / 100
          
          particle.style.transform = `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) rotate(${rotation}deg)`
          particle.style.opacity = opacity.toString()
          
          requestAnimationFrame(animate)
        }
        
        requestAnimationFrame(animate)
      }
      
      setTimeout(() => {
        particleContainer.remove()
      }, 2000)
    }, [particleEffects, partyMode])

// Enhanced entertainment functions
  const triggerConfetti = useCallback(() => {
    setConfettiActive(true)
    playSound('party')
    const colors = ['#ff006e', '#00d9ff', '#00ff88', '#9d00ff', '#ffea00', '#ff1493', '#00ffff', '#ffa500']
    
    for (let i = 0; i < (partyMode ? 100 : 50); i++) {
      setTimeout(() => {
        const confetti = document.createElement('div')
        confetti.className = 'confetti-piece animate-confetti-fall'
        confetti.style.left = Math.random() * 100 + '%'
        confetti.style.top = Math.random() * 30 + '%'
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        confetti.style.setProperty('--x', (Math.random() - 0.5) * 300 + 'px')
        confetti.style.setProperty('--y', Math.random() * 300 + 150 + 'px')
        confetti.style.setProperty('--rotation', Math.random() * 720 - 360 + 'deg')
        confetti.style.setProperty('--duration', 1.5 + Math.random() * 1.5 + 's')
        document.body.appendChild(confetti)
        
        setTimeout(() => confetti.remove(), 3000)
      }, i * (partyMode ? 15 : 30))
    }
    
    // Add extra particle burst
    setTimeout(() => createParticleExplosion(), 200)
    
    setTimeout(() => setConfettiActive(false), 3000)
  }, [partyMode, playSound, createParticleExplosion])

const triggerFireworks = useCallback(() => {
    setShowFireworks(true)
    playSound('explosion')
    const colors = ['#ff006e', '#00d9ff', '#00ff88', '#9d00ff', '#ffea00', '#fff', '#ff1493', '#00ffff']
    
    const fireworkCount = partyMode ? 20 : 10
    
    for (let i = 0; i < fireworkCount; i++) {
      setTimeout(() => {
        const firework = document.createElement('div')
        firework.style.position = 'fixed'
        firework.style.left = Math.random() * 80 + 10 + '%'
        firework.style.top = Math.random() * 50 + '%'
        
        const size = partyMode ? 8 : 4
        firework.style.width = `${size}px`
        firework.style.height = `${size}px`
        
        firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        firework.style.borderRadius = '50%'
        firework.style.boxShadow = `0 0 ${size * 5}px ${firework.style.backgroundColor}, 0 0 ${size * 10}px ${firework.style.backgroundColor}`
        firework.classList.add('animate-cosmic-explosion', 'firework-glow')
        firework.style.zIndex = '9999'
        
        // Add pulsing effect
        firework.style.animation = 'cosmic-explosion 1.5s ease-out, pulse 0.5s ease-in-out infinite'
        
        document.body.appendChild(firework)
        
        // Create secondary explosion particles
        setTimeout(() => {
          for (let j = 0; j < 8; j++) {
            const particle = document.createElement('div')
            particle.style.position = 'fixed'
            particle.style.left = firework.style.left
            particle.style.top = firework.style.top
            particle.style.width = '2px'
            particle.style.height = '2px'
            particle.style.backgroundColor = firework.style.backgroundColor
            particle.style.borderRadius = '50%'
            particle.style.zIndex = '9998'
            
            const angle = (Math.PI * 2 * j) / 8
            const distance = 50 + Math.random() * 50
            
            particle.style.transform = 'translate(-50%, -50%)'
            
            document.body.appendChild(particle)
            
            setTimeout(() => {
              particle.style.transition = 'all 1s ease-out'
              particle.style.transform = `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px))`
              particle.style.opacity = '0'
            }, 10)
            
            setTimeout(() => particle.remove(), 1000)
          }
        }, 300)
        
        setTimeout(() => firework.remove(), 1500)
      }, i * (partyMode ? 100 : 200))
    }
    
    setTimeout(() => setShowFireworks(false), 4000)
  }, [partyMode, playSound])

const togglePartyMode = useCallback(() => { // eslint-disable-line @typescript-eslint/no-unused-vars
    setPartyMode(!partyMode)
    if (!partyMode) {
      triggerConfetti()
      addMessage("> 🎉 [PARTY MODE] ACTIVATED! Let's get this party started!")
    } else {
      addMessage("> [PARTY MODE] Deactivated. Back to serious business!")
    }
  }, [partyMode, triggerConfetti, addMessage])

  const toggleDiscoMode = useCallback(() => { // eslint-disable-line @typescript-eslint/no-unused-vars
    setDiscoMode(!discoMode)
    if (!discoMode) {
      document.body.classList.add('disco-mode')
      addMessage("> 🕺 [DISCO FEVER] Everybody dance now!")
    } else {
      document.body.classList.remove('disco-mode')
      addMessage("> [DISCO MODE] Deactivated. The party's over!")
    }
  }, [discoMode, addMessage])

  const activatePowerUp = useCallback((type: string) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    setPowerUps(prev => ({...prev, [type]: true}))
    
    switch(type) {
      case 'rainbowBlast':
        addMessage("> 🌈 [POWER-UP] Rainbow Blast activated!")
        triggerFireworks()
        setCredits(prev => prev + 100)
        break
      case 'timeFreeze':
        addMessage("> ⏰ [POWER-UP] Time Freeze activated!")
        setClicks(prev => prev + 50)
        break
      case 'multiplierX10':
        addMessage("> ×10 [POWER-UP] 10x Multiplier activated!")
        setMegaCombo(prev => Math.min(prev + 10, 20))
        break
      case 'particleStorm':
        addMessage("> 🌪️ [POWER-UP] Particle Storm activated!")
        for(let i = 0; i < 5; i++) {
          setTimeout(() => createParticleExplosion(), i * 200)
        }
        break
    }
    
    setTimeout(() => {
      setPowerUps(prev => ({...prev, [type]: false}))
      addMessage(`> [POWER-UP] ${type} expired`)
    }, 10000)
  }, [addMessage, triggerFireworks, createParticleExplosion])

  // Check if first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('factory404_visited')
    if (!hasVisited) {
      setShowLore(true)
      localStorage.setItem('factory404_visited', 'true')
    } else {
      setShowLore(false)
    }
  }, [])

  // Shutdown animation when leaving page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Add shutdown animation class
      document.body.classList.add('shutdown-mode')
      
      // Show shutdown message
      const shutdownDiv = document.createElement('div')
      shutdownDiv.className = 'shutdown-message'
      shutdownDiv.innerHTML = `
        <div class="shutdown-content">
          <pre>
SYSTEM SHUTDOWN INITIATED...
SAVING QUANTUM STATE...
FACTORY 404 OFFLINE
          </pre>
        </div>
      `
      document.body.appendChild(shutdownDiv)
      
      // Prevent default to show animation
      e.preventDefault()
      e.returnValue = ''
      
      // Actually allow unload after a delay
      setTimeout(() => {
        document.body.removeChild(shutdownDiv)
      }, 2000)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
}, [])

  // Check for epic victory condition
  useEffect(() => {
    if (corruptionLevel >= 3 && upgrades.singularityDrive > 0 && epicLevel >= 10) {
      setShowVictory(true)
      setAchievements(prev => {
        if (!prev.singularityAchieved) {
          addMessage("> [ACHIEVEMENT] Singularity Achieved!")
          return {...prev, singularityAchieved: true}
        }
        return prev
      })
      setHiddenAchievements(prev => {
        if (!prev.ultimateWinner) {
          addMessage("> 🏆 [LEGENDARY] ULTIMATE WINNER ACHIEVED!")
          return {...prev, ultimateWinner: true}
        }
        return prev
      })
    }
  }, [corruptionLevel, upgrades.singularityDrive, epicLevel, addMessage])

  // Check achievements and progression milestones
  useEffect(() => {
    setAchievements(prev => {
      const newAchievements = {...prev}
      
      if (items.length > 0 && !prev.firstItem) {
        newAchievements.firstItem = true
        addMessage("> [ACHIEVEMENT] First Item Produced!")
      }
      if (clicks >= 100 && !prev.hundredClicks) {
        newAchievements.hundredClicks = true
        addMessage("> [ACHIEVEMENT] Century of Clicks!")
      }
      if (clicks >= 1000 && !prev.thousandClicks) {
        newAchievements.thousandClicks = true
        addMessage("> [ACHIEVEMENT] Click Master!")
      }
      if (items.length >= 500 && !prev.masterBuilder) {
        newAchievements.masterBuilder = true
        addMessage("> [ACHIEVEMENT] Master Builder!")
      }
      if (corruptionLevel >= 3 && !prev.quantumEngineer) {
        newAchievements.quantumEngineer = true
        addMessage("> [ACHIEVEMENT] Quantum Engineer!")
      }
      if (factoryHealth >= 95 && autoClickers >= 10 && !prev.efficiencyExpert) {
        newAchievements.efficiencyExpert = true
        addMessage("> [ACHIEVEMENT] Efficiency Expert!")
      }
      if (corruptionLevel >= 3 && !prev.corruptionMaster) {
        newAchievements.corruptionMaster = true
        addMessage("> [ACHIEVEMENT] Corruption Master!")
      }
      
      return newAchievements
    })
    
    // Milestone rewards
    if (clicks === 50) {
      setCredits(prev => prev + 25)
      addMessage("> [MILESTONE] 50 clicks reached! Bonus: 25 credits")
    }
    if (clicks === 250) {
      setCredits(prev => prev + 100)
      addMessage("> [MILESTONE] 250 clicks reached! Bonus: 100 credits")
    }
    if (clicks === 500) {
      setCredits(prev => prev + 250)
      addMessage("> [MILESTONE] 500 clicks reached! Bonus: 250 credits")
    }
    if (items.length === 100) {
      setCredits(prev => prev + 50)
      addMessage("> [MILESTONE] 100 items produced! Bonus: 50 credits")
    }
    if (items.length === 1000) {
      setCredits(prev => prev + 500)
      addMessage("> [MILESTONE] 1000 items produced! Bonus: 500 credits")
    }
  }, [clicks, items, corruptionLevel, factoryHealth, autoClickers, addMessage])

  // Update stats with research bonuses
  useEffect(() => {
    const researchSpeedBonus = 1 + (research.quantumComputing * 0.1) + (research.timeManipulation * 0.2)
    const researchProductionBonus = 1 + (research.nanotechnology * 0.2) + (research.artificialIntelligence * 0.1)
    const researchCreditBonus = 1 + (research.quantumComputing * 0.15) + (research.darkMatter * 0.3)
    
    setStats(prev => ({
      ...prev,
      totalClicks: clicks,
      totalItems: items.length,
      totalCredits: credits,
      highestCorruption: Math.max(prev.highestCorruption, corruptionLevel),
      itemsPerSecond: autoClickers * (1 + (upgrades.quantumCore * 0.5) + (upgrades.neuralNetwork * 2)) * researchSpeedBonus * researchProductionBonus,
      creditsPerSecond: autoClickers * (1 + (upgrades.bugExploiter * 2)) * (1 - (corruptionLevel * 0.1) + (upgrades.singularityDrive * 0.5)) * researchCreditBonus
    }))
  }, [clicks, items.length, credits, corruptionLevel, autoClickers, upgrades.quantumCore, upgrades.neuralNetwork, upgrades.bugExploiter, upgrades.singularityDrive, research.quantumComputing, research.timeManipulation, research.nanotechnology, research.artificialIntelligence, research.darkMatter])

  // Enhanced random events system with dramatic events
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({...prev, playTime: prev.playTime + 1}))
      
      // Random events every 15-30 seconds (more frequent)
      if (Math.random() > 0.92) {
        const eventRoll = Math.random()
        let event
        
        if (eventRoll < 0.15) {
          // Reactor Meltdown Event
          event = {
            type: 'meltdown',
            message: "> ⚠️ [CRITICAL] REACTOR MELTDOWN IMMINENT!",
            effect: () => {
              setFactoryHealth(prev => Math.max(0, prev - 30))
              setCorruptionLevel(prev => Math.min(3, prev + 1))
              setIsGlitching(true)
              setTimeout(() => setIsGlitching(false), 3000)
            }
          }
        } else if (eventRoll < 0.25) {
          // Production Boost Event
          event = {
            type: 'boost',
            message: "> ✨ [EVENT] QUANTUM PRODUCTION BOOST ACTIVATED!",
            effect: () => {
              const boostItems = Array.from({length: 10}, () => generateItem(false))
              setItems(prev => [...prev, ...boostItems])
              setCredits(prev => prev + 50)
              setFactoryHealth(prev => Math.min(100, prev + 15))
            }
          }
        } else if (eventRoll < 0.35) {
          // System Corruption Event
          event = {
            type: 'corruption',
            message: "> 🌌 [EVENT] SYSTEM CORRUPTION DETECTED!",
            effect: () => {
              setCorruptionLevel(prev => Math.min(3, prev + 1))
              const corruptedItems = Array.from({length: 5}, () => generateItem(true))
              setItems(prev => [...prev, ...corruptedItems])
            }
          }
        } else if (eventRoll < 0.45) {
          // AI Awakening Event
          event = {
            type: 'ai',
            message: "> 🤖 [EVENT] AI CORE SHOWING SIGNS OF CONSCIOUSNESS!",
            effect: () => {
              setCredits(prev => prev + 25)
              setUpgrades(prev => ({...prev, neuralNetwork: prev.neuralNetwork + 1}))
            }
          }
        } else if (eventRoll < 0.55) {
          // Quantum Fluctuation
          event = {
            type: 'quantum',
            message: "> ⚛️ [EVENT] QUANTUM FLUCTUATION DETECTED!",
            effect: () => {
              setCredits(prev => prev + 15 + Math.floor(Math.random() * 25))
              if (Math.random() > 0.5) {
                setCorruptionLevel(prev => Math.min(3, prev + 1))
              }
            }
          }
        } else if (eventRoll < 0.65) {
          // Maintenance Drone
          event = {
            type: 'maintenance',
            message: "> 🔧 [EVENT] MAINTENANCE DRONE DEPLOYED!",
            effect: () => {
              setFactoryHealth(prev => Math.min(100, prev + 20))
            }
          }
        } else if (eventRoll < 0.75) {
          // Spontaneous Assembly
          event = {
            type: 'assembly',
            message: "> ⚡ [EVENT] SPONTANEOUS ASSEMBLY CASCADE!",
            effect: () => {
              const newItems = Array.from({length: 3 + Math.floor(Math.random() * 5)}, () => generateItem(false))
              setItems(prev => [...prev, ...newItems])
            }
          }
        } else if (eventRoll < 0.85) {
          // Research Breakthrough
          event = {
            type: 'research',
            message: "> 🔬 [EVENT] RESEARCH BREAKTHROUGH ACHIEVED!",
            effect: () => {
              const researchFields = ['nanotechnology', 'quantumComputing', 'artificialIntelligence']
              const field = researchFields[Math.floor(Math.random() * researchFields.length)]
              setResearch(prev => ({...prev, [field]: prev[field as keyof typeof prev] + 1}))
            }
          }
        } else {
          // Reality Tear
          event = {
            type: 'reality',
            message: "> 🌌 [EVENT] REALITY TEAR CONTAINED!",
            effect: () => {
              setCorruptionLevel(prev => Math.min(3, prev + 1))
              setCredits(prev => prev + 30)
              setIsGlitching(true)
              setTimeout(() => setIsGlitching(false), 1500)
            }
          }
        }
        
        addMessage(event.message)
        event.effect()
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [addMessage])

  // Auto save
  useEffect(() => {
    if (autoSave) {
      const saveData = {
        clicks, items, credits, autoClickers, upgrades, corruptionLevel,
        factoryHealth, research, achievements, stats
      }
      localStorage.setItem('factory404_save', JSON.stringify(saveData))
    }
  }, [clicks, items, credits, autoClickers, upgrades, corruptionLevel, factoryHealth, research, achievements, stats, autoSave])

  // Load save data
  useEffect(() => {
    const savedData = localStorage.getItem('factory404_save')
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        setClicks(data.clicks || 0)
        setItems(data.items || [])
        setCredits(data.credits || 0)
        setAutoClickers(data.autoClickers || 0)
        setUpgrades(prev => ({...prev, ...data.upgrades}))
        setCorruptionLevel(data.corruptionLevel || 0)
        setFactoryHealth(data.factoryHealth || 100)
        setResearch(prev => ({...prev, ...data.research}))
        setAchievements(prev => ({...prev, ...data.achievements}))
        setStats(prev => ({...prev, ...data.stats}))
            } catch {
              console.error('Failed to load save data')
      }
    }
  }, [])

  // Galaxy animation
  useEffect(() => {
    const interval = setInterval(() => {
      setGalaxyRotation(prev => (prev + 1) % 360)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Graph data updates
  useEffect(() => {
    if (clicks % 5 === 0) {
      setGraphData(prev => [...prev.slice(-19), clicks].filter(Boolean))
    }
  }, [clicks])

   // Enhanced particle effects with more variety
   useEffect(() => {
     if (isGlitching || corruptionLevel > 0 || clicks > 0) {
       const particleCount = isGlitching ? 20 + (corruptionLevel * 10) : 5 + (corruptionLevel * 3)
       const newParticles = Array.from({length: particleCount}, () => {
         const angle = Math.random() * Math.PI * 2
         const speed = 0.5 + Math.random() * 2
         const size = 1 + Math.random() * 3
         const type = Math.random() > 0.7 ? 'quantum' : Math.random() > 0.5 ? 'glitch' : 'normal'
         
         return {
           x: Math.random() * 100,
           y: Math.random() * 100,
           vx: Math.cos(angle) * speed,
           vy: Math.sin(angle) * speed,
           life: 50 + Math.random() * 150,
           size,
           type,
           color: type === 'quantum' ? 'purple' : type === 'glitch' ? 'red' : 'green',
           rotation: Math.random() * 360,
           rotationSpeed: (Math.random() - 0.5) * 10
         }
       })
       setParticles(prev => [...prev, ...newParticles].slice(0, 150))
     }

     const updateParticles = setInterval(() => {
       setParticles(prev => 
         prev.map(p => ({
           ...p,
           x: p.x + p.vx,
           y: p.y + p.vy,
           vx: p.vx * 0.99, // friction
           vy: p.vy * 0.99 + 0.1, // gravity
           life: p.life - 1,
           rotation: p.rotation + p.rotationSpeed
         })).filter(p => p.life > 0 && p.x >= 0 && p.x <= 100 && p.y >= 0 && p.y <= 100)
       )
     }, 30)

     return () => clearInterval(updateParticles)
   }, [isGlitching, corruptionLevel, clicks])

  // ASCII items with galaxy and cosmic themes
  const itemTemplates = useMemo(() => [
    "╔═╗ ◯ WIRE.TUBE ◯",
    "╠═╣ ✧ ERROR.LOG ✧",
    "╚═╝ ⚡ URANIUM.BOLT ⚡",
    "╔╦╗ ✦ DATA.CORE ✦",
    "╠╬╣ ◈ CARBON.SHAFT ◈",
    "╚╩╝ ⚛ CRYPTO.CHIP ⚛",
    "║☢║ ★ MEMORY.CELL ★",
    "╞═╡ ◯ UNKNOWN.PART ◯",
    "╟─╢ ✧ OVERFLOW.BUF ✧",
    "╞╪╡ ⚡ NANITE.GEL ⚡",
    "╓─╖ ✦ BIO.CIRCUIT ✦",
    "║▒║ ◈ PLASMA.TUBE ◈",
    "╙─╜ ⚛ FUSION.CELL ⚛",
    "╒═╕ ★ QUANTUM.CHIP ★",
    "╞╪╡ ◯ NEURAL.LINK ◯",
    "╔╗╔ ✧ GALAXY.CORE ✧",
    "╚╝╚ ⚡ COSMIC.DUST ⚡",
    "╔╝╚ ✦ STELLAR.CHIP ✦",
    "╚╗╔ ◈ QUANTUM.CRYSTAL ◈",
    "║║║ ⚛ NEBULA.CELL ⚛",
    "╞╡╞ ★ DARK.MATTER ★",
    "╟╢╟ ◯ WORMHOLE.GATE ◯",
    "╠╣╠ ✧ TIME.CRYSTAL ✧",
    "╡╞╡ ⚡ ANTIMATTER.CORE ⚡",
    "╢╟╢ ✦ VOID.ENERGY ✦",
    "╔═╦╗ ◈ DIMENSION.KEY ◈",
    "╚═╩╝ ⚛ REALITY.CHIP ⚛"
  ], [])

  // Corrupted items with cosmic horror themes
  const corruptedTemplates = useMemo(() => [
    "╔╗╔ ⚠ CORRUPTED.OBJ ⚠",
    "╚╝╚ ☠ GLITCH.UNIT ☠",
    "╔╝╚ ⚡ ERROR.ENTITY ⚡",
    "╚╗╔ ◈ VOID.MATTER ◈",
    "║║║ ✦ MALFORMED.PART ✦",
    "╞╡╞ ⚛ ENTROPY.CORE ⚛",
    "╟╢╟ ◯ CHAOS.MATRIX ◯",
    "╠╣╠ ✧ NULL.OBJECT ✧",
    "╡╞╡ ⚡ PARADOX.CIRCUIT ⚡",
    "╢╟╢ ◈ ANTIMATTER.CELL ◈",
    "╔╗╗ ✦ COSMIC.HORROR ✦",
    "╚╝╚ ⚠ DIMENSION.RIFT ⚠",
    "╔╝╝ ☠ REALITY.TEAR ☠",
    "╚╗╗ ⚛ VOID.CREATURE ⚛",
    "║║║ ◯ CHAOS.SPAWN ◯",
    "╞╡╞ ✧ ENTROPY.BEING ✧",
    "╟╢╟ ⚡ NULL.ABERRATION ⚡",
    "╠╣╠ ◈ PARADOX.ENTITY ◈",
    "╡╞╡ ✦ VOID.ANOMALY ✦",
    "╢╟╢ ⚠ CHAOS.DEMON ⚠",
    "╔╗╗ ☠ CORRUPTED.GOD ☠",
    "╚╝╚ ⚛ REALITY.BREAKER ⚛"
  ], [])

  // Generate random item with more visual variety
  const generateItem = useCallback((isCorrupted = false) => {
    const templates = isCorrupted && corruptionLevel > 0 
      ? [...itemTemplates, ...corruptedTemplates] 
      : itemTemplates
    
    const item = templates[Math.floor(Math.random() * templates.length)]
    const variants = [
      `[${item}]`,
      `{${item}}`,
      `(${item})`,
      `<${item}>`,
      `|${item}|`
    ]
    
    return variants[Math.floor(Math.random() * variants.length)]
  }, [corruptionLevel, itemTemplates, corruptedTemplates])

   // Reboot for corruption mode with more effects
   const rebootFactory = useCallback(() => {
    if (clicks >= 100 && corruptionLevel < 3) {
      setCorruptionLevel(corruptionLevel + 1)
      setClicks(0)
      setItems([])
      setMessages([
        "> [SYSTEM REBOOT] Initializing...",
        "> [WARNING] Bypassing safety protocols",
        "> [ALERT] Quantum fluctuations detected",
        `> [STATUS] Corruption level ${corruptionLevel + 1} enabled`,
        "> [PROMPT] _"
      ])
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 1000)
    }
  }, [clicks, corruptionLevel])

   // Start hack mini-game
   const startHackGame = useCallback(() => {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple']
    const sequence = Array.from({length: 4 + Math.floor(Math.random() * 3)}, () => 
      colors[Math.floor(Math.random() * colors.length)]
    )
    setHackSequence(sequence)
    setPlayerSequence([])
    setHackActive(true)
    setHackReward(50 + (sequence.length * 25))
    setShowHackGame(true)
    addMessage("> [HACK] Infiltrating security protocols...")
    
    // Show sequence to player
    let index = 0
    const showInterval = setInterval(() => {
      if (index >= sequence.length) {
        clearInterval(showInterval)
        addMessage("> [HACK] Your turn. Repeat the sequence!")
        return
      }
      addMessage(`> [HACK] Color ${index + 1}: ${sequence[index].toUpperCase()}`)
      index++
    }, 800)
}, [addMessage]) // eslint-disable-line react-hooks/exhaustive-deps

   // Handle hack button click
   const handleHackClick = useCallback((color: string) => {
    if (!hackActive) return
    
    const newPlayerSequence = [...playerSequence, color]
    setPlayerSequence(newPlayerSequence)
    
    // Check if correct
    if (newPlayerSequence[newPlayerSequence.length - 1] !== hackSequence[newPlayerSequence.length - 1]) {
      // Wrong sequence
      addMessage("> [HACK FAILED] Security breach detected!")
      setHackActive(false)
      setFactoryHealth(prev => Math.max(0, prev - 10))
      setTimeout(() => setShowHackGame(false), 1500)
      return
    }
    
    // Check if completed
    if (newPlayerSequence.length === hackSequence.length) {
      addMessage(`> [HACK SUCCESS] Security bypassed! Reward: ${hackReward} credits`)
      setCredits(prev => prev + hackReward)
      setHackActive(false)
      setTimeout(() => setShowHackGame(false), 1500)
    }
   }, [hackActive, playerSequence, hackSequence, hackReward, addMessage])

  // Enhanced command parser with slash commands support
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const command = terminalInput.trim()
    setTerminalInput('')
    
    addMessage(`> ${command}`)
    
    // Parse slash commands
    if (command.startsWith('/')) {
      handleSlashCommand(command)
      return
    }
    
    // Handle traditional commands
    const lowerCommand = command.toLowerCase()
    
    switch(lowerCommand) {
       case 'help':
         setShowHelp(true)
         break
       case 'clear':
         setMessages([
           "> [SYSTEM] Terminal cleared",
           "> [PROMPT] _"
         ])
         break
        case 'reboot':
          rebootFactory()
          break
       case 'status':
         addMessage(`> [STATUS] Clicks: ${clicks} | Items: ${items.length} | Credits: ${credits}`)
         addMessage(`> [UPGRADES] OC:${upgrades.overclock} BE:${upgrades.bugExploiter} SP:${upgrades.systemPatch} NN:${upgrades.neuralNetwork}`)
         addMessage(`> [AUTOMATION] ${autoClickers} units`)
         break
       case 'inventory':
         if (items.length > 0) {
           addMessage("> [INVENTORY]")
           items.slice(-5).reverse().forEach(item => {
             addMessage(`> ${item}`)
           })
         } else {
           addMessage("> [INVENTORY] Empty")
         }
         break
       case 'graph':
         addMessage("> [GRAPH] Showing production metrics")
         break
       case 'settings':
         setShowSettings(true)
         break
       case 'stats':
         setShowStats(true)
         break
       case 'achievements':
         setShowAchievements(true)
         break
       case 'shop':
         setShowShop(true)
         break
       case 'research':
         setShowResearch(true)
         break
        case 'save':
          const saveData = {clicks, items, credits, autoClickers, upgrades, corruptionLevel, factoryHealth, research, achievements, stats}
          localStorage.setItem('factory404_save', JSON.stringify(saveData))
          addMessage("> [SAVE] Game saved successfully")
          break
        case 'load':
          const savedData = localStorage.getItem('factory404_save')
          if (savedData) {
            try {
              const data = JSON.parse(savedData)
              setClicks(data.clicks || 0)
              setItems(data.items || [])
              setCredits(data.credits || 0)
              setAutoClickers(data.autoClickers || 0)
              setUpgrades(prev => ({...prev, ...data.upgrades}))
              setCorruptionLevel(data.corruptionLevel || 0)
              setFactoryHealth(data.factoryHealth || 100)
              setResearch(prev => ({...prev, ...data.research}))
              setAchievements(prev => ({...prev, ...data.achievements}))
              setStats(prev => ({...prev, ...data.stats}))
              addMessage("> [LOAD] Game loaded successfully")
            } catch {
              addMessage("> [ERROR] Failed to load save data")
            }
          } else {
            addMessage("> [ERROR] No save data found")
          }
          break
       case 'reset':
         if (confirm('Are you sure you want to reset all progress?')) {
           localStorage.removeItem('factory404_save')
           window.location.reload()
         }
         break
        default:
          // Easter eggs for secret commands
          if (lowerCommand === 'party') {
            addMessage("> 🎉 [SECRET] Party mode unlocked!")
            playSound('party')
            setCredits(prev => prev + 50)
            setTimeout(() => {
              for(let i = 0; i < 5; i++) {
                setTimeout(() => createParticleExplosion(), i * 100)
              }
            }, 500)
          } else if (lowerCommand === 'disco') {
            addMessage("> 🕺 [SECRET] Disco fever activated!")
            playSound('disco')
            document.body.classList.add('animate-disco-fever')
            setTimeout(() => {
              document.body.classList.remove('animate-disco-fever')
            }, 5000)
          } else if (lowerCommand === 'matrix') {
            addMessage("> 💊 [SECRET] Take the blue pill...")
            setTheme('matrix')
          } else if (lowerCommand === 'cyber') {
            addMessage("> 🔮 [SECRET] Cyberpunk mode engaged!")
            setTheme('cyber')
          } else if (lowerCommand === 'retro') {
            addMessage("> 📟 [SECRET] Retro wave activated!")
            setTheme('retro')
          } else if (lowerCommand === 'quantum') {
            addMessage("> ⚛️ [SECRET] Quantum fluctuation detected!")
            playSound('quantum')
            setCorruptionLevel(prev => Math.min(3, prev + 1))
            setCredits(prev => prev + 25)
          } else if (lowerCommand === 'wombo') {
            addMessage("> 🎨 [SECRET] Wombo Combo activated!")
            playSound('powerup')
            setClicks(prev => prev + 100)
            setItems(prev => [...prev, ...Array.from({length: 10}, () => generateItem(false))])
            setTimeout(() => createParticleExplosion(), 200)
          } else if (lowerCommand === '42') {
            addMessage("> 🤔 [SECRET] The answer to everything...")
            setCredits(prev => prev + 42)
          } else if (lowerCommand === 'lucky') {
            addMessage("> 🍀 [SECRET] Lucky number 7!")
            const luckyBonus = Math.floor(Math.random() * 777) + 777
            setCredits(prev => prev + luckyBonus)
            addMessage(`> [LUCKY] You won ${luckyBonus} credits!`)
            playSound('victory')
          } else if (lowerCommand === 'leet') {
            addMessage("> 🎮 [SECRET] 1337 H4X0R M0D3!")
            playSound('powerup')
            setClicks(prev => prev + 1337)
            setUpgrades(prev => ({...prev, overclock: prev.overclock + 13}))
            setAutoClickers(prev => prev + 3)
          } else if (lowerCommand === 'universe') {
            addMessage("> 🌌 [SECRET] Don't panic...")
            setTimeout(() => {
              addMessage("> [UNIVERSE] ...and always bring a towel!")
              setCredits(prev => prev * 2)
              playSound('victory')
            }, 3000)
          } else {
            addMessage("> [ERROR] Unknown command. Type 'help' for options")
          }
    }
  }

  // Handle slash commands
  const handleSlashCommand = (command: string) => {
    const parts = command.split(' ')
    const cmd = parts[0].toLowerCase()
    const args = parts.slice(1).join(' ')
    
    switch(cmd) {
      case '/help':
        addMessage("> [QUANTUM COMMANDS]")
        addMessage("> /help - Show this help")
        addMessage("> /create [item-name] - Create specific item")
        addMessage("> /upgrade [station] - Upgrade factory station")
        addMessage("> /export logs - Export system logs")
        addMessage("> /diagnose system - Run system diagnostics")
        addMessage("> /scan anomalies - Scan for quantum anomalies")
        addMessage("> /ask-ai [query] - Query AI Core")
        break
        
      case '/create':
        if (args) {
          const itemName = args.toUpperCase()
          const newItem = `[${itemName}] ◯ QUANTUM ENHANCED ◯`
          setItems(prev => [...prev, newItem])
          setCredits(prev => prev + 5)
          addMessage(`> [CREATION] Successfully created: ${newItem}`)
          addMessage(`> [BONUS] +5 credits awarded`)
        } else {
          addMessage("> [ERROR] Usage: /create [item-name]")
        }
        break
        
      case '/upgrade':
        if (args) {
          const station = args.toLowerCase()
          const upgradeCosts: Record<string, number> = {
            'assembly': 25,
            'quantum': 50,
            'neural': 75,
            'singularity': 100
          }
          
          const cost = upgradeCosts[station]
          if (cost && credits >= cost) {
            setCredits(prev => prev - cost)
            addMessage(`> [UPGRADE] ${station} station upgraded successfully`)
            addMessage(`> [COST] -${cost} credits`)
            
            // Apply upgrade effects
            if (station === 'assembly') setAutoClickers(prev => prev + 1)
            if (station === 'quantum') setUpgrades(prev => ({...prev, quantumCore: prev.quantumCore + 1}))
            if (station === 'neural') setUpgrades(prev => ({...prev, neuralNetwork: prev.neuralNetwork + 1}))
            if (station === 'singularity') setUpgrades(prev => ({...prev, singularityDrive: prev.singularityDrive + 1}))
          } else {
            addMessage("> [ERROR] Invalid station or insufficient credits")
          }
        } else {
          addMessage("> [ERROR] Usage: /upgrade [assembly|quantum|neural|singularity]")
        }
        break
        
      case '/export':
        if (args === 'logs') {
          const logData = {
            timestamp: new Date().toISOString(),
            clicks,
            items: items.length,
            credits,
            corruptionLevel,
            factoryHealth,
            upgrades,
            research
          }
          addMessage("> [EXPORT] System logs exported successfully")
          addMessage(`> [DATA] ${JSON.stringify(logData).substring(0, 100)}...`)
        } else {
          addMessage("> [ERROR] Usage: /export logs")
        }
        break
        
      case '/diagnose':
        if (args === 'system') {
          addMessage("> [DIAGNOSTIC] Running system scan...")
          setTimeout(() => {
            addMessage("> [SCAN] Quantum core stability: 87%")
            addMessage("> [SCAN] Neural network integrity: 92%")
            addMessage("> [SCAN] Assembly line efficiency: ${Math.floor(factoryHealth)}%")
            addMessage("> [SCAN] Corruption level: ${corruptionLevel}/3")
            addMessage("> [COMPLETE] Diagnostic finished")
          }, 1000)
        } else {
          addMessage("> [ERROR] Usage: /diagnose system")
        }
        break
        
      case '/scan':
        if (args === 'anomalies') {
          addMessage("> [SCANNER] Initiating quantum anomaly detection...")
          setTimeout(() => {
            const anomalies = [
              "Temporal distortion detected in sector 7",
              "Quantum entanglement fluctuation observed",
              "Reality tear contained in manufacturing zone",
              "Dark matter residue found on assembly line",
              "Chroniton particles detected in coolant system"
            ]
            const anomaly = anomalies[Math.floor(Math.random() * anomalies.length)]
            addMessage(`> [ANOMALY] ${anomaly}`)
            addMessage("> [STATUS] Anomaly logged for further analysis")
          }, 1500)
        } else {
          addMessage("> [ERROR] Usage: /scan anomalies")
        }
        break
        
      case '/ask-ai':
        if (args) {
          addMessage("> [AI CORE] Processing query...")
          setTimeout(() => {
            const aiResponses = [
              "Analyzing quantum pipelines... done. Efficiency +4%.",
              "Neural network optimization complete. Production +7%.",
              "Quantum entanglement stabilized. Corruption -1%.",
              "Predictive algorithms calibrated. Future accuracy 89%.",
              "Dark matter containment field reinforced. Safety +12%.",
              "Temporal mechanics analyzed. Time distortion minimized.",
              "Reality matrix recalibrated. System stability +8%.",
              "Singularity drive parameters optimized. Power +15%."
            ]
            const response = aiResponses[Math.floor(Math.random() * aiResponses.length)]
            addMessage(`> [AI RESPONSE] ${response}`)
          }, 2000)
        } else {
          addMessage("> [ERROR] Usage: /ask-ai [query]")
        }
        break
        
        default:
          addMessage(`> [ERROR] Unknown command: ${cmd}`)
          addMessage("> [HELP] Type /help for available commands")
          
          // Easter eggs for specific unknown commands
          if (cmd === '/party') {
            addMessage("> 🎉 [SECRET] Party mode unlocked!")
            triggerFireworks()
            setCredits(prev => prev + 50)
          } else if (cmd === '/disco') {
            addMessage("> 🕺 [SECRET] Disco fever activated!")
            document.body.classList.add('animate-disco-fever')
          } else if (cmd === '/quantum') {
            addMessage("> ⚛️ [SECRET] Quantum fluctuation detected!")
            setCorruptionLevel(prev => Math.min(3, prev + 1))
            setCredits(prev => prev + 25)
          } else if (cmd === '/matrix') {
            addMessage("> 💊 [SECRET] Take the blue pill or the red pill?")
            setTheme('matrix')
          } else if (cmd === '/cyber') {
            addMessage("> 🔮 [SECRET] Cyberpunk mode engaged!")
            setTheme('cyber')
          } else if (cmd === '/retro') {
            addMessage("> 📟 [SECRET] Retro wave activated!")
            setTheme('retro')
          } else if (cmd === '/rainbow') {
            addMessage("> 🌈 [SECRET] Rainbow power unleashed!")
            for(let i = 0; i < 3; i++) {
              setTimeout(() => triggerFireworks(), i * 300)
            }
            setMegaCombo(prev => prev + 5)
          } else if (cmd === '/wombo') {
            addMessage("> 🎨 [SECRET] Wombo Combo activated!")
            setClicks(prev => prev + 100)
            setItems(prev => [...prev, ...Array.from({length: 10}, () => generateItem(false))])
            triggerFireworks()
          } else if (cmd === '/42') {
            addMessage("> 🤔 [SECRET] The answer to life, the universe, and everything.")
            setCredits(prev => prev + 42)
          } else if (cmd === '/fortytwo') {
            addMessage("> 🌌 [SECRET] Deep thought engaged...")
            setTimeout(() => {
              addMessage("> [FORTYTWO] ...42. Here are 42 credits!")
              setCredits(prev => prev + 42)
              triggerFireworks()
            }, 2000)
          } else if (cmd === '/leet') {
            addMessage("> 🎮 [SECRET] 1337 H4X0R M0D3 4CT1V4T3D!")
            setClicks(prev => prev + 1337)
            setUpgrades(prev => ({...prev, overclock: prev.overclock + 13}))
            setAutoClickers(prev => prev + 3)
          } else if (cmd === '/lucky') {
            addMessage("> 🍀 [SECRET] Lucky number 7!")
            const luckyBonus = Math.floor(Math.random() * 777) + 777
            setCredits(prev => prev + luckyBonus)
            addMessage(`> [LUCKY] You won ${luckyBonus} credits!`)
          } else if (cmd === '/universe') {
            addMessage("> 🌌 [SECRET] The universe smiles upon you...")
            setTimeout(() => {
              addMessage("> [UNIVERSE] Don't panic. And always bring a towel.")
              setCredits(prev => prev * 2)
            }, 3000)
          }
    }
  }

    // Handle click with more effects and loading states
    const handleClick = useCallback(() => {
      if (isLoading || factoryHealth <= 0) return
      
      // Enhanced combo system
      setComboTimer(prev => prev + 1)
      setMegaCombo(prev => {
        const newCombo = prev + 1
        if (newCombo >= 10) {
          addMessage("> [MEGA COMBO] ×10 MULTIPLIER ACTIVATED!")
          createParticleExplosion()
        } else if (newCombo >= 5) {
          addMessage(`> [COMBO] ×${newCombo} STREAK!`)
        }
        return newCombo
      })
      
      // Screen shake effect
      const mainContainer = document.querySelector('.max-w-7xl')
      if (mainContainer) {
        mainContainer.classList.add('screen-shake')
        setTimeout(() => mainContainer.classList.remove('screen-shake'), 300)
      }
      
      // Create particle explosion
      createParticleExplosion()
      
      setIsLoading(true)
      setIsTransitioning(true)
      
      setTimeout(() => {
        playSound('click')
        
        // EPIC BONUS CALCULATIONS
        const comboMultiplier = Math.min(megaCombo, 10)
        const researchBonus = 1 + (research.nanotechnology * 0.1) + (research.quantumComputing * 0.2) + (research.artificialIntelligence * 0.3)
        const tournamentBonus = tournament ? 2 : 1
        const epicBonus = epicLevel > 1 ? epicLevel * 0.5 : 0
        
        const baseProduction = (1 + (upgrades.overclock * 2) + (upgrades.neuralNetwork * 5)) * researchBonus * comboMultiplier * tournamentBonus * (1 + epicBonus)
        const newClicks = clicks + Math.floor(baseProduction)
        setClicks(newClicks)
    
    // Generate items
    const newItems = [...items]
    const researchItemBonus = 1 + (research.nanotechnology * 0.2) + (research.artificialIntelligence * 0.1)
    const itemsToAdd = Math.floor((1 + (upgrades.bugExploiter * 2) + (upgrades.singularityDrive * 10)) * researchItemBonus)
    const isCorrupted = corruptionLevel > 0 && Math.random() > 0.7
    
    for (let i = 0; i < itemsToAdd; i++) {
      newItems.push(generateItem(isCorrupted))
    }
    
    setItems(newItems)
    
    // Add credits with diminishing returns at higher corruption
    const researchCreditBonus = 1 + (research.quantumComputing * 0.15) + (research.darkMatter * 0.3)
    const creditMultiplier = (1 - (corruptionLevel * 0.1) + (upgrades.singularityDrive * 0.5)) * researchCreditBonus
    const newCredits = credits + Math.max(1, Math.floor((1 + Math.random() * 3) * creditMultiplier))
    setCredits(newCredits)
    
    // Add messages about production
    newItems.slice(-itemsToAdd).forEach(item => {
      addMessage(`> [PRODUCTION] Assembled: ${item}`)
    })
    
    // Random events based on corruption level
    if (Math.random() > 0.95 - (corruptionLevel * 0.05)) {
      const normalEvents = [
        "> [WARNING] Memory leak detected",
        "> [NOTICE] Defragmenting drive...",
        "> [ALERT] Cooling fans at 75%",
        "> [STATUS] Production nominal",
        "> [ERROR] Divide by zero exception",
        "> [PATCH] Applied hotfix"
      ]
      
      const corruptedEvents = [
        "> [WARNING] Reality instability detected",
        "> [ALERT] Quantum decoherence imminent",
        "> [ERROR] Time paradox prevented",
        "> [NOTICE] Chronal particles detected",
        "> [CRITICAL] Dimensional breach contained",
        "> [WARNING] Entropy levels rising"
      ]
      
      const events = corruptionLevel > 0 
        ? [...normalEvents, ...corruptedEvents]
        : normalEvents
      
      addMessage(events[Math.floor(Math.random() * events.length)])
    }
    
    // Check for corruption unlock
    if (newClicks >= 100 && corruptionLevel === 0) {
      addMessage("> [WARNING] System instability detected")
      addMessage("> [ADVICE] Type 'reboot' to enable advanced features")
    }
    
    // Random glitch effect
    if (Math.random() > 0.9 - (corruptionLevel * 0.1)) {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 300)
    }
    
    // Degrade factory health with usage
    if (Math.random() > 0.8) {
      setFactoryHealth(prev => Math.max(0, prev - 1))
    }
    
     setIsLoading(false)
     setIsTransitioning(false)
      }, 100)
   }, [clicks, items, upgrades, corruptionLevel, credits, addMessage, generateItem, research, isLoading, factoryHealth, createParticleExplosion, epicLevel, megaCombo, playSound, tournament])


useEffect(() => {
  if (autoClickers > 0) {
    const efficiency = factoryHealth / 100;
    const researchSpeedBonus = 1 + (research.quantumComputing * 0.1) + (research.timeManipulation * 0.2);
    const interval = setInterval(() => {
      if (Math.random() < efficiency) {
        handleClick(); 
      }
    }, 1000 / (autoClickers * (1 + (upgrades.quantumCore * 0.5) + (upgrades.neuralNetwork * 2)) * researchSpeedBonus));

    return () => clearInterval(interval);
  }
  }, [autoClickers, handleClick, factoryHealth, upgrades.quantumCore, upgrades.neuralNetwork, research.quantumComputing, research.timeManipulation]);


  // Combo timer decay system
  useEffect(() => {
    if (comboTimer > 0) {
      const decayTimer = setTimeout(() => {
        setComboTimer(prev => Math.max(0, prev - 1))
        if (comboTimer === 1) {
          setMegaCombo(0)
          addMessage("> [COMBO] Streak reset!")
        }
      }, 2000)
      return () => clearTimeout(decayTimer)
    }
  }, [comboTimer, addMessage])



  // Boss battle mechanics
  const attackBoss = () => {
    if (!bossBattle) return
    
    const damage = Math.floor((10 + upgrades.overclock * 5 + upgrades.neuralNetwork * 10) * (1 + megaCombo * 0.1))
    setBossHealth(prev => Math.max(0, prev - damage))
    
    if (bossHealth <= damage) {
      setBossBattle(false)
      setBossHealth(1000 + epicLevel * 500)
      setCredits(prev => prev + 1000 * epicLevel)
      setEpicLevel(prev => prev + 1)
      addMessage(`> 🎉 [VICTORY] BOSS DEFEATED! REWARD: ${1000 * epicLevel} CREDITS!`)
      addMessage(`> [LEVEL UP] EPIC LEVEL ${epicLevel + 1} REACHED!`)
    } else {
      setFactoryHealth(prev => Math.max(0, prev - 5))
      addMessage(`> ⚔️ [ATTACK] DEALT ${damage} DAMAGE TO BOSS!`)
    }
  }

  // Epic random events system
  useEffect(() => {
    const epicInterval = setInterval(() => {
      if (Math.random() > 0.98) {
        triggerEpicEvent()
      }
    }, 5000)
return () => clearInterval(epicInterval)
  }, [addMessage, generateItem])

  // Repair factory over time with research bonuses
  useEffect(() => {
    const repairInterval = setInterval(() => {
      if (factoryHealth < 100) {
        const researchRepairBonus = 1 + (research.nanotechnology * 0.3)
        setFactoryHealth(prev => Math.min(100, prev + (0.1 + (upgrades.systemPatch * 0.2)) * researchRepairBonus))
      }
    }, 1000)
    
    return () => clearInterval(repairInterval)
  }, [factoryHealth, upgrades.systemPatch, research.nanotechnology])

  const triggerEpicEvent = useCallback(() => {
    const events = [
      () => {
        setBossBattle(true)
        addMessage("> ⚠️ [BOSS BATTLE] QUANTUM DRAGON APPEARED!")
      },
      () => {
        setTournament(true)
        addMessage("> 🏆 [TOURNAMENT] GALACTIC CHAMPIONSHIP STARTED!")
      },
      () => {
        setAlienInvasion(true)
        addMessage("> 👽 [ALERT] ALIEN FLEET DETECTED!")
      },
      () => {
        setSpaceBattle(true)
        addMessage("> 🚀 [SPACE BATTLE] INTERCEPTOR SCRAMBLED!")
      },
      () => {
        const creditsBonus = Math.floor(Math.random() * 500) + 100
        setCredits(prev => prev + creditsBonus)
        addMessage(`> 🎁 [GIFT] MYSTERIOUS BONUS: +${creditsBonus} CREDITS!`)
      },
      () => {
        setSpecialAbilities(prev => ({
          ...prev,
          timeWarp: true
        }))
        addMessage("> ⏰ [POWER] TIME WARP UNLOCKED!")
      }
    ]
    
    const randomEvent = events[Math.floor(Math.random() * events.length)]
    randomEvent()
  }, [addMessage])

  // Scan line animation
  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanLinePos(prev => (prev + 1) % 20)
    }, 100)
    return () => clearInterval(scanInterval)
  }, [])

  // Active animation cycling
  useEffect(() => {
    const animInterval = setInterval(() => {
      setActiveAnimation(prev => (prev + 1) % 4)
    }, 2000)
    return () => clearInterval(animInterval)
  }, [])

   // Buy upgrade with more feedback
   const buyUpgrade = (type: string) => {
     const cost = getUpgradeCost(type)
     if (credits >= cost) {
       playSound('upgrade')
       setCredits(credits - cost)
      
      switch(type) {
        case 'autoClicker':
          setAutoClickers(autoClickers + 1)
          addMessage(`> [INSTALL] Added assembly drone`)
          break
        case 'overclock':
          setUpgrades({...upgrades, overclock: upgrades.overclock + 1})
          addMessage(`> [UPGRADE] CPU overclocked to ${upgrades.overclock + 1}x`)
          break
        case 'bugExploiter':
          setUpgrades({...upgrades, bugExploiter: upgrades.bugExploiter + 1})
          addMessage(`> [UPGRADE] Bug exploitation v${upgrades.bugExploiter + 1}.0`)
          break
        case 'systemPatch':
          setUpgrades({...upgrades, systemPatch: upgrades.systemPatch + 1})
          addMessage(`> [PATCH] System stability +20%`)
          break
        case 'quantumCore':
          setUpgrades({...upgrades, quantumCore: upgrades.quantumCore + 1})
          addMessage(`> [UPGRADE] Quantum core synchronized`)
          break
        case 'neuralNetwork':
          setUpgrades({...upgrades, neuralNetwork: upgrades.neuralNetwork + 1})
          addMessage(`> [UPGRADE] Neural network layer added`)
          break
        case 'singularityDrive':
          setUpgrades({...upgrades, singularityDrive: upgrades.singularityDrive + 1})
          addMessage(`> [UPGRADE] Singularity drive engaged`)
          break
      }
     } else {
       playSound('error')
       addMessage("> [ERROR] Insufficient credits")
     }
  }

  const getUpgradeCost = (type: string) => {
    switch(type) {
      case 'autoClicker': 
        return 10 + (autoClickers * 5)
      case 'overclock':
        return 15 + (upgrades.overclock * 10)
      case 'bugExploiter':
        return 20 + (upgrades.bugExploiter * 15)
      case 'systemPatch':
        return 30 + (upgrades.systemPatch * 20)
      case 'quantumCore':
        return 50 + (upgrades.quantumCore * 30)
      case 'neuralNetwork':
        return 75 + (upgrades.neuralNetwork * 50)
      case 'singularityDrive':
        return 100 + (upgrades.singularityDrive * 75)
      default:
        return 0
    }
  }





  // ASCII art for different factory states with galaxy effects
  const getFactoryArt = () => {
    const animations = [
      [
        "    ╔═════════════════════╗",
        "   ╔╦╗                   ╔╦╗",
        "  ╔╦╦╦╗    ╔═══════╗    ╔╦╦╦╗",
        " ╔╦╦ ╦╦╗  ╔╦═╗ ╔╦═╗  ╔╦╦ ╦╦╗",
        "╔╦╦  ╔╦╦╗ ║ ║ ║ ║ ║ ╔╦╦  ╔╦╦╗",
        "║║   ║ ║║ ║ ║ ║ ║ ║ ║║   ║ ║║",
        "║║   ╚═╦╝ ╚═╦╝ ╚═╦╝ ║║   ╚═╦╝",
        "╚╦═════╩══════╩══════╩═════╦═══╩╝",
        " ╚══════════════════════════════╝"
      ],
      [
        "    ◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯",
        "   ◯╔═════════════════════╗◯",
        "  ◯║  ⚡ FACTORY 404 ⚡  ║◯",
        "   ║  ╔═════════════════╗  ║",
        "   ║  ║ ◯◯◯◯◯◯◯◯◯◯◯ ║  ║",
        "   ║  ║  ⚛ QUANTUM ⚛  ║  ║",
        "   ║  ╚═════════════════╝  ║",
        "   ╚═══════════════════════╝",
        "    ◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯"
      ],
      [
        "    ╭─────────────────────╮",
        "   ╱│                 │╲",
        "  ╱ │    ◈◈◈◈◈◈◈◈    │ ╲",
        " ╱  │   ◈◈ FACTORY ◈◈   │  ╲",
        "╱   │  ◈◈◈ 404 ◈◈◈   │   ╲",
        "│   │ ◈◈◈◈◈◈◈◈◈◈◈◈   │   │",
        "│   │  ◈◈◈◈◈◈◈◈◈◈◈    │   │",
        "╲   │ ◈◈◈◈◈◈◈◈◈◈◈◈   │   ╱",
        " ╲  │                 │  ╱",
        "  ╲───────────────────╱"
      ],
      [
        "    ✦✧✦✧✦✧✦✧✦✧✦✧✦",
        "   ✧╔═════════════════╗✧",
        "  ✦║  ★ FACTORY 404 ★  ║✦",
        "   ║  ╔═════════════╗  ║",
        "   ║  ║ ✦✧✦✧✦✧✦ ║  ║",
        "   ║  ║   ★ GALAXY ★  ║  ║",
        "   ║  ╚═════════════╝  ║",
        "   ╚═══════════════════╝",
        "    ✦✧✦✧✦✧✦✧✦✧✦✧✦"
      ]
    ]

    const baseArt = [...animations[activeAnimation]]
    
    if (corruptionLevel > 0) {
      const corruptionOverlay = [
        "    ⚠═════════════════════⚠",
        "   ⚠╦╔╗                 ╔╦╔⚠",
        "  ⚠╦╦╦╗    ╔═══════╗    ╔╦╦╦⚠",
        " ⚠╦╦ ╦╦╗  ╔╦═╗ ╔╦═╗  ╔╦╦ ╦╦⚠",
        "⚠╦╦  ╔╦╦╗ ║ ☠ ║ ☠ ║ ╔╦╦  ╔╦╦⚠",
        "⚠║   ║ ║║ ║ ☠ ║ ☠ ║ ║║   ║ ║⚠",
        "⚠║   ╚═╦╝ ╚═╦╝ ╚═╦╝ ║║   ╚═╦⚠",
        "⚠╚╦════╩══════╩══════╩════╦═══╩⚠",
        " ⚠╚════════════════════════════╝⚠"
      ]
      return corruptionOverlay
    }
    
    return baseArt
  }



  // Generate animated exponential graph with galaxy effects
  const getGraphArt = () => {
    if (graphData.length < 2) return "> [GRAPH] ◯ Collecting cosmic data ◯"
    
    const maxValue = Math.max(...graphData) || 1
    const height = 8
    const width = 20
    
    const graphLines = []
    const animationFrame = Math.floor(Date.now() / 500) % 4
    const particles = ['◯', '✧', '✦', '⚛']
    
    for (let y = height; y >= 0; y--) {
      let line = "|"
      const threshold = (y / height) * maxValue
      
      for (let x = 0; x < Math.min(width, graphData.length); x++) {
        const value = graphData[graphData.length - 1 - x] || 0
        if (value >= threshold) {
          line += Math.random() > 0.8 ? particles[animationFrame] : "█"
        } else {
          line += Math.random() > 0.95 ? "·" : " "
        }
      }
      
      graphLines.push(line)
    }
    
    graphLines.push("╚" + "═".repeat(Math.min(width, graphData.length)) + "╝")
    graphLines.push(" ◯◯◯ PRODUCTION METRICS ◯◯◯")
    
    return graphLines.join('\n')
  }

  // Scan line effect component
  const ScanLine = () => (
    <div 
      className="absolute left-0 right-0 h-px bg-green-400 opacity-20"
      style={{ top: `${scanLinePos * 5}%` }}
    />
  )

    // Enhanced particle effect component
    const ParticleEffects = () => (
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <div 
            key={i}
            className={`absolute rounded-full transition-all duration-100 ${
              p.type === 'quantum' ? 'bg-purple-400 shadow-purple-400/50' : 
              p.type === 'glitch' ? 'bg-red-400 shadow-red-400/50' : 
              'bg-green-400 shadow-green-400/50'
            }`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: (p.life / 100) * 0.8,
              transform: `scale(${p.life / 50}) rotate(${p.rotation}deg)`,
              boxShadow: `0 0 ${p.size * 2}px currentColor`,
              filter: p.type === 'quantum' ? 'blur(0.5px)' : p.type === 'glitch' ? 'blur(1px)' : 'none'
            }}
          />
        ))}
      </div>
    )

  return (
    <div className={`min-h-screen bg-black text-green-400 font-mono p-1 sm:p-2 md:p-4 overflow-hidden relative ${isGlitching ? 'animate-glitch' : ''} ${theme === 'cyber' ? 'theme-cyber' : theme === 'retro' ? 'theme-retro' : ''} ${partyMode ? 'party-mode-bg' : ''} ${discoMode ? 'animate-disco-fever' : ''}`}>
      {/* Scan line effect */}
      <ScanLine />
      
       {/* Particle effects */}
       {particleEffects && <ParticleEffects />}
       
       {/* Matrix rain effect */}
       {theme === 'matrix' && particleEffects && (
         <div className="fixed inset-0 pointer-events-none z-0">
           {Array.from({length: 20}, (_, i) => (
             <div 
               key={i}
               className="matrix-rain absolute text-green-400 opacity-30"
               style={{
                 left: `${Math.random() * 100}%`,
                 animationDelay: `${Math.random() * 3}s`,
                 animationDuration: `${3 + Math.random() * 2}s`
               }}
             >
               {Array.from({length: 20}, () => String.fromCharCode(33 + Math.floor(Math.random() * 94))).join('')}
             </div>
           ))}
         </div>
       )}
       
       {/* Galaxy particles effect */}
       {particleEffects && (
         <div className="fixed inset-0 pointer-events-none z-0">
           {Array.from({length: 30}, (_, i) => (
             <div 
               key={`galaxy-${i}`}
               className="absolute text-xs opacity-60 animate-pulse"
               style={{
                 left: `${Math.random() * 100}%`,
                 top: `${Math.random() * 100}%`,
                 animationDelay: `${Math.random() * 5}s`,
                 animationDuration: `${2 + Math.random() * 3}s`
               }}
             >
               {['◯', '✧', '✦', '⚛', '◈', '★', '☆'][Math.floor(Math.random() * 7)]}
             </div>
           ))}
         </div>
       )}
       
       {/* Swirling galaxy background */}
       {corruptionLevel > 0 && particleEffects && (
         <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
           <div 
             className="absolute inset-0 text-6xl"
             style={{
               animation: 'galaxy-swirl 20s linear infinite',
               transform: `rotate(${galaxyRotation}deg)`
             }}
           >
             <pre className="text-purple-400">
{`
    ◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯
   ◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯
  ◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯
 ◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯
  ◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯
   ◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯
    ◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯
`}
             </pre>
           </div>
         </div>
       )}
      
        {/* CRT screen effect */}
        <div className="crt-overlay"></div>
        
        {/* Noise overlay */}
        <div className="noise-overlay"></div>
        
        {/* Floating cyber elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {Array.from({length: 6}, (_, i) => (
            <div 
              key={`float-${i}`}
              className="floating-element text-xs opacity-30"
              style={{
                left: `${10 + (i * 15)}%`,
                top: `${20 + (i * 10)}%`,
                animationDelay: `${i * 0.5}s`,
                color: ['#00ff88', '#00d9ff', '#ff006e', '#9d00ff', '#ffea00'][i % 5]
              }}
            >
              {['◯', '✧', '✦', '⚛', '◈', '★'][i]}
            </div>
          ))}
        </div>
      
        {/* Main terminal container */}
        <div className="max-w-7xl mx-auto border-2 border-green-400 neon-border bg-black bg-opacity-90 p-1 sm:p-2 md:p-4 relative cyber-grid animate-float">
         {/* Header with ASCII art */}
         <div className="flex flex-col lg:flex-row gap-2 mb-4">
           <pre className="hidden lg:block text-xs md:text-sm">
             {getFactoryArt().join('\n')}
           </pre>
           <pre className="lg:hidden text-xs">
             {["FACTORY 404", "==============", `v1.${corruptionLevel}.${upgrades.systemPatch}`].join('\n')}
           </pre>
          
           <div className="flex-1 border border-green-800 p-1 sm:p-2 relative overflow-hidden">
             {/* Animated cosmic border effects */}
             <div className="absolute inset-0 pointer-events-none">
               <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
               <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
               <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse"></div>
               <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse"></div>
             </div>
             
             {/* Flashing cursor animation */}
             <div className="absolute right-2 top-2 w-2 h-4 bg-green-400 animate-pulse"></div>
             
              <pre className="text-xs sm:text-sm relative z-10 neon-glow holographic">
{`╔══════════════════════════════════════╗
  ║ ◯ EPIC FACTORY 404 v${epicLevel}.${corruptionLevel}.${upgrades.systemPatch} ◯ ║
  ╠══════════════════════════════════════╣
  ║ ⚡ CLICKS: ${clicks.toString().padStart(6)} │ 💰 CREDITS: ${credits.toString().padStart(6)} ║
  ║ 📦 ITEMS: ${items.length.toString().padStart(7)} │ ❤️  HEALTH: [${'█'.repeat(Math.floor(factoryHealth/10))}${'░'.repeat(10 - Math.floor(factoryHealth/10))}] ║
  ║ ☠️  CORRUPTION: ${corruptionLevel}/3 │ 🤖 AUTOMATION: ${autoClickers} ║
  ║ 🔥 COMBO: ×${megaCombo} │ 🏆 LEVEL: ${epicLevel} │ 🎯 RANK: ${tournamentRank} ║
  ╚══════════════════════════════════════╝`}
              </pre>
           </div>
        </div>
        
         {/* Main content area */}
         <div className="grid grid-cols-1 xl:grid-cols-3 gap-2 lg:gap-4">
           {/* Terminal output */}
           <div className="xl:col-span-2 border border-green-800 p-1 sm:p-2 h-48 sm:h-64 lg:h-64 overflow-y-auto relative">
             {/* Animated cursor at bottom */}
             <div className="absolute bottom-2 left-2 w-2 h-4 bg-green-400 animate-pulse"></div>
             
             <div className="text-xs sm:text-sm font-mono">
               {messages.map((msg, i) => (
                 <div key={i} className={msg.includes('ERROR') ? 'text-red-400' : 
                                        msg.includes('WARNING') ? 'text-yellow-400' : 
                                        msg.includes('ALERT') ? 'text-red-500' : 
                                        'text-green-400'}>
                   {msg}
                 </div>
               ))}
             </div>
             
             {/* Terminal input */}
             <form onSubmit={handleTerminalSubmit} className="mt-2 flex items-center">
               <span className="text-green-400 mr-1 sm:mr-2">&gt;</span>
               <input
                 type="text"
                 value={terminalInput}
                 onChange={(e) => setTerminalInput(e.target.value)}
                 className="flex-1 bg-black text-green-400 border-b border-green-800 focus:outline-none caret-green-400 text-xs sm:text-sm"
                 placeholder="Type commands..."
               />
               <button 
                 type="submit" 
                 className="ml-1 sm:ml-2 px-1 sm:px-2 border border-green-400 hover:bg-green-400 hover:text-black text-xs"
               >
                 [ENTER]
               </button>
             </form>
           </div>
          
           {/* Control panel */}
           <div className="border border-green-800 p-1 sm:p-2">
             <div className="flex flex-col h-full">
                {/* Main button */}
                  <button 
                    onClick={handleClick}
                    className={`cyber-button neon-border px-2 py-2 sm:px-4 sm:py-3 mb-2 sm:mb-4 text-sm sm:text-lg transition-all duration-300 transform flex items-center justify-center relative overflow-hidden group neon-glow hyper-interactive ${
                      factoryHealth <= 0 
                        ? 'border-gray-600 text-gray-600 cursor-not-allowed' 
                        : isLoading
                        ? 'border-yellow-400 text-yellow-400 animate-pulse animate-rainbow-explosion'
                        : 'border-green-400 text-green-400 hover-glow party-button'
                    } ${megaCombo >= 10 ? 'animate-super-glow' : ''} ${partyMode ? 'animate-disco-fever' : ''}`}
                    disabled={factoryHealth <= 0 || isLoading}
                  >
                  {/* Enhanced button animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
                  <div className="absolute inset-0 bg-green-400 opacity-10 group-hover:opacity-30 transition-all duration-300"></div>
                  <span className="text-xs mr-1 sm:mr-2 relative z-10 transition-colors duration-300">
                    {isLoading ? '[⚡]' : '[RUN]'}
                  </span> 
                  <span className="hidden sm:inline relative z-10 transition-colors duration-300">
                    {isLoading ? 'PROCESSING...' : 'ASSEMBLE ITEM'}
                  </span>
                  <span className="sm:hidden relative z-10 transition-colors duration-300">
                    {isLoading ? '⚡' : 'ASSEMBLE'}
                  </span>
                   <span className="text-xs ml-1 sm:ml-2 relative z-10 transition-colors duration-300 animate-pulse text-yellow-400">
                     ×{Math.min(megaCombo, 10)} {1 + (upgrades.overclock * 2) + (upgrades.neuralNetwork * 5)}x
                   </span>
                </button>
              
               {/* Upgrades */}
               <div className="border-t border-green-800 pt-1 sm:pt-2 flex-1 overflow-y-auto">
                 <h3 className="text-center mb-1 sm:mb-2 text-xs sm:text-sm">[ UPGRADES ]</h3>
                 
                  <div className="space-y-1 sm:space-y-2 text-xs">
                    <button 
                      onClick={() => buyUpgrade('autoClicker')}
                      className={`cyber-button ${credits >= getUpgradeCost('autoClicker') ? 'border-green-400 text-green-400 hover-glow neon-glow' : 'border-gray-600 text-gray-600'} p-1 flex justify-between relative transition-all duration-300 transform hover:scale-105`}
                      disabled={credits < getUpgradeCost('autoClicker')}
                    >
                      <span className="relative z-10">🤖 ASSEMBLY DRONE</span>
                      <span className="text-xs relative z-10">{'▮'.repeat(10 + (autoClickers * 5))}</span>
                      {credits >= getUpgradeCost('autoClicker') && (
                        <span className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-transparent opacity-0 group-hover:opacity-30 transition-all duration-300"></span>
                      )}
                   </button>
                  
                   <button 
                     onClick={() => buyUpgrade('overclock')}
                     className={`w-full border ${credits >= getUpgradeCost('overclock') ? 'border-green-400 hover:bg-green-400' : 'border-gray-600'} p-1 hover:text-black flex justify-between relative transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-400/25 group`}
                     disabled={credits < getUpgradeCost('overclock')}
                   >
                     <span className="group-hover:text-black transition-colors duration-300">OVERCLOCK CPU</span>
                     <span className="text-xs group-hover:text-black transition-colors duration-300">{'▮'.repeat(15 + (upgrades.overclock * 10))}</span>
                     {credits >= getUpgradeCost('overclock') && (
                       <span className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-transparent opacity-0 group-hover:opacity-30 transition-all duration-300"></span>
                     )}
                   </button>
                  
                   <button 
                     onClick={() => buyUpgrade('bugExploiter')}
                     className={`w-full border ${credits >= getUpgradeCost('bugExploiter') ? 'border-green-400 hover:bg-green-400' : 'border-gray-600'} p-1 hover:text-black flex justify-between relative transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-400/25 group`}
                     disabled={credits < getUpgradeCost('bugExploiter')}
                   >
                     <span className="group-hover:text-black transition-colors duration-300">BUG EXPLOITER</span>
                     <span className="text-xs group-hover:text-black transition-colors duration-300">{'▮'.repeat(20 + (upgrades.bugExploiter * 15))}</span>
                     {credits >= getUpgradeCost('bugExploiter') && (
                       <span className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-transparent opacity-0 group-hover:opacity-30 transition-all duration-300"></span>
                     )}
                   </button>
                  
                   <button 
                     onClick={() => buyUpgrade('systemPatch')}
                     className={`w-full border ${credits >= getUpgradeCost('systemPatch') ? 'border-green-400 hover:bg-green-400' : 'border-gray-600'} p-1 hover:text-black flex justify-between relative transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-400/25 group`}
                     disabled={credits < getUpgradeCost('systemPatch')}
                   >
                     <span className="group-hover:text-black transition-colors duration-300">SYSTEM PATCH</span>
                     <span className="text-xs group-hover:text-black transition-colors duration-300">{'▮'.repeat(30 + (upgrades.systemPatch * 20))}</span>
                     {credits >= getUpgradeCost('systemPatch') && (
                       <span className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-transparent opacity-0 group-hover:opacity-30 transition-all duration-300"></span>
                     )}
                   </button>
                  
                  {corruptionLevel > 0 && (
                    <button 
                      onClick={() => buyUpgrade('quantumCore')}
                      className={`w-full border ${credits >= getUpgradeCost('quantumCore') ? 'border-purple-400 hover:bg-purple-400' : 'border-gray-600'} p-1 hover:text-black flex justify-between relative`}
                      disabled={credits < getUpgradeCost('quantumCore')}
                    >
                      <span>QUANTUM CORE</span>
                      <span>{'▮'.repeat(50 + (upgrades.quantumCore * 30))}</span>
                      {credits >= getUpgradeCost('quantumCore') && (
                        <span className="absolute left-0 top-0 h-full bg-purple-400 opacity-10 hover:opacity-20"></span>
                      )}
                    </button>
                  )}
                  
                  {corruptionLevel > 1 && (
                    <button 
                      onClick={() => buyUpgrade('neuralNetwork')}
                      className={`w-full border ${credits >= getUpgradeCost('neuralNetwork') ? 'border-blue-400 hover:bg-blue-400' : 'border-gray-600'} p-1 hover:text-black flex justify-between relative`}
                      disabled={credits < getUpgradeCost('neuralNetwork')}
                    >
                      <span>NEURAL NETWORK</span>
                      <span>{'▮'.repeat(75 + (upgrades.neuralNetwork * 50))}</span>
                      {credits >= getUpgradeCost('neuralNetwork') && (
                        <span className="absolute left-0 top-0 h-full bg-blue-400 opacity-10 hover:opacity-20"></span>
                      )}
                    </button>
                  )}
                  
                  {corruptionLevel > 2 && (
                    <button 
                      onClick={() => buyUpgrade('singularityDrive')}
                      className={`w-full border ${credits >= getUpgradeCost('singularityDrive') ? 'border-red-400 hover:bg-red-400' : 'border-gray-600'} p-1 hover:text-black flex justify-between relative`}
                      disabled={credits < getUpgradeCost('singularityDrive')}
                    >
                      <span>SINGULARITY DRIVE</span>
                      <span>{'▮'.repeat(100 + (upgrades.singularityDrive * 75))}</span>
                      {credits >= getUpgradeCost('singularityDrive') && (
                        <span className="absolute left-0 top-0 h-full bg-red-400 opacity-10 hover:opacity-20"></span>
                      )}
                    </button>
                  )}
                </div>
                
                {clicks >= 100 && corruptionLevel < 3 && (
                  <button 
                    onClick={rebootFactory}
                    className="w-full border border-red-400 text-red-400 p-1 mt-4 text-xs hover:bg-red-400 hover:text-black relative overflow-hidden"
                  >
                    <span className="relative z-10">[ REBOOT FOR CORRUPTION MODE ]</span>
                    <span className="absolute inset-0 bg-red-400 opacity-10 hover:opacity-20"></span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
         {/* Boss Battle UI */}
         {bossBattle && (
           <div className="mt-4 border border-red-400 p-2 bg-red-900 bg-opacity-20 animate-system-overload">
             <div className="flex justify-between items-center mb-2">
               <h3 className="text-sm text-red-400 animate-rainbow-glow">[🐉 BOSS BATTLE 🐉]</h3>
               <span className="text-xs text-red-400">Health: {bossHealth}/1000</span>
             </div>
             <div className="w-full bg-gray-800 rounded-full h-4 mb-2">
               <div 
                 className="bg-gradient-to-r from-red-400 to-red-600 h-4 rounded-full transition-all duration-300 animate-electric-arc"
                 style={{ width: `${(bossHealth / 1000) * 100}%` }}
               />
             </div>
             <button 
               onClick={attackBoss}
               className="w-full border border-red-400 text-red-400 p-2 hover:bg-red-400 hover:text-black cyber-button animate-pulse"
             >
               ⚔️ [ATTACK] - DEAL DAMAGE
             </button>
           </div>
         )}

         {/* Tournament Status */}
         {tournament && (
           <div className="mt-4 border border-yellow-400 p-2 bg-yellow-900 bg-opacity-20">
             <div className="flex justify-between items-center mb-2">
               <h3 className="text-sm text-yellow-400">[🏆 GALACTIC TOURNAMENT 🏆]</h3>
               <span className="text-xs text-yellow-400">Rank: {tournamentRank}</span>
             </div>
             <div className="text-xs text-yellow-300">
               Double credits active! Climb the leaderboard!
             </div>
           </div>
         )}

          {/* Special Abilities */}
          {(specialAbilities.timeWarp || specialAbilities.matterDuplicator || specialAbilities.realityHack || powerUps.rainbowBlast || powerUps.multiplierX10 || powerUps.particleStorm) && (
            <div className="mt-4 border border-purple-400 p-2 bg-purple-900 bg-opacity-20 animate-neon-pulse-party">
              <h3 className="text-sm text-purple-400 mb-2 disco-text">[✨ SPECIAL POWERS ✨]</h3>
              <div className="flex flex-wrap gap-2">
                {specialAbilities.timeWarp && (
                  <span className="text-xs border border-purple-400 px-2 py-1 animate-super-glow">⏰ Time Warp</span>
                )}
                {specialAbilities.matterDuplicator && (
                  <span className="text-xs border border-purple-400 px-2 py-1 animate-super-glow">🔄 Matter Duplicator</span>
                )}
                {specialAbilities.realityHack && (
                  <span className="text-xs border border-purple-400 px-2 py-1 animate-super-glow">🌌 Reality Hack</span>
                )}
                {powerUps.rainbowBlast && (
                  <span className="text-xs border border-pink-400 px-2 py-1 animate-rainbow-glow disco-text">🌈 Rainbow Blast</span>
                )}
                {powerUps.multiplierX10 && (
                  <span className="text-xs border border-yellow-400 px-2 py-1 animate-super-glow party-text">×10 Multiplier</span>
                )}
                {powerUps.particleStorm && (
                  <span className="text-xs border border-cyan-400 px-2 py-1 animate-quantum-particle">🌪️ Particle Storm</span>
                )}
              </div>
            </div>
          )}

          {/* Power-up buttons */}
          <div className="mt-4 border border-green-800 p-2">
            <h3 className="text-sm mb-2">[🎁 INSTANT POWER-UPS 🎁]</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button 
                onClick={() => {playSound('powerup'); setCredits(prev => prev - 25); addMessage("> 🌈 Rainbow Blast purchased!"); setTimeout(() => createParticleExplosion(), 100);}}
                className="px-2 py-1 text-xs border border-pink-400 hover:bg-pink-400 hover:text-black party-button hyper-interactive"
                disabled={credits < 25}
              >
                🌈 Rainbow (25💰)
              </button>
              <button 
                onClick={() => {playSound('powerup'); setCredits(prev => prev - 20); setMegaCombo(prev => prev + 5); addMessage("> ⚡ Speed Boost activated!");}}
                className="px-2 py-1 text-xs border border-yellow-400 hover:bg-yellow-400 hover:text-black animate-super-glow hyper-interactive"
                disabled={credits < 20}
              >
                ⚡ Speed (20💰)
              </button>
              <button 
                onClick={() => {playSound('quantum'); setCredits(prev => prev - 30); setAutoClickers(prev => prev + 1); addMessage("> 🤖 Auto-clicker added!");}}
                className="px-2 py-1 text-xs border border-purple-400 hover:bg-purple-400 hover:text-black animate-quantum-particle hyper-interactive"
                disabled={credits < 30}
              >
                🤖 Drone (30💰)
              </button>
              <button 
                onClick={() => {playSound('explosion'); setCredits(prev => prev - 15); setClicks(prev => prev + 25); addMessage("> 💥 Click explosion!"); setTimeout(() => createParticleExplosion(), 50);}}
                className="px-2 py-1 text-xs border border-red-400 hover:bg-red-400 hover:text-black animate-cosmic-explosion hyper-interactive"
                disabled={credits < 15}
              >
                💥 Clicks (15💰)
              </button>
            </div>
          </div>

         {/* Alien Invasion Alert */}
         {alienInvasion && (
           <div className="mt-4 border border-orange-400 p-2 bg-orange-900 bg-opacity-20 animate-rainbow-glow">
             <h3 className="text-sm text-orange-400">[👽 ALIEN INVASION DETECTED 👽]</h3>
             <div className="text-xs text-orange-300">
               Hostile forces approaching! Defend the factory!
             </div>
           </div>
         )}

         {/* Space Battle Status */}
         {spaceBattle && (
           <div className="mt-4 border border-blue-400 p-2 bg-blue-900 bg-opacity-20 animate-electric-arc">
             <h3 className="text-sm text-blue-400">[🚀 SPACE BATTLE ACTIVE 🚀]</h3>
             <div className="text-xs text-blue-300">
               Engaging enemy forces! Combat bonuses active!
             </div>
           </div>
         )}

         {/* Inventory with ASCII styling */}
         <div className="mt-4 border border-green-800 p-2">
           <div className="flex justify-between items-center mb-2">
             <h3 className="text-sm">[ ITEM INVENTORY ]</h3>
             <span className="text-xs">Capacity: {items.length}/1000</span>
           </div>
          <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
            {items.length > 0 ? (
              items.map((item, i) => (
                <span 
                  key={i} 
                  className={`text-xs border px-1 ${item.includes('CORRUPT') ? 'border-red-400 text-red-400' : 'border-green-400'}`}
                >
                  {item}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-xs">No items produced yet</span>
            )}
          </div>
        </div>
        
        {/* Production graph */}
        {graphData.length > 1 && (
          <div className="mt-4 border border-green-800 p-2">
            <h3 className="text-sm mb-2">[ PRODUCTION METRICS ]</h3>
            <pre className="text-xs">
              {getGraphArt()}
            </pre>
          </div>
        )}
        
         {/* Navigation bar */}
         <div className="mt-2 sm:mt-4 border border-green-800 p-1 sm:p-2">
           <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
             <button 
               onClick={() => setShowSettings(true)}
               className="px-1 sm:px-2 py-1 text-xs border border-green-400 hover:bg-green-400 hover:text-black"
             >
               [SET]
             </button>
             <button 
               onClick={() => setShowStats(true)}
               className="px-1 sm:px-2 py-1 text-xs border border-green-400 hover:bg-green-400 hover:text-black"
             >
               [STAT]
             </button>
             <button 
               onClick={() => setShowAchievements(true)}
               className="px-1 sm:px-2 py-1 text-xs border border-green-400 hover:bg-green-400 hover:text-black"
             >
               [ACH]
             </button>
             <button 
               onClick={() => setShowShop(true)}
               className="px-1 sm:px-2 py-1 text-xs border border-green-400 hover:bg-green-400 hover:text-black"
             >
               [SHOP]
             </button>
              <button 
                onClick={() => setShowResearch(true)}
                className="px-1 sm:px-2 py-1 text-xs border border-green-400 hover:bg-green-400 hover:text-black"
              >
                [RES]
              </button>
               <button 
                 onClick={startHackGame}
                 className="px-1 sm:px-2 py-1 text-xs border border-purple-400 hover:bg-purple-400 hover:text-black animate-pulse hyper-interactive"
               >
                 [HACK]
               </button>
               <button 
                 onClick={() => {addMessage("> 🎉 [PARTY] Let's get this party started!"); playSound('party'); setTimeout(() => createParticleExplosion(), 300);}}
                 className="px-1 sm:px-2 py-1 text-xs border border-pink-400 hover:bg-pink-400 hover:text-black party-button"
               >
                 [PARTY]
               </button>
               <button 
                 onClick={() => {addMessage("> 🌈 [RAINBOW] Rainbow power unleashed!"); playSound('powerup'); setTimeout(() => createParticleExplosion(), 200);}}
                 className="px-1 sm:px-2 py-1 text-xs border border-cyan-400 hover:bg-cyan-400 hover:text-black animate-rainbow-glow"
               >
                 [RAINBOW]
               </button>
               <button 
                 onClick={() => {addMessage("> ⚛️ [QUANTUM] Quantum fluctuation!"); playSound('quantum'); setMegaCombo(prev => prev + 5);}}
                 className="px-1 sm:px-2 py-1 text-xs border border-purple-400 hover:bg-purple-400 hover:text-black animate-quantum-particle"
               >
                 [QUANTUM]
               </button>
           </div>
         </div>
         
          {/* Footer with credits and sound indicator */}
          <div className="mt-4 text-xs text-center text-green-600">
            {/* Sound indicator */}
            {lastAction && (
              <div className="mb-2 animate-pulse">
                <span className="text-green-400">🔊 {lastAction.toUpperCase()}</span>
              </div>
            )}
            <p>CREATED BY RAFI ADNAN</p>
            <a 
              href="https://rafiadnan.my.id/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-green-400 underline"
            >
              https://rafiadnan.my.id/
            </a>
          </div>
        
         {/* Help modal */}
         {showHelp && (
           <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-10 animate-fade-in">
             <div className="bg-black border-2 border-green-400 p-4 max-w-2xl relative animate-slide-up">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg">[ FACTORY 404 HELP ]</h3>
                <button 
                  onClick={() => setShowHelp(false)}
                  className="border border-green-400 px-2 hover:bg-green-400 hover:text-black"
                >
                  X
                </button>
              </div>
              
              <div className="text-sm space-y-2">
                <p><strong>CLICK BUTTON:</strong> Assemble items and earn credits</p>
                <p><strong>UPGRADES:</strong> Improve your factorys capabilities</p>
                <p><strong>TERMINAL COMMANDS:</strong></p>
                 <ul className="list-disc pl-5 space-y-1">
                   <li><strong>help</strong> - Show this help</li>
                   <li><strong>status</strong> - Show factory status</li>
                   <li><strong>inventory</strong> - Show recent items</li>
                   <li><strong>clear</strong> - Clear terminal</li>
                   <li><strong>reboot</strong> - Enable corruption mode (after 100 clicks)</li>
                   <li><strong>graph</strong> - Show production metrics</li>
                   <li><strong>settings</strong> - Open settings menu</li>
                   <li><strong>stats</strong> - View detailed statistics</li>
                   <li><strong>achievements</strong> - View achievements</li>
                   <li><strong>shop</strong> - Open shop</li>
                   <li><strong>research</strong> - Open research lab</li>
                   <li><strong>save</strong> - Save game progress</li>
                   <li><strong>load</strong> - Load saved game</li>
                   <li><strong>reset</strong> - Reset all progress</li>
                 </ul>
                <p className="mt-2 text-yellow-400">WARNING: Corruption mode increases rewards but adds instability!</p>
              </div>
              
              {/* Modal scan line */}
              <div className="absolute left-0 right-0 h-px bg-green-400 opacity-20 animate-scan"></div>
            </div>
          </div>
        )}
        
         {/* Lore modal */}
         {showLore && (
           <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-20 animate-fade-in">
             <div className="bg-black border-2 border-green-400 p-4 max-w-2xl relative animate-slide-up">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg">[ FACTORY 404 - SYSTEM BOOT ]</h3>
                <button 
                  onClick={() => setShowLore(false)}
                  className="border border-green-400 px-2 hover:bg-green-400 hover:text-black"
                >
                  CONTINUE
                </button>
              </div>
              
              <div className="text-sm space-y-4">
                <p>YEAR 2042 - QUANTUM COMPUTING ERA</p>
                <p>You have been assigned to manage FACTORY 404, an experimental quantum manufacturing facility.</p>
                <p>Your mission: Produce components for the first artificial superintelligence.</p>
                <p>But beware - the quantum cores are unstable. Pushing them too hard may unlock incredible power...</p>
                <p>...or tear reality apart.</p>
                <p className="text-yellow-400">[INSTRUCTIONS]</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Click the ASSEMBLE button to produce components</li>
                  <li>Earn credits to purchase upgrades</li>
                  <li>Type commands in the terminal for advanced control</li>
                  <li>Reboot when ready to unlock quantum corruption modes</li>
                </ul>
              </div>
              
              <div className="mt-4 text-xs text-green-600">
                <p>CREATED BY RAFI ADNAN</p>
                <p>https://rafiadnan.my.id/</p>
              </div>
              
              {/* Modal scan line */}
              <div className="absolute left-0 right-0 h-px bg-green-400 opacity-20 animate-scan"></div>
            </div>
          </div>
        )}
        
          {/* Settings modal */}
          {showSettings && (
            <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-20 animate-fade-in">
              <div className="bg-black border-2 border-green-400 p-4 max-w-md relative overflow-hidden animate-slide-up">
               {/* Animated cosmic background */}
               <div className="absolute inset-0 opacity-10">
                 <div className="absolute inset-0 animate-pulse">
                   <pre className="text-green-400 text-xs">
{`◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯
◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯
◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯`}
                   </pre>
                 </div>
               </div>
               
               <div className="relative z-10">
                 <div className="flex justify-between items-center mb-4">
                   <h3 className="text-lg">[ ◯ SETTINGS ◯ ]</h3>
                   <button 
                     onClick={() => setShowSettings(false)}
                     className="border border-green-400 px-2 hover:bg-green-400 hover:text-black"
                   >
                     ✕
                   </button>
                 </div>
               
               <div className="text-sm space-y-3">
                 <div className="flex justify-between items-center">
                   <span>◯ Sound Effects</span>
                   <button 
                     onClick={() => setSoundEnabled(!soundEnabled)}
                     className={`px-2 py-1 border ${soundEnabled ? 'border-green-400' : 'border-gray-600'}`}
                   >
                     {soundEnabled ? '✧ ON' : '✧ OFF'}
                   </button>
                 </div>
                 <div className="flex justify-between items-center">
                   <span>✦ Particle Effects</span>
                   <button 
                     onClick={() => setParticleEffects(!particleEffects)}
                     className={`px-2 py-1 border ${particleEffects ? 'border-green-400' : 'border-gray-600'}`}
                   >
                     {particleEffects ? '✦ ON' : '✦ OFF'}
                   </button>
                 </div>
                 <div className="flex justify-between items-center">
                   <span>⚛ Auto Save</span>
                   <button 
                     onClick={() => setAutoSave(!autoSave)}
                     className={`px-2 py-1 border ${autoSave ? 'border-green-400' : 'border-gray-600'}`}
                   >
                     {autoSave ? '⚛ ON' : '⚛ OFF'}
                   </button>
                 </div>
                 <div className="flex justify-between items-center">
                   <span>◈ Theme</span>
                   <select 
                     value={theme} 
                     onChange={(e) => setTheme(e.target.value as 'matrix' | 'cyber' | 'retro')}
                     className="bg-black border border-green-400 text-green-400 px-2"
                   >
                     <option value="matrix">◯ Matrix</option>
                     <option value="cyber">✧ Cyber</option>
                     <option value="retro">⚛ Retro</option>
                   </select>
                 </div>
               </div>
               
               <div className="absolute left-0 right-0 h-px bg-green-400 opacity-20 animate-scan"></div>
               </div>
             </div>
           </div>
         )}
         
          {/* Stats modal */}
          {showStats && (
            <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-20 animate-fade-in">
              <div className="bg-black border-2 border-blue-400 p-4 max-w-md relative animate-slide-up">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg">[ STATISTICS ]</h3>
                 <button 
                   onClick={() => setShowStats(false)}
                   className="border border-blue-400 px-2 hover:bg-blue-400 hover:text-black"
                 >
                   X
                 </button>
               </div>
               
               <div className="text-sm space-y-2">
                 <div className="flex justify-between">
                   <span>Total Clicks:</span>
                   <span className="text-blue-400">{stats.totalClicks}</span>
                 </div>
                 <div className="flex justify-between">
                   <span>Total Items:</span>
                   <span className="text-blue-400">{stats.totalItems}</span>
                 </div>
                 <div className="flex justify-between">
                   <span>Total Credits:</span>
                   <span className="text-blue-400">{stats.totalCredits}</span>
                 </div>
                 <div className="flex justify-between">
                   <span>Play Time:</span>
                   <span className="text-blue-400">{Math.floor(stats.playTime / 60)}m {stats.playTime % 60}s</span>
                 </div>
                 <div className="flex justify-between">
                   <span>Highest Corruption:</span>
                   <span className="text-blue-400">{stats.highestCorruption}/3</span>
                 </div>
                 <div className="flex justify-between">
                   <span>Items/Second:</span>
                   <span className="text-blue-400">{stats.itemsPerSecond.toFixed(1)}</span>
                 </div>
                 <div className="flex justify-between">
                   <span>Credits/Second:</span>
                   <span className="text-blue-400">{stats.creditsPerSecond.toFixed(1)}</span>
                 </div>
               </div>
               
               <div className="absolute left-0 right-0 h-px bg-blue-400 opacity-20 animate-scan"></div>
             </div>
           </div>
         )}
         
          {/* Achievements modal */}
          {showAchievements && (
            <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-20 animate-fade-in">
              <div className="bg-black border-2 border-yellow-400 p-4 max-w-md relative animate-slide-up">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg">[ ACHIEVEMENTS ]</h3>
                 <button 
                   onClick={() => setShowAchievements(false)}
                   className="border border-yellow-400 px-2 hover:bg-yellow-400 hover:text-black"
                 >
                   X
                 </button>
               </div>
               
               <div className="text-sm space-y-2">
                 <div className={`flex justify-between ${achievements.firstItem ? 'text-yellow-400' : 'text-gray-600'}`}>
                   <span>First Item</span>
                   <span>{achievements.firstItem ? '✓' : '✗'}</span>
                 </div>
                 <div className={`flex justify-between ${achievements.hundredClicks ? 'text-yellow-400' : 'text-gray-600'}`}>
                   <span>100 Clicks</span>
                   <span>{achievements.hundredClicks ? '✓' : '✗'}</span>
                 </div>
                 <div className={`flex justify-between ${achievements.thousandClicks ? 'text-yellow-400' : 'text-gray-600'}`}>
                   <span>1000 Clicks</span>
                   <span>{achievements.thousandClicks ? '✓' : '✗'}</span>
                 </div>
                 <div className={`flex justify-between ${achievements.masterBuilder ? 'text-yellow-400' : 'text-gray-600'}`}>
                   <span>Master Builder (500 items)</span>
                   <span>{achievements.masterBuilder ? '✓' : '✗'}</span>
                 </div>
                 <div className={`flex justify-between ${achievements.quantumEngineer ? 'text-yellow-400' : 'text-gray-600'}`}>
                   <span>Quantum Engineer</span>
                   <span>{achievements.quantumEngineer ? '✓' : '✗'}</span>
                 </div>
                 <div className={`flex justify-between ${achievements.singularityAchieved ? 'text-yellow-400' : 'text-gray-600'}`}>
                   <span>Singularity Achieved</span>
                   <span>{achievements.singularityAchieved ? '✓' : '✗'}</span>
                 </div>
                 <div className={`flex justify-between ${achievements.efficiencyExpert ? 'text-yellow-400' : 'text-gray-600'}`}>
                   <span>Efficiency Expert</span>
                   <span>{achievements.efficiencyExpert ? '✓' : '✗'}</span>
                 </div>
                 <div className={`flex justify-between ${achievements.corruptionMaster ? 'text-yellow-400' : 'text-gray-600'}`}>
                   <span>Corruption Master</span>
                   <span>{achievements.corruptionMaster ? '✓' : '✗'}</span>
                 </div>
               </div>
               
               <div className="absolute left-0 right-0 h-px bg-yellow-400 opacity-20 animate-scan"></div>
             </div>
           </div>
         )}
         
          {/* Shop modal */}
          {showShop && (
            <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-20 animate-fade-in">
              <div className="bg-black border-2 border-purple-400 p-4 max-w-md relative animate-slide-up">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg">[ SHOP ]</h3>
                 <button 
                   onClick={() => setShowShop(false)}
                   className="border border-purple-400 px-2 hover:bg-purple-400 hover:text-black"
                 >
                   X
                 </button>
               </div>
               
               <div className="text-sm space-y-2">
                 <div className="flex justify-between items-center">
                   <span>Instant Credits (100)</span>
                   <button 
                     onClick={() => {
                       if (credits >= 50) {
                         setCredits(credits - 50)
                         setCredits(prev => prev + 100)
                       }
                     }}
                     className={`px-2 py-1 border ${credits >= 50 ? 'border-purple-400 hover:bg-purple-400' : 'border-gray-600'}`}
                   >
                     50 credits
                   </button>
                 </div>
                 <div className="flex justify-between items-center">
                   <span>Health Boost (+25)</span>
                   <button 
                     onClick={() => {
                       if (credits >= 30) {
                         setCredits(credits - 30)
                         setFactoryHealth(prev => Math.min(100, prev + 25))
                       }
                     }}
                     className={`px-2 py-1 border ${credits >= 30 ? 'border-purple-400 hover:bg-purple-400' : 'border-gray-600'}`}
                   >
                     30 credits
                   </button>
                 </div>
                 <div className="flex justify-between items-center">
                   <span>Item Bundle (50 items)</span>
                   <button 
                     onClick={() => {
                       if (credits >= 75) {
                         setCredits(credits - 75)
                          const newItems: string[] = []
                          for (let i = 0; i < 50; i++) {
                            newItems.push(generateItem(false))
}
                         setItems(prev => [...prev, ...newItems])
                       }
                     }}
                     className={`px-2 py-1 border ${credits >= 75 ? 'border-purple-400 hover:bg-purple-400' : 'border-gray-600'}`}
                   >
                     75 credits
                   </button>
                 </div>
               </div>
               
               <div className="absolute left-0 right-0 h-px bg-purple-400 opacity-20 animate-scan"></div>
             </div>
           </div>
         )}
         
          {/* Research modal */}
          {showResearch && (
            <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-20 animate-fade-in">
              <div className="bg-black border-2 border-cyan-400 p-4 max-w-md relative animate-slide-up">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg">[ RESEARCH LAB ]</h3>
                 <button 
                   onClick={() => setShowResearch(false)}
                   className="border border-cyan-400 px-2 hover:bg-cyan-400 hover:text-black"
                 >
                   X
                 </button>
               </div>
               
               <div className="text-sm space-y-2">
                 <div className="flex justify-between items-center">
                   <span>Nanotechnology Lv.{research.nanotechnology}</span>
                   <button 
                     onClick={() => {
                       const cost = 100 + (research.nanotechnology * 50)
                       if (credits >= cost) {
                         setCredits(credits - cost)
                         setResearch(prev => ({...prev, nanotechnology: prev.nanotechnology + 1}))
                       }
                     }}
                     className={`px-2 py-1 border ${credits >= 100 + (research.nanotechnology * 50) ? 'border-cyan-400 hover:bg-cyan-400' : 'border-gray-600'}`}
                   >
                     {100 + (research.nanotechnology * 50)} credits
                   </button>
                 </div>
                 <div className="flex justify-between items-center">
                   <span>Quantum Computing Lv.{research.quantumComputing}</span>
                   <button 
                     onClick={() => {
                       const cost = 150 + (research.quantumComputing * 75)
                       if (credits >= cost) {
                         setCredits(credits - cost)
                         setResearch(prev => ({...prev, quantumComputing: prev.quantumComputing + 1}))
                       }
                     }}
                     className={`px-2 py-1 border ${credits >= 150 + (research.quantumComputing * 75) ? 'border-cyan-400 hover:bg-cyan-400' : 'border-gray-600'}`}
                   >
                     {150 + (research.quantumComputing * 75)} credits
                   </button>
                 </div>
                 <div className="flex justify-between items-center">
                   <span>Artificial Intelligence Lv.{research.artificialIntelligence}</span>
                   <button 
                     onClick={() => {
                       const cost = 200 + (research.artificialIntelligence * 100)
                       if (credits >= cost) {
                         setCredits(credits - cost)
                         setResearch(prev => ({...prev, artificialIntelligence: prev.artificialIntelligence + 1}))
                       }
                     }}
                     className={`px-2 py-1 border ${credits >= 200 + (research.artificialIntelligence * 100) ? 'border-cyan-400 hover:bg-cyan-400' : 'border-gray-600'}`}
                   >
                     {200 + (research.artificialIntelligence * 100)} credits
                   </button>
                 </div>
                 <div className="flex justify-between items-center">
                   <span>Dark Matter Lv.{research.darkMatter}</span>
                   <button 
                     onClick={() => {
                       const cost = 300 + (research.darkMatter * 150)
                       if (credits >= cost && corruptionLevel > 0) {
                         setCredits(credits - cost)
                         setResearch(prev => ({...prev, darkMatter: prev.darkMatter + 1}))
                       }
                     }}
                     className={`px-2 py-1 border ${credits >= 300 + (research.darkMatter * 150) && corruptionLevel > 0 ? 'border-cyan-400 hover:bg-cyan-400' : 'border-gray-600'}`}
                     disabled={corruptionLevel === 0}
                   >
                     {300 + (research.darkMatter * 150)} credits
                   </button>
                 </div>
                 <div className="flex justify-between items-center">
                   <span>Time Manipulation Lv.{research.timeManipulation}</span>
                   <button 
                     onClick={() => {
                       const cost = 500 + (research.timeManipulation * 250)
                       if (credits >= cost && corruptionLevel > 1) {
                         setCredits(credits - cost)
                         setResearch(prev => ({...prev, timeManipulation: prev.timeManipulation + 1}))
                       }
                     }}
                     className={`px-2 py-1 border ${credits >= 500 + (research.timeManipulation * 250) && corruptionLevel > 1 ? 'border-cyan-400 hover:bg-cyan-400' : 'border-gray-600'}`}
                     disabled={corruptionLevel <= 1}
                   >
                     {500 + (research.timeManipulation * 250)} credits
                   </button>
                 </div>
               </div>
               
               <div className="absolute left-0 right-0 h-px bg-cyan-400 opacity-20 animate-scan"></div>
             </div>
           </div>
         )}
         
           {/* Hack Game Modal */}
           {showHackGame && (
             <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-20 animate-fade-in">
               <div className="bg-black border-2 border-purple-400 p-4 max-w-md relative animate-slide-up neon-glow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg text-purple-400 glitch-text" data-text="[ HACK THE MATRIX ]">[ HACK THE MATRIX ]</h3>
                  <button 
                    onClick={() => setShowHackGame(false)}
                    className="border border-purple-400 px-2 hover:bg-purple-400 hover:text-black"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="text-center mb-4">
                  <p className="text-sm mb-2">Repeat the color sequence!</p>
                  <p className="text-xs text-purple-400">Reward: {hackReward} credits</p>
                  <p className="text-xs mt-2">Progress: {playerSequence.length}/{hackSequence.length}</p>
                </div>
                
                {/* Color sequence display */}
                <div className="flex justify-center gap-2 mb-4">
                  {hackSequence.map((color, i) => (
                    <div 
                      key={i}
                      className={`w-8 h-8 rounded border-2 ${
                        color === 'red' ? 'bg-red-500 border-red-400' :
                        color === 'blue' ? 'bg-blue-500 border-blue-400' :
                        color === 'green' ? 'bg-green-500 border-green-400' :
                        color === 'yellow' ? 'bg-yellow-500 border-yellow-400' :
                        'bg-purple-500 border-purple-400'
                      } ${i < playerSequence.length ? 'opacity-100' : 'opacity-30'} animate-pulse`}
                    />
                  ))}
                </div>
                
                {/* Color buttons */}
                {hackActive && (
                  <div className="grid grid-cols-5 gap-2">
                    <button 
                      onClick={() => handleHackClick('red')}
                      className="cyber-button bg-red-500 border-red-400 text-white p-3 rounded hover-glow"
                    >
                      RED
                    </button>
                    <button 
                      onClick={() => handleHackClick('blue')}
                      className="cyber-button bg-blue-500 border-blue-400 text-white p-3 rounded hover-glow"
                    >
                      BLUE
                    </button>
                    <button 
                      onClick={() => handleHackClick('green')}
                      className="cyber-button bg-green-500 border-green-400 text-white p-3 rounded hover-glow"
                    >
                      GREEN
                    </button>
                    <button 
                      onClick={() => handleHackClick('yellow')}
                      className="cyber-button bg-yellow-500 border-yellow-400 text-black p-3 rounded hover-glow"
                    >
                      YELLOW
                    </button>
                    <button 
                      onClick={() => handleHackClick('purple')}
                      className="cyber-button bg-purple-500 border-purple-400 text-white p-3 rounded hover-glow"
                    >
                      PURPLE
                    </button>
                  </div>
                )}
                
                {!hackActive && (
                  <div className="text-center">
                    <p className="text-lg text-purple-400 animate-pulse">
                      {playerSequence.length === hackSequence.length ? '✓ SUCCESS!' : '✗ FAILED!'}
                    </p>
                  </div>
                )}
                
                <div className="absolute left-0 right-0 h-px bg-purple-400 opacity-20 animate-scan"></div>
              </div>
            </div>
          )}

          {/* EPIC Victory Screen */}
          {showVictory && (
            <div className="victory-screen">
              <div className="bg-black border-4 border-yellow-400 p-8 max-w-2xl relative animate-victory-celebration text-center holographic">
                <h2 className="text-4xl mb-6 text-yellow-400 neon-glow animate-rainbow-glow">🏆 EPIC VICTORY! 🏆</h2>
                <div className="mb-6 text-2xl animate-pulse">
                  YOU ARE THE ULTIMATE QUANTUM FACTORY MASTER!
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6 text-lg">
                  <div className="border border-yellow-400 p-2">
                    <div className="text-yellow-400">EPIC LEVEL</div>
                    <div className="text-2xl animate-bounce-glow">{epicLevel}</div>
                  </div>
                  <div className="border border-yellow-400 p-2">
                    <div className="text-yellow-400">TOTAL ITEMS</div>
                    <div className="text-2xl animate-bounce-glow">{items.length}</div>
                  </div>
                  <div className="border border-yellow-400 p-2">
                    <div className="text-yellow-400">CREDITS EARNED</div>
                    <div className="text-2xl animate-bounce-glow">{credits}</div>
                  </div>
                  <div className="border border-yellow-400 p-2">
                    <div className="text-yellow-400">ACHIEVEMENTS</div>
                    <div className="text-2xl animate-bounce-glow">
                      {Object.values(achievements).filter(Boolean).length + 
                       Object.values(hiddenAchievements).filter(Boolean).length}
                    </div>
                  </div>
                </div>
                <div className="mb-6 text-green-400 animate-pulse">
                  <div>🎉 HACKATHON GAME OF THE YEAR! 🎉</div>
                  <div>🌟 YOU&apos;RE AN INTERDIMENSIONAL LEGEND! 🌟</div>
                </div>
                <button 
                  onClick={() => setShowVictory(false)}
                  className="border border-yellow-400 px-6 py-3 hover:bg-yellow-400 hover:text-black cyber-button text-lg font-bold animate-rainbow-glow"
                >
                  🎮 CONTINUE YOUR LEGACY 🎮
                </button>
              </div>
            </div>
          )}
         </div>
       </div>
     )
   }

export default Factory404