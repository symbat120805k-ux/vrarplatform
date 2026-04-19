import { Link } from 'react-router-dom'
import { Spotlight } from '@/components/ui/spotlight'
import { LESSONS } from '@/data/lessons'
import styles from './LessonsIndexPage.module.css'

export function LessonsIndexPage() {
  return (
    <div className={styles.page}>
      <Spotlight className={styles.spotlight} fill="white" />

      <header className={styles.header}>
        <div className={styles.navRow}>
          <Link to="/" className={styles.backLink}>
            ← На главную
          </Link>
          <Link to="/tests" className={styles.backLink}>
            Тесты →
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <h1 className={styles.headline1}>Интерактивные</h1>
        <h2 className={styles.headline2}>уроки</h2>
        <p className={styles.lead}>
          Смотри объяснения в видео, читай краткий конспект и заходи в VR или AR, чтобы увидеть
          модели и ролики в объёме — как будто перед тобой в комнате.
        </p>

        <div className={styles.grid}>
          {LESSONS.map((lesson) => (
            <Link key={lesson.slug} to={`/lessons/${lesson.slug}`} className={styles.card}>
              <h3 className={styles.cardTitle}>{lesson.title}</h3>
              <p className={styles.cardSub}>{lesson.subtitle}</p>
              <span className={styles.cardMeta}>Открыть урок →</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
