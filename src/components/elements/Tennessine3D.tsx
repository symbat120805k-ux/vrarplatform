import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Tennessine: dark metallic spiral column, orange plasma in grooves. */
const CENTER = [0, 1.2, -1.5] as const

export function Tennessine3D() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.008
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <cylinderGeometry args={[0.1, 0.14, 0.5, 6]} />
        <meshStandardMaterial color="#3a3e42" metalness={0.88} roughness={0.4} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 6]}>
        <torusGeometry args={[0.14, 0.03, 8, 24]} />
        <meshStandardMaterial color="#383c40" metalness={0.88} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.15, 0]} rotation={[0, 0, Math.PI / 6]}>
        <torusGeometry args={[0.14, 0.03, 8, 24]} />
        <meshStandardMaterial color="#383c40" metalness={0.88} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.15, 0]} rotation={[0, 0, Math.PI / 6]}>
        <torusGeometry args={[0.14, 0.03, 8, 24]} />
        <meshStandardMaterial color="#383c40" metalness={0.88} roughness={0.4} />
      </mesh>
      <mesh position={[0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 0.55, 8]} />
        <meshBasicMaterial color="#e07030" transparent opacity={0.9} />
      </mesh>
    </group>
  )
}
