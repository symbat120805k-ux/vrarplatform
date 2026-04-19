import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Thallium: soft heavy metal, dull silver-gray, bluish tint, dense, toxic. */
const CENTER = [0, 1.2, -1.5] as const

export function Thallium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.3, 0.24, 0.2]} />
        <meshStandardMaterial
          color="#788098"
          metalness={0.7}
          roughness={0.55}
        />
      </mesh>
    </group>
  )
}
