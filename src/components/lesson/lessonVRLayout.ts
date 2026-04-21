/**
 * Геометрия большого экрана VR-урока и смещения панелей «Видео» / «Выйти» относительно него.
 * Держим в одном месте, чтобы превью и XR совпадали.
 */
const SCREEN_H = 1.45
const ASPECT = 16 / 9
const SCREEN_W = SCREEN_H * ASPECT
const HALF_W = SCREEN_W / 2

export const LESSON_IMMERSIVE = {
  screenPos: [0, 1.55, -2.9] as const,
  screenHalfW: HALF_W,
  screenH: SCREEN_H,
  screenW: SCREEN_W,
  /** Зазор от края экрана до центра панели управления */
  panelGap: 0.4,
} as const

/** Панель «Видео» — справа от экрана, на той же глубине */
export function lessonVideoControlsPosition(): [number, number, number] {
  const [sx, sy, sz] = LESSON_IMMERSIVE.screenPos
  return [sx + HALF_W + LESSON_IMMERSIVE.panelGap, sy - 0.03, sz + 0.05]
}

/** Кнопка выхода из XR — слева от экрана */
export function lessonExitPanelPosition(): [number, number, number] {
  const [sx, sy, sz] = LESSON_IMMERSIVE.screenPos
  return [sx - HALF_W - LESSON_IMMERSIVE.panelGap, sy - 0.02, sz + 0.05]
}
