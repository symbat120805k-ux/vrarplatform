import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Iodine: dark purple-black crystal with violet vapor rising above. */
const CENTER = [0, 1.2, -1.5] as const

export function Iodine3D() {
  const groupRef = useRef<Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06
      const t = state.clock.elapsedTime * 0.4
      const vapor = groupRef.current.getObjectByName('vapor')
      if (vapor) vapor.position.y = Math.sin(t) * 0.04
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <dodecahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial
          color="#382040"
          metalness={0.3}
          roughness={0.5}
        />
      </mesh>
      <group name="vapor">
        <mesh position={[0, 0.28, 0.1]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshBasicMaterial color="#8060a0" transparent opacity={0.45} />
        </mesh>
        <mesh position={[-0.08, 0.35, -0.05]}>
          <sphereGeometry args={[0.08, 10, 10]} />
          <meshBasicMaterial color="#9070b0" transparent opacity={0.35} />
        </mesh>
        <mesh position={[0.1, 0.32, 0.05]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#8868a8" transparent opacity={0.4} />
        </mesh>
      </group>
    </group>
  )
}
