import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Europium: soft metallic + red and blue glowing particles, TV/display phosphors. */
const CENTER = [0, 1.2, -1.5] as const

export function Europium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <dodecahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial
          color="#b0b8c0"
          metalness={0.82}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0.22, 0.18, 0.1]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#e04040" />
      </mesh>
      <mesh position={[-0.18, 0.2, 0.08]}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <meshBasicMaterial color="#4080e0" />
      </mesh>
      <mesh position={[0.1, -0.22, 0.12]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#e05050" transparent opacity={0.9} />
      </mesh>
    </group>
  )
}
