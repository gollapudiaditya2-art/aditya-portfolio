import { useCallback, useEffect, useRef, useState } from 'react'

const formatScore = (score) => String(score).padStart(5, '0')

function DinoSprite() {
  return (
    <svg viewBox="0 0 48 52" aria-hidden="true" shapeRendering="crispEdges">
      <g fill="currentColor">
        <rect x="22" y="2" width="20" height="5" />
        <rect x="20" y="7" width="26" height="13" />
        <rect x="17" y="14" width="17" height="13" />
        <rect x="12" y="21" width="20" height="18" />
        <rect x="7" y="26" width="13" height="12" />
        <rect x="3" y="22" width="8" height="7" />
        <rect x="1" y="18" width="5" height="6" />
        <rect x="29" y="25" width="10" height="4" />
        <rect x="36" y="28" width="4" height="6" />
        <rect x="11" y="37" width="7" height="11" />
        <rect x="25" y="37" width="7" height="11" />
        <rect x="9" y="46" width="11" height="4" />
        <rect x="24" y="46" width="11" height="4" />
      </g>
      <rect x="36" y="8" width="3" height="3" fill="var(--dark)" />
      <rect x="38" y="17" width="8" height="3" fill="var(--dark)" />
    </svg>
  )
}

function CactusSprite() {
  return (
    <svg className="dino-cactus-sprite" viewBox="0 0 28 46" aria-hidden="true" shapeRendering="crispEdges">
      <g fill="currentColor">
        <rect x="11" y="1" width="8" height="44" />
        <rect x="4" y="13" width="7" height="7" />
        <rect x="3" y="11" width="5" height="19" />
        <rect x="6" y="26" width="8" height="6" />
        <rect x="19" y="18" width="6" height="7" />
        <rect x="22" y="13" width="5" height="18" />
        <rect x="16" y="27" width="9" height="6" />
        <rect x="8" y="42" width="14" height="4" />
      </g>
    </svg>
  )
}

function BirdSprite() {
  return (
    <svg className="dino-bird-sprite" viewBox="0 0 48 26" aria-hidden="true" shapeRendering="crispEdges">
      <g fill="currentColor">
        <rect x="13" y="9" width="24" height="11" />
        <rect x="34" y="6" width="9" height="8" />
        <rect x="42" y="9" width="6" height="3" />
        <rect x="8" y="12" width="8" height="5" />
        <rect className="dino-bird-wing" x="14" y="2" width="17" height="8" />
        <rect x="5" y="15" width="8" height="4" />
      </g>
      <rect x="38" y="8" width="2" height="2" fill="var(--dark)" />
    </svg>
  )
}

export function DinoFooterGame() {
  const [status, setStatus] = useState('idle')
  const [finalScore, setFinalScore] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const stageRef = useRef(null)
  const dinoRef = useRef(null)
  const scoreRef = useRef(null)
  const highScoreRef = useRef(null)
  const obstacleRefs = useRef([])
  const frameRef = useRef(0)
  const statusRef = useRef('idle')
  const duckingRef = useRef(false)
  const highScoreValueRef = useRef(0)
  const gameRef = useRef({
    width: 0,
    height: 0,
    dinoX: 0,
    jumpY: 0,
    velocity: 0,
    elapsed: 0,
    lastTime: 0,
    score: 0,
    obstacles: [],
  })

  const setDucking = useCallback((isDucking) => {
    duckingRef.current = isDucking
    dinoRef.current?.classList.toggle('is-ducking', isDucking)
  }, [])

  const resetScene = useCallback(() => {
    const stage = stageRef.current
    const dino = dinoRef.current
    if (!stage || !dino) return

    const width = stage.clientWidth
    const height = stage.clientHeight
    const dinoX = Math.max(24, Math.min(68, width * 0.065))
    const obstacles = [
      { x: width * 0.7, type: 'cactus' },
      { x: width * 1.28, type: 'bird' },
    ]

    gameRef.current = {
      width,
      height,
      dinoX,
      jumpY: 0,
      velocity: 0,
      elapsed: 0,
      lastTime: 0,
      score: 0,
      obstacles,
    }

    dino.style.left = `${dinoX}px`
    dino.style.transform = 'translate3d(0,0,0)'
    setDucking(false)
    obstacleRefs.current.forEach((node, index) => {
      const obstacle = obstacles[index]
      if (!node || !obstacle) return
      node.classList.toggle('is-bird', obstacle.type === 'bird')
      node.style.transform = `translate3d(${obstacle.x.toFixed(1)}px,0,0)`
    })
    if (scoreRef.current) scoreRef.current.textContent = '00000'
  }, [setDucking])

  const finishGame = useCallback(() => {
    const score = gameRef.current.score
    statusRef.current = 'over'
    setStatus('over')
    setFinalScore(score)
    setDucking(false)
    highScoreValueRef.current = Math.max(highScoreValueRef.current, score)
    if (highScoreRef.current) {
      highScoreRef.current.textContent = formatScore(highScoreValueRef.current)
    }
  }, [setDucking])

  const runFrame = useCallback((now) => {
    if (statusRef.current !== 'running') return

    const game = gameRef.current
    const delta = game.lastTime ? Math.min((now - game.lastTime) / 1000, 0.032) : 0
    game.lastTime = now
    game.elapsed += delta

    const speed = Math.min(500, 255 + game.elapsed * 13)
    game.velocity -= 1600 * delta
    game.jumpY = Math.max(0, game.jumpY + game.velocity * delta)
    if (game.jumpY === 0 && game.velocity < 0) game.velocity = 0
    dinoRef.current.style.transform = `translate3d(0,${(-game.jumpY).toFixed(1)}px,0)`

    let furthestX = 0
    game.obstacles.forEach((obstacle) => {
      obstacle.x -= speed * delta
      furthestX = Math.max(furthestX, obstacle.x)
    })

    game.obstacles.forEach((obstacle, index) => {
      const node = obstacleRefs.current[index]
      if (!node) return

      if (obstacle.x < -58) {
        const gap = 280 + Math.random() * 190 + Math.min(game.elapsed * 3, 80)
        obstacle.x = Math.max(game.width, furthestX) + gap
        obstacle.type = game.elapsed > 4 && Math.random() < 0.32 ? 'bird' : 'cactus'
        node.classList.toggle('is-bird', obstacle.type === 'bird')
        furthestX = obstacle.x
      }

      node.style.transform = `translate3d(${obstacle.x.toFixed(1)}px,0,0)`
    })

    const dinoHeight = duckingRef.current ? 29 : 48
    const dinoWidth = duckingRef.current ? 48 : 39
    const dinoBox = {
      left: game.dinoX + 5,
      right: game.dinoX + dinoWidth - 4,
      top: game.height - 26 - dinoHeight - game.jumpY + 4,
      bottom: game.height - 26 - game.jumpY - 3,
    }

    const collided = game.obstacles.some((obstacle) => {
      const isBird = obstacle.type === 'bird'
      const width = isBird ? 48 : 28
      const height = isBird ? 24 : 44
      const bottomOffset = isBird ? 40 : 26
      const obstacleBox = {
        left: obstacle.x + 4,
        right: obstacle.x + width - 4,
        top: game.height - bottomOffset - height + 3,
        bottom: game.height - bottomOffset - 3,
      }
      return (
        dinoBox.left < obstacleBox.right &&
        dinoBox.right > obstacleBox.left &&
        dinoBox.top < obstacleBox.bottom &&
        dinoBox.bottom > obstacleBox.top
      )
    })

    if (collided) {
      finishGame()
      return
    }

    const nextScore = Math.floor(game.elapsed * 10)
    if (nextScore !== game.score) {
      game.score = nextScore
      if (scoreRef.current) scoreRef.current.textContent = formatScore(nextScore)
    }

    frameRef.current = requestAnimationFrame(runFrame)
  }, [finishGame])

  const startGame = useCallback(() => {
    if (reducedMotion) return
    cancelAnimationFrame(frameRef.current)
    resetScene()
    statusRef.current = 'running'
    setStatus('running')
    setFinalScore(0)
    frameRef.current = requestAnimationFrame(runFrame)
  }, [reducedMotion, resetScene, runFrame])

  const jump = useCallback(() => {
    if (duckingRef.current) return
    const game = gameRef.current
    if (game.jumpY <= 0.5) game.velocity = 430
  }, [])

  const handleAction = useCallback(() => {
    if (reducedMotion) return
    if (statusRef.current !== 'running') startGame()
    jump()
  }, [jump, reducedMotion, startGame])

  const handleKeyDown = (event) => {
    if (event.key === ' ' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!event.repeat) handleAction()
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (statusRef.current === 'running') setDucking(true)
    }
  }

  const handleKeyUp = (event) => {
    if (event.key === 'ArrowDown') setDucking(false)
  }

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    stageRef.current?.focus({ preventScroll: true })
    handleAction()
  }

  useEffect(() => {
    resetScene()
    const handleResize = () => {
      if (statusRef.current !== 'running') {
        resetScene()
        return
      }
      const stage = stageRef.current
      const dino = dinoRef.current
      if (!stage || !dino) return
      const game = gameRef.current
      game.width = stage.clientWidth
      game.height = stage.clientHeight
      game.dinoX = Math.max(24, Math.min(68, game.width * 0.065))
      dino.style.left = `${game.dinoX}px`
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frameRef.current)
    }
  }, [resetScene])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionPreference = (event) => {
      setReducedMotion(event.matches)
      if (event.matches && statusRef.current === 'running') {
        cancelAnimationFrame(frameRef.current)
        statusRef.current = 'idle'
        setStatus('idle')
        resetScene()
      }
    }
    query.addEventListener('change', handleMotionPreference)
    return () => query.removeEventListener('change', handleMotionPreference)
  }, [resetScene])

  const message = reducedMotion
    ? 'Runner paused for reduced motion'
    : status === 'over'
      ? `Game over · ${formatScore(finalScore)} · press Space or tap to restart`
      : status === 'idle'
        ? 'Press Space or tap to run'
        : 'Run in progress'

  return (
    <section className={`dino-game is-${status}${reducedMotion ? ' is-reduced' : ''}`} aria-label="Dinosaur runner">
      <div className="dino-game-meta" aria-hidden="true">
        <span>HI <span ref={highScoreRef}>00000</span></span>
        <span ref={scoreRef}>00000</span>
      </div>
      <button
        className="dino-stage"
        ref={stageRef}
        type="button"
        disabled={reducedMotion}
        aria-label={message}
        aria-describedby="dino-game-controls"
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onBlur={() => setDucking(false)}
        onPointerDown={handlePointerDown}
      >
        <span className="dino-game-message" aria-live="polite">
          {status === 'running' ? '' : message}
        </span>
        <span className="dino-runner" ref={dinoRef}><DinoSprite /></span>
        {[0, 1].map((index) => (
          <span
            className={`dino-obstacle${index === 1 ? ' is-bird' : ''}`}
            key={index}
            ref={(node) => { obstacleRefs.current[index] = node }}
            aria-hidden="true"
          >
            <CactusSprite />
            <BirdSprite />
          </span>
        ))}
        <span className="dino-ground" aria-hidden="true">
          <i></i><i></i><i></i><i></i>
        </span>
      </button>
      <p className="dino-game-controls" id="dino-game-controls">
        {reducedMotion ? 'Motion is reduced in your system settings.' : 'Space / ↑ jump · ↓ duck · tap to jump'}
      </p>
    </section>
  )
}
