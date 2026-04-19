import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, MeshStandardMaterial } from 'three'

/** Neon: noble gas — glowing orange-red orb, neon-sign style, stable, subtle pulse. */
const CENTER = [0, 1.2, -1.5] as const

export function Neon3D() {
  const groupRef = useRef<Group>(null)
  const matRef = useRef<MeshStandardMaterial>(null)

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y += 0.008
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.8 + Math.sin(state.clock.elapsedTime * 1.5) * 0.2
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial
          ref={matRef}
          color="#ff8844"
          emissive="#ff5522"
          emissiveIntensity={0.9}
          transparent
          opacity={0.95}
        />
      </mesh>
    </group>
  )
}
