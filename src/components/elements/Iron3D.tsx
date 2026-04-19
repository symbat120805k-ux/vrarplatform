import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Iron: strong industrial metal block/beam, dark steel-gray, structural. */
const CENTER = [0, 1.2, -1.5] as const

export function Iron3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.4, 0.35, 0.25]} />
        <meshStandardMaterial
          color="#505558"
          metalness={0.85}
          roughness={0.45}
        />
      </mesh>
    </group>
  )
}
