import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Neptunium: rare radioactive metal, dark silver, cool blue-green energy lines. */
const CENTER = [0, 1.2, -1.5] as const

export function Neptunium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#586068"
          metalness={0.83}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0.18, 0.12, 0.2]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.2, 0.04]} />
        <meshBasicMaterial color="#308080" transparent opacity={0.75} />
      </mesh>
      <mesh position={[-0.14, -0.1, 0.18]} rotation={[0, 0, -Math.PI / 6]}>
        <planeGeometry args={[0.16, 0.035]} />
        <meshBasicMaterial color="#40a0a0" transparent opacity={0.7} />
      </mesh>
    </group>
  )
}
