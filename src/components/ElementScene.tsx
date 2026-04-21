import { useRef } from 'react'
import type { Group } from 'three'
import { OrbitControls } from '@react-three/drei'
import {
  XR,
  XROrigin,
  useXR,
  useXRControllerLocomotion,
} from '@react-three/xr'
import type { ElementData } from '../data/elements'
import { CATEGORY_COLORS } from '../data/elements'
import { Atom3D } from './Atom3D'
import { XRExitPanel } from './xr/XRExitPanel'
import {
  Hydrogen3D,
  Helium3D,
  Lithium3D,
  Beryllium3D,
  Boron3D,
  Carbon3D,
  Nitrogen3D,
  Oxygen3D,
  Fluorine3D,
  Neon3D,
  Sodium3D,
  Magnesium3D,
  Aluminum3D,
  Silicon3D,
  Phosphorus3D,
  Sulfur3D,
  Chlorine3D,
  Argon3D,
  Potassium3D,
  Calcium3D,
  Scandium3D,
  Titanium3D,
  Vanadium3D,
  Chromium3D,
  Manganese3D,
  Iron3D,
  Cobalt3D,
  Nickel3D,
  Copper3D,
  Zinc3D,
  Gallium3D,
  Germanium3D,
  Arsenic3D,
  Selenium3D,
  Bromine3D,
  Krypton3D,
  Rubidium3D,
  Strontium3D,
  Yttrium3D,
  Zirconium3D,
  Niobium3D,
  Molybdenum3D,
  Technetium3D,
  Ruthenium3D,
  Rhodium3D,
  Palladium3D,
  Silver3D,
  Cadmium3D,
  Indium3D,
  Tin3D,
  Antimony3D,
  Tellurium3D,
  Iodine3D,
  Xenon3D,
  Cesium3D,
  Barium3D,
  Lanthanum3D,
  Cerium3D,
  Praseodymium3D,
  Neodymium3D,
  Promethium3D,
  Samarium3D,
  Europium3D,
  Gadolinium3D,
  Terbium3D,
  Dysprosium3D,
  Holmium3D,
  Erbium3D,
  Thulium3D,
  Ytterbium3D,
  Lutetium3D,
  Hafnium3D,
  Tantalum3D,
  Tungsten3D,
  Rhenium3D,
  Osmium3D,
  Iridium3D,
  Platinum3D,
  Gold3D,
  Mercury3D,
  Thallium3D,
  Lead3D,
  Bismuth3D,
  Polonium3D,
  Astatine3D,
  Radon3D,
  Francium3D,
  Radium3D,
  Actinium3D,
  Thorium3D,
  Protactinium3D,
  Uranium3D,
  Neptunium3D,
  Plutonium3D,
  Americium3D,
  Curium3D,
  Berkelium3D,
  Californium3D,
  Einsteinium3D,
  Fermium3D,
  Mendelevium3D,
  Nobelium3D,
  Lawrencium3D,
  Rutherfordium3D,
  Dubnium3D,
  Seaborgium3D,
  Bohrium3D,
  Hassium3D,
  Meitnerium3D,
  Darmstadtium3D,
  Roentgenium3D,
  Copernicium3D,
  Nihonium3D,
  Flerovium3D,
  Moscovium3D,
  Livermorium3D,
  Tennessine3D,
  Oganesson3D,
} from './elements'

type ElementSceneProps = {
  element: ElementData
  xrStore: ReturnType<typeof import('@react-three/xr').createXRStore>
}

const SCENE_TARGET = [0, 1.2, -1.5] as const

/** Якорь игрока: камера вешается сюда только в активной XR-сессии; стики двигают эту группу. */
function XRPlayerRig() {
  const ref = useRef<Group>(null)
  const session = useXR((s) => s.session)
  useXRControllerLocomotion(
    ref,
    { speed: 2.2 },
    { type: 'smooth', speed: 2, deadZone: 0.35 },
    'left',
  )
  return <XROrigin ref={ref} disabled={session == null} />
}

function SessionOrbitControls({
  target,
  maxDistance,
}: {
  target: readonly [number, number, number]
  maxDistance: number
}) {
  const session = useXR((s) => s.session)
  return (
    <OrbitControls
      makeDefault
      enablePan
      enableZoom
      minDistance={0.5}
      maxDistance={maxDistance}
      target={[...target]}
      enabled={session == null}
    />
  )
}

function ElementModel({ number, category }: { number: number; category: ElementData['category'] }) {
  const color = CATEGORY_COLORS[category]
  switch (number) {
    case 1: return <Hydrogen3D />
    case 2: return <Helium3D />
    case 3: return <Lithium3D />
    case 4: return <Beryllium3D />
    case 5: return <Boron3D />
    case 6: return <Carbon3D />
    case 7: return <Nitrogen3D />
    case 8: return <Oxygen3D />
    case 9: return <Fluorine3D />
    case 10: return <Neon3D />
    case 11: return <Sodium3D />
    case 12: return <Magnesium3D />
    case 13: return <Aluminum3D />
    case 14: return <Silicon3D />
    case 15: return <Phosphorus3D />
    case 16: return <Sulfur3D />
    case 17: return <Chlorine3D />
    case 18: return <Argon3D />
    case 19: return <Potassium3D />
    case 20: return <Calcium3D />
    case 21: return <Scandium3D />
    case 22: return <Titanium3D />
    case 23: return <Vanadium3D />
    case 24: return <Chromium3D />
    case 25: return <Manganese3D />
    case 26: return <Iron3D />
    case 27: return <Cobalt3D />
    case 28: return <Nickel3D />
    case 29: return <Copper3D />
    case 30: return <Zinc3D />
    case 31: return <Gallium3D />
    case 32: return <Germanium3D />
    case 33: return <Arsenic3D />
    case 34: return <Selenium3D />
    case 35: return <Bromine3D />
    case 36: return <Krypton3D />
    case 37: return <Rubidium3D />
    case 38: return <Strontium3D />
    case 39: return <Yttrium3D />
    case 40: return <Zirconium3D />
    case 41: return <Niobium3D />
    case 42: return <Molybdenum3D />
    case 43: return <Technetium3D />
    case 44: return <Ruthenium3D />
    case 45: return <Rhodium3D />
    case 46: return <Palladium3D />
    case 47: return <Silver3D />
    case 48: return <Cadmium3D />
    case 49: return <Indium3D />
    case 50: return <Tin3D />
    case 51: return <Antimony3D />
    case 52: return <Tellurium3D />
    case 53: return <Iodine3D />
    case 54: return <Xenon3D />
    case 55: return <Cesium3D />
    case 56: return <Barium3D />
    case 57: return <Lanthanum3D />
    case 58: return <Cerium3D />
    case 59: return <Praseodymium3D />
    case 60: return <Neodymium3D />
    case 61: return <Promethium3D />
    case 62: return <Samarium3D />
    case 63: return <Europium3D />
    case 64: return <Gadolinium3D />
    case 65: return <Terbium3D />
    case 66: return <Dysprosium3D />
    case 67: return <Holmium3D />
    case 68: return <Erbium3D />
    case 69: return <Thulium3D />
    case 70: return <Ytterbium3D />
    case 71: return <Lutetium3D />
    case 72: return <Hafnium3D />
    case 73: return <Tantalum3D />
    case 74: return <Tungsten3D />
    case 75: return <Rhenium3D />
    case 76: return <Osmium3D />
    case 77: return <Iridium3D />
    case 78: return <Platinum3D />
    case 79: return <Gold3D />
    case 80: return <Mercury3D />
    case 81: return <Thallium3D />
    case 82: return <Lead3D />
    case 83: return <Bismuth3D />
    case 84: return <Polonium3D />
    case 85: return <Astatine3D />
    case 86: return <Radon3D />
    case 87: return <Francium3D />
    case 88: return <Radium3D />
    case 89: return <Actinium3D />
    case 90: return <Thorium3D />
    case 91: return <Protactinium3D />
    case 92: return <Uranium3D />
    case 93: return <Neptunium3D />
    case 94: return <Plutonium3D />
    case 95: return <Americium3D />
    case 96: return <Curium3D />
    case 97: return <Berkelium3D />
    case 98: return <Californium3D />
    case 99: return <Einsteinium3D />
    case 100: return <Fermium3D />
    case 101: return <Mendelevium3D />
    case 102: return <Nobelium3D />
    case 103: return <Lawrencium3D />
    case 104: return <Rutherfordium3D />
    case 105: return <Dubnium3D />
    case 106: return <Seaborgium3D />
    case 107: return <Bohrium3D />
    case 108: return <Hassium3D />
    case 109: return <Meitnerium3D />
    case 110: return <Darmstadtium3D />
    case 111: return <Roentgenium3D />
    case 112: return <Copernicium3D />
    case 113: return <Nihonium3D />
    case 114: return <Flerovium3D />
    case 115: return <Moscovium3D />
    case 116: return <Livermorium3D />
    case 117: return <Tennessine3D />
    case 118: return <Oganesson3D />
    default: return <Atom3D atomicNumber={number} color={color} position={[0, 1.2, -1.5]} />
  }
}

export function ElementScene({ element, xrStore }: ElementSceneProps) {
  return (
    <XR store={xrStore}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-3, 4, -2]} intensity={0.4} />
      <ElementModel number={element.number} category={element.category} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      <XRPlayerRig />
      <XRExitPanel />
      <SessionOrbitControls target={SCENE_TARGET} maxDistance={6} />
    </XR>
  )
}
