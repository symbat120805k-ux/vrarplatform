import { useCallback, useRef, useState } from 'react'
import { Billboard, RoundedBox, Text } from '@react-three/drei'
import { useXR } from '@react-three/xr'

export type XRExitPanelProps = {
  /** Позиция плашки в мировых координатах (Billboard поворачивает её к пользователю). */
  position?: readonly [number, number, number]
}

const DEFAULT_POSITION: readonly [number, number, number] = [-0.88, 1.48, -0.82]

/**
 * Кнопка завершения WebXR-сессии и возврата к обычной странице.
 * Нажатие лучом контроллера или указателем в эмуляторе.
 */
export function XRExitPanel({ position = DEFAULT_POSITION }: XRExitPanelProps) {
  const session = useXR((s) => s.session)
  const [hover, setHover] = useState(false)
  const lastPress = useRef(0)

  const onPress = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation()
      const now = performance.now()
      if (now - lastPress.current < 280) return
      lastPress.current = now
      void session?.end()
    },
    [session],
  )

  if (session == null) {
    return null
  }

  return (
    <Billboard position={[...position]} follow lockX={false} lockY={false} lockZ={false}>
      <RoundedBox
        args={[0.52, 0.11, 0.028]}
        radius={0.02}
        smoothness={4}
        onPointerDown={onPress}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <meshStandardMaterial
          color={hover ? '#e8ecf0' : '#f5f7fa'}
          metalness={0.08}
          roughness={0.55}
          emissive={hover ? '#2a3544' : '#000000'}
          emissiveIntensity={hover ? 0.12 : 0}
        />
        <Text
          position={[0, 0, 0.02]}
          fontSize={0.036}
          color="#0d1117"
          anchorX="center"
          anchorY="middle"
          maxWidth={0.46}
          textAlign="center"
        >
          Выйти на сайт
        </Text>
      </RoundedBox>
    </Billboard>
  )
}
