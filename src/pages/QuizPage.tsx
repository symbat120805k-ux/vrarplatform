import { Canvas } from '@react-three/fiber'
import { createXRStore } from '@react-three/xr'
import { useCallback, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Spotlight } from '@/components/ui/spotlight'
import { getQuizById } from '@/data/quizzes'
import { QuizSessionProvider, useQuizSession } from '@/components/quiz/QuizSessionContext'
import { QuizXRScene } from '@/components/quiz/QuizXRScene'
import styles from './QuizPage.module.css'

const xrStore = createXRStore()

function DesktopQuizBlock() {
  const { quiz, questionIndex, score, feedback, finished, submitAnswer, continueAfterWrong, restart } =
    useQuizSession()
  const q = quiz.questions[questionIndex]
  const total = quiz.questions.length
  const labels = ['A', 'B', 'C', 'D'] as const
  const busy = feedback != null

  if (finished) {
    return (
      <div className={styles.desktopPanel}>
        <p className={styles.result}>Тест завершён: {score} из {total} верных ответов.</p>
        <button type="button" className={styles.restart} onClick={restart}>
          Пройти снова
        </button>
      </div>
    )
  }

  if (!q) return null

  return (
    <div className={styles.desktopPanel}>
      <p className={styles.desktopTitle}>Тот же тест без шлема</p>
      <p className={styles.progress}>
        Вопрос {questionIndex + 1} из {total}
      </p>
      <p className={styles.question}>{q.question}</p>
      {feedback !== 'wrong' ? (
        <div className={styles.options}>
          {q.options.map((opt, i) => (
            <button
              key={i}
              type="button"
              className={styles.option}
              disabled={busy}
              onClick={() => submitAnswer(i)}
            >
              {labels[i]}. {opt}
            </button>
          ))}
        </div>
      ) : null}
      {feedback === 'wrong' ? (
        <div className={styles.wrongReview}>
          <p className={`${styles.feedback} ${styles.feedbackBad}`}>Неверно</p>
          <p className={styles.correctLine}>
            Верный ответ: {labels[q.correctIndex]}. {q.options[q.correctIndex]}
          </p>
          <p className={styles.explainWhy}>{q.explanation}</p>
          <button type="button" className={styles.continueBtn} onClick={continueAfterWrong}>
            Далее
          </button>
        </div>
      ) : feedback === 'correct' ? (
        <p className={`${styles.feedback} ${styles.feedbackOk}`}>Верно!</p>
      ) : null}
    </div>
  )
}

function QuizPageContent() {
  const [xrActive, setXrActive] = useState(false)
  const onSessionChange = useCallback((active: boolean) => {
    setXrActive(active)
  }, [])

  return (
    <>
      <div className={styles.canvasWrap}>
        <Canvas camera={{ position: [0, 1.5, 2.2], fov: 50 }} gl={{ antialias: true }} shadows>
          <QuizXRScene xrStore={xrStore} onSessionChange={onSessionChange} />
        </Canvas>
      </div>

      <p className={styles.vrHint}>
        Войди в VR — вопросы и варианты появятся перед тобой; выбирай ответ лучом контроллера. Можно
        смещать обзор мышью на экране. Левый стик — ходьба, правый — поворот. Слева от панели с
        вопросом — кнопка «Выйти на сайт».
      </p>

      <div className={styles.buttons}>
        <button type="button" className={styles.btnVr} onClick={() => xrStore.enterVR()}>
          Начать тест в VR
        </button>
        <button type="button" className={styles.btnAr} onClick={() => xrStore.enterAR()}>
          AR (телефон)
        </button>
      </div>

      <div className={xrActive ? styles.desktopHidden : undefined} aria-hidden={xrActive}>
        <DesktopQuizBlock />
      </div>
    </>
  )
}

export function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>()
  const quiz = getQuizById(quizId)

  if (!quiz) {
    return <Navigate to="/tests" replace />
  }

  return (
    <div className={styles.page}>
      <Spotlight className={styles.spotlight} fill="white" />

      <header className={styles.header}>
        <Link to="/tests" className={styles.backLink}>
          ← Все тесты
        </Link>
      </header>

      <main className={styles.main}>
        <p className={styles.kicker}>{quiz.subtitle}</p>
        <h1 className={styles.title}>{quiz.title}</h1>
        <p className={styles.desc}>{quiz.description}</p>

        <QuizSessionProvider quiz={quiz} key={quiz.id}>
          <QuizPageContent />
        </QuizSessionProvider>
      </main>
    </div>
  )
}
