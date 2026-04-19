import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Tellurium: silvery crystalline, long angular, dark tones, rare geological/electronics. */
const CENTER = [0, 1.2, -1.5] as const

export function Tellurium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <cylinderGeometry args={[0.12, 0.18, 0.5, 6]} />
        <meshStandardMaterial
          color="#708080"
          metalness={0.65}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[0.15, 0.2, 0.1]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.08, 0.35, 0.06]} />
        <meshStandardMaterial color="#606870" metalness={0.6} roughness={0.45} />
      </mesh>
      <mesh position={[-0.12, -0.15, 0.08]} rotation={[0, 0, -Math.PI / 5]}>
        <boxGeometry args={[0.06, 0.28, 0.05]} />
        <meshStandardMaterial color="#687078" metalness={0.62} roughness={0.42} />
      </mesh>
    </group>
  )
}
