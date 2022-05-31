const {app, BrowserWindow, Menu} = require('electron')
const path = require("path");
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
        icon: path.resolve(__dirname, 'src', 'img', 'logo.png')
    });

    const menu = Menu.buildFromTemplate(exampleMenuTemplate());
    Menu.setApplicationMenu(menu);

    mainWindow.loadFile(path.resolve(__dirname, 'dist', 'index.html')).then();

    mainWindow.once('ready-to-show', mainWindow.show);

    mainWindow.on('close', () => mainWindow = null)
    attachTitlebarToWindow(mainWindow);
};

if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}
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
            },
            {
                label: "Radio1",
                type: "radio",
                checked: true
            },
            {
                label: "Radio2",
                type: "radio",
            },
            {
                label: "Checkbox1",
                type: "checkbox",
                checked: true,
                click: (item) => {
                    console.log("item is checked? " + item.checked);
                }
            },
            {type: "separator"},
            {
                label: "Checkbox2",
                type: "checkbox",
                checked: false,
                click: (item) => {
                    console.log("item is checked? " + item.checked);
                }
            }
        ]
    },
    {
        label: "Advanced Options",
        submenu: [
            {
                label: "Quit",
                click: () => app.quit()
            },
            {
                label: "Radio1",
                type: "radio",
                checked: true
            },
            {
                label: "Radio2",
                type: "radio",
            },
            {
                label: "Checkbox1",
                type: "checkbox",
                checked: true,
                click: (item) => {
                    console.log("item is checked? " + item.checked);
                }
            },
            {type: "separator"},
            {
                label: "Checkbox2",
                type: "checkbox",
                checked: false,
                click: (item) => {
                    console.log("item is checked? " + item.checked);
                }
            },
            {
                label: "Radio Test",
                submenu: [
                    {
                        label: "Sample Checkbox",
                        type: "checkbox",
                        checked: true
                    },
                    {
                        label: "Radio1",
                        checked: true,
                        type: "radio"
                    },
                    {
                        label: "Radio2",
                        type: "radio"
                    },
                    {
                        label: "Radio3",
                        type: "radio"
                    },
                    {type: "separator"},
                    {
                        label: "Radio1",
                        checked: true,
                        type: "radio"
                    },
                    {
                        label: "Radio2",
                        type: "radio"
                    },
                    {
                        label: "Radio3",
                        type: "radio"
                    }
                ]
            },
            {
                label: "zoomIn",
                role: "zoomIn"
            },
            {
                label: "zoomOut",
                role: "zoomOut"
            },
            {
                label: "Radio1",
                type: "radio"
            },
            {
                label: "Radio2",
                checked: true,
                type: "radio"
            },
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