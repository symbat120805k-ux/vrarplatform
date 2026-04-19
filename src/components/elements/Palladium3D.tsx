import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Palladium: smooth light silver metal, polished ingot/plate, catalysts and electronics. */
const CENTER = [0, 1.2, -1.5] as const

export function Palladium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.09
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.32, 0.2, 0.18]} />
        <meshStandardMaterial
          color="#d0d4d8"
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>
    </group>
  )
}
