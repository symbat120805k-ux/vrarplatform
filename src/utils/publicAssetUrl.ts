/**
 * URL к статике из `public/` с учётом `base` в Vite (сайт в подкаталоге на хостинге).
 * @param path путь вида `/media/ar/3/card.png`
 */
export function publicAssetUrl(path: string): string {
  const trimmed = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${trimmed}`
}
