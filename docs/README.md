# AIDARIS 设计规范文档 (Design Guidelines)

欢迎来到 AIDARIS 的设计规范库。本文档集合为品牌视觉、Logo 使用、色彩系统、排版等设定了统一的标准。

## 📚 文档结构 (Documentation Structure)

### 🎯 品牌与 Logo（优先级：⭐⭐⭐⭐⭐）

#### 1. [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md)
**品牌总体指南** — 从品牌身份、视觉审美到应用场景

**内容包括：**
- 品牌名称、承诺与核心服务
- 品牌个性与设计哲学
- 色彩层次与应用规则
- 品牌声调与语言风格（英文/中文）
- 可用资源与反馈通道

**适合阅读：** 所有品牌利益相关者、设计师、开发者

---

#### 2. [LOGO_USAGE_GUIDE.md](./LOGO_USAGE_GUIDE.md)
**Logo 使用规范** — Logo 结构、应用场景、颜色变体、禁止做法

**内容包括：**
- Logo 结构详解（初始字母 "a" + 文本 "AIDARIS"）
- 应用场景：
  - 导航栏 Logo
  - 页面主标题
  - 页脚品牌标记
- 颜色变体与标准配置
- 尺寸与比例指导
- 动画效果（品牌呼吸动画）
- 无障碍考虑与 Alt Text
- CSS 类名与资源路径

**适合阅读：** 设计师、前端开发者、内容管理者

**快速参考：**
```css
/* Logo 首字母 - 金色 */
.logo-initial {
  font-family: "SuperG";
  color: #ffbd59;
  -webkit-text-stroke: 0.7px currentColor;
}

/* Logo 文本 - 品牌白 */
.logo-text {
  font-family: "Gugi";
  color: #effaf2;
  letter-spacing: 0.04em;
}
```

---

### 🎨 色彩系统（优先级：⭐⭐⭐⭐⭐）

#### 3. [BRAND_COLORS.md](./BRAND_COLORS.md)
**品牌色彩系统** — 完整的颜色定义、对比度验证、应用规则

**内容包括：**
- 色彩哲学与核心品牌色
  - 品牌金 `#ffbd59`
  - 品牌绿 `#b6ea5f`
- 中性色系（背景、文字）
- 渐变定义与应用
- 色彩应用矩阵（默认/悬停/焦点/禁用）
- 透明度与玻璃态设置
- **WCAG 无障碍对比度验证** ✅
  - 所有颜色均符合 AA 或 AAA 级标准
- 色彩在响应式设计中的表现
- JSON/CSS 导出格式

**快速参考 - 核心色彩：**
| 用途 | 颜色 | HEX | RGB |
|------|------|-----|-----|
| Logo/强调 | 品牌金 | #ffbd59 | rgb(255, 189, 89) |
| 导航/边框 | 品牌绿 | #b6ea5f | rgb(182, 234, 95) |
| 主背景 | 深黑 | #020301 | rgb(2, 3, 1) |
| 正文 | 品牌白 | #effaf2 | rgb(239, 250, 242) |
| 辅助文字 | 暗灰 | #9ab4a8 | rgb(154, 180, 168) |

**适合阅读：** 设计师、UI 开发者、品牌经理

---

### 📝 排版系统（优先级：⭐⭐⭐⭐）

#### 4. [BRAND_TYPOGRAPHY.md](./BRAND_TYPOGRAPHY.md)
**品牌排版系统** — 字体堆栈、字号系统、多语言支持

**内容包括：**
- 字体堆栈详解：
  - SuperG（Logo 专属）
  - Gugi（标题）
  - Offside（强调）
  - SF Pro Display（正文）
  - Noto Sans TC（中文）
- 字号系统（响应式 `clamp()` 方案）
- 字重、字间距、行高规范
- 文本效果（笔划、阴影）
- 多语言排版（英文/中文混排）
- 无障碍排版建议
- 动态排版与响应式测试

**快速参考 - 字号阶梯：**
```css
h1 {
  font-family: "Gugi", ...;
  font-size: clamp(2.4rem, 5.2vw, 4.6rem);  /* 38px - 73px */
}

p {
  font-family: "SF Pro Display", ...;
  font-size: clamp(0.95rem, 1.1vw, 1.1rem); /* 15px - 17.6px */
}
```

**适合阅读：** 设计师、前端开发者、内容策略者

---

### 🎯 品牌资源清单（优先级：⭐⭐⭐⭐⭐）

#### 5. [BRAND_ASSETS_INVENTORY.md](./BRAND_ASSETS_INVENTORY.md)
**品牌资源清单** — 中央资源库，汇总所有字体、图片、颜色、令牌

**内容包括：**
- 字体资源（SuperG、Gugi、Offside、Noto Sans TC、系统字体）
- 图片资源（og-image、favicon）
- 颜色资源（RGB、HEX、HSL、CMYK 值）
- CSS 变量定义与使用
- 第三方资源（Google Fonts、GTM）
- 版本控制与维护流程
- 资源下载与工具集成指南
- 常见问题解答

**应用场景：**
- 获取准确的资源路径与 CDN 链接
- 查找设计工具导出格式
- 维护资源版本
- 团队资源沟通

**适合阅读：** 所有团队成员（设计师、开发者、项目经理）

---

### 🔧 设计令牌（优先级：⭐⭐⭐⭐）

#### 6. [design-tokens.json](./design-tokens.json)
**设计令牌 JSON** — 机器可读的设计系统数据，用于自动化工具集成

**内容包括：**
- 颜色令牌（品牌色、背景色、文字色）
- 排版令牌（字体、字号、字重、字间距、行高）
- 间距令牌（基于 8px 网格）
- 效果令牌（阴影、动画、过渡）
- 响应式断点
- 无障碍标准
- 文档索引

**应用场景：**
- 设计工具集成（Figma、Adobe XD）
- 前端组件库自动生成
- 设计一致性检查
- CI/CD 流程集成

**适合阅读：** 前端架构师、设计系统工程师、工具开发者

---

## 🎯 使用指南 (How to Use)

### 场景 1：我是设计师
1. 先读 `BRAND_GUIDELINES.md` —— 理解品牌哲学
2. 再读 `LOGO_USAGE_GUIDE.md` —— 学习 Logo 使用规则
3. 查阅 `BRAND_COLORS.md` —— 获取准确的色值
4. 参考 `BRAND_TYPOGRAPHY.md` —— 确定排版样式

### 场景 2：我是前端开发者
1. 快速参考上方的"快速参考"表格
2. 查看 `design-tokens.json` —— 获取令牌值
3. 在实现组件时参考 `LOGO_USAGE_GUIDE.md` —— 确保 CSS 类名正确
4. 用 `BRAND_COLORS.md` 验证对比度

### 场景 3：我是品牌经理
1. 重点阅读 `BRAND_GUIDELINES.md` —— 确保应用一致
2. 参考 `BRAND_COLORS.md` —— 在不同媒体上应用色彩
3. 学习 `LOGO_USAGE_GUIDE.md` —— 审核品牌应用的正确性

### 场景 4：我维护设计系统
1. 全部阅读所有文档
2. 定期审查并更新 `design-tokens.json`
3. 同步更新所有相关规范

---

## 🔄 文档关系图 (Documentation Map)

```
┌──────────────────────────────────────────────────────────┐
│        BRAND_GUIDELINES.md (品牌总体方向)               │
│    ↓           ↓            ↓              ↓             │
├───────────────────────────────────────────────────────────┤
│ LOGO_USAGE_   BRAND_COLORS.md   BRAND_TYPOGRAPHY.md      │
│ GUIDE.md      (色彩系统)          (排版系统)            │
│ (Logo 使用)                                             │
│                ↓               ↓                        │
├───────────────────────────────────────────────────────────┤
│     BRAND_ASSETS_INVENTORY.md (资源清单 - 中央)         │
│ (字体、图片、颜色、CSS 变量、版本控制、工具集成)        │
├───────────────────────────────────────────────────────────┤
│        design-tokens.json (机器可读)                      │
│   (颜色、排版、间距、效果等综合令牌)                     │
└──────────────────────────────────────────────────────────┘
        ↓ 用于 ↓ 用于 ↓ 用于 ↓ 用于 ↓
    ┌────────┬────────┬──────────┬────────┬──────────┐
    │ Figma  │  代码  │  设计    │ 文档   │  工具    │
    │ 设计   │ 实现   │  检查    │ 生成   │  集成    │
    └────────┴────────┴──────────┴────────┴──────────┘
```

---

## 🎨 核心设计决策 (Key Design Decisions)

### 1. 深色现代主义 (Dark Modernism)
- 深色背景 (`#020301`) 营造专业、高端感
- 配合玻璃态设计强化现代感

### 2. 金绿双核色彩 (Dual-Color Branding)
- **品牌金** `#ffbd59` — Logo 与强调（象征价值）
- **品牌绿** `#b6ea5f` — 交互与强调（象征增长）

### 3. 响应式排版 (Fluid Typography)
- 使用 `clamp()` 实现流体字号
- 在所有设备尺寸上保持可读性与视觉层级

### 4. 品牌呼吸动画 (Brand Breath Animation)
- 2.8s 循环，象征生命力与持续能量
- 尊重用户的 `prefers-reduced-motion` 设置

### 5. 一致的玻璃态 (Consistent Glassmorphism)
- 背景 + 模糊 + 细边框 = 透明感与深度
- 提升 UI 的现代感与可读性

---

## 📋 快速检查清单 (Checklist)

在应用 AIDARIS 品牌时，确保你检查了：

- [ ] Logo 首字母是金色 `#ffbd59` 吗？
- [ ] Logo 文本使用了 Gugi 或 Offside 字体吗？
- [ ] 所有文字对比度符合 WCAG AA 或以上吗？
- [ ] 背景使用了 `#020301` 或渐变吗？
- [ ] 容器是否使用了玻璃态效果（75% 不透明度 + 模糊）？
- [ ] 导航链接悬停时变为绿色 `#b6ea5f` 吗？
- [ ] 是否尊重了 `prefers-reduced-motion` 设置？
- [ ] 字号是否使用了响应式 `clamp()` 方案？
- [ ] 中文内容是否使用了 Noto Sans TC 字体？

---

## 📞 联系与反馈 (Contact & Feedback)

**品牌相关问题？**
- 📧 Email: contact@aidaris.com
- 🌐 Website: https://aidaris.com

**规范文档更新？**
- 提交 Issue 或 Pull Request
- 年度审核周期：Q1 2026

---

## 📝 版本历史 (Changelog)

| 版本 | 日期 | 内容 |
|------|------|------|
| v1.0 | 2025-04-04 | 初始设计规范发布 |

---

## 🔗 相关资源 (Additional Resources)

- **官方网站** — https://aidaris.com
- **GitHub** — yunshih/aidaris-official-site
- **品牌定位** — "An engineering-driven partner for software and cloud systems"

---

## 📋 文档清单 (Documentation Index)

| 文档 | 优先级 | 描述 | 最新版 |
|------|--------|------|--------|
| BRAND_GUIDELINES.md | ⭐⭐⭐⭐⭐ | 品牌身份与总体指南 | v1.0 |
| LOGO_USAGE_GUIDE.md | ⭐⭐⭐⭐⭐ | Logo 使用规范 | v1.0 |
| BRAND_COLORS.md | ⭐⭐⭐⭐⭐ | 色彩系统与对比度 | v1.0 |
| BRAND_TYPOGRAPHY.md | ⭐⭐⭐⭐ | 排版系统与字体堆栈 | v1.0 |
| BRAND_ASSETS_INVENTORY.md | ⭐⭐⭐⭐⭐ | 资源清单与版本控制 | v1.0 |
| design-tokens.json | ⭐⭐⭐⭐ | 机器可读设计令牌 | v1.0 |
| README.md | ⭐⭐⭐⭐ | 本导航文档 | v1.0 |

---

## 📚 引用 (Citation)

在文档或设计工具中引用本规范：

```
AIDARIS Brand Guidelines v1.0
https://github.com/yunshih/aidaris-official-site/tree/main/docs
© 2025 Aidaris Technologies Ltd.
```

---

**最后更新：2025-04-04**  
**维护者：AIDARIS Design System Team**

