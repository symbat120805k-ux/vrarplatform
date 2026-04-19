# vrarplatform

## Описание

Приватное фронтенд-приложение для **школьного/вводного изучения химии** на русском языке: интерактивная периодическая таблица, карточки элементов с 3D-моделями, просмотр в **VR/AR** (WebXR), уроки с YouTube и immersive-видео в сцене, тесты с прохождением в VR/AR и дублирующей панелью на десктопе. Главная страница использует встроенную сцену **Spline**.

Одностраничное приложение (SPA): Vite + React + TypeScript, контент в коде (`src/data`), отдельного бэкенда в репозитории нет.

## Функции

- **Таблица Менделеева** — 118 элементов (`src/data/allElements.ts`). Полные образовательные тексты заданы для **первых 10** элементов; для 11–118 — заглушка «Описание будет добавлено позже.» до доработки контента (`src/data/elements.ts`).
- **Страница элемента** — русскоязычные блоки, 3D-сцена с VR/AR, при наличии — AR-карточка и ссылка на сканирование.
- **Сканирование** — MindAR (image target); при отсутствии `.mind` — режим с камерой без трекинга. AR обычно требует HTTPS и разрешение камеры.
- **Уроки** — 9 тем в `src/data/lessons.ts` (в т.ч. вода, кислоты/щёлочи/соли, горение, связь, растворы, O₂/H₂, безопасность в лаборатории).
- **Тесты** — 3 квиза в `src/data/quizzes.ts`: `foundations`, `reactions`, `table-and-safety`.

## Требования

- **Node.js** 20.x (см. `package.json` → `engines`)

## Команды

| Команда | Действие |
|--------|----------|
| `npm run dev` | dev-сервер (Vite) |
| `npm run build` | `tsc -b && vite build` |
| `npm run preview` | предпросмотр production-сборки |
| `npm run lint` | ESLint |

## Маршруты

| Путь | Назначение |
|------|------------|
| `/` | Главная |
| `/table` | Периодическая таблица |
| `/all-elements` | Список элементов |
| `/element/:number` | Карточка элемента |
| `/scan/:number` | AR-скан по номеру элемента |
| `/lessons` | Список уроков |
| `/lessons/:slug` | Урок |
| `/tests` | Список тестов |
| `/tests/:quizId` | Квиз |

## Данные

| Файл | Содержимое |
|------|------------|
| `src/data/allElements.ts` | 118 элементов: номер, символ, имена EN/RU, позиция в сетке, категория |
| `src/data/elements.ts` | Полные тексты и типы для карточек элементов |
| `src/data/lessons.ts` | Уроки |
| `src/data/quizzes.ts` | Тесты |
| `src/data/scanConfig.ts` | AR-ресурсы по номеру элемента (например `.mind`, overlay); заполнение зависит от конфигурации |

3D-компоненты элементов: `src/components/elements/` (по одному `*3D.tsx` на элемент; в сцене — переключение по номеру, иначе fallback).

## Стек

- **Сборка:** Vite 8, TypeScript ~5.9, ESLint 9; алиас `@` → `src`.
- **UI:** React 19, React Router 7, Tailwind CSS 4, Framer Motion, `clsx`, `tailwind-merge`.
- **3D / XR:** three.js, `@react-three/fiber`, `@react-three/drei`, `@react-three/xr`.
- **AR:** `mind-ar` (в `vite.config.ts` — совместимость с текущим API Three.js: замена устаревшего `sRGBEncoding` на `SRGBColorSpace` / `outputColorSpace`; `optimizeDeps.exclude: ['mind-ar']`).
- **Сцены:** `@splinetool/react-spline` на главной.
