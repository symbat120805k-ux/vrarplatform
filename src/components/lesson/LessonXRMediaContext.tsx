import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'

type LessonXRMediaValue = {
  videoElement: HTMLVideoElement | null
  setVideoElement: Dispatch<SetStateAction<HTMLVideoElement | null>>
}

const LessonXRMediaContext = createContext<LessonXRMediaValue | null>(null)

export function LessonXRMediaProvider({ children }: { children: ReactNode }) {
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null)

  const value = useMemo(
    () => ({ videoElement, setVideoElement }),
    [videoElement],
  )

  return (
    <LessonXRMediaContext.Provider value={value}>{children}</LessonXRMediaContext.Provider>
  )
}

export function useLessonXRMedia() {
  const ctx = useContext(LessonXRMediaContext)
  if (!ctx) {
    throw new Error('useLessonXRMedia: нет LessonXRMediaProvider')
  }
  return ctx
}
