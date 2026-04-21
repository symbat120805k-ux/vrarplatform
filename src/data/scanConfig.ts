/**
 * Ресурсы AR-сканирования по номеру элемента.
 * Файлы в `public/` отдаются по URL как ниже.
 *
 * targets.mind — это НЕ картинка: его один раз генерируют из PNG/JPG карточки
 * в онлайн-компиляторе Mind AR и кладут в public (см. public/media/ar/README.txt).
 *
 * Для элементов 1–10 у каждого своя папка `public/media/ar/{номер}/`:
 * card.png, targets.mind и либо video.mp4, либо ролик YouTube (см. youtubeVideoId).
 */
export type ScanAssetPaths = {
  /** Скомпилированный MindAR target; без него — только камера, без распознавания. */
  mindFile: string
  /** Картинка карточки для страницы элемента (та же, что отдаёшь в компилятор .mind). */
  cardPreview: string
  /** Локальный MP4 поверх маркера; не указывай, если задан youtubeVideoId. */
  overlayVideo?: string
  /** ID ролика YouTube (из URL watch?v=…); при сканировании открывается встроенный плеер. */
  youtubeVideoId?: string
}

/** Первые 10 элементов таблицы — у каждого своя AR-карточка и своё видео. */
const FIRST_10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const

/** Папки 4–10: карточка как JPEG (card.jpg). Остальные — card.png. */
const CARD_IS_JPEG = new Set([4, 5, 6, 7, 8, 9, 10])

function scanPathsForElement(n: number): ScanAssetPaths {
  const base = `/media/ar/${n}`
  const cardPreview = CARD_IS_JPEG.has(n) ? `${base}/card.jpg` : `${base}/card.png`
  return {
    mindFile: `${base}/targets.mind`,
    overlayVideo: `${base}/video.mp4`,
    cardPreview,
  }
}

const BASE_SCAN_ASSETS = Object.fromEntries(
  FIRST_10.map((n) => [n, scanPathsForElement(n)]),
) as Record<number, ScanAssetPaths>

/**
 * Оверлей при сканировании: YouTube (id из watch?v=…).
 * Водород (1) — только локальный ar-video.mp4.
 */
const SCAN_YOUTUBE_ID: Partial<Record<number, string>> = {
  2: 'ow3mDBcxMY8',
  3: 'ZTTb-GomRmc',
  4: 'z2JJ_YccUXQ',
  5: 'YRWWf3Obsdg',
  6: 'AEj_Zpgdmkw',
  7: '8FFYKOzZvzk',
  8: 'kfPwZ8Hu5CU',
  9: 'W5B9k3RjhEA',
  10: 'CjXagBB9y9U',
}

function buildScanAssets(): Record<number, ScanAssetPaths> {
  const out: Record<number, ScanAssetPaths> = { ...BASE_SCAN_ASSETS }
  out[1] = {
    ...BASE_SCAN_ASSETS[1],
    overlayVideo: '/media/ar/1/ar-video.mp4',
  }
  for (const n of FIRST_10) {
    const yt = SCAN_YOUTUBE_ID[n]
    if (yt) {
      const b = BASE_SCAN_ASSETS[n]
      out[n] = { mindFile: b.mindFile, cardPreview: b.cardPreview, youtubeVideoId: yt }
    }
  }
  return out
}

export const SCAN_ASSETS: Record<number, ScanAssetPaths> = buildScanAssets()

export function getScanAssets(elementNumber: number): ScanAssetPaths | undefined {
  const direct = SCAN_ASSETS[elementNumber]
  if (direct) return direct
  return (SCAN_ASSETS as Record<string, ScanAssetPaths | undefined>)[String(elementNumber)]
}

export function isScanSupported(elementNumber: number): boolean {
  return elementNumber in SCAN_ASSETS
}
