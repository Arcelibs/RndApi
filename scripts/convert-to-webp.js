const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 設定目錄
const uploadDir = path.join(__dirname, '../uploads'); // 上傳目錄
const outputDir = path.join(__dirname, '../images');  // 轉換後目錄

// 支援的圖片類型
const supportedExtensions = ['.jpg', '.jpeg', '.png'];

// 創建輸出目錄（如果不存在）
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 壓縮並轉換為 WebP
async function convertImageToWebP(filePath, relativePath) {
  const outputFilePath = path.join(outputDir, relativePath).replace(path.extname(filePath), '.webp');
  const outputFileDir = path.dirname(outputFilePath);

  // 確保目錄結構存在
  if (!fs.existsSync(outputFileDir)) {
    fs.mkdirSync(outputFileDir, { recursive: true });
  }

  try {
    await sharp(filePath)
      .resize(1920) // 調整圖片寬度，可根據需要修改
      .toFormat('webp', { quality: 80 }) // 壓縮為 WebP，質量 80%
      .toFile(outputFilePath);

    console.log(`Converted: ${filePath} -> ${outputFilePath}`);
    fs.unlinkSync(filePath); // 刪除原始文件
    console.log(`Deleted original file: ${filePath}`);
  } catch (err) {
    console.error(`Error converting ${filePath}:`, err);
  }
}

// 遍歷目錄並處理圖片
function processDirectory(dir, baseDir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const relativePath = path.relative(baseDir, fullPath);

    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath, baseDir);
    } else if (supportedExtensions.includes(path.extname(file).toLowerCase())) {
      convertImageToWebP(fullPath, relativePath);
    }
  });
}

// 開始處理
processDirectory(uploadDir, uploadDir);
