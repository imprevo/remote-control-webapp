const sendRequest = (url, params) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

const sendKeboard = (params) => sendRequest('/commands/keyboard', params);

const sendMouse = (params) => sendRequest('/commands/mouse', params);

const mediaButtons = document.querySelectorAll('.button-media');

mediaButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.key;
    sendKeboard({ key });
  });
});

const mousePanel = document.querySelector('.mouse-panel');

const MOUSE_THRESHOLD = 10;
const MOUSE_SPEED = 2;
let lastClientX = 0;
let lastClientY = 0;
let wasMoved = false;

mousePanel.addEventListener('touchstart', (e) => {
  e.preventDefault();
  const touch = e.touches[0];

  if (touch) {
    wasMoved = false;
    lastClientX = touch.clientX;
    lastClientY = touch.clientY;
  }
});

mousePanel.addEventListener('touchend', (e) => {
  e.preventDefault();

  if (!wasMoved) {
    sendMouse({ key: 'mouseClickLeft' });
  }

  wasMoved = false;
  lastClientX = 0;
  lastClientY = 0;
});

mousePanel.addEventListener('touchmove', (e) => {
  e.preventDefault();

  const touch = e.touches[0];

  if (touch) {
    const deltaX = touch.clientX - lastClientX;
    const deltaY = touch.clientY - lastClientY;

    if (
      Math.abs(deltaX) > MOUSE_THRESHOLD ||
      Math.abs(deltaY) > MOUSE_THRESHOLD
    ) {
      wasMoved = true;
      const x = deltaX * MOUSE_SPEED;
      const y = deltaY * MOUSE_SPEED;

      lastClientX = touch.clientX;
      lastClientY = touch.clientY;

      sendMouse({ key: 'mouseMove', input: { x, y } });
    }
  }
});
