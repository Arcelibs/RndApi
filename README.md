
# 隨機圖片 API 靜態網站

本專案是一個基於 **GitHub Pages + Cloudflare Pages** 部署的靜態網站，提供隨機圖片 API 功能。

圖片依據 `mobile` 和 `desktop` 分類存放，並動態生成 `images.json` 文件以供前端隨機返回圖片。

---

## 功能

1. **隨機圖片 API**
   - 支援 `mobile` 和 `desktop` 類型的圖片。
   - 使用 `?deviceType=mobile` 或 `?deviceType=desktop` 請求隨機圖片。

2. **自動生成圖片清單**
   - 使用 GitHub Actions，掃描 `images/` 目錄並動態生成 `images.json` 文件。
   - 確保每次新增或刪除圖片時清單自動更新。

3. **輕量部署**
   - 無需後端，完全靜態網站架構。
   - 支援 Cloudflare Pages 快速部署。

---

## 目錄結構

```plaintext
project/
├── images/           # 圖片目錄
│   ├── mobile/       # mobile 類型圖片
│   └── desktop/      # desktop 類型圖片
├── images.json       # 動態生成的圖片清單
├── index.html        # 主頁入口
├── script.js         # 隨機圖片邏輯
├── scripts/          # 工具腳本
│   └── generate-json.js # 自動生成 images.json 的腳本
└── .github/
    └── workflows/
        └── generate-images-json.yml # GitHub Actions 工作流程
```

---

## 安裝與使用

### 1. 專案克隆
```bash
git clone https://github.com/your-username/random-image-api.git
cd random-image-api
```

### 2. 新增圖片
將圖片放置於 `images/mobile/` 或 `images/desktop/` 目錄。

### 3. 自動生成 `images.json`
每次推送圖片到 GitHub 倉庫時，GitHub Actions 會自動執行生成腳本，更新 `images.json`。

---

## 部署

### 使用 GitHub Pages 或 Cloudflare Pages
1. 推送專案到 GitHub 倉庫。
2. 前往 Cloudflare Pages，連結此 GitHub 倉庫。
3. 部署完成後，使用以下 API 測試功能。

---

## API 使用

### 請求
```http
GET https://your-cloudflare-pages-site.com?deviceType={type}
```

### 參數
- `deviceType`：
  - `mobile`：返回一張隨機的 mobile 類型圖片。
  - `desktop`：返回一張隨機的 desktop 類型圖片。

### 範例響應
```json
{
  "url": "images/mobile/image1.jpg",
  "type": "mobile"
}
```

---

## 開發

### 本地運行靜態網站
1. 啟動簡單的 HTTP 伺服器：
   ```bash
   python3 -m http.server 8000
   ```
2. 在瀏覽器中訪問 `http://localhost:8000`。

### 手動生成 `images.json`
若需手動生成，執行以下命令：
```bash
node scripts/generate-json.js
```

---

## 貢獻

歡迎提交 Issue 或 Pull Request 來改進本專案！

---

## 授權

本專案採用 [MIT License](LICENSE)。
