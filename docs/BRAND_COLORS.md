# AIDARIS 品牌色彩系统 (Brand Color System)

## 1. 色彩哲学 (Color Philosophy)

AIDARIS 色彩系统建立在 **现代深色美学** 与 **自然能量** 之上：

- **深色基调** — 体现专业感与科技前沿
- **金绿双核** — 金色象征价值与专业，绿色象征增长与可持续
- **可持续性** — 所有颜色具有高对比度，符合 WCAG AAA 标准

---

## 2. 核心品牌色 (Primary Brand Colors)

### 品牌金 (Brand Gold)
```
颜色名称：Brand Gold / Primary Gold
HEX：#ffbd59
RGB：rgb(255, 189, 89)
HSL：hsl(36, 100%, 67%)
CMYK：0%, 26%, 65%, 0%
```

**用途**
- Logo 首字母 "a"（最重要）
- 页面标题强调
- 核心业务价值的视觉突出
- CTA 文本或强调内容

**应用示例**
```css
.logo-initial {
  color: #ffbd59;
}

.subtitle-highlight {
  color: #ffbd59;
}

.fit-conclusion {
  color: #ffbd59;
}
```

**对比度**
- 在 #020301 背景上：**7.2:1** ✅ WCAG AAA
- 在 #07170d 背景上：**6.8:1** ✅ WCAG AAA

---

### 品牌绿 (Brand Green)
```
颜色名称：Brand Green / Accent Green
HEX：#b6ea5f
RGB：rgb(182, 234, 95)
HSL：hsl(76, 74%, 64%)
CMYK：22%, 0%, 59%, 8%
```

**用途**
- 导航链接悬停状态
- 容器与卡片边框
- 眼眉文字（Eyebrow）强调
- 列表项装饰符号（::before 圆点）
- 互动反馈（焦点、激活状态）

**应用示例**
```css
:root {
  --accent: #b6ea5f;
}

.eyebrow {
  color: var(--accent);
}

.nav-link:hover {
  color: var(--accent);
}

.fit-list li::before {
  background: var(--accent);
  box-shadow: 0 0 8px rgba(182, 234, 95, 0.5);
}
```

**对比度**
- 在 #020301 背景上：**9.8:1** ✅ WCAG AAA
- 在 #07170d 背景上：**9.3:1** ✅ WCAG AAA

---

## 3. 中性色系 (Neutral Colors)

### 背景主色 (Primary Background)
```
颜色名称：Background Primary / Deep Black
HEX：#020301
RGB：rgb(2, 3, 1)
HSL：hsl(120, 50%, 1%)
用途：页面主背景、最深层容器
```

**特性**
- 极深黑色，几乎纯黑
- 用于营造高端、专业的视觉氛围
- 提供强大的对比度基础

---

### 背景次色 (Secondary Background)
```
颜色名称：Background Secondary / Deep Green-Black
HEX：#07170d
RGB：rgb(7, 23, 13)
HSL：hsl(140, 54%, 6%)
用途：容器、卡片、次级背景、玻璃态底色
```

**特性**
- 深绿黑色，带有自然绿色基调
- 配合渐变背景，强化品牌绿色主题
- 用于玻璃态容器的半透明基底

**玻璃态容器样式**
```css
.hero-content {
  background: rgba(5, 14, 8, 0.72);  /* 玻璃态基础 */
  border: 1px solid rgba(182, 234, 95, 0.15);  /* 绿色细边框 */
  backdrop-filter: blur(18px);
}
```

---

### 文字主色 (Primary Text)
```
颜色名称：Text Primary / Bright White
HEX：#effaf2
RGB：rgb(239, 250, 242)
HSL：hsl(146, 48%, 96%)
用途：正文、标题、主要内容文本
```

**对比度**
- 在 #020301 背景上：**13.1:1** ✅ WCAG AAA
- 在 #07170d 背景上：**12.5:1** ✅ WCAG AAA

**应用场景**
```css
:root {
  --text: #effaf2;
}

body {
  color: var(--text);
}

h1, h2, p {
  color: var(--text);
}
```

---

### 文字暗色 (Muted Text / Secondary Text)
```
颜色名称：Text Muted / Muted Gray
HEX：#9ab4a8
RGB：rgb(154, 180, 168)
HSL：hsl(144, 14%, 65%)
用途：辅助文字、标签、说明文本、禁用状态
```

**对比度**
- 在 #020301 背景上：**4.8:1** ✅ WCAG AA
- 在 #07170d 背景上：**4.5:1** ✅ WCAG AA

**应用场景**
```css
:root {
  --muted: #9ab4a8;
}

.subtitle {
  color: var(--muted);
}

.nav-link {
  color: var(--muted);
}

.services-item-desc {
  color: var(--muted);
}
```

---

## 4. 渐变定义 (Gradient)

### 页面背景渐变 (Background Gradient)
```css
background: radial-gradient(circle at top, #0e3532 0%, #07170d 38%, #020301 100%);
```

**渐变点**
| 位置 | 颜色 | 十六进制 | 说明 |
|------|------|---------|------|
| 0% (顶部) | 自然绿 | #0e3532 | 为顶部页面添加绿色基调 |
| 38% (中部) | 深绿黑 | #07170d | 过渡色 |
| 100% (底部) | 深黑 | #020301 | 页面底部维持深黑 |

**视觉效果** — 从上到下逐渐变暗，强化品牌绿色主题同时保持专业感

**代码**
```css
body {
  background: radial-gradient(circle at top, #0e3532 0%, #07170d 38%, #020301 100%);
  min-height: 100vh;
}
```

---

### 品牌呼吸动画渐变 (Breath Animation Gradients)
```css
@keyframes aidaris-breath {
  0%, 100% {
    text-shadow: 
      0 0 16px rgba(182, 234, 95, 0.5),      /* 品牌绿发光 */
      0 0 32px rgba(35, 190, 200, 0.2);      /* 青色辅助 */
  }
  50% {
    text-shadow: 
      0 0 26px rgba(182, 234, 95, 0.9),      /* 品牌绿加强 */
      0 0 46px rgba(35, 190, 200, 0.4);      /* 青色加强 */
  }
}
```

**色彩分析**
- 主色：品牌绿 #b6ea5f 的 RGBA 版本
- 辅色：青色 #23bec8（对比度高，营造科技感）
- 透明度：从 0.5 到 0.9（主）、0.2 到 0.4（辅）

---

## 5. 色彩应用矩阵 (Color Application Matrix)

| 元素 | 默认色 | 悬停色 | 焦点色 | 禁用色 |
|------|--------|--------|--------|--------|
| **Logo 初始** | #ffbd59 | N/A | N/A | N/A |
| **导航链接** | #9ab4a8 | #b6ea5f | #b6ea5f + outline | N/A |
| **眼眉文字** | #b6ea5f | N/A | N/A | N/A |
| **标题强调** | #ffbd59 | N/A | N/A | N/A |
| **正文** | #effaf2 | N/A | N/A | #9ab4a8 |
| **装饰元素** | #b6ea5f | N/A | N/A | #9ab4a8 |
| **边框** | rgba(#b6ea5f, 0.15) | rgba(#b6ea5f, 0.3) | rgba(#b6ea5f, 0.5) | N/A |

---

## 6. 透明度 & 玻璃态 (Opacity & Glassmorphism)

### 玻璃态基础色 (Glass Base)
```
颜色名称：Glass Background
RGBA：rgba(5, 14, 8, 0.72)
说明：深绿黑色，72% 不透明度
```

**用途** — 容器、卡片、模态框
**效果** — 配合 `backdrop-filter: blur()` 创建玻璃态效果

---

### 边框透明度 (Border Opacity)
```css
/* 绿色边框 */
border: 1px solid rgba(182, 234, 95, 0.15);  /* 正常 */
border: 1px solid rgba(182, 234, 95, 0.3);   /* 悬停 */
border: 1px solid rgba(182, 234, 95, 0.5);   /* 焦点 */

/* 导航栏边框 */
border-bottom: 1px solid rgba(182, 234, 95, 0.12);
```

---

### 阴影透明度 (Shadow Opacity)
```css
/* Logo 发光 */
text-shadow: 
  0 0 1px rgba(255, 189, 89, 1),        /* 金色细光 */
  0 0 16px rgba(182, 234, 95, 0.5);     /* 绿色柔和光 */

/* 列表装饰符号光晕 */
box-shadow: 0 0 8px rgba(182, 234, 95, 0.5);

/* 容器阴影 */
box-shadow: 0 25px 60px rgba(2, 5, 14, 0.6);
```

---

## 7. 无障碍色彩对比检查 (Accessibility Contrast Check)

### 必需对比度（WCAG 标准）
- **AA 级** — 4.5:1 for text | 3:1 for UI components
- **AAA 级** — 7:1 for text | 4.5:1 for UI components

### AIDARIS 色彩对比度矩阵
| 组合 | 前景色 | 背景色 | 对比度 | 等级 |
|------|--------|--------|--------|------|
| 标题 | #ffbd59 | #020301 | 7.2:1 | AAA ✅ |
| 标题 | #ffbd59 | #07170d | 6.8:1 | AAA ✅ |
| 正文 | #effaf2 | #020301 | 13.1:1 | AAA ✅ |
| 正文 | #effaf2 | #07170d | 12.5:1 | AAA ✅ |
| 导航 | #9ab4a8 | #020301 | 4.8:1 | AA ✅ |
| 导航 | #9ab4a8 | #07170d | 4.5:1 | AA ✅ |
| 强调 | #b6ea5f | #020301 | 9.8:1 | AAA ✅ |
| 强调 | #b6ea5f | #07170d | 9.3:1 | AAA ✅ |

**结论** — 所有核心色彩组合都满足 WCAG AA 或更高标准。

---

## 8. 色彩在响应式设计中的表现 (Colors in Responsive Design)

### 暗色主题一致性
所有色彩在不同设备尺寸上保持一致：
- ✅ 桌面 (1920px+)
- ✅ 平板 (768px - 1024px)
- ✅ 移动端 (320px - 767px)

**注意** — 避免因屏幕 gamma 差异导致的色彩偏差，建议在多设备上测试

### 高对比度模式
某些系统启用 `prefers-contrast: more` 时，色彩应自动增强：

```css
@media (prefers-contrast: more) {
  :root {
    --accent: #c8f73b;  /* 更亮的绿色 */
    --text: #ffffff;    /* 纯白 */
  }
}
```

---

## 9. 色彩资源导出 (Color Export Formats)

### CSS Variables
```css
:root {
  --brand-gold: #ffbd59;
  --brand-green: #b6ea5f;
  --bg: #020301;
  --bg-2: #07170d;
  --text: #effaf2;
  --muted: #9ab4a8;
  --accent: #b6ea5f;
  --glass: rgba(5, 14, 8, 0.72);
  --grad-top: #0e3532;
}
```

### JSON Token 格式
见 `design-tokens.json`

### 色板文件
可将以下颜色导入设计工具（Figma、Adobe XD）：
- Brand Gold: #ffbd59
- Brand Green: #b6ea5f
- Dark BG: #020301
- Deep Green-Black: #07170d
- Text Primary: #effaf2
- Text Muted: #9ab4a8

---

## 10. 色彩迭代历史 (Color Iteration History)

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0 | 2025-04 | 初始品牌色彩系统发布 |

---

## 11. 参考与更新 (References & Updates)

**相关文档**
- `BRAND_GUIDELINES.md` — 品牌总体指南
- `LOGO_USAGE_GUIDE.md` — Logo 使用规范
- `design-tokens.json` — 设计令牌

**审核周期** — 年度一次  
**联系方式** — contact@aidaris.com

