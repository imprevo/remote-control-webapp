# Welcome to Remote control webapp 👋

![node-current](https://img.shields.io/badge/node-%3E%3D%2012.0.0-brightgreen)
![s](https://img.shields.io/badge/license-MIT-green)

> Remote desktop web app built with [RobotsJS](https://github.com/octalmage/robotjs).

## Features

- Remote control via LAN and WI-FI
- File manager
- Mouse control
- Keyboard buttons
- Media buttons
- [VLC](https://www.videolan.org/vlc/) hotkeys

## Install

1. Clone this repository.

2. You need to install [RobotsJS requirements](https://github.com/octalmage/robotjs#building) for your OS.

3. Install dependencies

```sh
npm install
```

## Usage

Run application in production mode:

```sh
npm start
```

Or in development mode:

```sh
npm run dev
```

Now you can open http://localhost:3000 to view it in the browser.

## Troubleshooting

### `node-gyp` throws error during installation

Clone [RobotsJS repo](https://github.com/octalmage/robotjs) and run this command inside `robotjs` root catalog:

```sh
npm install && node-gyp rebuild
```

## Author

👤 **imprevo**

- Github: [@imprevo](https://github.com/imprevo)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
