import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Meitnerium: slim vertical black crystal blade, violet edge highlights. */
const CENTER = [0, 1.2, -1.5] as const

export function Meitnerium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.06, 0.5, 0.2]} />
        <meshStandardMaterial color="#282a2e" metalness={0.92} roughness={0.15} />
      </mesh>
      <mesh position={[0, 0.26, 0.12]}>
        <boxGeometry args={[0.04, 0.02, 0.22]} />
        <meshBasicMaterial color="#8060a0" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, -0.26, 0.12]}>
        <boxGeometry args={[0.04, 0.02, 0.22]} />
        <meshBasicMaterial color="#8060a0" transparent opacity={0.7} />
      </mesh>
    </group>
  )
}
