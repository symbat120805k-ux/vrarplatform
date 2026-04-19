# UI components (shadcn-style)

Компоненты в этой папке следуют структуре, похожей на **shadcn/ui**:
- переиспользуемые примитивы (Card, Spotlight);
- обёртки под сторонние библиотеки (Spline);
- утилита `cn()` в `@/lib/utils` для классов Tailwind.

## Зачем папка `components/ui`

- **Единое место** для UI-примитивов и обёрток — не разбрасывать по страницам.
- **Импорт через `@/components/ui/...`** — короткие пути и удобный рефакторинг.
- **Tailwind + `cn()`** — согласованные стили и поддержка тем (card, muted-foreground).

## Что установлено

- **Tailwind CSS v4** — через `@tailwindcss/postcss`, директивы в `src/index.css`.
- **Алиас `@`** — в `vite.config.ts` и `tsconfig.app.json` указывает на `./src`.
- **Spline** — `@/components/ui/spline.tsx` и демо `spline-scene-basic.tsx` на главной странице.
- **Зависимости:** `@splinetool/react-spline`, `@splinetool/runtime`, `framer-motion`, `clsx`, `tailwind-merge`.

## Как добавить новый shadcn-компонент

1. Создать файл в `src/components/ui/` (например `button.tsx`).
2. Использовать `cn()` из `@/lib/utils` для объединения классов.
3. Импортировать в нужном месте: `import { Card } from '@/components/ui/card'`.
