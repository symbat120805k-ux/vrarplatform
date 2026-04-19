import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Francium: extremely rare reactive alkali metal, golden-silver core, faint unstable glow. */
const CENTER = [0, 1.2, -1.5] as const

export function Francium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <sphereGeometry args={[0.26, 24, 24]} />
        <meshStandardMaterial
          color="#c0a878"
          metalness={0.85}
          roughness={0.3}
          emissive="#302010"
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
  )
}
