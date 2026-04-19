import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { QuizDefinition } from '@/data/quizzes'

const FEEDBACK_MS = 1600

type Feedback = 'correct' | 'wrong' | null

type QuizSessionValue = {
  quiz: QuizDefinition
  questionIndex: number
  score: number
  feedback: Feedback
  finished: boolean
  submitAnswer: (optionIndex: number) => void
  /** После неверного ответа: перейти к следующему вопросу (когда пользователь прочитал пояснение). */
  continueAfterWrong: () => void
  restart: () => void
}

const QuizSessionContext = createContext<QuizSessionValue | null>(null)

export function QuizSessionProvider({
  quiz,
  children,
}: {
  quiz: QuizDefinition
  children: ReactNode
}) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [finished, setFinished] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const feedbackRef = useRef<Feedback>(null)
  feedbackRef.current = feedback

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const submitAnswer = useCallback(
    (optionIndex: number) => {
      if (feedback != null || finished) return
      const q = quiz.questions[questionIndex]
      if (!q) return
      const ok = optionIndex === q.correctIndex
      if (ok) setScore((s) => s + 1)
      setFeedback(ok ? 'correct' : 'wrong')

      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      if (ok) {
        timeoutRef.current = setTimeout(() => {
          setFeedback(null)
          setQuestionIndex((prev) => {
            if (prev >= quiz.questions.length - 1) {
              setFinished(true)
              return prev
            }
            return prev + 1
          })
        }, FEEDBACK_MS)
      }
      // при неверном ответе ждём continueAfterWrong — показываем верный вариант и пояснение
    },
    [quiz, questionIndex, feedback, finished],
  )

  const continueAfterWrong = useCallback(() => {
    if (finished) return
    if (feedbackRef.current !== 'wrong') return
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setFeedback(null)
    setQuestionIndex((prev) => {
      if (prev >= quiz.questions.length - 1) {
        setFinished(true)
        return prev
      }
      return prev + 1
    })
  }, [finished, quiz.questions.length])

  const restart = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = null
    setQuestionIndex(0)
    setScore(0)
    setFeedback(null)
    setFinished(false)
  }, [])

  const value = useMemo(
    () => ({
      quiz,
      questionIndex,
      score,
      feedback,
      finished,
      submitAnswer,
      continueAfterWrong,
      restart,
    }),
    [quiz, questionIndex, score, feedback, finished, submitAnswer, continueAfterWrong, restart],
  )

  return <QuizSessionContext.Provider value={value}>{children}</QuizSessionContext.Provider>
}

export function useQuizSession() {
  const ctx = useContext(QuizSessionContext)
  if (!ctx) throw new Error('useQuizSession вне QuizSessionProvider')
  return ctx
}
