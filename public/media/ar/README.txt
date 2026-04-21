AR-карточки для первых 10 элементов
===================================

У каждого элемента (номер 1 … 10) своя папка:

  public/media/ar/{номер}/

Обычно в папке три файла с фиксированными именами:

  card.png      — картинка карточки (то, что показывается на сайте и печатается)
  targets.mind  — результат компиляции этой же картинки в Mind AR (не PNG!)
  video.mp4     — ролик (MP4), который играет поверх при успешном сканировании

Для отдельных элементов вместо video.mp4 в коде может быть задан ролик YouTube
(поле youtubeVideoId в src/data/scanConfig.ts) — тогда MP4 для этого элемента не нужен.

Пример для лития (номер 3):

  public/media/ar/3/card.png
  public/media/ar/3/targets.mind
  public/media/ar/3/video.mp4

Страница сканирования: /scan/{номер} (например /scan/3).

Как получить targets.mind
-------------------------

1. Компилятор (бесплатно): https://hiukim.github.io/mind-ar-js-doc/tools/compile/
2. Загрузи card.png из нужной папки (та же картинка, что на физической карточке).
3. Start → дождись конца → Download → сохрани как targets.mind в ту же папку.

Видео: лучше H.264 в MP4; пока файла нет — распознавание не обязательно, но оверлей не загрузится.

Перенос со старых путей (только водород)
----------------------------------------

Если раньше лежало так:

  public/media/hydrogen.png
  public/media/targets.mind
  public/media/ar-video.mp4

Скопируй в:

  public/media/ar/1/card.png
  public/media/ar/1/targets.mind
  public/media/ar/1/video.mp4

Камера в браузере: HTTPS или localhost.
