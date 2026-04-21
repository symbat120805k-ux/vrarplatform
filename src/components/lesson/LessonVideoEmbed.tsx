import styles from './LessonVideoEmbed.module.css'

type LessonVideoEmbedProps = {
  videoId: string
  title: string
}

/**
 * Встраивание YouTube (youtube-nocookie) — основной просмотр на сайте.
 */
export function LessonVideoEmbed({ videoId, title }: LessonVideoEmbedProps) {
  if (!videoId.trim()) return null

  const id = encodeURIComponent(videoId.trim())
  const src = `https://www.youtube-nocookie.com/embed/${id}`

  return (
    <div className={styles.wrap}>
      <div className={styles.ratio}>
        <iframe
          className={styles.iframe}
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  )
}
