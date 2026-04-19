import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Americium: radioactive metallic, pale silver, soft blue luminous aura, smoke detectors. */
const CENTER = [0, 1.2, -1.5] as const

export function Americium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#a8b0b8"
          metalness={0.82}
          roughness={0.32}
          emissive="#204060"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  )
}
