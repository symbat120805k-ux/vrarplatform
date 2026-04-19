import { Link } from 'react-router-dom'
import { ELEMENTS, CATEGORY_COLORS } from '../data/elements'
import styles from './PeriodicTableGrid.module.css'

const FIRST_10 = ELEMENTS.filter((el) => el.number >= 1 && el.number <= 10)

/**
 * Displays the first 10 elements in a clean 2×5 grid (by atomic number).
 */
export function PeriodicTableGrid() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {FIRST_10.map((el) => (
          <Link
            key={el.number}
            to={`/element/${el.number}`}
            className={styles.card}
            style={{ '--category-color': CATEGORY_COLORS[el.category] } as React.CSSProperties}
          >
            <span className={styles.number}>{el.number}</span>
            <span className={styles.symbol}>{el.symbol}</span>
            <span className={styles.name}>{el.nameRu}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
