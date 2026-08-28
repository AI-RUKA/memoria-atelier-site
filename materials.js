(() => {
  const assets = {
    '--material-gingham': './assets/gingham-paper.webp.b64.txt',
    '--material-botanical': './assets/botanical-paper.webp.b64.txt',
    '--material-couple': './assets/couple-stamp.webp.b64.txt'
  };

  Promise.all(Object.entries(assets).map(async ([variable, path]) => {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Could not load ${path}`);
    const base64 = (await response.text()).trim();
    document.documentElement.style.setProperty(variable, `url("data:image/webp;base64,${base64}")`);
  })).catch((error) => {
    console.warn('MEMORIA decorative assets could not be loaded.', error);
  });
})();
