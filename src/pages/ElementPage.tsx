import { useEffect, useMemo, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { createXRStore } from '@react-three/xr'
import { Spotlight } from '@/components/ui/spotlight'
import { getElementByNumber, CATEGORY_COLORS } from '../data/elements'
import { getScanAssets } from '../data/scanConfig'
import { ElementScene } from '../components/ElementScene'
import { arCardImageUrls } from '@/utils/arCardImageUrls'
import styles from './ElementPage.module.css'

const xrStore = createXRStore()

export function ElementPage() {
  const { number } = useParams<{ number: string }>()
  const num = number ? parseInt(number, 10) : NaN
  const element = Number.isNaN(num) ? undefined : getElementByNumber(num)
  const [cardPreviewFailed, setCardPreviewFailed] = useState(false)
  const [cardSrcIndex, setCardSrcIndex] = useState(0)

  const scanAssets = element ? getScanAssets(element.number) : undefined
  const cardImageCandidates = useMemo(
    () =>
      scanAssets && element
        ? arCardImageUrls(element.number, scanAssets.cardPreview)
        : [],
    [element?.number, scanAssets?.cardPreview],
  )

  useEffect(() => {
    setCardPreviewFailed(false)
    setCardSrcIndex(0)
  }, [element?.number, scanAssets?.cardPreview])

  if (!element) {
    return <Navigate to="/table" replace />
  }

  const color = CATEGORY_COLORS[element.category]

  return (
    <div className={styles.page}>
      <Spotlight className={styles.spotlight} fill="white" />

      <header className={styles.header}>
        <Link to="/table" className={styles.backLink}>← Таблица элементов</Link>
        <div className={styles.hero}>
          <h1 className={styles.headline1}>{element.nameRu}</h1>
          <h2 className={styles.headline2} style={{ '--accent': color } as React.CSSProperties}>
            {element.symbol}
          </h2>
          <p className={styles.subtitle}>{element.name} · №{element.number}</p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.content}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle} style={{ borderLeftColor: color }}>
              Что значит порядковый номер?
            </h3>
            <p className={styles.text}>{element.atomicNumberExplain}</p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle} style={{ borderLeftColor: color }}>
              Простыми словами
            </h3>
            <p className={styles.text}>{element.simpleExplanation}</p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle} style={{ borderLeftColor: color }}>
              Где встречается в природе
            </h3>
            <p className={styles.text}>{element.foundInNature}</p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle} style={{ borderLeftColor: color }}>
              Где человек использует
            </h3>
            <p className={styles.text}>{element.usedIn}</p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle} style={{ borderLeftColor: color }}>
              Интересные факты
            </h3>
            <ul className={styles.factList}>
              {element.interestingFacts.map((fact, i) => (
                <li key={i} className={styles.factItem}>{fact}</li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle} style={{ borderLeftColor: color }}>
              Как выглядит в реальности
            </h3>
            <p className={styles.text}>{element.looksLike}</p>
          </section>

          {scanAssets && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle} style={{ borderLeftColor: color }}>
                Карточка для AR-сканирования
              </h3>
              <div className={styles.photo}>
                {!cardPreviewFailed && cardImageCandidates.length > 0 ? (
                  <img
                    key={`${cardSrcIndex}-${cardImageCandidates[cardSrcIndex]}`}
                    src={cardImageCandidates[cardSrcIndex]}
                    alt={`Карточка элемента ${element.nameRu} для сканирования`}
                    className={styles.photoImg}
                    onError={() => {
                      setCardSrcIndex((i) => {
                        if (i + 1 < cardImageCandidates.length) return i + 1
                        setCardPreviewFailed(true)
                        return i
                      })
                    }}
                  />
                ) : cardPreviewFailed ? (
                  <p className={styles.photoMissing}>
                    Добавь в проект файл карточки{' '}
                    <code className={styles.photoMissingCode}>public{scanAssets.cardPreview}</code> — то же
                    изображение, что пойдёт в компилятор Mind AR (см.{' '}
                    <code className={styles.photoMissingCode}>public/media/ar/README.txt</code>).
                  </p>
                ) : null}
                <p className={styles.photoCaption}>
                  Распечатай или открой эту карточку на другом устройстве и на странице сканирования
                  наведи на неё камеру.
                </p>
                <Link to={`/scan/${element.number}`} className={styles.photoCta}>
                  Оживить карточку
                </Link>
              </div>
            </section>
          )}

          <section className={styles.section}>
            <h3 className={styles.sectionTitle} style={{ borderLeftColor: color }}>
              Примеры из жизни
            </h3>
            <div className={styles.tags}>
              {element.everydayExamples.map((ex, i) => (
                <span key={i} className={styles.tag} style={{ borderColor: color }}>
                  {ex}
                </span>
              ))}
            </div>
          </section>
        </div>

        <aside className={styles.aside}>
          <div className={styles.viewerSection}>
            <h3 className={styles.sectionTitle} style={{ borderLeftColor: color }}>
              3D-модель
            </h3>
            <p className={styles.hint}>
              Покрути модель мышью. <strong>AR</strong> на телефоне — как раньше, камера и якорь комнаты.
              В <strong>VR</strong>: левый стик — ходьба, правый — поворот; зажми <strong>грип (squeeze)</strong>,
              чтобы взять модель рукой. В эмуляторе нужны оба контроллера и клавиши, привязанные к стикам.
              Внутри VR/AR рядом с моделью есть кнопка <strong>«Выйти на сайт»</strong> — нажми её лучом или в эмуляторе.
            </p>
            <div className={styles.canvasWrap}>
              <Canvas
                camera={{ position: [0, 1.5, 2], fov: 50 }}
                gl={{ antialias: true }}
                shadows
              >
                <ElementScene element={element} xrStore={xrStore} />
              </Canvas>
            </div>
            <div className={styles.buttons}>
              <button
                type="button"
                className={styles.btnVr}
                onClick={() => xrStore.enterVR()}
              >
                Посмотреть в VR
              </button>
              <button
                type="button"
                className={styles.btnAr}
                onClick={() => xrStore.enterAR()}
              >
                Смотреть в AR
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}
