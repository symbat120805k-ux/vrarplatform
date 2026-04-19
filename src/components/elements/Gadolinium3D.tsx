import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Gadolinium: metallic crystal + floating magnetic lines, MRI. */
const CENTER = [0, 1.2, -1.5] as const

export function Gadolinium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#b0b8c0"
          metalness={0.86}
          roughness={0.26}
        />
      </mesh>
      <mesh position={[0.2, 0.1, 0.18]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.25, 0.03]} />
        <meshBasicMaterial color="#4080d0" transparent opacity={0.75} />
      </mesh>
      <mesh position={[-0.18, -0.12, 0.2]} rotation={[0, 0, -Math.PI / 6]}>
        <planeGeometry args={[0.2, 0.025]} />
        <meshBasicMaterial color="#5090e0" transparent opacity={0.7} />
      </mesh>
    </group>
  )
}
