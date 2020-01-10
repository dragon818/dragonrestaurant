if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
    .register('ws.js',{scope: './'})
    .then(reg => console.log('service Worker:Registered:%0', reg))
    .catch(err => console.log(`service Worker:Error: ${err}`));
  });
}