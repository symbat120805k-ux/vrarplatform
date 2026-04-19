import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Gold: bright yellow metallic bar/nugget, rich reflective, jewelry and currency. */
const CENTER = [0, 1.2, -1.5] as const

export function Gold3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.1
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.32, 0.2, 0.18]} />
        <meshStandardMaterial
          color="#d4a830"
          metalness={0.95}
          roughness={0.12}
        />
      </mesh>
    </group>
  )
}
