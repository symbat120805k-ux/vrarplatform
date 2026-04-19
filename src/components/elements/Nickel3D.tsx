import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Nickel: smooth corrosion-resistant metal, coin-like disk, polished. */
const CENTER = [0, 1.2, -1.5] as const

export function Nickel3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.1
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <cylinderGeometry args={[0.32, 0.32, 0.12, 32]} />
        <meshStandardMaterial
          color="#b8b8c0"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}
