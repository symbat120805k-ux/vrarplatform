declare module 'mind-ar/dist/mindar-image-three.prod.js' {
  type MindARThreeOptions = {
    container: HTMLElement
    imageTargetSrc: string
    maxTrack?: number
    uiLoading?: string
    uiScanning?: string
    uiError?: string
  }

  type ImageAnchor = {
    onTargetFound: (() => void) | null
    onTargetLost: (() => void) | null
  }

  export class MindARThree {
    constructor(opts: MindARThreeOptions)
    start(): Promise<void>
    stop(): void
    addAnchor(targetIndex: number): ImageAnchor
  }
}
