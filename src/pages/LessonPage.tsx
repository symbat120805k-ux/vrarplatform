import { Canvas } from '@react-three/fiber'
import { createXRStore } from '@react-three/xr'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Spotlight } from '@/components/ui/spotlight'
import { getLessonBySlug } from '@/data/lessons'
import { LessonVideoEmbed } from '@/components/lesson/LessonVideoEmbed'
import { LessonScene } from '@/components/LessonScene'
import styles from './LessonPage.module.css'

const xrStore = createXRStore()

export function LessonPage() {
  const { slug } = useParams<{ slug: string }>()
  const lesson = getLessonBySlug(slug)

  if (!lesson) {
    return <Navigate to="/lessons" replace />
  }

  return (
    <div className={styles.page}>
      <Spotlight className={styles.spotlight} fill="white" />

      <header className={styles.header}>
        <Link to="/lessons" className={styles.backLink}>
          ← Все уроки
        </Link>
      </header>

      <div className={styles.main}>
        <div className={styles.left}>
          <p className={styles.kicker}>{lesson.subtitle}</p>
          <h1 className={styles.headline}>{lesson.title}</h1>

          <article className={styles.article}>
            {lesson.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </section>
            ))}
          </article>

          <div className={styles.videoBlock}>
            <p className={styles.videoLabel}>Видеоурок</p>
            <LessonVideoEmbed videoId={lesson.youtubeVideoId} title={lesson.title} />
          </div>
        </div>

        <section className={styles.right}>
          <p className={styles.viewerTitle}>Видео в пространстве</p>
          <div className={styles.canvasWrap}>
            <Canvas
              camera={{ position: [0, 1.5, 2], fov: 50 }}
              gl={{ antialias: true }}
              shadows
            >
              <LessonScene
                xrStore={xrStore}
                immersiveVideoSrc={lesson.immersiveVideoSrc}
              />
            </Canvas>
          </div>

          <p className={styles.tip}>
            На компьютере можно слегка смещать обзор мышью. В VR откроется комната с большим
            экраном; в AR на телефоне — тот же ролик в объёме через камеру. В шлеме справа панель
            «Видео»: пауза, громкость и перемотка лучом контроллера. Если звука нет сразу, включи
            его на этой панели. Слева от экрана в VR/AR — кнопка «Выйти на сайт».
          </p>

          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.btnVr}
              onClick={() => xrStore.enterVR()}
            >
              Погрузиться в VR
            </button>
            <button
              type="button"
              className={styles.btnAr}
              onClick={() => xrStore.enterAR()}
            >
              Смотреть в AR
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
