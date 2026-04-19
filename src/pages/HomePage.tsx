import { Link } from 'react-router-dom'
import { SplineScene } from '@/components/ui/spline'
import { Spotlight } from '@/components/ui/spotlight'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <div className={styles.page}>
      <Spotlight
        className={styles.spotlight}
        fill="white"
      />
      <main className={styles.main}>
        <div className={styles.left}>
          <h1 className={styles.headline1}>Интерактивная</h1>
          <h2 className={styles.headline2}>3D-химия</h2>
          <p className={styles.body}>
            Изучай элементы в объёме. Смотри модели в VR и AR — как будто молекулы и атомы у тебя в комнате.
          </p>
          <div className={styles.actions}>
            <Link to="/table" className={styles.cta}>
              Открыть таблицу элементов
            </Link>
            <Link to="/lessons" className={styles.ctaSecondary}>
              Уроки с видео и VR
            </Link>
            <Link to="/tests" className={styles.ctaSecondary}>
              Тесты в VR
            </Link>
          </div>
        </div>
        <div className={styles.right}>
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className={styles.spline}
          />
        </div>
      </main>
    </div>
  )
}
