const {Titlebar, Color} = require('custom-electron-titlebar');
const path = require('path');

window.addEventListener('DOMContentLoaded', () => {
    new Titlebar({
        backgroundColor: Color.fromHex("#282828"),
        itemBackgroundColor: Color.fromHex("#838383"),
        svgColor: Color.WHITE,
        drag: false,
        minimizable: true,
        maximizable: true,
        closeable: true,
        icon: path.join(__dirname, 'src', 'img', 'logo.png')
    });

    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type]);
    }
})