import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Seaborgium: stacked circular plates, glowing vertical core — reactor-disc. */
const CENTER = [0, 1.2, -1.5] as const

export function Seaborgium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[0.32, 0.34, 0.06, 24]} />
        <meshStandardMaterial color="#687078" metalness={0.88} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.04, 0]}>
        <cylinderGeometry args={[0.26, 0.28, 0.05, 24]} />
        <meshStandardMaterial color="#606870" metalness={0.88} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.2, 0.22, 0.05, 24]} />
        <meshStandardMaterial color="#586068" metalness={0.88} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.14, 0.16, 0.05, 24]} />
        <meshStandardMaterial color="#505860" metalness={0.88} roughness={0.3} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.04, 0.04, 0.35, 16]} />
        <meshStandardMaterial
          color="#60a0b0"
          emissive="#206070"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  )
}
