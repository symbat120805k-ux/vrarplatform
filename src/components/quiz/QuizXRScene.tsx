import { useEffect, useRef } from 'react'
import type { Group } from 'three'
import { OrbitControls } from '@react-three/drei'
import {
  XR,
  XROrigin,
  useXR,
  useXRControllerLocomotion,
} from '@react-three/xr'
import { createXRStore } from '@react-three/xr'
import { QuizVRPanel } from './QuizVRPanel'

const ORBIT_TARGET = [0, 1.5, -2.2] as const

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
      minDistance={0.4}
      maxDistance={9}
      target={[...ORBIT_TARGET]}
      enabled={session == null}
    />
  )
}

function SessionBridge({ onChange }: { onChange: (active: boolean) => void }) {
  const session = useXR((s) => s.session)
  useEffect(() => {
    onChange(session != null)
  }, [session, onChange])
  return null
}

export type QuizXRSceneProps = {
  xrStore: ReturnType<typeof createXRStore>
  onSessionChange: (active: boolean) => void
}

export function QuizXRScene({ xrStore, onSessionChange }: QuizXRSceneProps) {
  return (
    <XR store={xrStore}>
      <SessionBridge onChange={onSessionChange} />
      <ambientLight intensity={0.48} />
      <directionalLight position={[5, 7, 5]} intensity={0.95} castShadow />
      <directionalLight position={[-4, 5, -3]} intensity={0.32} />
      <QuizVRPanel />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#1a2332" />
      </mesh>
      <XRPlayerRig />
      <SessionOrbitControls />
    </XR>
  )
}
