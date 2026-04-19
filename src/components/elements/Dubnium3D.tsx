import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Dubnium: fragmented metallic shards connected by electric blue energy links. */
const CENTER = [0, 1.2, -1.5] as const

export function Dubnium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh position={[0.15, 0.12, 0.08]}>
        <boxGeometry args={[0.12, 0.18, 0.08]} />
        <meshStandardMaterial color="#505860" metalness={0.85} roughness={0.4} />
      </mesh>
      <mesh position={[-0.18, -0.08, 0.06]}>
        <boxGeometry args={[0.1, 0.14, 0.06]} />
        <meshStandardMaterial color="#485058" metalness={0.85} roughness={0.4} />
      </mesh>
      <mesh position={[0.05, -0.2, -0.05]}>
        <boxGeometry args={[0.14, 0.08, 0.1]} />
        <meshStandardMaterial color="#586068" metalness={0.85} roughness={0.4} />
      </mesh>
      <mesh position={[-0.08, 0.2, 0.02]}>
        <boxGeometry args={[0.08, 0.1, 0.12]} />
        <meshStandardMaterial color="#4a5458" metalness={0.85} roughness={0.4} />
      </mesh>
      <mesh position={[0.02, 0.02, 0.18]} rotation={[0.5, 0.3, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.35, 6]} />
        <meshBasicMaterial color="#4080e0" transparent opacity={0.9} />
      </mesh>
      <mesh position={[-0.06, -0.1, 0.12]} rotation={[0.2, -0.4, 0.1]}>
        <cylinderGeometry args={[0.006, 0.006, 0.28, 6]} />
        <meshBasicMaterial color="#5090e8" transparent opacity={0.85} />
      </mesh>
    </group>
  )
}
