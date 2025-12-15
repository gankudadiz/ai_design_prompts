# Terminal UI 配色方案 Demo

这个目录包含了6种不同风格的Terminal UI配色方案预览，每个都采用**极客Terminal风格**设计。

---

## 📁 文件列表

### 索引页面
- **index.html** - 所有配色方案的索引页面，可快速预览所有方案

### 配色方案 Demo
1. **01-deep-space-blue.html** - Deep Space Blue (深空蓝)
2. **02-amber-warm.html** - Amber Warm (琥珀暖光)
3. **03-mint-dreamcore.html** - Mint Dreamcore (薄荷梦核)
4. **04-lavender-dreams.html** - Lavender Dreams (薰衣草梦境)
5. **05-rainbow-y2k.html** - Rainbow Y2K (彩虹Y2K)
6. **06-amber-dreamcore.html** - Amber Dreamcore (琥珀梦核)

---

## 🎨 配色方案介绍

### 1. Deep Space Blue (深空蓝)
```
背景: #0a0e1a | 主色: #00d4ff | 辅色: #00ffcc
```
- ✅ 深邃、科技感强
- ✅ 护眼，适合长时间使用
- ✅ 符合程序员IDE主题审美

### 2. Amber Warm (琥珀暖光)
```
背景: #1a1200 | 主色: #ffb020 | 辅色: #ffcc33
```
- ✅ 温暖、复古Terminal感
- ✅ 不刺眼
- ✅ 经典命令行界面风格

### 3. Mint Dreamcore (薄荷梦核)
```
背景: #0f0a1a | 主色: #00ffcc | 辅色: #ff6b9d
```
- ✅ Y2K薄荷绿配粉色
- ✅ 柔和霓虹，千禧年怀旧未来感
- ✅ 梦幻而温馨

### 4. Lavender Dreams (薰衣草梦境)
```
背景: #0a0a15 | 主色: #a78bfa | 辅色: #f472b6
```
- ✅ Y2K紫藤配粉紫
- ✅ 梦幻浪漫，神秘优雅
- ✅ 千禧年美学

### 5. Rainbow Y2K (彩虹Y2K)
```
背景: #0a0a1a | 主色: #00d4ff | 辅色: #ff00ff
```
- ✅ Y2K彩虹渐变
- ✅ 极繁vaporwave美学
- ✅ 强烈视觉冲击

### 6. Amber Dreamcore (琥珀梦核)
```
背景: #1a0a12 | 主色: #ff9e80 | 辅色: #c77dff
```
- ✅ Y2K琥珀配薰衣草
- ✅ 温暖梦幻，怀旧美学
- ✅ 柔和的千禧年风格

---

## 🚀 使用方法

### 方法1: 直接打开
在浏览器中直接打开 `index.html`，点击对应的方案预览。

### 方法2: 启动本地服务器
```bash
# 进入demo目录
cd demo

# 启动Python服务器
python -m http.server 8080

# 或使用Node.js
npx serve .

# 然后访问 http://localhost:8080
```

---

## 💡 设计特点

所有方案都遵循 **Terminal风格** 设计原则：

- ✅ **100%等宽字体** - 强化代码感
- ✅ **方角设计** - border-radius: 0
- ✅ **边框线条** - 替代阴影效果
- ✅ **命令提示符** - `$ ` `>` 等Terminal符号
- ✅ **高对比度** - 深色背景 + 霓虹色
- ✅ **扁平化** - 无阴影、无渐变
- ✅ **网格对齐** - 规整的几何布局

---

## 📱 响应式支持

所有demo都支持响应式设计：
- 📱 移动端 (< 768px)
- 📱 平板 (768px - 1024px)
- 💻 桌面 (> 1024px)

---

## 🎯 选择建议

**根据您的喜好选择**：

| 风格偏好 | 推荐方案 |
|---------|----------|
| 护眼 + 现代感 | 01. Deep Space Blue |
| 温暖 + 复古感 | 02. Amber Warm |
| 梦幻 + Y2K感 | 03. Mint Dreamcore |
| 浪漫 + 神秘感 | 04. Lavender Dreams |
| 极繁 + 视觉冲击 | 05. Rainbow Y2K |
| 温暖 + 怀旧感 | 06. Amber Dreamcore |

---

## 🔧 自定义配色

如需自定义配色，可以：
1. 打开任意一个demo文件
2. 修改CSS变量中的颜色值
3. 保存并在浏览器中查看效果

示例：
```css
/* 修改主色 */
--primary-color: #your-color;

/* 修改背景色 */
--bg-color: #your-bg-color;
```

---

## 📄 文档

完整的UI设计规范请参考：
- [UI设计规范与布局文档](../doc/UI设计规范与布局文档.md)
- [Terminal-UI-Design-Guide](../doc/Terminal-UI-Design-Guide.md)

---

**祝您找到心仪的配色方案！** 🎨✨

*Created with ❤️ for programmers*
