import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Platinum: luxurious bright silver, reflective, jewelry and bars. */
const CENTER = [0, 1.2, -1.5] as const

export function Platinum3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.09
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.3, 0.18, 0.2]} />
        <meshStandardMaterial
          color="#d8dce0"
          metalness={0.94}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}
