// winter-scripts.js
class WinterSnow {
  constructor() { this.snowflakes = []; this.enabled = true; }

  init(minCount=50, maxCount=100) {
    const container = document.querySelector('.winter-snow-container');
    if (!this.enabled || !container) return;

    const sizes = ['small','medium','large'];
    const speeds = ['snowslow','snowmedium','snowfast'];

    const count = Math.floor(Math.random() * (maxCount - minCount + 1) + minCount);
    for (let i = 0; i < count; i++) {
      const flake = document.createElement('div');
      const size = sizes[Math.floor(Math.random()*sizes.length)];
      const speed = speeds[Math.floor(Math.random()*speeds.length)];
      flake.classList.add('winter-snowflake', `winter-${size}`, `winter-${speed}`);
      flake.style.left = `${Math.random()*100}%`;
      flake.style.animationDelay = `${Math.random()*5}s`;
      container.appendChild(flake);
      this.snowflakes.push(flake);
    }
  }

  destroy() {
    this.snowflakes.forEach(f => f.remove());
    this.snowflakes = [];
    this.enabled = false;
  }
}

// Inicializar nieve
document.addEventListener('DOMContentLoaded', () => {
  const winter = new WinterSnow();
  winter.init(80,120);
  window.WinterSnow = winter;
});