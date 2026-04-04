# AIDARIS 品牌资源清单 (Brand Assets Inventory)

本文档是 AIDARIS 官方网站所有品牌资源的中央清单，包括字体文件、图片资源、颜色定义、设计令牌等。

## 📋 快速索引 (Quick Index)

- [字体资源](#字体资源-fonts)
- [图片资源](#图片资源-images)
- [颜色资源](#颜色资源-colors)
- [设计令牌](#设计令牌-design-tokens)
- [CSS 变量](#css-变量-css-variables)
- [第三方资源](#第三方资源-third-party-resources)
- [资源维护与更新](#资源维护与更新-maintenance)

---

## 🔤 字体资源 (Fonts)

### 自定义字体

#### SuperG（Logo 专属字体）
```
文件名：Aka-AcidGR-SuperG.woff
路径：assets/fonts/Aka-AcidGR-SuperG.woff
文件大小：22 KB
格式：WOFF
字重：700
字风格：Normal
用途：Logo 首字母 "a"
许可证：[需确认]
```

**加载方式**
```css
@font-face {
  font-family: "SuperG";
  src: url("assets/fonts/Aka-AcidGR-SuperG.woff") format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

**预加载优化**
```html
<link rel="preload" href="assets/fonts/Aka-AcidGR-SuperG.woff" as="font" type="font/woff" crossorigin />
```

---

### Google Fonts（CDN 加载）

#### Gugi
```
来源：Google Fonts
用途：Logo 文本、大标题
字重：400
CDN 链接：https://fonts.googleapis.com/css2?family=Gugi&display=swap
加载状态：✅ 启用
```

**使用场景**
- h1 (页面主标题)
- .logo-text (Logo 文本 "AIDARIS")
- .nav-brand-text (导航栏品牌文本)
- .footer-brand (页脚品牌文本)
- .fit-brand (其他页面品牌文本)

---

#### Offside
```
来源：Google Fonts
用途：标题强调、眼眉文字、导航
字重：400
CDN 链接：https://fonts.googleapis.com/css2?family=Offside&display=swap
加载状态：✅ 启用
```

**使用场景**
- .eyebrow (眼眉文字)
- .subtitle (副标题)
- .nav-link (导航链接)
- .about-heading (页面小标题)
- .nav-brand-initial (导航栏Logo初始字母)

---

#### Noto Sans TC (Traditional Chinese)
```
来源：Google Fonts
用途：中文正文、标题、UI 文字
字重：400, 500, 600
CDN 链接：https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600&display=swap
加载状态：✅ 启用
```

**字重用途**
- 400: 正文、列表
- 500: 次级强调
- 600: 小标题、关键强调

---

### 系统字体（无需加载）

#### SF Pro Display
```
来源：Apple 系统字体
兼容性：macOS, iOS, iPadOS
备选字体：Inter, Helvetica Neue, Arial
用途：正文、UI 元素
字重：400, 500, 600, 700
```

#### Inter
```
来源：开源字体
备选：当 SF Pro Display 不可用时
用途：正文、UI 元素
字重：400, 500, 600, 700
```

---

### 字体堆栈 CSS 定义

**Logo 初始字母**
```css
font-family: "SuperG", "Gugi", "Offside", "Noto Sans TC", "SF Pro Display", "Inter", sans-serif;
```

**标题**
```css
font-family: "Gugi", "Offside", "Noto Sans TC", "SF Pro Display", "Inter", sans-serif;
```

**强调文本**
```css
font-family: "Offside", "Noto Sans TC", "SF Pro Display", "Inter", sans-serif;
```

**正文**
```css
font-family: "SF Pro Display", "Inter", "Noto Sans TC", "Helvetica Neue", Arial, sans-serif;
```

---

## 🖼️ 图片资源 (Images)

### Open Graph 图片

#### og-image.png
```
文件名：og-image.png
路径：assets/og-image.png
文件大小：152 KB
尺寸：1200 × 630 px (推荐 OG 尺寸)
用途：社交媒体分享预览
格式：PNG
加载状态：✅ 启用
```

**应用位置**
```html
<!-- Open Graph Meta Tags -->
<meta property="og:image" content="https://aidaris.com/assets/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Twitter Card -->
<meta name="twitter:image" content="https://aidaris.com/assets/og-image.png" />
```

**品牌指南**
- 应包含 Logo 和品牌颜色
- 文本清晰可读（最小 24pt）
- 遵循 16:9 宽高比（1200×630）

---

### Favicon

#### 动态 SVG Favicon
```
格式：SVG (数据 URI)
内容：<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⬡</text></svg>
用途：浏览器标签页图标
加载方式：data: URI (无需外部文件)
```

**代码**
```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⬡</text></svg>" />
```

**优势**
- 无需额外 HTTP 请求
- 轻量级，自动响应浅色/深色主题
- 品牌辨识度高（六边形符号）

---

### 需要补充的图片资源

| 资源类型 | 优先级 | 说明 |
|---------|--------|------|
| Logo PNG (透明) | ⭐⭐⭐⭐ | 多尺寸 (256px, 512px, 1024px) |
| Logo SVG | ⭐⭐⭐⭐ | 矢量格式，用于 Figma 等设计工具 |
| 品牌颜色色板 | ⭐⭐⭐ | Figma, Adobe XD, Sketch 格式 |
| 图标集 | ⭐⭐⭐ | UI 交互图标（如果需要） |
| 插图/背景 | ⭐⭐ | 品牌风格的装饰图像 |

---

## 🎨 颜色资源 (Colors)

### 品牌色彩 RGB 值

#### 品牌金 (Brand Gold)
```
十六进制：#ffbd59
RGB：rgb(255, 189, 89)
HSL：hsl(36, 100%, 67%)
CMYK：0%, 26%, 65%, 0%
Pantone：不适用（数字产品）
用途：Logo 初始字母、强调
```

---

#### 品牌绿 (Brand Green)
```
十六进制：#b6ea5f
RGB：rgb(182, 234, 95)
HSL：hsl(76, 74%, 64%)
CMYK：22%, 0%, 59%, 8%
Pantone：不适用（数字产品）
用途：交互强调、边框、装饰
```

---

### 中性色彩

#### 深黑 (Primary Background)
```
十六进制：#020301
RGB：rgb(2, 3, 1)
HSL：hsl(120, 50%, 1%)
```

#### 深绿黑 (Secondary Background)
```
十六进制：#07170d
RGB：rgb(7, 23, 13)
HSL：hsl(140, 54%, 6%)
```

#### 品牌白 (Primary Text)
```
十六进制：#effaf2
RGB：rgb(239, 250, 242)
HSL：hsl(146, 48%, 96%)
```

#### 暗灰 (Muted Text)
```
十六进制：#9ab4a8
RGB：rgb(154, 180, 168)
HSL：hsl(144, 14%, 65%)
```

---

### 颜色导出格式

#### CSS 变量
```css
:root {
  --brand-gold: #ffbd59;
  --brand-green: #b6ea5f;
  --bg: #020301;
  --bg-2: #07170d;
  --text: #effaf2;
  --muted: #9ab4a8;
  --accent: #b6ea5f;
}
```

#### JSON 格式
见 `design-tokens.json` 的 `color` 对象

#### Figma 色板
**待补充** — 需生成并导出 Figma 色板文件

#### Adobe 色板
**待补充** — `.aco` 或 `.ase` 格式

---

## 🔧 设计令牌 (Design Tokens)

### 令牌文件位置

**路径**：`docs/design-tokens.json`  
**格式**：JSON (W3C Design Tokens 标准)  
**更新周期**：与设计规范同步更新

### 令牌类别

| 类别 | 示例 | 用途 |
|------|------|------|
| **color** | `#ffbd59`, `rgba(...)` | 颜色 |
| **typography** | `fontFamily`, `fontSize` | 排版 |
| **spacing** | `8px`, `16px` | 间距 |
| **effects** | `box-shadow`, `animation` | 特效 |
| **responsive** | `breakpoints` | 响应式 |

### 令牌获取方式

**直接查看** — 打开 `docs/design-tokens.json`

**导入工具**
```bash
# Figma 插件可直接导入
# Adobe XD 支持通过插件导入
# VS Code 扩展可提供代码提示
```

---

## 📝 CSS 变量 (CSS Variables)

### 全局 CSS 变量定义

**位置**：`style.css` 第 19-27 行

```css
:root {
  color-scheme: dark;
  --bg: #020301;
  --bg-2: #07170d;
  --text: #effaf2;
  --muted: #9ab4a8;
  --accent: #b6ea5f;
  --glass: rgba(5, 14, 8, 0.72);
}
```

### CSS 变量使用示例

```css
body {
  color: var(--text);
  background: var(--bg);
}

.nav-link:hover {
  color: var(--accent);
}

.hero-content {
  background: var(--glass);
}
```

### 自定义属性扩展建议

```css
:root {
  /* 品牌色 */
  --color-brand-gold: #ffbd59;
  --color-brand-green: #b6ea5f;
  
  /* 背景 */
  --color-bg-primary: #020301;
  --color-bg-secondary: #07170d;
  
  /* 文字 */
  --color-text-primary: #effaf2;
  --color-text-muted: #9ab4a8;
  
  /* 排版 */
  --font-display: "Gugi", "Offside", sans-serif;
  --font-body: "SF Pro Display", "Inter", sans-serif;
  --font-cjk: "Noto Sans TC", sans-serif;
  
  /* 间距 */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  
  /* 效果 */
  --blur-light: blur(10px);
  --blur-medium: blur(12px);
  --blur-heavy: blur(18px);
}
```

---

## 🌐 第三方资源 (Third-Party Resources)

### Google Fonts CDN

**当前使用状态**：✅ 启用

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gugi&family=Noto+Sans+TC:wght@400;500;600&family=Offside&display=swap" />
```

**加载字体**
- Gugi
- Noto Sans TC (400, 500, 600)
- Offside

**性能优化**
- 使用 `rel="preconnect"` 预连接 CDN
- 使用 `display=swap` 策略，避免 FOUT
- 仅加载必要的字重

---

### Google Tag Manager

**状态**：✅ 启用  
**ID**：GTM-TLBV435S  
**用途**：分析与事件跟踪

```html
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TLBV435S');</script>
```

---

### 其他 CDN 与服务

| 服务 | 用途 | 状态 | 说明 |
|------|------|------|------|
| Cloudflare | CDN | ✅ | og-image.png 加速 |
| GitHub Pages | 托管 | ✅ | 静态网站托管 |

---

## 📊 资源版本控制 (Version Control)

### 当前版本

| 资源 | 版本 | 最后更新 | 维护者 |
|------|------|---------|--------|
| SuperG 字体 | v1.0 | 2025-03 | [待确认] |
| 颜色系统 | v1.0 | 2025-04 | Design Team |
| og-image | v1.0 | 2025-03 | [待确认] |
| 设计令牌 | v1.0 | 2025-04 | Design Team |

---

### 版本更新记录

```
v1.0 (2025-04-04)
├─ 初始资源清单发布
├─ 包含 SuperG 字体、Google Fonts、og-image
└─ 设计令牌 JSON 完成

v0.9 (规划中)
├─ 补充 Logo SVG/PNG 资源
├─ 生成 Figma 色板
└─ 创建完整的图标系统
```

---

## 🛠️ 资源维护与更新 (Maintenance)

### 日常维护

#### 每周检查
- [ ] Google Fonts CDN 加载状态
- [ ] 字体渲染是否正常

#### 每月检查
- [ ] og-image 是否在社交媒体上正确显示
- [ ] 颜色对比度是否符合 WCAG 标准
- [ ] Google Tag Manager 数据收集正常

#### 每季度审核
- [ ] 更新设计令牌 JSON
- [ ] 检查是否有新的字重需求
- [ ] 确认所有资源的可用性

### 版本更新流程

当需要更新品牌资源时：

1. **提出变更提案** — 详细说明理由与影响范围
2. **更新规范文档** — 同步更新所有相关的 `.md` 文件
3. **更新设计令牌** — 修改 `design-tokens.json`
4. **更新 CSS 变量** — 在 `style.css` 中修改 `:root` 定义
5. **更新此清单** — 记录版本变更
6. **测试验证** — 在多个浏览器/设备上测试
7. **创建 commit** — 清晰的提交信息与描述

---

## 📥 资源下载与导入

### 下载资源

**字体文件下载**
```bash
# SuperG 字体
https://aidaris.com/assets/fonts/Aka-AcidGR-SuperG.woff

# og-image
https://aidaris.com/assets/og-image.png
```

### Figma 设计工具集成

**方式 1：使用 Token Studio 插件**
```
1. 在 Figma 中安装 Token Studio 插件
2. 导入 design-tokens.json
3. 自动同步到设计系统
```

**方式 2：手动导入**
```
1. 在 Figma 中创建 Library 文件
2. 手动添加颜色、字体、组件
3. 与设计规范保持同步
```

### VS Code 集成

**推荐扩展**
- CSS Variables (使用代码提示)
- Design Tokens (令牌管理)

---

## 🎯 资源清单检查清单 (Checklist)

在使用品牌资源时，确保你检查了：

- [ ] 所有字体是否正确加载？
- [ ] 颜色值是否与规范一致？
- [ ] og-image 在社交媒体上是否显示正确？
- [ ] CSS 变量是否被正确使用？
- [ ] 是否遵循了推荐的字体堆栈？
- [ ] Google Fonts CDN 是否可访问？
- [ ] 是否有需要添加的新资源？

---

## 📞 资源相关问题 (Support)

**问题或建议？**
- 📧 Email: contact@aidaris.com
- 🐛 Issue: GitHub Issues
- 📝 PR: 提交改进建议

---

## 📚 相关文档 (Related Documentation)

- `BRAND_GUIDELINES.md` — 品牌总体指南
- `LOGO_USAGE_GUIDE.md` — Logo 使用规范
- `BRAND_COLORS.md` — 色彩系统详解
- `BRAND_TYPOGRAPHY.md` — 排版系统详解
- `design-tokens.json` — 机器可读令牌

---

## 附录 A：常见问题 (FAQ)

### Q: 我想在 Figma 中使用 AIDARIS 品牌颜色，怎么做？

**A:** 
1. 下载 `design-tokens.json`
2. 安装 Figma 的 Token Studio 插件
3. 在插件中导入 JSON 文件
4. 颜色会自动同步到你的 Figma 工作区

### Q: 能否离线使用 Google Fonts？

**A:** 可以，但不推荐。你需要：
1. 下载字体文件 (`.ttf` 或 `.woff2` 格式)
2. 添加 `@font-face` CSS
3. 确保符合谷歌字体的许可证

推荐使用 CDN，性能更好。

### Q: SuperG 字体是否有其他字重？

**A:** 目前仅有 700（粗体）。如需其他字重，请联系 Design Team。

### Q: 如何在打印设计中使用这些颜色？

**A:** 打印设计需要 CMYK 值。见 `BRAND_COLORS.md` 的 CMYK 定义。但建议：
- 主要用于数字产品
- 打印前联系设计团队确认输出配置文件

---

**最后更新：2025-04-04**  
**版本：v1.0**  
**维护者：AIDARIS Design System Team**

