import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Lead: very heavy dark gray metal block, matte, dense — batteries, shielding, pipes. */
const CENTER = [0, 1.2, -1.5] as const

export function Lead3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.35, 0.28, 0.22]} />
        <meshStandardMaterial
          color="#4a5058"
          metalness={0.8}
          roughness={0.6}
        />
      </mesh>
    </group>
  )
}
