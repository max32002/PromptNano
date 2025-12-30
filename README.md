# PromptNano 🍌✨

> **透過看圖找靈感。自訂的分類檢索。AI 創意提示詞庫隨取隨用。**

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg) ![Style](https://img.shields.io/badge/Style-Cute%20%26%20Warm-pink)

## 📖 專案簡介

**PromptNano** 是一個輕量級、視覺化的 AI 提示詞（Prompt）管理工具。專為 Midjourney、Stable Diffusion 等 AI 創作者設計。

不同於冷冰冰的文字表格，PromptNano 讓你透過「看圖」的方式直覺管理靈感。搭配溫暖可愛的 UI 設計，支援深色/淺色主題切換，讓整理提示詞變成一件療癒的事。

## ✨ 主要功能

* **👀 視覺化瀑布流**
  捨棄枯燥的文字列表，採用卡片式瀑布流設計，透過圖片直接回想並複製提示詞。

* **🌓 雙色溫暖主題**
  內建「草莓牛奶（淺色）」與「黑巧克力（深色）」兩種主題，隨點隨切，所有介面與彈窗完美適應。

* **🏷️ 智慧標籤檢索**
  支援 `#Tag` 快速過濾與關鍵字搜尋。輸入框右側附帶一鍵清除功能，操作更流暢。

* **📘 內建詠唱秘籍**
  整合「提示詞教學」模組，包含逆向工程技巧、光影氛圍關鍵字與手繪風格指令，點擊關鍵字即可一鍵複製。

* **☁️ Google Drive 整合**
  基於 Google Apps Script (GAS) 開發，圖片與資料直接儲存在你的 Google Drive 與 Sheets，無需架設伺服器。

## 🛠️ 技術架構

* **Frontend**: HTML5, CSS3 (CSS Variables for Theming), Vanilla JavaScript
* **Backend**: Google Apps Script (GAS)
* **Database**: Google Sheets (儲存資料), Google Drive (儲存圖片)

## 🚀 如何部署 (Installation)

本專案適合部署於 Google Apps Script 環境。

1. **建立 Google Sheet**
   在 Google Drive 建立一個新的試算表，記下 `Spreadsheet ID`。

2. **建立 Apps Script**
   在試算表中點擊 `擴充功能` > `Apps Script`。

3. **貼上程式碼**
   * 將 `Code.gs` 的內容複製到編輯器的 `.gs` 檔案。
   * 建立一個 `index.html` 檔案，將前端代碼貼入。

4. **發布為網頁應用程式**
   點擊右上角 `部署` > `新增部署作業` > 選取 `網頁應用程式`。
   * 執行身分：`我`
   * 誰可以存取：`任何人` (或僅限自己)

5. **開始使用**
   取得生成的 Web App URL，即可開始管理你的靈感庫。

## 🎨 更換主題 (Installation)

複製 index.html 內容貼到 AI, 提示詞:
```text
重新改寫這個整個網站的 css, 風格是可愛溫暖, 要支援深色/淺色主題的切換, 所有的彈出式 modal 都要套用到深色/淺色的主題.
```

AI 自動生成網頁通常提供以下幾種主流風格：

### 🌈 按視覺氛圍分類

| 風格名稱 | 視覺特徵 | 適用場景 |
| :--- | :--- | :--- |
| **極簡主義 (Minimalist)** | 大量留白、細字體、單色調 | 個人品牌、建築、攝影 |
| **科技未來 (Tech/Futuristic)** | 深色模式、霓虹發光、3D 幾何 | SaaS、AI 工具、加密貨幣 |
| **可愛活潑 (Cute/Playful)** | 粉嫩色、圓角、手繪插圖 | 教育、寵物、創意市集 |
| **復古懷舊 (Retro/Vintage)** | 紙張紋理、低飽和度、Y2K 感 | 古著、黑膠唱片、獨立雜誌 |
| **自然環保 (Organic)** | 大地色系、植物元素、有機曲線 | 有機食品、心理諮商、戶外 |

### 💼 按專業功能分類

* **專業商務 (Corporate)**：嚴謹排版、藍灰色調，適合律師、金融業。
* **藝術創意 (Artistic)**：誇張漸層、不對稱設計，適合設計工作室。
* **沉浸式 3D (Immersive)**：玻璃擬態、動態渲染，適合高端產品展示。
* **俐落電商 (E-commerce)**：清晰網格、醒目 CTA 按鈕，適合零售業。

---

> 💡 **小撇步**：在 AI 生成指令（Prompt）中加入 `Glassmorphism` (玻璃擬態) 或 `Clean Typography` (乾淨排版) 等關鍵字，可以大幅提升產出的質感。


## 📂 檔案結構

```text
PromptNano/
├── Code.gs         # 後端邏輯 (處理圖片上傳、刪除、讀取 Sheet)
├── index.html      # 前端介面 (包含 CSS, JS 與 HTML 結構)
├── appscript.json  # 資訊清單（Manifest），它記錄了專案的時區、權限範圍（OAuth Scopes）與程式庫等核心設定
└── README.md       # 專案說明文件
```

## 📝 版本紀錄

* **v1.0.0** (2025-12-30)
  * 初始版本發布。
  * 實作深色/淺色主題切換。
  * 新增「詠唱魔法秘籍」教學模組。
  * 優化 RWD 手機版瀏覽體驗。

## 📄 授權 (License)

本專案採用 [MIT License](LICENSE) 授權。
歡迎自由修改、使用或作為學習用途。

---
*Created with ❤️ by PromptNano Team*
