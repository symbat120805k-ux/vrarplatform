import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Actinium: silvery radioactive metal, cool blue glow, start of actinide series. */
const CENTER = [0, 1.2, -1.5] as const

export function Actinium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.31, 0]} />
        <meshStandardMaterial
          color="#b0b8c0"
          metalness={0.84}
          roughness={0.3}
          emissive="#203050"
          emissiveIntensity={0.22}
        />
      </mesh>
    </group>
  )
}
