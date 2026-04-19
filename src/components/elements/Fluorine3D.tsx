import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/** Fluorine: F2 — pale yellow-green, sharp, reactive feel, flickering glow. */
const CENTER = [0, 1.2, -1.5] as const

export function Fluorine3D() {
  const groupRef = useRef<THREE.Group>(null)
  const matRef1 = useRef<THREE.MeshStandardMaterial | null>(null)
  const matRef2 = useRef<THREE.MeshStandardMaterial | null>(null)

  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.25
    const flicker = 0.7 + Math.sin(state.clock.elapsedTime * 8) * 0.15
    ;[matRef1.current, matRef2.current].forEach((m) => {
      if (m) m.emissiveIntensity = flicker * 0.4
    })
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh position={[-0.2, 0, 0]}>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshStandardMaterial
          ref={matRef1}
          color="#c8e080"
          emissive="#90b030"
          emissiveIntensity={0.35}
        />
      </mesh>
      <mesh position={[0.2, 0, 0]}>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshStandardMaterial
          ref={matRef2}
          color="#c8e080"
          emissive="#90b030"
          emissiveIntensity={0.35}
        />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.42, 12]} />
        <meshStandardMaterial color="#a0c050" emissive="#708820" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}
