import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Zinc: bluish-silver metal, crystalline surface, galvanizing. */
const CENTER = [0, 1.2, -1.5] as const

export function Zinc3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <dodecahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color="#a0a8b8"
          metalness={0.8}
          roughness={0.4}
        />
      </mesh>
    </group>
  )
}
