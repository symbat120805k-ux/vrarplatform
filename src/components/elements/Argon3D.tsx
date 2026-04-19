import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, MeshStandardMaterial } from 'three'

/** Argon: noble gas, calm translucent orb, cool blue-violet, subtle pulse. */
const CENTER = [0, 1.2, -1.5] as const

export function Argon3D() {
  const groupRef = useRef<Group>(null)
  const matRef = useRef<MeshStandardMaterial>(null)

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y += 0.006
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 1) * 0.15
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          ref={matRef}
          color="#a0a8e0"
          emissive="#6070c0"
          emissiveIntensity={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  )
}
