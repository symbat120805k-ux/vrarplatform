import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Titanium: strong brushed-metal beam, cool silver-gray, industrial. */
const CENTER = [0, 1.2, -1.5] as const

export function Titanium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.25, 0.5, 0.2]} />
        <meshStandardMaterial
          color="#a0a8b0"
          metalness={0.9}
          roughness={0.35}
        />
      </mesh>
    </group>
  )
}
