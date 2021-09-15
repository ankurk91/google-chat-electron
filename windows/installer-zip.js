const zipper = require('cross-zip');
const path = require("path");
const fs = require('fs');

const version = require(path.join(__dirname, '../package.json')).version;
const inPath = path.join(__dirname, '../dist/google-chat-electron-win32-x64');
const fileName = `google-chat-electron-win-x64-${version}.zip`
const outDir = path.join(__dirname, '../dist/installers');
const outPath = path.join(outDir, fileName)

if (!fs.existsSync(inPath)) {
  throw new Error('Input directory not found - ' + inPath)
}

if (!fs.existsSync(outDir)) {
  console.log("Creating missing output directory - ", outDir)
  fs.mkdirSync(outDir);
}

console.log("Creating zip file - ", fileName);

zipper.zip(inPath, outPath, (error) => {
  if (error) {
    throw new Error(error);
  }
  console.log("Zip file created at -" + outPath);
});
