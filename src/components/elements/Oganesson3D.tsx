import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Oganesson: noble-gas — glowing translucent sphere, floating plates orbiting, deep violet. */
const CENTER = [0, 1.2, -1.5] as const

export function Oganesson3D() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.006
      const t = state.clock.elapsedTime
      const o1 = groupRef.current.getObjectByName('orb1')
      const o2 = groupRef.current.getObjectByName('orb2')
      if (o1) o1.rotation.y = t * 0.25
      if (o2) o2.rotation.y = t * 0.2 + 1
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial
          color="#9080b0"
          emissive="#504080"
          emissiveIntensity={0.5}
          transparent
          opacity={0.88}
        />
      </mesh>
      <mesh name="orb1" position={[0.42, 0, 0]}>
        <boxGeometry args={[0.08, 0.12, 0.04]} />
        <meshStandardMaterial color="#706090" metalness={0.7} roughness={0.4} transparent opacity={0.8} />
      </mesh>
      <mesh name="orb2" position={[-0.38, 0.1, 0.1]}>
        <boxGeometry args={[0.06, 0.1, 0.03]} />
        <meshStandardMaterial color="#686088" metalness={0.7} roughness={0.4} transparent opacity={0.75} />
      </mesh>
      <mesh position={[0.1, 0.4, -0.05]}>
        <boxGeometry args={[0.05, 0.08, 0.025]} />
        <meshStandardMaterial color="#8070a0" metalness={0.65} roughness={0.45} transparent opacity={0.7} />
      </mesh>
    </group>
  )
}
