import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Molybdenum: dense dark gray metal block, heat-resistant, industrial. */
const CENTER = [0, 1.2, -1.5] as const

export function Molybdenum3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.35, 0.3, 0.22]} />
        <meshStandardMaterial
          color="#505860"
          metalness={0.85}
          roughness={0.4}
        />
      </mesh>
    </group>
  )
}
