import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, MeshStandardMaterial } from 'three'

/** Krypton: noble gas — glowing translucent sphere, faint purple-white, subtle float. */
const CENTER = [0, 1.2, -1.5] as const

export function Krypton3D() {
  const groupRef = useRef<Group>(null)
  const matRef = useRef<MeshStandardMaterial>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.006
      groupRef.current.position.y = CENTER[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.04
    }
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 1.2) * 0.15
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          ref={matRef}
          color="#d8d0f0"
          emissive="#a090d8"
          emissiveIntensity={0.5}
          transparent
          opacity={0.92}
        />
      </mesh>
    </group>
  )
}
