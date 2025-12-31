# PromptNano 🍌✨

> **透過看圖找靈感。自訂的分類檢索。AI 創意提示詞庫隨取隨用。**

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg) ![Style](https://img.shields.io/badge/Style-Cute%20%26%20Warm-pink)

## 📖 專案簡介

**PromptNano** 是一個輕量級、視覺化的 AI 提示詞（Prompt）管理工具。專為 Nano banana, chatGPT, Midjourney、Stable Diffusion 等 AI 創作者設計。

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

* **🧋 繁體中文友善**
  新增的提示詞都會先轉換為繁體中文再存入Google Sheet資料庫。

* **☁️ Google Drive 整合**
  基於 Google Apps Script (GAS) 開發，圖片與資料直接儲存在你的 Google Drive 與 Sheets，無需架設伺服器。

## 🛠️ 技術架構

* **Frontend**: HTML5, CSS3 (CSS Variables for Theming), Vanilla JavaScript
* **Backend**: Google Apps Script (GAS)
* **Database**: Google Sheets (儲存資料), Google Drive (儲存圖片)

## 🚀 如何部署 (Installation)

本專案適合部署於 Google Apps Script 環境。

1. **建立 Google Sheet**
   在 Google Drive 建立一個新的試算表，記下網址的 `Spreadsheet ID`。
   在 Google Drive 建立一個用於上傳的資料夾，記下網址的 `Folder ID`。

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


## ⚙️ 如何詠唱出你自己的版本 (Build app prompt)

生成 Google Apps script + html 網頁的 AI提示詞:
```text
使用 google GAS, 寫一個相簿管理的網站, 網頁顯示風格為溫暖可愛, 上傳的圖片要在放 google driver 指定的上傳路徑, 上傳後自動產生縮圖, 圖片的屬性有:標題,說明欄位,tag,圖片實際google driver 存放路徑.

前端相簿網頁, 可以輸入關鍵字進行圖片的說明欄位過濾查詢,

前端相簿網頁在顯示上傳的照片時, 以縮圖的方式顯示, 並將圖片的 hash tag 欄位以 # 號進行分隔顯示, 點下某一個 tag, 以 tag 名稱過關鍵字, 對 tag 欄位進行 "#" + tag 名稱的過濾查詢,

點下某一個縮圖後,彈出實際完整圖片, 並顯示標題與說明欄位, 有要一個"複製" 的按鈕, 把說明欄位內容複製到剪貼簿.
```
如果你有VPS 或 GCP / AWS 的話, 修改掉提示詞裡的 Google GAS, 就可以取得你需要的程式碼了. 

有了相簿管理程式之後，提示詞用於修改網站名稱與相關按鈕上的名稱：
```text
修改溫暖相簿為"AI靈感資料庫", 圖片的說明欄位, 修改為"提示詞", 讓我們透過「圖片」直覺尋找提示詞， 結合強大的「逆向工程」分析，一鍵提煉雲標籤，讓創意隨取隨用。
```

增加刪除提示詞與相薄功能：
```text
在圖片清單的頁面, 增加刪除照片的功能, 刪除前要讓使用者做確認後才實際從 google drive 與 sheet 中刪除資料.
```

以下增加微調元件位置，與增加提示與確認不使用瀏覽器內建指令：
```text
* <button> tag 比照 hash tag 的 span 在 hover 時變換顏色.
* #uploadOverlay的  modal 彈出後, <input type="text" name="title"> auto focus()
* 移動 <button> 📋 複製提示詞 到 <div class="prompt-label">提示詞 (Prompt)</div> 右側, 讓使用者不用 scroll down.
* #detailModal 裡的 #modalTags 比照瀏覽清單的 hash tag 顯示方式與規則.
* #detailModal 裡的提供刪除該組照片的功能.
* 整個網站, 要支援深色主題/淺色主題的切換功能.
* 修改 confirm() 為使用 modal, 因為 confirm() 畫面太醜.
* 修改 alert(), 以 Modal 取代.
```

用來切換整個網站風格：
```text
重新改寫這個整個網站的 css, 風格是可愛溫暖, 要支援深色/淺色主題的切換, 所有的彈出式 modal 都要套用到深色/淺色的主題.
```

增加"清除過濾"功能：
```text
增加"清除過濾" button 在 search box 右側, 點下後清除 search 關鍵字, 並重新取得無關鍵字的 list.
```

「詠唱魔法秘籍」的新增, 也很奇葩，這句是提問，結果變成實作：
```text
想在這個網頁增加提示詞教學的功能, 有那些設計的選擇, 教學的內容如下:
---
不知道怎麼下高品質的提示詞，也可以先去收集別人的作品，上傳給AI 之後，請 AI 分析圖片並生成可以生成出圖片的提示詞，有了提示詞再進行調整就比較有效率。

另一個方式是先知道常用的提示詞用於風格與質感...。
```

調整右側的按鈕：
```text
調整 .header-top 下, 右側3個 button 在視窗width 較小之下, 要置右.
```
這句比較神奇，AI 反而給出更具建設性的解法，是要把右側的按鈕變成群組，並集體置右。

修改 hash tag 沒有正確被分隔開：
```text
修改 <span class="tag" onclick="filterByTag('#opennana #nano', event)">##opennana #nano</span> 的顯示方式為:
tag 的內容, 以 "#" 進行 split, 前端顯示為多個 span tag.
span tag 的 text 不要顯示 # 符號, 
```

同一個檔案名稱在Google Drive 是可以同時存在，但使用者下載之後就會被覆蓋：
```text
解決上傳檔案名稱相同造成的問題
```
這個解法最後只有修改上傳的檔名，加入前置的目前時間，例如 "20251230_" + 原檔名

增加 footer：
```text
在不起眼的地方, 想增加版本號碼, 第一版是 1.0.0 版.

```

如果你是**簡體中文**的使用者，請註解掉文字轉換的scrip，因為提示詞都會先轉換為繁體中文再存入Google Sheet資料庫，看不懂 Code.gs 程式，可以服用下列提示詞對 Code.gs 進行修改:
```text
移除程式中關於提示詞語言轉換繁體中文的程式碼，並確保上傳的資料內容維持正確。
```


## 🎨 更換主題 (Theme)

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
├── appscript.json  # 資訊清單（Manifest），記錄專案的時區、權限範圍（OAuth Scopes）與程式庫等核心設定
└── README.md       # 專案說明文件
```

## 📝 版本紀錄

* **v1.1.0** (2025-12-31)
  * 增加下載圖片按鈕。
  * 置換部份按鈕的圖示。
  * 調整部份顏色。

* **v1.0.0** (2025-12-30)
  * 初始版本發布。
  * 實作深色/淺色主題切換。
  * 文字內容簡轉中。
  * 新增「詠唱魔法秘籍」教學模組。
  * 優化 RWD 手機版瀏覽體驗。

## 📄 授權 (License)

本專案採用 [MIT License](LICENSE) 授權。
歡迎自由修改、使用或作為學習用途。

---
*Created with ❤️ by PromptNano Team*
