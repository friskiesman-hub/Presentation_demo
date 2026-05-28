# PROJECT_CONTEXT.md

## 1. Назначение проекта

Проект — статическая web-презентация **BORK Internet Boutique Q2 2026** в формате кинематографичного 5-слайдового digital experience.

Это не интернет-магазин, не dashboard, не полноценное web-приложение и не классический вертикальный лендинг. Это автономная презентационная страница, которую можно использовать вместо PowerPoint/PDF для демонстрации результатов Интернет Бутика BORK за Q2 2026.

Главная задача интерфейса:

- показать коммерческие результаты Q2;
- сохранить эстетику флагманского пространства BORK;
- объединить интерьерные фотографии, фирменный паттерн, премиальную типографику, инфографику и плавные переходы;
- работать на desktop и mobile, включая iPhone Safari в portrait и landscape;
- производить впечатление премиального business review, а не набора отчетных слайдов.

## 2. Актуальная creative DNA

Проект больше не следует буквальной исходной метафоре “пять залов флагманского бутика”. Фактическая реализация — это премиальная web-презентация коммерческих результатов Интернет Бутика BORK за Q2 2026, оформленная в эстетике флагманского пространства BORK.

Актуальная творческая рамка:

- это презентационный digital experience, а не обычный сайт;
- пользователь должен воспринимать проект как цельный premium business review;
- интерьерные фотографии бутика работают как эмоциональная и брендовая среда для данных;
- основной смысл проекта — результаты Q2, категории, digital-эффективность и фокус Q3;
- визуальный язык: теплый графит, дерево, камень, мягкий янтарный свет, строгая сетка, крупная типографика, много воздуха;
- характер подачи: спокойно, точно, сдержанно, дорого, без маркетплейсной эстетики;
- motion должен усиливать ощущение премиальности и плавности, но не становиться самостоятельным аттракционом;
- стабильность, читаемость и производительность важнее сложных переходов.

Формула проекта:

> BORK Internet Boutique Q2 2026 — кинематографичная web-презентация бизнес-результатов в эстетике флагманского бутика.

## 3. Текущий baseline

Текущая рабочая версия возвращена к стабильной 5-слайдовой версии `3.5`, соответствующей `origin/main`.

Репозиторий:

```text
friskiesman-hub/Presentation_demo
```

Локальный путь основного репозитория:

```text
/Users/alexanderchernomorets/Documents/Codex/2026-05-22/web-5-bork-senior-web-designer/Presentation_demo
```

Локальный стабильный снимок:

```text
/Users/alexanderchernomorets/Documents/Codex/2026-05-22/web-5-bork-senior-web-designer/stable-v3.5
```

Перед новой итерацией нужно зафиксировать точный commit hash:

```bash
git rev-parse --short HEAD
git log -1 --oneline
git remote -v
```

И вписать сюда:

```text
Baseline commit: TBD
Remote: origin / friskiesman-hub/Presentation_demo
Branch: main
Stable snapshot: ../stable-v3.5
```

## 4. Текущие 5 слайдов

```text
01 / Internet Boutique Q2
02 / Commercial Result
03 / Category Mix
04 / Digital Efficiency
05 / Q3 Focus
```

Важно: текущая смысловая структура уже не совпадает с исходной концепцией `Entrance / Philosophy / Materials / Innovation / Boutique Experience`. Исторические названия CSS-классов могут сохраняться в коде, но фактический смысл слайдов — бизнес-результаты Q2.

## 5. Текущая структура репозитория

Актуальная рабочая структура:

```text
Presentation_demo/
├── .git/
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── bork-boutique-entrance-web.png
│   ├── bork-boutique-entrance.jpg
│   ├── bork-boutique-entrance.png
│   ├── bork-boutique-final-web.png
│   ├── bork-boutique-final.jpg
│   ├── bork-boutique-final.png
│   ├── bork-boutique-gallery-web.png
│   ├── bork-boutique-gallery.jpg
│   ├── bork-boutique-gallery.png
│   ├── bork-boutique-materials-web.png
│   ├── bork-boutique-materials.jpg
│   ├── bork-boutique-materials.png
│   ├── bork-ginza-pattern-loader.svg
│   └── bork-pattern-mono.svg
├── PROJECT_CONTEXT.md
├── AGENTS.md
├── QA_CHECKLIST.md
├── DEPLOY.md
└── docs/
    └── archive/
        └── ORIGINAL_START_PROMPT.md
```

В рабочей папке могут оставаться неотслеживаемые экспериментальные ассеты:

```text
assets/bork-infographic-06.png
assets/bork-infographic-07.png
assets/bork-infographic-08.png
assets/bork-infographic-09.png
assets/bork-infographic-10.png
assets/bork-infographic-11.png
assets/bork-infographic-12.png
assets/bork-infographic-13.png
assets/bork-infographic-14.png
assets/bork-infographic-15.png
```

Они не являются частью стабильной 5-слайдовой версии и не должны восприниматься как актуальная архитектура проекта. Их нужно либо удалить, либо перенести в отдельную экспериментальную ветку/архив, но не коммитить случайно.

## 6. Архитектура

Проект построен как статическая презентация без сборщика и без framework-зависимостей.

Слои:

- `index.html` — структура презентации, preloader, 5 секций, логотип, контент.
- `styles.css` — визуальная система, цвета, типографика, layout, адаптив, motion, iPhone/Safari-правки.
- `script.js` — loader, SVG-pattern mounting, навигация, wheel/keyboard/touch handling, progress indicator, reveal-анимации.
- `assets/` — интерьерные изображения и SVG-паттерны.

Центральная сущность — `.PresentationSection`. Каждый слайд имеет `data-index`:

```text
0 — HeroEntranceSection
1 — PhilosophySection / Commercial Result
2 — MaterialsSection / Category Mix
3 — InnovationRecognitionSection / Digital Efficiency
4 — BoutiqueExperienceSection / Q3 Focus
```

Исторические имена классов не переименовывать без необходимости: они используются в CSS и JS.

## 7. Реализованная функциональность

Сейчас реализовано:

- 5 полноэкранных слайдов;
- preloader с логотипом/датой/временем/паттерном/линией прогресса;
- закрытие loader через wheel/keyboard/touch;
- навигация wheel, keyboard arrows, touch swipe;
- progress indicator;
- счетчик страниц `01 / 05`;
- нижняя timeline-линия;
- кнопка `Вернуться в начало` на последнем слайде;
- фирменный SVG-логотип BORK;
- декоративный монохромный паттерн;
- KPI-блоки и инфографика;
- mobile portrait layout;
- mobile landscape layout;
- специальные правки для iPhone Safari и изменения масштаба через `aA`.

## 8. Ограничения и технический долг

Ограничения:

- нет сборщика, пакетного менеджера и автоматических тестов;
- логика и стили находятся в крупных монолитных файлах;
- адаптивность держится на ручных media query;
- Mobile Safari требует ручной проверки на реальном устройстве;
- нет автоматической visual regression проверки.

Технический долг:

- `styles.css` перегружен историческими слоями;
- часть CSS-классов названа по старой концепции;
- нет точного `DEPLOY.md` с подтвержденной схемой GitHub Pages;
- нет smoke tests;
- возможно наличие неотслеживаемых экспериментальных ассетов;
- `.DS_Store` не должен попадать в коммиты.

## 9. Риски и зоны осторожности

Особенно осторожно менять:

```text
index.html
styles.css
script.js
assets/bork-ginza-pattern-loader.svg
assets/bork-pattern-mono.svg
```

Основные риски:

- изменения `script.js` в loader/wheel/touch могут сломать Safari или вызвать дерганье переходов;
- изменения mobile landscape media query могут нарушить iPhone-компоновку;
- добавление новых слайдов без синхронизации счетчиков и progress indicator ломает навигацию;
- декоративный паттерн может перекрыть навигацию или текст при ошибке z-index/opacity/position;
- сложные SVG/motion-эффекты могут ухудшить производительность;
- `git add .` может случайно добавить экспериментальные ассеты.

Правила осторожности:

- не использовать `git add .` без просмотра `git status`;
- не смешивать деплой, mobile fixes, новые слайды и рефакторинг в одном коммите;
- не переписывать проект на React/Next.js/GSAP без отдельного стратегического решения;
- не усложнять motion без необходимости;
- не переименовывать исторические классы без полной проверки CSS/JS;
- перед деплоем проверять количество `.PresentationSection`.

## 10. Локальный запуск

Прямое открытие:

```text
file:///Users/alexanderchernomorets/Documents/Codex/2026-05-22/web-5-bork-senior-web-designer/Presentation_demo/index.html
```

Рекомендуемый запуск через простой static server:

```bash
cd /Users/alexanderchernomorets/Documents/Codex/2026-05-22/web-5-bork-senior-web-designer/Presentation_demo
npx serve .
```

Если `npx serve` недоступен:

```bash
python3 -m http.server 8000
```

Потом открыть:

```text
http://localhost:8000
```

## 11. QA перед коммитом и деплоем

Минимальный ручной QA:

- открыть локально через static server;
- проверить desktop Chrome;
- проверить desktop Safari;
- проверить iPhone Safari portrait;
- проверить iPhone Safari landscape;
- проверить поведение после изменения масштаба через Safari `aA`;
- проверить loader;
- проверить wheel navigation;
- проверить keyboard navigation;
- проверить touch swipe;
- проверить progress indicator;
- проверить page count;
- проверить кнопку `Вернуться в начало`;
- проверить отсутствие горизонтального overflow на mobile;
- проверить, что `.PresentationSection` ровно 5, если задача не меняла количество слайдов.

## 12. Что не считать актуальной спецификацией

Файл `docs/archive/ORIGINAL_START_PROMPT.md` хранит исходный стартовый промпт только как архивный creative brief.

Его можно использовать как источник эстетических принципов:

- warm architectural minimalism;
- graphite / wood / stone / soft amber light;
- restrained cinematic motion;
- premium, quiet, precise visual language;
- запрет на marketplace-эстетику и визуальный шум.

Нельзя использовать его как основание для:

- переписывания проекта на React / Next.js / TypeScript;
- внедрения Tailwind / Framer Motion / GSAP;
- возврата к старой структуре `Philosophy / Materials / Innovation`;
- буквального восстановления метафоры “пять залов бутика”;
- масштабного рефакторинга без отдельного решения.

## 13. Рекомендуемые следующие шаги

1. Закоммитить `PROJECT_CONTEXT.md`, `AGENTS.md`, `QA_CHECKLIST.md`, `DEPLOY.md`, `docs/archive/ORIGINAL_START_PROMPT.md` отдельным документационным коммитом.
2. Решить судьбу экспериментальных ассетов `bork-infographic-06.png` ... `15.png`.
3. Создать отдельную ветку для следующей задачи.
4. Добавить минимальный smoke-check на количество слайдов и наличие ключевых элементов.
5. Документировать точный GitHub Pages deploy flow.
6. Перед любыми визуальными изменениями проверять iPhone Safari.

## 14. Рабочая формула для Codex

Всегда исходить из следующего:

> Текущий проект — стабильная статическая 5-слайдовая web-презентация бизнес-результатов BORK Internet Boutique Q2 2026. Главная задача дальнейшей разработки — аккуратно улучшать ее, не разрушая стабильность, мобильную адаптацию, навигацию и премиальную визуальную систему.
