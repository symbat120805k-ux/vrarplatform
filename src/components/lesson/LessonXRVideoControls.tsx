import { useXR } from '@react-three/xr'
import { Billboard, RoundedBox, Text } from '@react-three/drei'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLessonXRMedia } from './LessonXRMediaContext'

const VOL_STEP = 0.12
const SEEK_STEP = 10

function VideoControlButton({
  label,
  onPress,
  width = 0.44,
}: {
  label: string
  onPress: () => void
  width?: number
}) {
  const [hover, setHover] = useState(false)
  const last = useRef(0)

  const handlePointerDown = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation()
      const now = performance.now()
      if (now - last.current < 280) return
      last.current = now
      onPress()
    },
    [onPress],
  )

  return (
    <RoundedBox
      args={[width, 0.092, 0.028]}
      radius={0.018}
      smoothness={4}
      onPointerDown={handlePointerDown}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <meshStandardMaterial
        color={hover ? '#3d5a80' : '#2a3f5c'}
        metalness={0.15}
        roughness={0.65}
        emissive={hover ? '#1a2a40' : '#000000'}
        emissiveIntensity={hover ? 0.35 : 0}
      />
      <Text
        position={[0, 0, 0.02]}
        fontSize={0.038}
        color="#f0f4f8"
        anchorX="center"
        anchorY="middle"
        maxWidth={width - 0.06}
        textAlign="center"
      >
        {label}
      </Text>
    </RoundedBox>
  )
}

/**
 * Панель управления видео только в активной XR-сессии (VR/AR).
 * Лучом контроллера нажимай на кнопки.
 */
export function LessonXRVideoControls() {
  const session = useXR((s) => s.session)
  const { videoElement: video } = useLessonXRMedia()
  const [, setSync] = useState(0)

  useEffect(() => {
    if (!video) return
    const tick = () => setSync((n) => n + 1)
    video.addEventListener('play', tick)
    video.addEventListener('pause', tick)
    video.addEventListener('volumechange', tick)
    return () => {
      video.removeEventListener('play', tick)
      video.removeEventListener('pause', tick)
      video.removeEventListener('volumechange', tick)
    }
  }, [video])

  if (session == null || video == null) {
    return null
  }

  const paused = video.paused
  const vol = Math.round(video.volume * 100)
  const muted = video.muted

  const togglePlay = () => {
    if (video.paused) void video.play()
    else video.pause()
  }

  const volDown = () => {
    video.volume = Math.max(0, video.volume - VOL_STEP)
    if (video.volume > 0) video.muted = false
  }

  const volUp = () => {
    video.volume = Math.min(1, video.volume + VOL_STEP)
    video.muted = false
  }

  const toggleMute = () => {
    video.muted = !video.muted
  }

  const seekBack = () => {
    video.currentTime = Math.max(0, video.currentTime - SEEK_STEP)
  }

  const seekFwd = () => {
    if (video.seekable.length > 0) {
      const end = video.seekable.end(video.seekable.length - 1)
      video.currentTime = Math.min(end, video.currentTime + SEEK_STEP)
    } else {
      video.currentTime = video.currentTime + SEEK_STEP
    }
  }

  const toStart = () => {
    video.currentTime = 0
    void video.play().catch(() => {})
  }

  return (
    <Billboard position={[0.82, 1.42, -0.88]} follow lockX={false} lockY={false} lockZ={false}>
      <group>
        <RoundedBox args={[0.54, 0.88, 0.04]} radius={0.04} position={[0, 0, -0.02]} smoothness={3}>
          <meshStandardMaterial color="#0d1117" metalness={0.2} roughness={0.85} opacity={0.92} transparent />
        </RoundedBox>

        <Text position={[0, 0.33, 0.03]} fontSize={0.034} color="#8b9cb3" anchorX="center" anchorY="middle">
          Видео
        </Text>

        <group position={[0, 0.2, 0.03]}>
          <VideoControlButton
            label={paused ? '▶ Старт' : '⏸ Пауза'}
            onPress={togglePlay}
          />
        </group>
        <group position={[0, 0.095, 0.03]}>
          <VideoControlButton label="− Громкость" onPress={volDown} />
        </group>
        <group position={[0, -0.01, 0.03]}>
          <VideoControlButton label="+ Громкость" onPress={volUp} />
        </group>
        <group position={[0, -0.115, 0.03]}>
          <VideoControlButton
            label={muted ? '🔇 Вкл. звук' : '🔊 Выкл. звук'}
            onPress={toggleMute}
          />
        </group>
        <group position={[0, -0.22, 0.03]}>
          <VideoControlButton label="↺ В начало" onPress={toStart} width={0.44} />
        </group>
        <group position={[0, -0.325, 0.03]}>
          <group position={[-0.12, 0, 0]}>
            <VideoControlButton label="« −10 с" onPress={seekBack} width={0.2} />
          </group>
          <group position={[0.12, 0, 0]}>
            <VideoControlButton label="+10 с »" onPress={seekFwd} width={0.2} />
          </group>
        </group>

        <Text position={[0, -0.44, 0.03]} fontSize={0.028} color="#6b7c8f" anchorX="center" anchorY="middle">
          {muted ? 'без звука' : `${vol}%`}
        </Text>
      </group>
    </Billboard>
  )
}
