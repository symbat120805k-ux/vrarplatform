import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Cadmium: soft bluish-silver metal, slightly dull, batteries and coatings. */
const CENTER = [0, 1.2, -1.5] as const

export function Cadmium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.3, 0.22, 0.2]} />
        <meshStandardMaterial
          color="#98a0b0"
          metalness={0.75}
          roughness={0.5}
        />
      </mesh>
    </group>
  )
}
