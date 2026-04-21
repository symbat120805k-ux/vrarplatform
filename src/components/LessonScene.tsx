import { useRef } from 'react'
import type { Group } from 'three'
import { OrbitControls } from '@react-three/drei'
import {
  XR,
  XROrigin,
  useXR,
  useXRControllerLocomotion,
} from '@react-three/xr'
import { LessonImmersiveVideo } from './lesson/LessonImmersiveVideo'
import { LessonXRMediaProvider } from './lesson/LessonXRMediaContext'
import { LessonXRVideoControls } from './lesson/LessonXRVideoControls'
import { XRExitPanel } from './xr/XRExitPanel'

/** Центр обзора — большой видеоэкран впереди. */
const ORBIT_TARGET = [0, 1.5, -2.5] as const

function XRPlayerRig() {
  const ref = useRef<Group>(null)
  const session = useXR((s) => s.session)
  useXRControllerLocomotion(
    ref,
    { speed: 2.2 },
    { type: 'smooth', speed: 2, deadZone: 0.35 },
    'left',
  )
  return <XROrigin ref={ref} disabled={session == null} />
}

function SessionOrbitControls() {
  const session = useXR((s) => s.session)
  return (
    <OrbitControls
      makeDefault
      enablePan
      enableZoom
      minDistance={0.5}
      maxDistance={8}
      target={[...ORBIT_TARGET]}
      enabled={session == null}
    />
  )
}

export type LessonSceneProps = {
  xrStore: ReturnType<typeof import('@react-three/xr').createXRStore>
  immersiveVideoSrc: string
}

export function LessonScene({ xrStore, immersiveVideoSrc }: LessonSceneProps) {
  return (
    <XR store={xrStore}>
      <LessonXRMediaProvider>
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <directionalLight position={[-3, 4, -2]} intensity={0.45} />
        <pointLight position={[0, 2.5, -1]} intensity={0.4} color="#a8c8ff" />
        <LessonImmersiveVideo src={immersiveVideoSrc} />
        <LessonXRVideoControls />
        {/* Слева от экрана: справа панель «Видео» — см. LessonXRVideoControls */}
        <XRExitPanel position={[-0.82, 1.48, -0.88]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        <XRPlayerRig />
        <SessionOrbitControls />
      </LessonXRMediaProvider>
    </XR>
  )
}
