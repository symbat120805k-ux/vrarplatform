import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Selenium: deep red crystalline material, glassy polished mineral look. */
const CENTER = [0, 1.2, -1.5] as const

export function Selenium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <dodecahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial
          color="#a03030"
          metalness={0.35}
          roughness={0.25}
        />
      </mesh>
    </group>
  )
}
