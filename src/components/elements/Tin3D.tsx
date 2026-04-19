import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Tin: light gray metal bar or coating, simple matte, tin cans and plating. */
const CENTER = [0, 1.2, -1.5] as const

export function Tin3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.28, 0.35, 0.18]} />
        <meshStandardMaterial
          color="#a0a4a8"
          metalness={0.8}
          roughness={0.45}
        />
      </mesh>
    </group>
  )
}
