(async function () {
  // 獲取 URL 參數
  const urlParams = new URLSearchParams(window.location.search);
  const deviceType = urlParams.get('deviceType');

  // 檢查參數是否合法
  if (!deviceType || !['mobile', 'desktop'].includes(deviceType)) {
    document.getElementById('errorMessage').textContent = 'Invalid or missing deviceType parameter.';
    return;
  }

  try {
    // 獲取圖片清單
    const response = await fetch('/images.json');
    const data = await response.json();

    // 過濾對應類型的圖片
    const images = data[deviceType];
    if (!images || images.length === 0) {
      document.getElementById('errorMessage').textContent = 'No images available for the specified deviceType.';
      return;
    }

    // 隨機選擇一張圖片
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const imgElement = document.getElementById('randomImage');
    imgElement.src = randomImage;
    imgElement.style.display = 'block';
  } catch (error) {
    console.error('Error fetching images:', error);
    document.getElementById('errorMessage').textContent = 'Error fetching images.';
  }
})();
