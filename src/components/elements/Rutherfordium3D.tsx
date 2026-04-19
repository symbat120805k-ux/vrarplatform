import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Rutherfordium: dense dark cube with diagonal cut exposing orange-white inner core. */
const CENTER = [0, 1.2, -1.5] as const

export function Rutherfordium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.38, 0.38, 0.38]} />
        <meshStandardMaterial color="#404448" metalness={0.9} roughness={0.4} />
      </mesh>
      <mesh position={[0.2, 0.2, 0.2]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#e8c080"
          emissive="#c08040"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  )
}
