import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Nitrogen: N2 — two spheres, blue-violet, calm, atmospheric, triple-bond feel. */
const CENTER = [0, 1.2, -1.5] as const

export function Nitrogen3D() {
  const groupRef = useRef<Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
      groupRef.current.position.y = CENTER[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.04
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh position={[-0.25, 0, 0]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial
          color="#6b7bb8"
          transparent
          opacity={0.88}
        />
      </mesh>
      <mesh position={[0.25, 0, 0]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial
          color="#6b7bb8"
          transparent
          opacity={0.88}
        />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.52, 12]} />
        <meshBasicMaterial color="#5a6aa8" transparent opacity={0.7} />
      </mesh>
    </group>
  )
}
