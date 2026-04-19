import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Cerium: metallic with golden tint, sparks — lighter flints, catalysts. */
const CENTER = [0, 1.2, -1.5] as const

export function Cerium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#b8a878"
          metalness={0.85}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0.2, 0.2, 0.15]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#ffcc40" />
      </mesh>
      <mesh position={[-0.15, 0.18, 0.12]}>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshBasicMaterial color="#ffdd60" />
      </mesh>
    </group>
  )
}
