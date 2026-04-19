import { Link } from 'react-router-dom'
import { Spotlight } from '@/components/ui/spotlight'
import { QUIZZES } from '@/data/quizzes'
import styles from './TestsIndexPage.module.css'

export function TestsIndexPage() {
  return (
    <div className={styles.page}>
      <Spotlight className={styles.spotlight} fill="white" />

      <header className={styles.header}>
        <div className={styles.navRow}>
          <Link to="/" className={styles.backLink}>
            ← На главную
          </Link>
          <Link to="/lessons" className={styles.backLink}>
            Уроки →
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <h1 className={styles.headline1}>Проверь себя</h1>
        <h2 className={styles.headline2}>тесты по химии</h2>
        <p className={styles.lead}>
          Три тематических теста по десять вопросов. В VR вопросы и кнопки ответов висят перед тобой —
          выбирай лучом контроллера. Без шлема тот же тест можно пройти на странице под окном сцены.
        </p>

        <div className={styles.grid}>
          {QUIZZES.map((q) => (
            <Link key={q.id} to={`/tests/${q.id}`} className={styles.card}>
              <h3 className={styles.cardTitle}>{q.title}</h3>
              <p className={styles.cardSub}>{q.subtitle}</p>
              <p className={styles.cardDesc}>{q.description}</p>
              <span className={styles.cardMeta}>Начать →</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
