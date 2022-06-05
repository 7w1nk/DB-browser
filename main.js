const { app, BrowserWindow, Menu, globalShortcut, remote } = require('electron');
const path = require("path");
const url = require('url');
const {setupTitlebar, attachTitlebarToWindow} = require('custom-electron-titlebar/main');
setupTitlebar();
const isDev = !app.isPackaged;

const createWindow = () => {
    let mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 350,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        show: false,
        titleBarStyle: 'hidden',
        icon: path.join(__dirname, 'dist', 'logo.png'),
    });


    const menu = Menu.buildFromTemplate(exampleMenuTemplate());
    Menu.setApplicationMenu(menu);

    mainWindow.loadFile(path.resolve(__dirname, 'dist', 'index.html')).then();

    mainWindow.once('ready-to-show', mainWindow.show);

    if (process.platform === 'darwin') {
        globalShortcut.register('Command+Q', () => {
            app.quit();
        });
    }

    mainWindow.on('close', () => mainWindow = null)
    attachTitlebarToWindow(mainWindow);
};

if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
})
app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})

const exampleMenuTemplate = () => [
    {
        label: "Simple Options",
        submenu: [
            {
                label: "Quit",
                click: () => app.quit()
            }
        ]
    },
    {
        label: "View",
        submenu: [
            {role: "reload"},
            {role: "forceReload"},
            {type: "separator"},
            {role: "zoomIn"},
            {role: "zoomOut"},
            {role: "resetZoom"},
            {role: "toggleDevTools"}
        ],
    }
];