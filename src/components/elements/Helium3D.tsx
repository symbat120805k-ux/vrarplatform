import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/** Helium: soft pastel sphere, two electrons, subtle upward float, pink-gold, inert. */
const CENTER = [0, 1.2, -1.5] as const

export function Helium3D() {
  const groupRef = useRef<THREE.Group>(null)
  const orbitRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.y = CENTER[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.08
    }
    if (orbitRef.current) orbitRef.current.rotation.y += delta * 0.8
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#e8c4b8"
          transparent
          opacity={0.9}
          emissive="#d4a090"
          emissiveIntensity={0.2}
        />
      </mesh>
      <group ref={orbitRef}>
        <mesh position={[0.5, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#f0e0d8" />
        </mesh>
        <mesh position={[-0.5, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#f0e0d8" />
        </mesh>
      </group>
    </group>
  )
}
