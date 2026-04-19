import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, MeshStandardMaterial } from 'three'

/** Phosphorus: stylized glowing mineral, warm glow, crystalline cluster, energetic. */
const CENTER = [0, 1.2, -1.5] as const

export function Phosphorus3D() {
  const groupRef = useRef<Group>(null)
  const matRef = useRef<MeshStandardMaterial>(null)

  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.1
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 1.2) * 0.2
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <dodecahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          ref={matRef}
          color="#e8b050"
          emissive="#c08020"
          emissiveIntensity={0.5}
          metalness={0.2}
          roughness={0.6}
        />
      </mesh>
      <mesh position={[0.1, 0.12, 0.08]}>
        <octahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial color="#f0c060" emissive="#d09030" emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}
