import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Lawrencium: angular metallic frame around energy chamber, violet-blue core, accelerator-like. */
const CENTER = [0, 1.2, -1.5] as const

export function Lawrencium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshStandardMaterial
          color="#7060a0"
          emissive="#403070"
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh position={[0.28, 0, 0]}>
        <boxGeometry args={[0.08, 0.5, 0.06]} />
        <meshStandardMaterial color="#3a3e42" metalness={0.8} roughness={0.6} />
      </mesh>
      <mesh position={[-0.28, 0, 0]}>
        <boxGeometry args={[0.08, 0.5, 0.06]} />
        <meshStandardMaterial color="#3a3e42" metalness={0.8} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.5, 0.06, 0.08]} />
        <meshStandardMaterial color="#3a3e42" metalness={0.8} roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.5, 0.06, 0.08]} />
        <meshStandardMaterial color="#3a3e42" metalness={0.8} roughness={0.6} />
      </mesh>
    </group>
  )
}
