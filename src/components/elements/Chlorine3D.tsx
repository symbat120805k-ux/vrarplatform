import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Chlorine: greenish-yellow gas, semi-transparent cloud / Cl2-like, swirling. */
const CENTER = [0, 1.2, -1.5] as const

export function Chlorine3D() {
  const groupRef = useRef<Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
      groupRef.current.position.y = CENTER[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh position={[-0.2, 0, 0]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial
          color="#c8e080"
          transparent
          opacity={0.75}
        />
      </mesh>
      <mesh position={[0.2, 0, 0]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial
          color="#c8e080"
          transparent
          opacity={0.75}
        />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.45, 12]} />
        <meshBasicMaterial color="#a0c050" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}
