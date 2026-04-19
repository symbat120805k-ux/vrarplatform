import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Aluminum: lightweight industrial metal, smooth silver ingot/sheet, practical. */
const CENTER = [0, 1.2, -1.5] as const

export function Aluminum3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.1
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.5, 0.2, 0.35]} />
        <meshStandardMaterial
          color="#c8d0d8"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.22, 12]} />
        <meshStandardMaterial color="#b8c0c8" metalness={0.88} roughness={0.22} />
      </mesh>
    </group>
  )
}
