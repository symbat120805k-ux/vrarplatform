import { useEffect, useRef } from 'react'
import type { ScanAssetPaths } from '@/data/scanConfig'
import styles from './ScanARView.module.css'

type Props = {
  assets: ScanAssetPaths
  onTracked: (tracked: boolean) => void
}

export function ScanARView({ assets, onTracked }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const onTrackedRef = useRef(onTracked)
  onTrackedRef.current = onTracked

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let mindar: { stop: () => void } | null = null
    let cancelled = false

    void (async () => {
      try {
        const { MindARThree } = await import(
          'mind-ar/dist/mindar-image-three.prod.js'
        )
        if (cancelled || !containerRef.current) return

        const instance = new MindARThree({
          container: containerRef.current,
          imageTargetSrc: assets.mindFile,
          uiLoading: 'no',
          uiScanning: 'no',
          uiError: 'no',
        })

        const anchor = instance.addAnchor(0)
        anchor.onTargetFound = () => onTrackedRef.current(true)
        anchor.onTargetLost = () => onTrackedRef.current(false)

        await instance.start()
        mindar = instance
      } catch (e) {
        console.error(e)
        onTrackedRef.current(false)
      }
    })()

    return () => {
      cancelled = true
      onTrackedRef.current(false)
      mindar?.stop()
      mindar = null
      container.innerHTML = ''
    }
  }, [assets.mindFile])

  return <div ref={containerRef} className={styles.arLayer} />
}
