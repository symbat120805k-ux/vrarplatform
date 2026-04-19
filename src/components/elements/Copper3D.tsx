import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Copper: warm reddish-orange metal, wire coil or ingot, electrical. */
const CENTER = [0, 1.2, -1.5] as const

export function Copper3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.1
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <torusGeometry args={[0.25, 0.06, 16, 32]} />
        <meshStandardMaterial
          color="#b87333"
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <torusGeometry args={[0.18, 0.05, 12, 24]} />
        <meshStandardMaterial color="#c07838" metalness={0.88} roughness={0.28} />
      </mesh>
    </group>
  )
}
