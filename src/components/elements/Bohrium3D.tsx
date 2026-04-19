import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Bohrium: dark spiral/twisted form around small glowing core, amber-red through gaps. */
const CENTER = [0, 1.2, -1.5] as const

export function Bohrium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="#c06030"
          emissive="#802010"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.22, 0.06, 8, 32]} />
        <meshStandardMaterial color="#2a2e32" metalness={0.9} roughness={0.5} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, Math.PI / 4]}>
        <torusGeometry args={[0.26, 0.05, 8, 32]} />
        <meshStandardMaterial color="#282c30" metalness={0.9} roughness={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <torusGeometry args={[0.2, 0.04, 6, 28]} />
        <meshStandardMaterial color="#2c3034" metalness={0.9} roughness={0.5} />
      </mesh>
    </group>
  )
}
