(async function () {
  // 獲取 URL 參數
  const urlParams = new URLSearchParams(window.location.search);
  const deviceType = urlParams.get('deviceType');

  // 檢查參數是否合法
  if (!deviceType || !['mobile', 'desktop'].includes(deviceType)) {
    document.body.innerHTML = 'Invalid or missing deviceType parameter.';
    return;
  }

  try {
    // 獲取圖片清單
    const response = await fetch('/images.json');
    const data = await response.json();

    // 過濾對應類型的圖片
    const images = data[deviceType];
    if (!images || images.length === 0) {
      document.body.innerHTML = 'No images available for the specified deviceType.';
      return;
    }

    // 隨機選擇一張圖片並重定向
    const randomImage = images[Math.floor(Math.random() * images.length)];
    window.location.href = randomImage;
  } catch (error) {
    console.error('Error fetching images:', error);
    document.body.innerHTML = 'Error fetching images.';
  }
})();
