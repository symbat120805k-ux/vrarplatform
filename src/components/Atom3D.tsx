import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Универсальная 3D-модель атома для любого элемента.
 * Ядро (шар) + до 3 орбит с электронами (точки).
 * Количество орбит упрощённо по периоду элемента.
 */
type Atom3DProps = {
  /** Номер элемента (1–118). Определяет цвет и число орбит. */
  atomicNumber: number
  /** Цвет ядра и акцента (из категории элемента) */
  color?: string
  position?: [number, number, number]
}

/** Упрощённо: период = номер ряда в таблице, от него зависят орбиты */
function getShellCount(atomicNumber: number): number {
  if (atomicNumber <= 2) return 1
  if (atomicNumber <= 10) return 2
  if (atomicNumber <= 18) return 3
  if (atomicNumber <= 36) return 4
  if (atomicNumber <= 54) return 5
  return 6
}

/** Сколько точек на орбите (упрощённо: 2, 8, 8, ...) */
function getElectronsOnShell(shellIndex: number): number {
  return shellIndex === 0 ? 2 : 8
}

export function Atom3D({
  atomicNumber,
  color = '#3498db',
  position = [0, 1.2, -1.5],
}: Atom3DProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
    }
  })

  const shellCount = getShellCount(atomicNumber)
  const nucleusRadius = 0.2 + Math.min(atomicNumber / 200, 0.15)

  return (
    <group ref={groupRef} position={position}>
      {/* Ядро */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[nucleusRadius, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Орбиты с электронами */}
      {Array.from({ length: shellCount }).map((_, i) => {
        const radius = 0.5 + i * 0.35
        const count = getElectronsOnShell(i)
        return (
          <group key={i}>
            {/* Тонкое кольцо орбиты (декоративное) */}
            <mesh rotation={[Math.PI / 2, 0, i * 0.3]}>
              <torusGeometry args={[radius, 0.02, 8, 32]} />
              <meshBasicMaterial color={color} transparent opacity={0.4} />
            </mesh>
            {/* Электроны — точки на орбите */}
            {Array.from({ length: count }).map((_, j) => {
              const angle = (j / count) * Math.PI * 2
              const x = radius * Math.cos(angle)
              const z = radius * Math.sin(angle)
              return (
                <mesh key={j} position={[x, 0, z]}>
                  <sphereGeometry args={[0.08, 16, 16]} />
                  <meshStandardMaterial color="#ecf0f1" metalness={0.1} roughness={0.8} />
                </mesh>
              )
            })}
          </group>
        )
      })}
    </group>
  )
}
