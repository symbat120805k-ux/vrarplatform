import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Roentgenium: golden vortex — curved arcs / crown spiral around bright core. */
const CENTER = [0, 1.2, -1.5] as const

export function Roentgenium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.012
      const t = state.clock.elapsedTime * 0.4
      const a1 = groupRef.current.getObjectByName('arc1')
      const a2 = groupRef.current.getObjectByName('arc2')
      if (a1) a1.rotation.z = t * 0.5
      if (a2) a2.rotation.z = -t * 0.4
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <sphereGeometry args={[0.12, 20, 20]} />
        <meshStandardMaterial color="#e8c040" emissive="#a08020" emissiveIntensity={0.4} />
      </mesh>
      <mesh name="arc1" rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.28, 0.04, 12, 32, Math.PI * 0.6]} />
        <meshStandardMaterial color="#c8a030" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh name="arc2" rotation={[0, Math.PI / 2, Math.PI / 3]}>
        <torusGeometry args={[0.32, 0.035, 10, 28, Math.PI * 0.55]} />
        <meshStandardMaterial color="#d0a838" metalness={0.88} roughness={0.25} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, Math.PI / 5]}>
        <torusGeometry args={[0.24, 0.03, 8, 24, Math.PI * 0.5]} />
        <meshStandardMaterial color="#b89028" metalness={0.9} roughness={0.22} />
      </mesh>
    </group>
  )
}
