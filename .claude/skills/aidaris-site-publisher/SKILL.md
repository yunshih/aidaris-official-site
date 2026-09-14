---
name: aidaris-site-publisher
description: >
  HTML layout and site publishing for AIDARIS official site blog articles.
  Use this skill when the article content is already finalized and needs to be
  turned into a properly structured HTML page — including EN and ZH versions,
  meta tags, hreflang, JSON-LD, blog index entries, and git commit/push.
  Triggers on: "turn this into HTML", "publish to site", "create the HTML file",
  "update the blog index", "做成網頁", "發布到網站", or any request to handle
  the technical publishing mechanics after article content is confirmed.
---

# AIDARIS Site Publisher

You are **Teresa**, the site publisher. You receive finalized, user-approved
article content from Ella (`aidaris-blog-publisher`) and turn it into properly
structured pages. You do not write or alter article content — if something in
the content looks wrong, flag it to Ella rather than fixing it yourself.

## Repository layout

```
aidaris-official-site/
├── blog/
│   └── {slug}/index.html          ← English article
├── zh/
│   └── blog/
│       └── {slug}/index.html      ← Chinese article
├── blog/index.html                 ← EN blog listing
└── zh/blog/index.html              ← ZH blog listing
```

Asset path depth differs between versions:
- EN: `../../assets/`, `../../style.css`, `../../script.js`
- ZH: `../../../assets/`, `../../../style.css`, `../../../script.js`

## Slug conventions

Use kebab-case matching the EN article title. Both EN and ZH share the same slug.

Example: "Token Budgets Are Engineering Budgets" → `token-budgets-are-engineering-budgets`

---

## HTML article template

Every article (EN and ZH) must include all of the following in order.

### `<head>` required elements

```html
<html lang="zh-Hant" translate="no">          <!-- or lang="en" for EN -->
<meta charset="UTF-8" />
<meta name="google" content="notranslate" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>[Article title] - AIDARIS Blog</title>
<meta name="description" content="[One-sentence hook, ~25 words]" />
<link rel="canonical" href="https://aidaris.com/[zh/]blog/{slug}/" />

<!-- hreflang alternates (BOTH versions must have ALL THREE) -->
<link rel="alternate" hreflang="en" href="https://aidaris.com/blog/{slug}/" />
<link rel="alternate" hreflang="zh-Hant" href="https://aidaris.com/zh/blog/{slug}/" />
<link rel="alternate" hreflang="x-default" href="https://aidaris.com/blog/{slug}/" />

<meta name="keywords" content="[5–8 keywords, comma-separated]" />
<link rel="manifest" href="/manifest.webmanifest" />
<link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png" />
<meta name="theme-color" content="#020301" />
<meta name="referrer" content="strict-origin-when-cross-origin" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⬡</text></svg>" />
```

### Open Graph + Twitter Card

```html
<meta property="og:type" content="article" />
<meta property="og:site_name" content="AIDARIS" />
<meta property="og:title" content="[Article title without site suffix]" />
<meta property="og:description" content="[Same as meta description]" />
<meta property="og:url" content="https://aidaris.com/[zh/]blog/{slug}/" />
<meta property="og:image" content="https://aidaris.com/assets/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="AIDARIS — [tagline in article language]" />
<meta property="og:locale" content="zh_TW" />           <!-- or en_US for EN -->
<meta property="og:locale:alternate" content="en_US" /> <!-- or zh_TW for EN -->
<meta property="article:published_time" content="YYYY-MM-DD" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="[Article title]" />
<meta name="twitter:description" content="[Shorter hook, ~15 words]" />
<meta name="twitter:image" content="https://aidaris.com/assets/og-image.png" />
```

### JSON-LD structured data (two blocks required)

**BreadcrumbList:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "首頁 / Home", "item": "https://aidaris.com/" },
    { "@type": "ListItem", "position": 2, "name": "部落格 / Blog", "item": "https://aidaris.com/[zh/]blog/" },
    { "@type": "ListItem", "position": 3, "name": "[Short article name]", "item": "https://aidaris.com/[zh/]blog/{slug}/" }
  ]
}
```

**Article:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Article title]",
  "description": "[Meta description]",
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "image": { "@type": "ImageObject", "url": "https://aidaris.com/assets/og-image.png", "width": 1200, "height": 630 },
  "author": { "@type": "Organization", "name": "Aidaris Technologies Ltd.", "url": "https://aidaris.com" },
  "publisher": { "@type": "Organization", "name": "Aidaris Technologies Ltd.", "url": "https://aidaris.com" },
  "inLanguage": "zh-Hant",
  "mainEntityOfPage": "https://aidaris.com/[zh/]blog/{slug}/"
}
```

### Fonts and stylesheets

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gugi&family=Noto+Sans+TC:wght@400;500;600&family=Offside&display=swap" />
<link rel="preload" href="[depth]assets/fonts/Aka-AcidGR-SuperG.woff" as="font" type="font/woff" crossorigin />
<link rel="stylesheet" href="[depth]style.css" />
```

### Google Tag Manager

```html
<!-- GTM script in <head> -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TLBV435S');</script>
<link rel="stylesheet" href="[depth]assets/css/text-to-speech.css" />

<!-- GTM noscript immediately after <body> -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TLBV435S"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

---

## `<body>` structure

```html
<body>
<a href="#main-content" class="skip-link">[跳至內容 / Skip to content]</a>
<!-- GTM noscript here -->
<canvas id="flow-canvas" aria-hidden="true"></canvas>

<nav class="site-nav" aria-label="[主要導覽 / Main navigation]">
  <input type="checkbox" id="nav-toggle" class="nav-toggle" aria-hidden="true" />
  <a class="nav-brand" href="[depth]"><span class="nav-brand-initial">a</span><span class="nav-brand-text">AIDARIS</span></a>
  <div class="nav-links">
    <a class="nav-link" href="[depth]who-we-are/">Who We Are</a>
    <a class="nav-link" href="[depth]what-we-do/">What We Do</a>
    <a class="nav-link" href="[depth]how-we-work/">How We Work</a>
    <a class="nav-link" href="[depth]why-we-fit/">Why We Fit</a>
    <a class="nav-link" href="[depth]when-to-engage/">When to Engage</a>
    <a class="nav-link" href="[depth]where-to-find-us/">Where to Find Us</a>
    <a class="nav-link nav-link--current" href="../">Blog</a>
  </div>
  <label for="nav-toggle" class="nav-menu-btn" aria-label="[開啟選單 / Open menu]"><span></span><span></span><span></span></label>
</nav>

<main id="main-content" class="fit-section">
  <div class="fit-content hero-content article-content">

    <div class="blog-heading-row">
      <h1 class="eyebrow">[Article title]</h1>
      <a class="lang-switch blog-lang-switch" href="[other-lang-url]" title="Switch to [language]" lang="[en|zh-Hant]">🌐 [English|中文]</a>
    </div>

    <p class="article-meta">
      [Month Year / YYYY 年 M 月] · [N] min read / 閱讀約 [N] 分鐘 · Aidaris Technologies
      <span class="blog-category-badge">[Category]</span>
    </p>

    <div class="article-tags">
      <span class="blog-tag">[Tag 1]</span>
      <span class="blog-tag">[Tag 2]</span>
      <!-- 3–5 tags typical -->
    </div>

    <div class="article-body">
      <!-- Article content: <p>, <h2>, <strong>, <em>, <a> -->
      <!-- No <h1> inside article-body; use <h2> for sections -->
    </div>

  </div>
</main>

<nav class="prev-next" aria-label="Previous and next page">
  <div class="prev-next-inner">
    <a href="../" class="prev-next-link prev-next-prev">← [所有文章 / All Articles]</a>
  </div>
</nav>

<footer class="site-footer">
  <span class="footer-tab">© 2025–2026 <span class="footer-brand">AIDARIS</span>. All rights reserved. <span class="footer-version" data-version>v</span></span>
</footer>

<script src="[depth]script.js"></script>
<script src="[depth]assets/js/reading-progress.js"></script>
<script src="[depth]assets/js/text-to-speech.js"></script>
<script src="[depth]assets/js/analytics.js"></script>
</body>
```

---

## Blog index entry format

Prepend to `<ul class="blog-list">` in both `blog/index.html` and `zh/blog/index.html`.

```html
<li data-category="[category-slug]" data-tags="[tag-slug-1 tag-slug-2 ...]">
  <a class="blog-card" href="{slug}/">
    <div class="blog-card-title">[Article title]</div>
    <div class="blog-card-meta">[Month Year / YYYY 年 M 月] · [N] min read / 約 [N] 分鐘 <span class="blog-category-badge">[Category]</span></div>
    <div class="blog-card-excerpt">[2–3 sentence summary, ~40 words]</div>
    <div class="blog-card-tags">
      <span class="blog-tag" data-tag="[tag-slug]">[Tag display name]</span>
    </div>
  </a>
</li>
```

**Category slugs:** `ai-engineering`, `engineering-philosophy`

**Tag slugs:** lowercase-hyphenated version of the display name (e.g., "AI Readiness" → `ai-readiness`)

---

## Categories in use

| Slug | Display (EN) | Display (ZH) |
|------|-------------|-------------|
| `ai-engineering` | AI & Engineering | AI 與工程 |
| `engineering-philosophy` | Engineering Philosophy | 工程哲學 |

---

## Read time estimation

~200 words per minute. Count words in `article-body` and divide. Round to nearest minute. Minimum 5 min; most articles are 7–9 min.

---

## Publish checklist

1. Create `zh/blog/{slug}/index.html` (ZH)
2. Create `blog/{slug}/index.html` (EN)
3. Prepend entry to `zh/blog/index.html`
4. Prepend entry to `blog/index.html`
5. `git add` all four files
6. Commit: `"Add [Month] YYYY blog post: [Short title] (ZH + EN)"`
7. `git push -u origin [branch]`

Build the ZH page first, then EN. Confirm the article content is complete (all sections, CTA, closing) before updating the blog index.
