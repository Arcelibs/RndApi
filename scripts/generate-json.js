const fs = require('fs');
const path = require('path');

// 支持的图片扩展名
const supportedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

function scanDirectory(directory) {
  const files = [];
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    const ext = path.extname(file).toLowerCase();

    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...scanDirectory(fullPath));
    } else if (supportedExtensions.includes(ext)) {
      files.push(fullPath);
    }
  });
  return files;
}

// 示例目录处理
const mobileImages = scanDirectory('./images/mobile');
const desktopImages = scanDirectory('./images/desktop');

const imagesJson = {
  mobile: mobileImages.map(file => path.relative('./images', file).replace(/\\/g, '/')),
  desktop: desktopImages.map(file => path.relative('./images', file).replace(/\\/g, '/')),
};

fs.writeFileSync('./images.json', JSON.stringify(imagesJson, null, 2));
console.log('images.json 生成完成！');
