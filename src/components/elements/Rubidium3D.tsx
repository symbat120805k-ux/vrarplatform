import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Rubidium: soft alkali metal, warm silver, slightly oxidized; reddish-purple flame accent. */
const CENTER = [0, 1.2, -1.5] as const

export function Rubidium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.3, 0.25, 0.2]} />
        <meshStandardMaterial
          color="#b8b0a8"
          metalness={0.8}
          roughness={0.45}
        />
      </mesh>
      <mesh position={[0.18, 0.12, 0]} scale={[0.08, 0.08, 0.08]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color="#c040a0" transparent opacity={0.7} />
      </mesh>
    </group>
  )
}
