# AIDARIS Logo 使用规范 (Logo Usage Guide)

## 1. Logo 结构 (Logo Structure)

AIDARIS Logo 由两部分组成：

```
┌─────────────────────────────┐
│  [a]  AIDARIS              │
│ ────────────────────────── │
│ Logo   Logo Text           │
│Initial (Brand Name)        │
│Letter                      │
└─────────────────────────────┘
```

### 1.1 Logo 首字母 "a" (Logo Initial)
- **字体** — SuperG（自定义字体）
- **字号** — 导航栏：1.35em | 主页：1.8em（相对值）
- **颜色** — #ffbd59（品牌金）
- **效果** — 文字笔划 (Text Stroke) + 发光阴影 (Text Shadow)
  ```css
  color: #ffbd59;
  -webkit-text-stroke: 0.7px currentColor;  /* 主页 */
  -webkit-text-stroke: 0.5px currentColor;  /* 导航栏 */
  text-shadow: 0 0 1px currentColor;
  ```

### 1.2 Logo 文本 "AIDARIS" (Logo Text)
- **字体** — Gugi（Google Fonts）
- **字号** — 导航栏：1.1rem | 主页：clamp(2.4rem, 5.2vw, 4.6rem)（响应式）
- **颜色** — #effaf2（品牌白 / 文字主色）
- **字母间距** — 0.04em（主页）| 0.06em（导航栏）
- **样式** — 全大写，无衬线

---

## 2. Logo 应用场景 (Logo Placement)

### 2.1 网站导航栏 (Navigation Brand)
**位置** — 固定顶部导航栏左侧  
**尺寸** — 紧凑型
- Initial "a": 1.35em
- Text "AIDARIS": 1.1rem

**代码示例**
```html
<a class="nav-brand" href="/">
  <span class="nav-brand-initial">a</span>
  <span class="nav-brand-text">AIDARIS</span>
</a>
```

**交互** — 
- 默认：文字色 (#effaf2)
- 悬停 (Hover)：文字色改为强调绿 (#b6ea5f)

---

### 2.2 页面主标题 (Hero Logo)
**位置** — 页面英雄区域（Hero Section）  
**尺寸** — 大展示型

- Initial "a": 1.8em（相对 h1 大小）
- Text "AIDARIS": 动态（clamp(2.4rem, 5.2vw, 4.6rem)）

**代码示例**
```html
<h1>
  <span class="logo-initial">a</span>
  <span class="logo-text">AIDARIS</span>
</h1>
```

**视觉效果** —
- 首字母 "a" 具有金色发光效果
- 整体 h1 可选择启用 **品牌呼吸动画** (Aidaris Breath Animation)

```css
@keyframes aidaris-breath {
  0%, 100% {
    text-shadow: 0 0 16px rgba(182, 234, 95, 0.5), 
                 0 0 32px rgba(35, 190, 200, 0.2);
  }
  50% {
    text-shadow: 0 0 26px rgba(182, 234, 95, 0.9), 
                 0 0 46px rgba(35, 190, 200, 0.4);
  }
}
```

---

### 2.3 页脚品牌标记 (Footer Brand)
**位置** — 页脚版权信息  
**样式** — 使用 `.footer-brand` 类

- 字体：Gugi / Offside
- 字母间距：0.08em
- 颜色：#ffffff（白色）

**代码示例**
```html
<span class="footer-brand">AIDARIS</span>
```

---

## 3. Logo 颜色变体 (Color Variants)

### 标准配置（推荐）
| 部分 | 颜色 | 代码 |
|------|------|------|
| Initial "a" | 品牌金 | #ffbd59 |
| Text "AIDARIS" | 品牌白 | #effaf2 |
| 背景 | 深色/玻璃态 | #020301 或 rgba(5,14,8,0.72) |

### 单色配置（特殊场景）
当无法使用彩色时：
- **浅色背景** — 使用深灰 (#2a2a2a)
- **暗色背景** — 使用亮白 (#ffffff)

---

## 4. Logo 不应该做的 (Don'ts)

### ❌ 禁止做法

1. **改变颜色**
   - ❌ 改变金色为其他颜色
   - ❌ Logo 使用品牌绿 (#b6ea5f)
   - ✅ 仅在特定交互状态下改为强调色

2. **改变形状/字体**
   - ❌ 使用其他字体替代 SuperG、Gugi
   - ❌ 删除首字母 "a"
   - ❌ 改变字间距至超过 0.1em

3. **放在不合适的背景上**
   - ❌ 在浅色/灰色背景上使用原色
   - ❌ 背景对比度低于 4.5:1（无障碍标准）

4. **过度装饰**
   - ❌ 添加阴影、边框以外的装饰
   - ❌ 旋转或倾斜 Logo
   - ❌ 缩放至过小（<20px 导航栏）或过大（超过内容宽度 80%）

---

## 5. 尺寸与比例 (Sizing & Proportions)

### 最小尺寸
- **导航栏**：1.35em（Initial） + 1.1rem（Text）
  - 桌面屏幕：约 18px + 17.6px
- **移动端**：可缩小至 1.1em + 1rem（相对单位）

### 最大尺寸
- **主页 Hero**：clamp(2.4rem, 5.2vw, 4.6rem)
  - 最小 38px，最大 73px（响应式）
  - 允许自动根据视口宽度调整

### 间距
- Initial 与 Text 之间：默认 flex 布局，无额外间距（baseline 对齐）
- Logo 与周围内容：至少 20px 余白

---

## 6. 动画效果 (Animation)

### 品牌呼吸动画 (Aidaris Breath)
**用途** — 主页 h1 强调品牌活力

**参数**
- **时长** — 2.8s
- **缓动** — ease-in-out
- **循环** — 无限循环
- **启用条件** — `prefers-reduced-motion: no-preference`

**代码**
```css
@keyframes aidaris-breath {
  0%, 100% {
    text-shadow: 0 0 16px rgba(182, 234, 95, 0.5), 
                 0 0 32px rgba(35, 190, 200, 0.2);
  }
  50% {
    text-shadow: 0 0 26px rgba(182, 234, 95, 0.9), 
                 0 0 46px rgba(35, 190, 200, 0.4);
  }
}
```

**应用**
```css
body:not(.bg-disabled-perf) .hero-content h1 {
  animation: aidaris-breath 2.8s ease-in-out infinite;
}
```

### 悬停交互 (Hover State)
**导航栏 Logo 悬停**
```css
.nav-brand:hover {
  color: var(--accent);  /* #b6ea5f */
  opacity: 1;
}
```
- 过渡时间：0.2s ease

---

## 7. 无障碍考虑 (Accessibility)

### 颜色对比
- 金色 (#ffbd59) 在暗色背景上的对比度：**7.2:1** ✅ (WCAG AAA)
- 白色 (#effaf2) 在暗色背景上的对比度：**13.1:1** ✅ (WCAG AAA)
- 绿色 (#b6ea5f) 在暗色背景上的对比度：**9.8:1** ✅ (WCAG AAA)

### 运动偏好
```css
@media (prefers-reduced-motion: prefer-reduced-motion) {
  .hero-content h1 {
    animation: none;
  }
}
```

### Alt Text
```html
<!-- 如果 Logo 作为链接 -->
<a href="/" aria-label="AIDARIS Home">
  <span class="logo-initial">a</span>
  <span class="logo-text">AIDARIS</span>
</a>
```

---

## 8. 设计文件 & 资源 (Assets)

### 字体
- **SuperG** — `assets/fonts/Aka-AcidGR-SuperG.woff`
- **Gugi** — Google Fonts CDN
- **Offside** — Google Fonts CDN

### CSS Classes
| 类名 | 用途 |
|------|------|
| `.nav-brand` | 导航栏 Logo 容器 |
| `.nav-brand-initial` | 导航栏首字母 "a" |
| `.nav-brand-text` | 导航栏文本 "AIDARIS" |
| `.logo-initial` | 主页首字母 "a" |
| `.logo-text` | 主页文本 "AIDARIS" |
| `.footer-brand` | 页脚品牌文本 |
| `.fit-brand` | 其他页面品牌文本 |

---

## 9. 更新与维护 (Maintenance)

### 版本历史
- **v1.0** (2025-04) — 初始 Logo 设计规范发布

### 审核周期
- 年度审核一次
- 如有重大品牌调整，及时更新本文档

### 反馈通道
- 提出问题或建议：contact@aidaris.com

