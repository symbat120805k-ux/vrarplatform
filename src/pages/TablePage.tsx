import { Link } from 'react-router-dom'
import { Spotlight } from '@/components/ui/spotlight'
import { PeriodicTableGrid } from '../components/PeriodicTableGrid'
import styles from './TablePage.module.css'

export function TablePage() {
  return (
    <div className={styles.page}>
      <Spotlight
        className={styles.spotlight}
        fill="white"
      />
      <header className={styles.header}>
        <Link to="/" className={styles.backLink}>← На главную</Link>
      </header>

      <main className={styles.main}>
        <div className={styles.left}>
          <h1 className={styles.headline1}>Таблица</h1>
          <h2 className={styles.headline2}>Менделеева</h2>
          <p className={styles.body}>
            Первые 10 элементов. Нажми на элемент — узнаешь о нём простым языком и посмотришь уникальную 3D-модель в VR и AR.
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.tableWrap}>
            <PeriodicTableGrid />
          </div>
          <Link to="/all-elements" className={styles.cta}>
            Все элементы Менделеева
          </Link>
        </div>
      </main>
    </div>
  )
}
