import { publicAssetUrl } from './publicAssetUrl'

/** Варианты путей к картинке карточки (разные регистры/расширения на диске). */
export function arCardImageUrls(elementNumber: number, primaryPath: string): string[] {
  const base = `/media/ar/${elementNumber}`
  const paths = [
    primaryPath,
    `${base}/card.png`,
    `${base}/card.jpg`,
    `${base}/Card.png`,
    `${base}/Card.jpg`,
  ]
  const seen = new Set<string>()
  return paths
    .filter((p) => {
      if (seen.has(p)) return false
      seen.add(p)
      return true
    })
    .map(publicAssetUrl)
}
