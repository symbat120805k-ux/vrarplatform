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

function scanPathsForElement(n: number): ScanAssetPaths {
  const base = `/media/ar/${n}`
  return {
    mindFile: `${base}/targets.mind`,
    overlayVideo: `${base}/video.mp4`,
    cardPreview: `${base}/card.png`,
  }
}

const BASE_SCAN_ASSETS = Object.fromEntries(
  FIRST_10.map((n) => [n, scanPathsForElement(n)]),
) as Record<number, ScanAssetPaths>

/** Гелий (№2): оверлей — YouTube ow3mDBcxMY8, без локального video.mp4. */
export const SCAN_ASSETS: Record<number, ScanAssetPaths> = {
  ...BASE_SCAN_ASSETS,
  2: {
    mindFile: BASE_SCAN_ASSETS[2].mindFile,
    cardPreview: BASE_SCAN_ASSETS[2].cardPreview,
    youtubeVideoId: 'ow3mDBcxMY8',
  },
}

export function getScanAssets(elementNumber: number): ScanAssetPaths | undefined {
  return SCAN_ASSETS[elementNumber]
}

export function isScanSupported(elementNumber: number): boolean {
  return elementNumber in SCAN_ASSETS
}
