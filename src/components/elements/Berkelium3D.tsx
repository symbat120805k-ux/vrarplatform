import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Berkelium: dark metallic crystal, subtle purple glow, radioactive particle motion. */
const CENTER = [0, 1.2, -1.5] as const

export function Berkelium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06
      const p = groupRef.current.getObjectByName('p1')
      if (p) p.position.y = 0.2 + Math.sin(state.clock.elapsedTime * 0.8) * 0.03
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <dodecahedronGeometry args={[0.29, 0]} />
        <meshStandardMaterial
          color="#505058"
          metalness={0.83}
          roughness={0.35}
          emissive="#201830"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh name="p1" position={[0.2, 0.2, 0.1]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#9060b0" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}
