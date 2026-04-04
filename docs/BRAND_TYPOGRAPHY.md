# AIDARIS 品牌排版系统 (Brand Typography System)

## 1. 排版哲学 (Typography Philosophy)

AIDARIS 排版系统强调：
- **层级清晰** — 通过字号、字重、字族区分信息等级
- **可读性优先** — 在美观与易读之间找到平衡
- **品牌特质** — SuperG、Gugi 等特殊字体强化品牌认知
- **多语言支持** — 英文与中文排版规范统一

---

## 2. 品牌字体堆栈 (Font Stack)

### 2.1 SuperG — Logo 首字母专属字体
```
字体名称：Aka Acid GR - SuperG
来源：自定义字体文件
格式：WOFF
路径：assets/fonts/Aka-AcidGR-SuperG.woff
字重：700（仅限）
字风格：Normal（仅限）
```

**特性**
- 几何现代感极强
- 仅用于 Logo 首字母 "a"
- 配合金色 (#ffbd59) 和文字笔划效果强化品牌标识

**应用**
```css
.logo-initial,
.nav-brand-initial {
  font-family: "SuperG", "Gugi", "Offside", "Noto Sans TC", "SF Pro Display", "Inter", sans-serif;
  font-weight: 700;
}
```

---

### 2.2 Gugi — 标题与品牌文本字体
```
字体名称：Gugi
来源：Google Fonts
格式：Variable Font (WOFF2)
字重：400（默认）
引入方式：<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gugi&display=swap">
```

**特性**
- 现代、略显活泼的无衬线字体
- 大号显示时具有独特品牌气质
- 用于 Logo 文本 "AIDARIS"、主标题

**应用场景**
```css
h1 {
  font-family: "Gugi", "Offside", "Noto Sans TC", "SF Pro Display", "Inter", sans-serif;
}

.logo-text,
.nav-brand-text,
.footer-brand,
.fit-brand {
  font-family: "Gugi", "Offside", "Noto Sans TC", "SF Pro Display", "Inter", sans-serif;
}
```

---

### 2.3 Offside — 标题与强调文本
```
字体名称：Offside
来源：Google Fonts
格式：WOFF2
字重：400（默认）
引入方式：<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Offside&display=swap">
```

**特性**
- 几何现代感，高可读性
- 字形独特但易于识别
- 用于眼眉文字、小标题、品牌强调

**应用场景**
```css
.eyebrow {
  font-family: "Offside", "Noto Sans TC", "SF Pro Display", "Inter", sans-serif;
}

.subtitle,
.subtitle-highlight,
.about-heading,
.nav-link {
  font-family: "Offside", "Noto Sans TC", "SF Pro Display", "Inter", sans-serif;
}
```

---

### 2.4 Noto Sans TC — 中文正文与标题
```
字体名称：Noto Sans TC (Noto Sans Traditional Chinese)
来源：Google Fonts
格式：Variable Font (WOFF2)
字重：400, 500, 600
引入方式：<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600&display=swap">
```

**特性**
- 高质量 CJK 字体，完整中文支持
- 多字重选择，适应不同层级
- 与英文字体和谐搭配

**应用场景**
```css
body {
  font-family: "SF Pro Display", "Inter", "Helvetica Neue", Arial, sans-serif;
}

/* 中文内容自动降级到 Noto Sans TC */
body {
  font-family: "SF Pro Display", "Inter", "Noto Sans TC", "Helvetica Neue", Arial, sans-serif;
}

.fit-list li {
  font-family: "Noto Sans TC", "SF Pro Display", "Inter", sans-serif;
}
```

---

### 2.5 SF Pro Display — 主体正文字体
```
字体名称：SF Pro Display (San Francisco)
来源：系统预装（Apple 设备）/ 回退
格式：OpenType
字重：400, 500, 600, 700
特点：Apple 官方设计，高度优化
```

**特性**
- 优秀的可读性和亲和力
- 在 macOS/iOS 上自动使用最佳版本
- 是行业标准的 UI 字体

**应用场景**
```css
body {
  font-family: "SF Pro Display", "Inter", "Helvetica Neue", Arial, sans-serif;
}

p, span, li {
  /* 继承自 body */
}
```

---

### 2.6 Inter — 备选正文字体
```
字体名称：Inter
来源：开源字体，高度优化的 UI 字体
格式：Variable Font (WOFF2)
字重：400, 500, 600, 700
使用场景：SF Pro Display 不可用时的优先备选
```

---

## 3. 字体组合与场景 (Font Combinations)

### 场景 1：页面标题 (Page Hero)
```css
h1 {
  font-family: "Gugi", "Offside", "Noto Sans TC", "SF Pro Display", "Inter", sans-serif;
  font-size: clamp(2.4rem, 5.2vw, 4.6rem);  /* 响应式，38px - 73px */
  line-height: 1.08;
  letter-spacing: 0;
  font-weight: 400;  /* Gugi 未来可能增加字重 */
}

/* Logo 首字母 */
h1 .logo-initial {
  font-family: "SuperG", "Gugi", ...;
  font-size: 1.8em;  /* 相对于 h1 */
  color: #ffbd59;
}
```

---

### 场景 2：眼眉文字 (Eyebrow / Label)
```css
.eyebrow {
  font-family: "Offside", "Noto Sans TC", "SF Pro Display", "Inter", sans-serif;
  font-size: 1.3rem;
  font-weight: normal;
  letter-spacing: 0.22em;  /* 宽松 */
  color: #b6ea5f;  /* 品牌绿 */
  text-transform: none;
}
```

---

### 场景 3：副标题 (Subtitle)
```css
.subtitle {
  font-family: "Offside", "Noto Sans TC", "SF Pro Display", "Inter", sans-serif;
  font-size: clamp(0.95rem, 1.05vw, 1.25rem);  /* 响应式，15px - 20px */
  line-height: 1.8;
  letter-spacing: 0.02em;
  color: #9ab4a8;  /* 暗文字 */
}

.subtitle-highlight {
  color: #ffbd59;  /* 强调为金色 */
  font-size: 0.95em;
}
```

---

### 场景 4：正文段落 (Body Text)
```css
p {
  font-family: "SF Pro Display", "Inter", "Noto Sans TC", "Helvetica Neue", Arial, sans-serif;
  font-size: clamp(0.95rem, 1.1vw, 1.1rem);
  line-height: 1.8;  /* 充足的行高，便于阅读 */
  letter-spacing: 0;
  color: #effaf2;
}
```

---

### 场景 5：导航链接 (Navigation)
```css
.nav-link {
  font-family: "Offside", "Noto Sans TC", "SF Pro Display", "Inter", sans-serif;
  font-size: 0.85rem;
  font-weight: normal;
  letter-spacing: 0.1em;  /* 宽松，增强导航的独立性 */
  color: #9ab4a8;
  text-transform: none;
}

.nav-link:hover {
  color: #b6ea5f;  /* 品牌绿 */
}
```

---

### 场景 6：列表项 (List Item)
```css
.fit-list li {
  font-family: "Noto Sans TC", "SF Pro Display", "Inter", sans-serif;
  font-size: clamp(1rem, 1.2vw, 1.15rem);
  line-height: 1.85;  /* 列表项适当高行高 */
  color: #effaf2;
}
```

---

### 场景 7：页脚品牌 (Footer Brand)
```css
.footer-brand {
  font-family: "Gugi", "Offside", "Noto Sans TC", "SF Pro Display", "Inter", sans-serif;
  font-size: inherit;  /* 继承自页脚文本 */
  letter-spacing: 0.08em;
  color: #ffffff;  /* 纯白强调 */
}
```

---

## 4. 字号系统 (Font Sizing System)

### 响应式字号设计
使用 `clamp()` 函数实现流式排版：

```css
clamp(min-size, preferred-size, max-size)
```

#### 标准字号阶梯
| 类别 | 最小 | 首选 | 最大 | 用途 |
|------|------|------|------|------|
| **h1** | 2.4rem (38px) | 5.2vw | 4.6rem (73px) | 主标题 |
| **subtitle** | 0.95rem (15px) | 1.05vw | 1.25rem (20px) | 副标题 |
| **eyebrow** | 1.3rem | fixed | 1.3rem | 眼眉文字 |
| **p (body)** | 0.95rem (15px) | 1.1vw | 1.1rem (17.6px) | 正文 |
| **list** | 1rem (16px) | 1.2vw | 1.15rem (18.4px) | 列表 |
| **nav** | 0.85rem (13.6px) | fixed | 0.85rem | 导航 |
| **small** | 0.65rem (10.4px) | fixed | 0.65rem | 能力说明 |

---

## 5. 字重系统 (Font Weight)

### 推荐字重组合
| 字重 | 用途 | 示例 |
|------|------|------|
| **400** (Normal) | 正文、标题、导航 | p, h1, nav-link |
| **500** | 次级强调、列表标题 | .services-item-title |
| **600** | 关键强调、小标题 | .about-heading |
| **700** | 仅限 SuperG 字体 | .logo-initial |

---

## 6. 字母间距 (Letter Spacing)

### 间距规范
| 值 | 用途 | 场景 |
|------|------|------|
| **0** | 正常间距 | 正文、列表、导航 |
| **0.02em** | 极细微调 | 副标题 |
| **0.04em** | 轻微展开 | Logo 文本 |
| **0.06em** | 中等展开 | 导航品牌、页脚品牌 |
| **0.08em** | 展开 | 页脚品牌（强调） |
| **0.1em** | 较宽展开 | 导航链接 |
| **0.18em** | 大幅展开 | 能力标签 |
| **0.22em** | 最宽展开 | 眼眉文字 |

**设计意图** — 字母间距越大，越强调品牌视觉独特性；越小，越强调易读性。

---

## 7. 行高系统 (Line Height)

| 值 | 用途 | 场景 |
|------|------|------|
| **1.08** | 极紧凑 | h1 大标题 |
| **1.4** | 紧凑 | 眼眉、标签 |
| **1.6** | 中等 | 服务描述、辅助文字 |
| **1.65** | 中等偏松 | 联系页面介绍 |
| **1.7** | 松 | 长段落强调 |
| **1.8** | 较松 | 副标题、正文 |
| **1.85** | 较松 | 列表项 |

---

## 8. 文本效果 (Text Effects)

### 文字笔划 (Text Stroke)
```css
/* Logo 初始字母 */
.logo-initial {
  -webkit-text-stroke: 0.7px currentColor;  /* 主页 */
}

.nav-brand-initial {
  -webkit-text-stroke: 0.5px currentColor;  /* 导航栏 */
}
```

**用途** — 增强 Logo 首字母的视觉冲击力，强化品牌辨识度

---

### 文字阴影 (Text Shadow)
```css
/* Logo 发光效果 */
.logo-initial {
  text-shadow: 0 0 1px currentColor;
}

/* 品牌呼吸动画 */
h1 {
  text-shadow: 
    0 0 16px rgba(182, 234, 95, 0.5),
    0 0 32px rgba(35, 190, 200, 0.2);
}

/* 页脚文字 */
.site-footer {
  text-shadow: 0 2px 10px rgba(2, 6, 4, 0.85);
}
```

---

## 9. 文本变换 (Text Transform)

### 应用规则
| 属性值 | 用途 | 示例 |
|--------|------|------|
| **none** | 默认，按原样显示 | 大多数文本 |
| **uppercase** | 转换为大写 | 能力标签、导航 |
| **normal** | 保持原样 | Logo、标题 |

**示例**
```css
.capabilities {
  text-transform: uppercase;
  letter-spacing: 0.18em;  /* 大写配合宽松字间距 */
}
```

---

## 10. 多语言排版 (Multilingual Typography)

### 英文排版
- 字体：SuperG/Gugi/Offside → SF Pro Display
- 字号：标准响应式
- 特点：字母间距较大，强调品牌

### 中文排版
- 字体：Noto Sans TC（首选）
- 字号：与英文相同
- 特点：
  - 汉字天然占用宽度，无需过大字间距
  - 与英文字体混排时应调整基线
  - 避免在汉字上过度使用笔划、阴影

**混合排版示例**
```html
<p>
  AIDARIS 是一个工程驱动的合作伙伴，
  <span class="highlight">Focused on reliability, maintainability, and long-term value.</span>
</p>
```

---

## 11. 无障碍排版 (Accessible Typography)

### 最小字号限制
```css
/* 不应小于 12px 的正文 */
p {
  font-size: clamp(0.95rem, 1.1vw, 1.1rem);  /* 最小 15px */
}

/* 导航与小文字可接受 13px */
.nav-link {
  font-size: 0.85rem;  /* 约 13.6px */
}
```

### 对比度（已在 `BRAND_COLORS.md` 详述）
- 正文：#effaf2 在 #020301 背景，对比度 13.1:1 ✅
- 暗文字：#9ab4a8 在 #020301 背景，对比度 4.8:1 ✅

### 行高建议
- 最小 1.5（对于 web 内容）
- AIDARIS 使用 1.8 - 1.85，超出建议，更加易读

---

## 12. 动态排版 (Dynamic Typography)

### 响应式测试断点
| 宽度 | 场景 |
|------|------|
| **320px** | 移动端最小 |
| **480px** | 小手机 |
| **768px** | 平板竖屏 |
| **1024px** | 平板横屏 |
| **1440px** | 桌面标准 |
| **1920px** | 宽屏显示器 |

**测试方法** — 检查所有使用 `clamp()` 的元素在各断点的显示效果

---

## 13. 排版资源导出 (Typography Assets Export)

### CSS 预设
```css
/* 标题预设 */
.font-h1 {
  font-family: "Gugi", "Offside", "Noto Sans TC", "SF Pro Display", "Inter", sans-serif;
  font-size: clamp(2.4rem, 5.2vw, 4.6rem);
  line-height: 1.08;
  letter-spacing: 0;
}

/* 正文预设 */
.font-body {
  font-family: "SF Pro Display", "Inter", "Noto Sans TC", "Helvetica Neue", Arial, sans-serif;
  font-size: clamp(0.95rem, 1.1vw, 1.1rem);
  line-height: 1.8;
  letter-spacing: 0;
}
```

### 字体加载优化
```html
<!-- 预加载关键字体 -->
<link rel="preload" href="assets/fonts/Aka-AcidGR-SuperG.woff" as="font" type="font/woff" crossorigin />

<!-- 预连接字体 CDN -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- 加载 Google Fonts -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gugi&family=Noto+Sans+TC:wght@400;500;600&family=Offside&display=swap" />
```

---

## 14. 更新历史 (Changelog)

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0 | 2025-04 | 初始排版规范发布 |

---

## 15. 相关文档与联系 (References & Contact)

**相关规范**
- `BRAND_GUIDELINES.md` — 品牌总体指南
- `BRAND_COLORS.md` — 色彩系统
- `design-tokens.json` — 设计令牌

**联系方式** — contact@aidaris.com

