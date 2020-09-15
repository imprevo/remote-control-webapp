const sendRequest = (url, { params, method } = {}) =>
  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: params ? JSON.stringify(params) : null,
  }).then((r) => r.json());

const sendGetRequest = (url) => sendRequest(url, { method: 'GET' });

const sendPostRequest = (url, params) =>
  sendRequest(url, { method: 'POST', params });

const initKeyboard = () => {
  const sendKeboard = (params) => sendPostRequest('/commands/keyboard', params);
  const mediaButtons = document.querySelectorAll('.button-media');

  mediaButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const { key } = button.dataset;
      sendKeboard({ key });
    });
  });
};

const initMouse = () => {
  const MOUSE_THRESHOLD = 5;
  const MOUSE_SPEED = 2;
  const sendMouse = (params) => sendPostRequest('/commands/mouse', params);
  const mousePanel = document.querySelector('.mouse-panel');
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
        wasMoved ||
        Math.abs(deltaX) > MOUSE_THRESHOLD ||
        Math.abs(deltaY) > MOUSE_THRESHOLD
      ) {
        const x = deltaX * MOUSE_SPEED;
        const y = deltaY * MOUSE_SPEED;

        wasMoved = true;
        lastClientX = touch.clientX;
        lastClientY = touch.clientY;

        sendMouse({ key: 'mouseMove', input: { x, y } });
      }
    }
  });
};

const createHistory = () => {
  const history = [];
  const getCurrent = () => history[history.length - 1];
  const add = (path) => history.push(path);
  const remove = () => history.pop();
  return {
    getCurrent,
    add,
    remove,
  };
};

const initFiles = () => {
  const getFiles = (dirPath) => {
    const query = dirPath ? `?dirPath=${dirPath}` : '';
    return sendGetRequest(`/commands/files${query}`);
  };
  const openFile = (filePath) => {
    return sendPostRequest(`/commands/open`, { filePath });
  };
  const createFilesPanel = () => {
    const fileNode = document.createElement('div');
    fileNode.classList.add('files-panel');
    return fileNode;
  };
  const createFileNode = (file) => {
    const fileNode = document.createElement('div');
    fileNode.classList.add('files-item', file.isDirectory ? 'isDir' : null);
    fileNode.innerText = file.file;
    return fileNode;
  };
  const dirHistory = createHistory();

  const showFiles = async (dirPath) => {
    const { data } = await getFiles(dirPath);
    const filesPanel = createFilesPanel();
    data.files.forEach((file) => {
      const fileNode = createFileNode(file);
      fileNode.addEventListener('click', () => {
        if (file.isDirectory) {
          dirHistory.add(file.filePath);
          showFiles(file.filePath);
        } else {
          openFile(file.filePath);
        }
      });
      filesPanel.appendChild(fileNode);
    });
    document.querySelector('.files-panel').replaceWith(filesPanel);
  };

  const initButtons = () => {
    const filesButtonBack = document.querySelector('.files-button-back');
    filesButtonBack.addEventListener('click', () => {
      dirHistory.remove();
      showFiles(dirHistory.getCurrent());
    });

    const filesButtonHome = document.querySelector('.files-button-home');
    filesButtonHome.addEventListener('click', () => {
      dirHistory.add(null);
      showFiles();
    });

    const filesButtonRefresh = document.querySelector('.files-button-refresh');
    filesButtonRefresh.addEventListener('click', () => {
      showFiles(dirHistory.getCurrent());
    });
  };

  showFiles();
  initButtons();
};

initKeyboard();
initMouse();
initFiles();
