import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Indium: soft shiny metal, slightly flexible/pressed look, touchscreens and displays. */
const CENTER = [0, 1.2, -1.5] as const

export function Indium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.38, 0.12, 0.28]} />
        <meshStandardMaterial
          color="#c0c8d0"
          metalness={0.88}
          roughness={0.22}
        />
      </mesh>
    </group>
  )
}
