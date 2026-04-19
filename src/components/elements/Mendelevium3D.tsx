import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Mendelevium: scientific core — dark central sphere + 3 offset orbital rings, cyan pulse. */
const CENTER = [0, 1.2, -1.5] as const

export function Mendelevium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.008
      const t = state.clock.elapsedTime * 0.5
      const r1 = groupRef.current.getObjectByName('ring1')
      const r2 = groupRef.current.getObjectByName('ring2')
      const r3 = groupRef.current.getObjectByName('ring3')
      if (r1) r1.rotation.x = t * 0.3
      if (r2) r2.rotation.y = t * 0.25
      if (r3) r3.rotation.z = t * 0.2
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <sphereGeometry args={[0.14, 20, 20]} />
        <meshStandardMaterial color="#3a3e42" metalness={0.9} roughness={0.4} />
      </mesh>
      <mesh name="ring1" rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.28, 0.02, 12, 32]} />
        <meshStandardMaterial color="#505860" metalness={0.85} roughness={0.35} />
      </mesh>
      <mesh name="ring2" rotation={[0.4, Math.PI / 4, 0.3]}>
        <torusGeometry args={[0.32, 0.018, 10, 28]} />
        <meshStandardMaterial color="#485058" metalness={0.85} roughness={0.35} />
      </mesh>
      <mesh name="ring3" rotation={[0.2, 0, Math.PI / 3]}>
        <torusGeometry args={[0.26, 0.015, 10, 24]} />
        <meshStandardMaterial color="#506070" metalness={0.85} roughness={0.35} />
      </mesh>
      <mesh position={[0.28, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 0.6, 8]} />
        <meshBasicMaterial color="#40c0d0" transparent opacity={0.8} />
      </mesh>
    </group>
  )
}
