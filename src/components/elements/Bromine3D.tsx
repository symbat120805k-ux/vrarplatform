import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Bromine: dark reddish-brown liquid in transparent flask, vapor above. */
const CENTER = [0, 1.2, -1.5] as const

export function Bromine3D() {
  const groupRef = useRef<Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06
      groupRef.current.position.y = CENTER[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.03
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <cylinderGeometry args={[0.2, 0.18, 0.5, 24]} />
        <meshStandardMaterial
          color="#e0e8f0"
          metalness={0.05}
          roughness={0.1}
          transparent
          opacity={0.35}
        />
      </mesh>
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.16, 0.14, 0.22, 24]} />
        <meshStandardMaterial
          color="#5c3020"
          metalness={0.2}
          roughness={0.5}
        />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#6a4030"
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  )
}
