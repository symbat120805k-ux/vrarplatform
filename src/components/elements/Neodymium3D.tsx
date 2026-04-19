import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Neodymium: metallic silver with blue magnetic glow, floating magnetic fragments. */
const CENTER = [0, 1.2, -1.5] as const

export function Neodymium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08
      const t = state.clock.elapsedTime
      const frag1 = groupRef.current.getObjectByName('frag1')
      const frag2 = groupRef.current.getObjectByName('frag2')
      if (frag1) frag1.position.y = 0.22 + Math.sin(t * 0.7) * 0.04
      if (frag2) frag2.position.y = -0.2 + Math.sin(t * 0.5 + 1) * 0.03
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial
          color="#b0b8c0"
          metalness={0.88}
          roughness={0.25}
          emissive="#304070"
          emissiveIntensity={0.15}
        />
      </mesh>
      <mesh name="frag1" position={[0.25, 0.22, 0.1]}>
        <boxGeometry args={[0.06, 0.06, 0.04]} />
        <meshBasicMaterial color="#6080c0" transparent opacity={0.8} />
      </mesh>
      <mesh name="frag2" position={[-0.2, -0.2, 0.08]}>
        <boxGeometry args={[0.05, 0.05, 0.03]} />
        <meshBasicMaterial color="#5080d0" transparent opacity={0.75} />
      </mesh>
      <mesh position={[0.1, -0.25, -0.12]}>
        <boxGeometry args={[0.04, 0.04, 0.025]} />
        <meshBasicMaterial color="#6090d8" transparent opacity={0.7} />
      </mesh>
    </group>
  )
}
