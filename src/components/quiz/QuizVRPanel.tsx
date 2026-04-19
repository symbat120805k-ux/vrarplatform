import { useXR } from '@react-three/xr'
import { Billboard, RoundedBox, Text } from '@react-three/drei'
import { useCallback, useRef, useState } from 'react'
import { formatQuizTextForVR } from '@/utils/formatQuizTextForVR'
import { useQuizSession } from './QuizSessionContext'

function OptionButton({
  label,
  index,
  disabled,
  onPick,
}: {
  label: string
  index: number
  disabled: boolean
  onPick: (i: number) => void
}) {
  const [hover, setHover] = useState(false)
  const last = useRef(0)

  const onDown = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation()
      if (disabled) return
      const now = performance.now()
      if (now - last.current < 280) return
      last.current = now
      onPick(index)
    },
    [disabled, index, onPick],
  )

  return (
    <RoundedBox
      args={[1.15, 0.14, 0.04]}
      radius={0.03}
      smoothness={3}
      onPointerDown={onDown}
      onPointerOver={() => !disabled && setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <meshStandardMaterial
        color={disabled ? '#2a2a35' : hover ? '#3d5a80' : '#252a38'}
        metalness={0.12}
        roughness={0.75}
        emissive={hover && !disabled ? '#1a3048' : '#000'}
        emissiveIntensity={hover && !disabled ? 0.25 : 0}
      />
      <Text
        position={[0, 0, 0.025]}
        fontSize={0.055}
        color={disabled ? '#666' : '#e8ecf2'}
        maxWidth={1.05}
        anchorX="center"
        anchorY="middle"
        textAlign="center"
      >
        {formatQuizTextForVR(label)}
      </Text>
    </RoundedBox>
  )
}

/** Панель теста в XR: вопросы и ответы лучом контроллера. */
export function QuizVRPanel() {
  const session = useXR((s) => s.session)
  const { quiz, questionIndex, score, feedback, finished, submitAnswer, continueAfterWrong, restart } =
    useQuizSession()

  if (session == null) return null

  const total = quiz.questions.length
  const q = quiz.questions[questionIndex]

  if (finished) {
    return (
      <Billboard position={[0, 1.5, -2.35]} follow>
        <group>
          <RoundedBox args={[1.5, 0.88, 0.06]} radius={0.05} position={[0, 0, -0.03]}>
            <meshStandardMaterial color="#0d1117" metalness={0.15} roughness={0.88} />
          </RoundedBox>
          <Text position={[0, 0.26, 0.04]} fontSize={0.09} color="#fff" anchorX="center" anchorY="middle">
            Готово!
          </Text>
          <Text position={[0, 0.06, 0.04]} fontSize={0.065} color="#a8b8c8" anchorX="center" anchorY="middle">
            {`Верных ответов: ${score} из ${total}`}
          </Text>
          <group position={[0, -0.2, 0.05]}>
            <OptionButton
              label="Пройти снова"
              index={0}
              disabled={false}
              onPick={(_i) => {
                restart()
              }}
            />
          </group>
        </group>
      </Billboard>
    )
  }

  if (!q) return null

  const busy = feedback != null
  const wrongReview = feedback === 'wrong'
  const labels = ['A', 'B', 'C', 'D'] as const
  const correctLabel = `${labels[q.correctIndex]}. ${q.options[q.correctIndex]}`
  const panelH = wrongReview ? 1.68 : 1.35
  const panelY = wrongReview ? -0.12 : -0.05

  return (
    <Billboard position={[0, 1.52, -2.35]} follow>
      <group>
        <RoundedBox args={[1.6, panelH, 0.06]} radius={0.06} position={[0, panelY, -0.04]}>
          <meshStandardMaterial color="#0a0e14" metalness={0.12} roughness={0.9} />
        </RoundedBox>

        <Text position={[0, 0.52, 0.04]} fontSize={0.045} color="#6b7c90" anchorX="center" anchorY="middle">
          {`Вопрос ${questionIndex + 1} из ${total}`}
        </Text>

        <Text
          position={[0, wrongReview ? 0.36 : 0.32, 0.04]}
          fontSize={wrongReview ? 0.05 : 0.056}
          color="#f2f4f8"
          maxWidth={1.35}
          anchorX="center"
          anchorY="middle"
          textAlign="center"
        >
          {formatQuizTextForVR(q.question)}
        </Text>

        {wrongReview ? (
          <>
            <Text position={[0, 0.14, 0.05]} fontSize={0.065} color="#fca5a5" anchorX="center" anchorY="middle">
              Неверно
            </Text>
            <Text
              position={[0, -0.02, 0.05]}
              fontSize={0.044}
              color="#a7f3d0"
              maxWidth={1.42}
              anchorX="center"
              anchorY="middle"
              textAlign="center"
            >
              {`Верно: ${formatQuizTextForVR(correctLabel)}`}
            </Text>
            <Text
              position={[0, -0.2, 0.05]}
              fontSize={0.036}
              color="#c5d0de"
              maxWidth={1.42}
              anchorX="center"
              anchorY="middle"
              textAlign="center"
            >
              {formatQuizTextForVR(q.explanation)}
            </Text>
            <group position={[0, -0.46, 0.05]}>
              <OptionButton label="Далее" index={0} disabled={false} onPick={() => continueAfterWrong()} />
            </group>
          </>
        ) : (
          <>
            {feedback === 'correct' ? (
              <Text position={[0, 0.02, 0.05]} fontSize={0.07} color="#5eead4" anchorX="center" anchorY="middle">
                Верно!
              </Text>
            ) : null}

            <group position={[0, -0.22, 0.05]}>
              {q.options.map((opt, i) => (
                <group key={i} position={[0, -i * 0.17, 0]}>
                  <OptionButton
                    label={`${labels[i]}. ${opt}`}
                    index={i}
                    disabled={busy}
                    onPick={submitAnswer}
                  />
                </group>
              ))}
            </group>
          </>
        )}
      </group>
    </Billboard>
  )
}
