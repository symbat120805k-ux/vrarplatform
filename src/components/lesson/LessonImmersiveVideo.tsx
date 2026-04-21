import { useFrame, useThree } from '@react-three/fiber'
import { useXR } from '@react-three/xr'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { DoubleSide } from 'three'
import { useLessonXRMedia } from './LessonXRMediaContext'
import { LESSON_IMMERSIVE } from './lessonVRLayout'

const SCREEN_H = LESSON_IMMERSIVE.screenH
const SCREEN_W = LESSON_IMMERSIVE.screenW
const SCREEN_POS = LESSON_IMMERSIVE.screenPos

function isFilesystemPath(src: string) {
  return /^[a-zA-Z]:\\/.test(src) || src.startsWith('file:')
}

function VideoScreen({ src }: { src: string }) {
  const gl = useThree((s) => s.gl)
  const xrSession = useXR((s) => s.session)
  const { setVideoElement } = useLessonXRMedia()
  const [texture, setTexture] = useState<THREE.VideoTexture | null>(null)
  const [failed, setFailed] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (xrSession == null || texture == null) return
    const video = videoRef.current
    if (video == null) return
    void video.play().catch((e) => {
      console.warn('[VR-видео] повтор play в XR:', e)
    })
  }, [xrSession, texture])

  useEffect(() => {
    setFailed(false)
    setTexture(null)

    if (isFilesystemPath(src)) {
      console.error(
        '[VR-видео] Указан путь к диску (C:\\...) — в браузере так не работает. В lessons.ts задай URL вида /videos/имя.mp4 (файл в папке public/videos/).',
        src,
      )
      setFailed(true)
      return
    }

    const video = document.createElement('video')
    video.playsInline = true
    video.muted = true
    video.loop = false
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')

    if (src.startsWith('http://') || src.startsWith('https://')) {
      video.crossOrigin = 'anonymous'
    }

    video.src = src
    videoRef.current = video

    const onError = () => {
      console.error(
        '[VR-видео] Ошибка загрузки. Проверь: файл в public/videos/, имя совпадает с URL, сервер запущен (npm run dev), кодек H.264 в MP4. src =',
        src,
      )
      setFailed(true)
    }

    const onLoaded = () => {
      const tex = new THREE.VideoTexture(video)
      tex.colorSpace = gl.outputColorSpace
      setTexture(tex)
      setVideoElement(video)
      void video.play().catch((e) => {
        console.warn('[VR-видео] autoplay:', e)
      })
    }

    video.addEventListener('error', onError)
    const onEnded = () => {
      video.pause()
      video.currentTime = 0
    }
    video.addEventListener('loadeddata', onLoaded)
    video.addEventListener('ended', onEnded)
    video.load()

    return () => {
      video.removeEventListener('error', onError)
      video.removeEventListener('loadeddata', onLoaded)
      video.removeEventListener('ended', onEnded)
      setVideoElement(null)
      video.pause()
      video.removeAttribute('src')
      video.load()
      videoRef.current = null
      setTexture((t) => {
        t?.dispose()
        return null
      })
    }
  }, [src, gl.outputColorSpace, setVideoElement])

  useFrame(() => {
    if (texture) texture.needsUpdate = true
  })

  if (failed || !texture) {
    return (
      <group position={SCREEN_POS}>
        <mesh position={[0, 0, -0.03]} scale={[SCREEN_W + 0.12, SCREEN_H + 0.12, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial color="#2a1515" emissive="#401010" emissiveIntensity={0.35} />
        </mesh>
        <mesh>
          <planeGeometry args={[SCREEN_W, SCREEN_H]} />
          <meshStandardMaterial color="#1a1f2e" emissive="#301818" emissiveIntensity={0.2} />
        </mesh>
      </group>
    )
  }

  return (
    <group position={SCREEN_POS}>
      <mesh position={[0, 0, -0.03]} scale={[SCREEN_W + 0.12, SCREEN_H + 0.12, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color="#0d1117" metalness={0.15} roughness={0.9} />
      </mesh>
      <mesh name="lesson-video-screen">
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial map={texture} toneMapped={false} side={DoubleSide} />
      </mesh>
    </group>
  )
}

export function LessonImmersiveVideo({ src }: { src: string }) {
  return <VideoScreen src={src} />
}
