import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Einsteinium: rare lab-made metallic crystal, cool purple-blue glow. */
const CENTER = [0, 1.2, -1.5] as const

export function Einsteinium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.29, 0]} />
        <meshStandardMaterial
          color="#586078"
          metalness={0.82}
          roughness={0.34}
          emissive="#203050"
          emissiveIntensity={0.22}
        />
      </mesh>
    </group>
  )
}
