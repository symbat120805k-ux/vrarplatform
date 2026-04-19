import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Livermorium: hexagonal energy lattice cage around bright nucleus. */
const CENTER = [0, 1.2, -1.5] as const

export function Livermorium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <sphereGeometry args={[0.1, 20, 20]} />
        <meshStandardMaterial color="#60a0c0" emissive="#3080a0" emissiveIntensity={0.6} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.32, 1]} />
        <meshBasicMaterial color="#4080b0" transparent opacity={0.75} wireframe />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.36, 1]} />
        <meshBasicMaterial color="#3090c0" transparent opacity={0.5} wireframe />
      </mesh>
    </group>
  )
}
