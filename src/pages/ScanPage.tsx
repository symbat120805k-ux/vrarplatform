import { useEffect, useRef, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { Spotlight } from '@/components/ui/spotlight'
import { ScanARView } from '@/components/scan/ScanARView'
import { getElementByNumber, CATEGORY_COLORS } from '../data/elements'
import { getScanAssets, isScanSupported } from '../data/scanConfig'
import { publicAssetUrl } from '@/utils/publicAssetUrl'
import styles from './ScanPage.module.css'

export function ScanPage() {
  const { number } = useParams<{ number: string }>()
  const num = number ? parseInt(number, 10) : NaN
  const element = Number.isNaN(num) ? undefined : getElementByNumber(num)
  const videoRef = useRef<HTMLVideoElement>(null)
  const revealVideoRef = useRef<HTMLVideoElement>(null)
  const [camError, setCamError] = useState<string | null>(null)
  const [mindPresent, setMindPresent] = useState<boolean | null>(null)
  const [tracked, setTracked] = useState(false)
  /** Без жеста пользователя браузер не даст автозвук. */
  const [soundUnlocked, setSoundUnlocked] = useState(false)

  const assets = element ? getScanAssets(element.number) : undefined
  const supported =
    element !== undefined &&
    isScanSupported(element.number) &&
    assets !== undefined

  useEffect(() => {
    if (!supported || !assets) return
    let cancelled = false
    fetch(publicAssetUrl(assets.mindFile), { method: 'HEAD' })
      .then((res) => {
        if (!cancelled) setMindPresent(res.ok)
      })
      .catch(() => {
        if (!cancelled) setMindPresent(false)
      })
    return () => {
      cancelled = true
    }
  }, [supported, assets])

  useEffect(() => {
    if (mindPresent !== false || !supported) return

    let stream: MediaStream | null = null
    void (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
          audio: false,
        })
        const el = videoRef.current
        if (el) {
          el.srcObject = stream
          await el.play().catch(() => {})
        }
      } catch {
        setCamError(
          'Не удалось включить камеру. Разреши доступ в настройках браузера или открой страницу по HTTPS.',
        )
      }
    })()

    return () => {
      stream?.getTracks().forEach((t) => t.stop())
    }
  }, [mindPresent, supported])

  useEffect(() => {
    if (mindPresent !== true) return
    const unlock = () => setSoundUnlocked(true)
    window.addEventListener('pointerdown', unlock, { capture: true, once: true })
    return () => window.removeEventListener('pointerdown', unlock, { capture: true })
  }, [mindPresent])

  const youtubeId = assets?.youtubeVideoId?.trim()
  const useYoutubeOverlay = Boolean(youtubeId)

  useEffect(() => {
    const el = revealVideoRef.current
    if (!el || mindPresent !== true || useYoutubeOverlay) return
    const src = assets?.overlayVideo
    if (!src) return
    if (tracked) {
      void el.play().catch(() => {})
    } else {
      el.pause()
      el.currentTime = 0
    }
  }, [tracked, mindPresent, soundUnlocked, useYoutubeOverlay, assets?.overlayVideo])

  if (!element) {
    return <Navigate to="/table" replace />
  }

  if (!supported || !assets) {
    return <Navigate to={`/element/${element.number}`} replace />
  }

  const color = CATEGORY_COLORS[element.category]

  const frameText =
    mindPresent === true
      ? 'Наведи камеру на карточку. Когда она распознается, откроется видео. Один раз коснись экрана — включится звук.'
      : mindPresent === false
        ? 'Сейчас доступен только предпросмотр с камеры — распознавание карточки выключено.'
        : 'Загрузка…'

  return (
    <div className={styles.page}>
      <Spotlight className={styles.spotlight} fill="white" />

      {mindPresent === true ? (
        <ScanARView assets={assets} onTracked={setTracked} />
      ) : mindPresent === false ? (
        <div className={styles.videoWrap} aria-hidden={!!camError}>
          <video
            ref={videoRef}
            className={styles.video}
            playsInline
            muted
            autoPlay
          />
        </div>
      ) : (
        <div className={styles.videoWrap} aria-busy="true">
          <p className={styles.bootHint}>Загрузка…</p>
        </div>
      )}

      <div
        className={`${styles.overlay} ${mindPresent === true && tracked ? styles.overlayBehindVideo : ''}`}
      >
        <Link to={`/element/${element.number}`} className={styles.backLink}>
          ← {element.nameRu}
        </Link>

        <h1 className={styles.title} style={{ color }}>
          Сканирование карточки
        </h1>
        <p className={styles.subtitle}>
          Наведи камеру на распечатанную или экранную карточку элемента.
        </p>

        <div className={styles.frame}>
          <p className={styles.frameHint}>{frameText}</p>
          {mindPresent === false ? (
            <p className={styles.mindMissingHint}>
              Нужен файл <strong>targets.mind</strong> в папке{' '}
              <strong>public/media/ar/{element.number}/</strong> (рядом с card.png). Его получают в
              компиляторе Mind AR, загрузив ту же картинку, что и card.png. Подробнее:{' '}
              <strong>public/media/ar/README.txt</strong>.
            </p>
          ) : null}
        </div>

        {mindPresent === true && !soundUnlocked ? (
          <p className={styles.soundHint}>
            Коснись экрана один раз — после этого у ролика сможет играть звук
            (так устроены браузеры).
          </p>
        ) : null}

        {camError ? <p className={styles.error}>{camError}</p> : null}
      </div>

      {mindPresent === true ? (
        <>
          {useYoutubeOverlay && tracked && youtubeId ? (
            <iframe
              key={`${youtubeId}-${soundUnlocked}`}
              title="Видео по карточке"
              className={`${styles.revealVideo} ${styles.revealVideoVisible}`}
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}?autoplay=1&mute=${soundUnlocked ? 0 : 1}&rel=0&playsinline=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : null}
          {!useYoutubeOverlay && assets.overlayVideo ? (
            <video
              ref={revealVideoRef}
              className={`${styles.revealVideo} ${tracked ? styles.revealVideoVisible : ''}`}
              src={publicAssetUrl(assets.overlayVideo)}
              playsInline
              muted={!soundUnlocked}
              loop
              preload="auto"
              aria-hidden={!tracked}
            />
          ) : null}
          {tracked ? (
            <Link
              to={`/element/${element.number}`}
              className={styles.floatingBack}
            >
              ← {element.nameRu}
            </Link>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
