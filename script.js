(async function () {
  console.log('Script loaded');

  const urlParams = new URLSearchParams(window.location.search);
  const deviceType = urlParams.get('deviceType');

  console.log('Device type:', deviceType);

  if (deviceType && ['mobile', 'desktop'].includes(deviceType)) {
    console.log('Valid deviceType detected');

    try {
      const response = await fetch('/images.json');
      if (!response.ok) throw new Error('Failed to fetch images.json');

      const data = await response.json();
      console.log('Fetched data:', data);

      const images = data[deviceType];
      if (images && images.length > 0) {
        const randomImage = `/${images[Math.floor(Math.random() * images.length)]}`;
        console.log('Redirecting to:', randomImage);

        window.location.href = randomImage;
        return; // 結束腳本執行
      } else {
        console.error('No images available for this deviceType.');
        document.body.innerHTML = 'No images available.';
      }
    } catch (error) {
      console.error('Error fetching images.json:', error);
      document.body.innerHTML = 'Error fetching data.';
    }
  } else {
    console.log('Invalid or missing deviceType');

    document.body.innerHTML = `
      <h1>Random Image API</h1>
      <p>Use the following links to get a random image:</p>
      <ul>
        <li><a href="?deviceType=mobile">Random Mobile Image</a></li>
        <li><a href="?deviceType=desktop">Random Desktop Image</a></li>
      </ul>
    `;
  }
})();
