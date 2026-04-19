import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Hassium: armored sphere — dense core with segmented shell panels, crimson between. */
const CENTER = [0, 1.2, -1.5] as const

export function Hassium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color="#404448" metalness={0.9} roughness={0.35} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial
          color="#4a4e52"
          metalness={0.88}
          roughness={0.4}
          wireframe
        />
      </mesh>
      <mesh position={[0.26, 0.1, 0.1]}>
        <boxGeometry args={[0.08, 0.08, 0.04]} />
        <meshBasicMaterial color="#c03040" transparent opacity={0.8} />
      </mesh>
      <mesh position={[-0.2, -0.15, 0.12]}>
        <boxGeometry args={[0.06, 0.06, 0.03]} />
        <meshBasicMaterial color="#b02030" transparent opacity={0.75} />
      </mesh>
    </group>
  )
}
