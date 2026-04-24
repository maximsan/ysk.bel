# Backlog — рерайт копирайта (полный)

Цель: полный рерайт публичного копирайта (**осознанно вне** PR’ов дизайн-системы Peat & linen — только контент и мета).

**Как пользоваться:** вычитка по блокам, галочки по мере мерджа. **Мини-критерий “готово v1”:** приоритеты **P1–P2** ниже + актуализация `content-voice.md` по итогам (несколько примеров фраз в голосе).

**Голос и правила:** `docs/content-voice.md`.

---

## P1 — первый экран и поиск (высокий impact)

- [ ] **`src/data/meta.js`** — `title`, `keywords`, `description`, `ogTitle`, `ogDescription`; согласовать с `brandStory` (без противоречий).
- [ ] **`src/includes/hero-section.liquid`** — оба `h2`, при необходимости вынос текста в data (см. `meta` или отдельный ключ).
- [ ] **`src/includes/header.liquid`** — навигация, слоган в шапке (если есть), подсказки.
- [ ] **`src/pages/home/index.md`** — front matter `title` при необходимости.

---

## P2 — услуги, цены, пакеты (ядро конверсии)

- [ ] **`src/data/services.js`** — описание усадьбы, секции, офферы, сноски.
- [ ] **`src/data/packages.js`** — пакеты, если используются в шаблоне.
- [ ] **`src/includes/services.liquid`** — статические подписи/обёртки, если не вынесены в data.
- [ ] **`src/includes/packages.liquid`**.

---

## P3 — баннеры, рыбалка, видео, адрес

- [ ] **`src/data/banner.js`** — тексты модалки / важных объявлений (инфо-баннер).
- [ ] **`src/includes/components/info-banner.liquid`**
- [ ] **`src/includes/cooperation-banner.liquid`** — полоса про инвесторов/телефон (текст в шаблоне).
- [ ] **`src/data/stockingStories.js`**
- [ ] **`src/data/videosShowcase.js`**
- [ ] **`src/data/estate-history.js`**
- [ ] **`src/data/contacts.js`**
- [ ] **`src/includes/contacts.liquid`** — подписи к полям, подсказки карты.
- [ ] **`src/data/sidebar.js`** (если релевантно текущему макету)

---

## P4 — подвал, UI, вспомогательное

- [ ] **`src/data/footer.js`**
- [ ] **`src/includes/footer.liquid`**
- [ ] **`src/includes/menu.liquid`**, **`src/includes/components/mobile-menu-footer.liquid`**
- [ ] **`src/includes/components/modal.liquid`**
- [ ] **`src/includes/components/contact-button.liquid`**
- [ ] **Кнопка «вверх»** — `src/layouts/base.liquid` (`title` у `#scroll-up`)
- [ ] **Сообщение после формы** — `base.liquid` (`#thankyou_message`, сейчас на английском) — привести к русскому/двуязычной политике.

---

## P5 — прочее и техника

- [ ] **Старый English** в `base.liquid` (IE `browserupgrade`) — оставить, перевести или удалить блок при нулевой аудитории IE.
- [ ] **404 / 500** — `404.html`, `500.html` в корне репо (если публикуются).
- [ ] **Произвольный текст в SCSS `content: ''` нет** — копия в основном в Liquid/data.

---

## После v1 (опционально)

- [ ] **Полный rebrand** иллюстраций / **новая фотосъёмка** — отдельный трек, см. plan *out of scope*.

**Как отметить план «Rewriting all copy» выполненным:** когда P1–P2 сделаны и зафиксированы, P3 существенно пройден; P4–P5 — либо сделаны, либо явно отложены issue/комментом в PR.
