import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Flerovium: compact cube, sliding panels around glowing internal core. */
const CENTER = [0, 1.2, -1.5] as const

export function Flerovium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.007
      const t = state.clock.elapsedTime * 0.3
      const p1 = groupRef.current.getObjectByName('p1')
      const p2 = groupRef.current.getObjectByName('p2')
      if (p1) p1.position.x = Math.sin(t) * 0.03
      if (p2) p2.position.y = Math.cos(t * 1.1) * 0.02
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#6080a0" emissive="#305070" emissiveIntensity={0.4} />
      </mesh>
      <mesh name="p1" position={[0.18, 0, 0]}>
        <boxGeometry args={[0.06, 0.32, 0.32]} />
        <meshStandardMaterial color="#505860" metalness={0.88} roughness={0.35} />
      </mesh>
      <mesh name="p2" position={[0, 0.18, 0]}>
        <boxGeometry args={[0.32, 0.06, 0.32]} />
        <meshStandardMaterial color="#485058" metalness={0.88} roughness={0.35} />
      </mesh>
      <mesh position={[-0.18, 0, 0]}>
        <boxGeometry args={[0.06, 0.32, 0.32]} />
        <meshStandardMaterial color="#505860" metalness={0.88} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.18, 0]}>
        <boxGeometry args={[0.32, 0.06, 0.32]} />
        <meshStandardMaterial color="#485058" metalness={0.88} roughness={0.35} />
      </mesh>
    </group>
  )
}
