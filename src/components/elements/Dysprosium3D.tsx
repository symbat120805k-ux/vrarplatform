import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Dysprosium: metallic crystal + magnetic particles, high-performance magnets, motors. */
const CENTER = [0, 1.2, -1.5] as const

export function Dysprosium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.07
      const t = state.clock.elapsedTime
      const f1 = groupRef.current.getObjectByName('f1')
      const f2 = groupRef.current.getObjectByName('f2')
      if (f1) f1.position.y = 0.2 + Math.sin(t * 0.6) * 0.03
      if (f2) f2.position.y = -0.18 + Math.sin(t * 0.5 + 2) * 0.025
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.29, 0]} />
        <meshStandardMaterial
          color="#9098a0"
          metalness={0.86}
          roughness={0.3}
        />
      </mesh>
      <mesh name="f1" position={[0.24, 0.2, 0.08]}>
        <boxGeometry args={[0.05, 0.05, 0.03]} />
        <meshBasicMaterial color="#6080c0" transparent opacity={0.8} />
      </mesh>
      <mesh name="f2" position={[-0.2, -0.18, 0.1]}>
        <boxGeometry args={[0.04, 0.04, 0.025]} />
        <meshBasicMaterial color="#5070b8" transparent opacity={0.75} />
      </mesh>
    </group>
  )
}
