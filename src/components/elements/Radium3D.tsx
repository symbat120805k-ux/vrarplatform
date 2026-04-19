import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Radium: pale metallic sample with soft green-blue radioactive glow, luminous. */
const CENTER = [0, 1.2, -1.5] as const

export function Radium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#a8b0b8"
          metalness={0.8}
          roughness={0.35}
          emissive="#204040"
          emissiveIntensity={0.25}
        />
      </mesh>
    </group>
  )
}
