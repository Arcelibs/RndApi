const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../images');
const outputFile = path.join(__dirname, '../images.json');

// 初始化結果物件
const result = { mobile: [], desktop: [] };

// 遍歷目錄
for (const deviceType of Object.keys(result)) {
  const dirPath = path.join(baseDir, deviceType);
  if (fs.existsSync(dirPath)) {
    result[deviceType] = fs.readdirSync(dirPath)
      .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `images/${deviceType}/${file}`);
  }
}

// 寫入 JSON 檔案
fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
console.log('Images JSON generated:', outputFile);
