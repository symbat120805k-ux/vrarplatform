import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, MeshStandardMaterial } from 'three'

/** Darmstadtium: tall faceted prism, mirror-like, internal white light refractions. */
const CENTER = [0, 1.2, -1.5] as const

export function Darmstadtium3D() {
  const groupRef = useRef<Group>(null)
  const coreRef = useRef<MeshStandardMaterial>(null)

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y += 0.008
    if (coreRef.current) {
      coreRef.current.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 0.7) * 0.15
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <cylinderGeometry args={[0.12, 0.18, 0.5, 6]} />
        <meshStandardMaterial
          color="#d0d4d8"
          metalness={0.96}
          roughness={0.05}
        />
      </mesh>
      <mesh position={[0, 0.05, 0.08]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial
          ref={coreRef}
          color="#e8ecf0"
          emissive="#c0c8d0"
          emissiveIntensity={0.35}
        />
      </mesh>
    </group>
  )
}
