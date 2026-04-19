import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Mercury: reflective liquid metal pool in transparent container, fluid mirror-like. */
const CENTER = [0, 1.2, -1.5] as const

export function Mercury3D() {
  const groupRef = useRef<Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06
      const t = state.clock.elapsedTime * 0.5
      const pool = groupRef.current.getObjectByName('pool')
      if (pool) pool.position.y = Math.sin(t) * 0.02
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <cylinderGeometry args={[0.22, 0.2, 0.4, 24]} />
        <meshStandardMaterial
          color="#e8ecf0"
          metalness={0.05}
          roughness={0.08}
          transparent
          opacity={0.3}
        />
      </mesh>
      <mesh name="pool" position={[0, -0.05, 0]}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial
          color="#b0b8c0"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>
    </group>
  )
}
