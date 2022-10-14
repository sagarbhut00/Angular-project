const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
const files = [
'./dist/demo/main.3cd2dc53dc6e5703.js',
'./dist/demo/polyfills.13531fd42a3f897e.js',
'./dist/demo/runtime.bccf84395eb43a19.js',
]
await fs.ensureDir('elements')
await concat(files, 'elements/custom-element.js');
await fs.copyFile('./dist/angular-elements/styles.css', 'elements/styles.css')
await fs.copy('./dist/angular-elements/assets/', 'elements/assets/' )
})()