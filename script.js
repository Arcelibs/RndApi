(async function () {
  // 獲取 URL 參數
  const urlParams = new URLSearchParams(window.location.search);
  const deviceType = urlParams.get('deviceType');

  // 如果有有效的 deviceType，處理隨機圖片邏輯
  if (deviceType && ['mobile', 'desktop'].includes(deviceType)) {
    try {
      // 獲取圖片清單
      const response = await fetch('/images.json');
      if (!response.ok) throw new Error('Failed to fetch images.json');
      const data = await response.json();

      // 過濾對應類型的圖片
      const images = data[deviceType];
      if (images && images.length > 0) {
        // 隨機選擇一張圖片並跳轉
        const randomImage = images[Math.floor(Math.random() * images.length)];
        const imageUrl = `/${randomImage}`; // 確保路徑正確
        window.location.href = imageUrl;
        return; // 結束腳本執行
      } else {
        document.body.innerHTML = 'No images available for the specified deviceType.';
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      document.body.innerHTML = 'Error fetching images.';
    }
  } else {
    // 如果沒有有效的 deviceType，顯示主頁內容
    document.body.innerHTML = `
      <h1>Random Image API</h1>
      <p>Use the following links to get a random image:</p>
      <ul>
        <li><a href="?deviceType=mobile">Random Mobile Image</a></li>
        <li><a href="?deviceType=desktop">Random Desktop Image</a></li>
      </ul>
      <p>If no <code>deviceType</code> is specified, this page will appear.</p>
    `;
  }
})();
