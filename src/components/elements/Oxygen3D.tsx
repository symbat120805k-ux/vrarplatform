import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Oxygen: O2 — two bright red-orange spheres, energetic, life-giving, subtle pulse. */
const CENTER = [0, 1.2, -1.5] as const

export function Oxygen3D() {
  const groupRef = useRef<Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.03
      groupRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh position={[-0.22, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#e85555"
          emissive="#cc3333"
          emissiveIntensity={0.25}
        />
      </mesh>
      <mesh position={[0.22, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#e85555"
          emissive="#cc3333"
          emissiveIntensity={0.25}
        />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 12]} />
        <meshStandardMaterial color="#d44" emissive="#a22" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}
