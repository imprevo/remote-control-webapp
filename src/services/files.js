const fs = require('fs');
const os = require('os');
const path = require('path');
const util = require('util');
const open = require('open');

const fsReaddir = util.promisify(fs.readdir);
const fsStat = util.promisify(fs.stat);
const isFileHidden = (file) => !/^\./.test(file);

exports.getHomedir = () => {
  return os.homedir();
};

exports.readDir = async (dirPath) => {
  const files = await fsReaddir(dirPath);
  const filteredFiles = files.filter(isFileHidden);
  const filesWithstats = await Promise.all(
    filteredFiles.map(async (file) => {
      const filePath = path.join(dirPath, file);
      const stat = await fsStat(filePath);
      return {
        isDirectory: stat.isDirectory(),
        file,
        filePath,
      };
    })
  );
  return filesWithstats;
};

exports.openFile = async (filePath) => {
  await open(filePath);
};
