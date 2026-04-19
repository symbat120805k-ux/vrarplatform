import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, MeshStandardMaterial } from 'three'

/** Xenon: noble gas — glowing sphere, cool blue-white light, subtle pulse (xenon lamps). */
const CENTER = [0, 1.2, -1.5] as const

export function Xenon3D() {
  const groupRef = useRef<Group>(null)
  const matRef = useRef<MeshStandardMaterial>(null)

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y += 0.006
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.6 + Math.sin(state.clock.elapsedTime * 1.1) * 0.2
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial
          ref={matRef}
          color="#d8e8f8"
          emissive="#80b0e0"
          emissiveIntensity={0.6}
          transparent
          opacity={0.92}
        />
      </mesh>
    </group>
  )
}
