const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 設定圖片目錄
const imageDir = path.join(__dirname, '../images');

// 支援的圖片類型
const supportedExtensions = ['.jpg', '.jpeg', '.png'];

// 壓縮並轉換為 WebP
async function convertImageToWebP(filePath) {
  const outputFilePath = filePath.replace(path.extname(filePath), '.webp');

  try {
    await sharp(filePath)
      .resize(1920) // 可根據需要調整尺寸
      .toFormat('webp', { quality: 80 }) // 轉換為 WebP，質量 80%
      .toFile(outputFilePath);

    console.log(`Converted: ${filePath} -> ${outputFilePath}`);
    fs.unlinkSync(filePath); // 刪除原始文件
    console.log(`Deleted original file: ${filePath}`);
  } catch (err) {
    console.error(`Error converting ${filePath}:`, err);
  }
}

// 遍歷目錄並處理圖片
function processDirectory(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (supportedExtensions.includes(path.extname(file).toLowerCase())) {
      convertImageToWebP(fullPath);
    }
  });
}

// 開始處理
processDirectory(imageDir);
