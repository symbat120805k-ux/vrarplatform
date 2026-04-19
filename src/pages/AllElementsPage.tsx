import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Spotlight } from '@/components/ui/spotlight'
import { ALL_ELEMENTS } from '../data/allElements'
import { CATEGORY_COLORS } from '../data/elements'
import type { ElementCategory } from '../data/elements'
import styles from './AllElementsPage.module.css'

const ROWS = 9
const COLS = 18

const CATEGORY_LABELS: Record<ElementCategory, string> = {
  alkali: 'Щелочные металлы',
  alkaline: 'Щёлочноземельные',
  transition: 'Переходные',
  'post-transition': 'Постпереходные',
  metalloid: 'Полупроводники',
  nonmetal: 'Неметаллы',
  halogen: 'Галогены',
  'noble-gas': 'Благородные газы',
}

function buildGrid(
  elements: typeof ALL_ELEMENTS
): (typeof ALL_ELEMENTS[0] | null)[][] {
  const grid: (typeof ALL_ELEMENTS[0] | null)[][] = []
  for (let r = 0; r < ROWS; r++) {
    grid[r] = []
    for (let c = 0; c < COLS; c++) grid[r][c] = null
  }
  elements.forEach((el) => {
    if (el.row <= ROWS && el.col <= COLS) {
      grid[el.row - 1][el.col - 1] = el
    }
  })
  return grid
}

export function AllElementsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<ElementCategory | 'all'>('all')

  const filtered = useMemo(() => {
    let list = ALL_ELEMENTS
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter(
        (e) =>
          e.symbol.toLowerCase().includes(q) ||
          e.nameRu.toLowerCase().includes(q) ||
          e.name.toLowerCase().includes(q)
      )
    }
    if (category !== 'all') {
      list = list.filter((e) => e.category === category)
    }
    return list
  }, [search, category])

  const showGrid = category === 'all' && !search.trim()
  const grid = useMemo(() => buildGrid(ALL_ELEMENTS), [])

  return (
    <div className={styles.page}>
      <Spotlight className={styles.spotlight} fill="white" />

      <header className={styles.header}>
        <Link to="/table" className={styles.backLink}>← К первым 10 элементам</Link>
        <div className={styles.hero}>
          <h1 className={styles.headline1}>Все элементы</h1>
          <h2 className={styles.headline2}>Менделеева</h2>
          <p className={styles.subtitle}>
            118 элементов. Нажми на элемент — откроется карточка. Поиск и фильтр по категории ниже.
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.toolbar}>
          <input
            type="search"
            placeholder="Поиск по названию или символу..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.search}
          />
          <div className={styles.filters}>
            <button
              type="button"
              className={category === 'all' ? styles.filterActive : styles.filterBtn}
              onClick={() => setCategory('all')}
            >
              Все
            </button>
            {(Object.keys(CATEGORY_LABELS) as ElementCategory[]).map((cat) => (
              <button
                key={cat}
                type="button"
                className={category === cat ? styles.filterActive : styles.filterBtn}
                style={category === cat ? { borderColor: CATEGORY_COLORS[cat] } : undefined}
                onClick={() => setCategory(cat)}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>

        {showGrid ? (
          <div className={styles.gridWrap}>
            <div
              className={styles.grid}
              style={{
                gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${ROWS}, auto)`,
              }}
            >
              {grid.map((row, ri) =>
                row.map((el, ci) => (
                  <div key={`${ri}-${ci}`} className={styles.cell}>
                    {el ? (
                      <Link
                        to={`/element/${el.number}`}
                        className={styles.card}
                        style={{
                          '--category-color': CATEGORY_COLORS[el.category],
                        } as React.CSSProperties}
                      >
                        <span className={styles.num}>{el.number}</span>
                        <span className={styles.symbol}>{el.symbol}</span>
                        <span className={styles.name}>{el.nameRu}</span>
                      </Link>
                    ) : null}
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className={styles.listWrap}>
            <p className={styles.listCount}>Найдено: {filtered.length}</p>
            <div className={styles.list}>
              {filtered.map((el) => (
                <Link
                  key={el.number}
                  to={`/element/${el.number}`}
                  className={styles.listCard}
                  style={{
                    '--category-color': CATEGORY_COLORS[el.category],
                  } as React.CSSProperties}
                >
                  <span className={styles.listNum}>{el.number}</span>
                  <span className={styles.listSymbol}>{el.symbol}</span>
                  <span className={styles.listName}>{el.nameRu}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
