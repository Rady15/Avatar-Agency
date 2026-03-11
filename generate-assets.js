const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

const allFiles = getAllFiles('./public');
const assets = allFiles
    .filter(f => f.match(/\.(png|jpe?g|webp|svg|mp4)$/i))
    .map(f => '/' + f.replace(/\\/g, '/').replace(/^public\//, ''));

fs.mkdirSync('./src/data', { recursive: true });
fs.writeFileSync('./src/data/assets.json', JSON.stringify(assets, null, 2));
console.log(`Generated assets.json with ${assets.length} files.`);
