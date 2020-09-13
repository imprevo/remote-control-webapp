const sendKeboard = (params) =>
  fetch('/commands/keyboard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

const mediaButtons = document.querySelectorAll('.button-media');

mediaButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.key;
    sendKeboard({ key });
  });
});
