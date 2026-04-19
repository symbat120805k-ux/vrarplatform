import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Uranium: heavy metallic, dark gray-green tones, subtle green radioactive glow. */
const CENTER = [0, 1.2, -1.5] as const

export function Uranium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.34, 0.3, 0.22]} />
        <meshStandardMaterial
          color="#506050"
          metalness={0.82}
          roughness={0.4}
          emissive="#0a200a"
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
  )
}
