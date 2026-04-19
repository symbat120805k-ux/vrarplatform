import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Hafnium: strong dark silver-gray metallic block, industrial, reactor control rods. */
const CENTER = [0, 1.2, -1.5] as const

export function Hafnium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.32, 0.38, 0.22]} />
        <meshStandardMaterial
          color="#606870"
          metalness={0.88}
          roughness={0.35}
        />
      </mesh>
    </group>
  )
}
