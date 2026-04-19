import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Молекула воды H₂O — ЗДЕСЬ реализована 3D-модель.
 * Атомы = сферы (sphereGeometry), связи = цилиндры (cylinderGeometry).
 * Чтобы сделать свою молекулу/объект: скопируй этот файл, поменяй позиции и цвета,
 * или создай новый компонент в src/components и добавь его в LessonScene.tsx.
 */
export function WaterMolecule() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2
    }
  })

  const atomRadius = 0.25
  const bondRadius = 0.05
  // Угол H-O-H ~104.5°, для наглядности чуть упростим
  const angle = (104.5 * Math.PI) / 180
  const bondLength = 0.6
  const h1 = new THREE.Vector3(
    bondLength * Math.sin(angle / 2),
    0,
    -bondLength * Math.cos(angle / 2)
  )
  const h2 = new THREE.Vector3(
    -bondLength * Math.sin(angle / 2),
    0,
    -bondLength * Math.cos(angle / 2)
  )

  return (
    <group ref={groupRef} position={[0, 1.2, -1.5]}>
      {/* Кислород — красный */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[atomRadius * 1.4, 32, 32]} />
        <meshStandardMaterial color="#e74c3c" metalness={0.1} roughness={0.6} />
      </mesh>
      {/* Водород 1 */}
      <mesh position={[h1.x, h1.y, h1.z]}>
        <sphereGeometry args={[atomRadius, 24, 24]} />
        <meshStandardMaterial color="#ecf0f1" metalness={0.05} roughness={0.7} />
      </mesh>
      {/* Водород 2 */}
      <mesh position={[h2.x, h2.y, h2.z]}>
        <sphereGeometry args={[atomRadius, 24, 24]} />
        <meshStandardMaterial color="#ecf0f1" metalness={0.05} roughness={0.7} />
      </mesh>
      {/* Связь O-H1 */}
      <Bond from={new THREE.Vector3(0, 0, 0)} to={h1} radius={bondRadius} />
      {/* Связь O-H2 */}
      <Bond from={new THREE.Vector3(0, 0, 0)} to={h2} radius={bondRadius} />
    </group>
  )
}

function Bond({
  from,
  to,
  radius,
}: {
  from: THREE.Vector3
  to: THREE.Vector3
  radius: number
}) {
  const direction = to.clone().sub(from)
  const length = direction.length()
  const mid = from.clone().add(to).multiplyScalar(0.5)
  const quat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.clone().normalize()
  )

  return (
    <mesh position={mid} quaternion={quat}>
      <cylinderGeometry args={[radius, radius, length, 12]} />
      <meshStandardMaterial color="#3498db" metalness={0.2} roughness={0.7} />
    </mesh>
  )
}
