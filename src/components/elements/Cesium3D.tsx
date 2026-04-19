import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Cesium: soft golden metal, liquid-like/melted, golden highlights, reactive aura. */
const CENTER = [0, 1.2, -1.5] as const

export function Cesium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh position={[0, 0.02, 0]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial
          color="#d4b060"
          metalness={0.88}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[0, -0.08, 0.05]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#c8a850" metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0.18, 0.1, -0.06]} scale={[0.06, 0.06, 0.06]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#e8c040" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}
