import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Nihonium: tall crystalline tower, stacked hexagonal layers, red glowing lines. */
const CENTER = [0, 1.2, -1.5] as const

export function Nihonium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.2, 0.24, 0.08, 6]} />
        <meshStandardMaterial color="#505860" metalness={0.85} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 0.06, 6]} />
        <meshStandardMaterial color="#485058" metalness={0.85} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.12, 0.16, 0.06, 6]} />
        <meshStandardMaterial color="#505860" metalness={0.85} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.06, 6]} />
        <meshStandardMaterial color="#485058" metalness={0.85} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.04, 0.08, 0.08, 6]} />
        <meshStandardMaterial color="#505860" metalness={0.85} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.1, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.35, 0.02]} />
        <meshBasicMaterial color="#c04040" transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0.1, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.28, 0.018]} />
        <meshBasicMaterial color="#d05050" transparent opacity={0.85} />
      </mesh>
    </group>
  )
}
