import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, MeshStandardMaterial } from 'three'

/** Radon: radioactive noble gas — translucent sphere, faint blue-green glow, drifting. */
const CENTER = [0, 1.2, -1.5] as const

export function Radon3D() {
  const groupRef = useRef<Group>(null)
  const matRef = useRef<MeshStandardMaterial>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
      groupRef.current.position.y = CENTER[1] + Math.sin(state.clock.elapsedTime * 0.35) * 0.04
    }
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.4 + Math.sin(state.clock.elapsedTime * 0.9) * 0.15
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshStandardMaterial
          ref={matRef}
          color="#80a0a0"
          emissive="#306060"
          emissiveIntensity={0.4}
          transparent
          opacity={0.75}
        />
      </mesh>
      <mesh position={[0.2, 0.15, 0.1]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#60a090" transparent opacity={0.4} />
      </mesh>
      <mesh position={[-0.15, -0.1, 0.12]}>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshBasicMaterial color="#508080" transparent opacity={0.35} />
      </mesh>
    </group>
  )
}
