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

  const src = `https://www.youtube.com/embed/cxFb4hmfVT0?si=4_ghHk2VDGTSdq_P`

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
