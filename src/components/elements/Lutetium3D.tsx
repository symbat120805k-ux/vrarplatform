import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Lutetium: dense metallic crystal, silvery with subtle golden highlights, rare, instruments. */
const CENTER = [0, 1.2, -1.5] as const

export function Lutetium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color="#b8b4a8"
          metalness={0.88}
          roughness={0.22}
        />
      </mesh>
      <mesh position={[0.12, 0.14, 0.18]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#c8a840" transparent opacity={0.8} />
      </mesh>
    </group>
  )
}
