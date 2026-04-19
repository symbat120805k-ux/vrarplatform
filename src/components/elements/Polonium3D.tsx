import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, MeshStandardMaterial } from 'three'

/** Polonium: rare radioactive metal, dark silver, faint blue energy glow. */
const CENTER = [0, 1.2, -1.5] as const

export function Polonium3D() {
  const groupRef = useRef<Group>(null)
  const matRef = useRef<MeshStandardMaterial>(null)

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y += 0.006
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 1.1) * 0.15
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          ref={matRef}
          color="#505860"
          metalness={0.82}
          roughness={0.35}
          emissive="#102040"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  )
}
