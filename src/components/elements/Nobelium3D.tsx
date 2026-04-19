import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Nobelium: tall polished pillar, beveled edges, base, blue-white light through vertical slits. */
const CENTER = [0, 1.2, -1.5] as const

export function Nobelium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.22, 0.08, 0.22]} />
        <meshStandardMaterial color="#505860" metalness={0.88} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.12, 0.45, 0.12]} />
        <meshStandardMaterial color="#586068" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.062, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.02, 0.42, 0.08]} />
        <meshBasicMaterial color="#a0c8e0" transparent opacity={0.9} />
      </mesh>
      <mesh position={[-0.062, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.02, 0.42, 0.08]} />
        <meshBasicMaterial color="#a0c8e0" transparent opacity={0.9} />
      </mesh>
    </group>
  )
}
