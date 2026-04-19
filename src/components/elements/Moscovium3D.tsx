import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Moscovium: fragmented asteroid-like structure, purple energy in cracks. */
const CENTER = [0, 1.2, -1.5] as const

export function Moscovium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh position={[0.1, 0.05, -0.05]}>
        <dodecahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial color="#404448" metalness={0.8} roughness={0.5} />
      </mesh>
      <mesh position={[-0.12, -0.08, 0.06]}>
        <octahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial color="#444850" metalness={0.8} roughness={0.5} />
      </mesh>
      <mesh position={[0.05, -0.15, -0.08]}>
        <boxGeometry args={[0.14, 0.1, 0.12]} />
        <meshStandardMaterial color="#484c54" metalness={0.8} roughness={0.5} />
      </mesh>
      <mesh position={[-0.05, 0.18, 0.02]}>
        <tetrahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial color="#404448" metalness={0.8} roughness={0.5} />
      </mesh>
      <mesh position={[0.15, -0.05, 0.12]}>
        <boxGeometry args={[0.08, 0.14, 0.06]} />
        <meshBasicMaterial color="#8060a0" transparent opacity={0.7} />
      </mesh>
      <mesh position={[-0.1, 0.1, -0.1]}>
        <boxGeometry args={[0.06, 0.08, 0.05]} />
        <meshBasicMaterial color="#9070b0" transparent opacity={0.65} />
      </mesh>
    </group>
  )
}
