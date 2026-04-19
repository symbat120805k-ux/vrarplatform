/**
 * Ресурсы AR-сканирования по номеру элемента.
 * Файлы в `public/` отдаются по URL как ниже.
 *
 * targets.mind — это НЕ картинка: его один раз генерируют из PNG/JPG карточки
 * в онлайн-компиляторе Mind AR и кладут в public (см. public/ar/README.txt).
 */
export type ScanAssetPaths = {
  /** Скомпилированный MindAR target; без него — только камера, без распознавания. */
  mindFile: string
  /** Видео поверх, когда маркер найден. */
  overlayVideo: string
  /** Картинка карточки для страницы элемента (та же, что отдаёшь в компилятор .mind). */
  cardPreview: string
}

export const SCAN_ASSETS: Record<number, ScanAssetPaths> = {
  1: {
    mindFile: '/media/targets.mind',
    overlayVideo: '/media/ar-video.mp4',
    cardPreview: '/media/hydrogen.png',
  },
}

export function getScanAssets(elementNumber: number): ScanAssetPaths | undefined {
  return SCAN_ASSETS[elementNumber]
}

export function isScanSupported(elementNumber: number): boolean {
  return elementNumber in SCAN_ASSETS
}
