import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import * as isDev from 'electron-is-dev'
import * as path from 'path'
// 1. GC가 일어나지 않도록 밖에 빼줌
let main_window: BrowserWindow

function create_window() {
    main_window = new BrowserWindow({
        // 이것들은 제가 사용하는 설정이니 각자 알아서 설정 하십시오.
        alwaysOnTop: false,
        center: true,
        fullscreen: false,
        kiosk: !isDev,
        resizable: true,
        zoomToPageWidth: false,
        maximizable: true,
        width: 1920,
        height: 1080,
        webPreferences: {
            // 2.
            // 웹 애플리케이션을 데스크탑으로 모양만 바꾸려면 안 해도 되지만,
            // Node 환경처럼 사용하려면 (Node에서 제공되는 빌트인 패키지 사용 포함)
            // true 해야 합니다.
            nodeIntegration: true
            // nodeIntegrationInWorker: true // <---  for web workers
        },
    })

    // 3. and load the index.html of the app.
    // if (isDev) {
    // //     // 개발 중에는 개발 도구에서 호스팅하는 주소에서 로드
    //     main_window.loadURL('http://localhost:8080')
    //     main_window.webContents.openDevTools()
    // } else {
    //     // 프로덕션 환경에서는 패키지 내부 리소스에 접근
        const htmlPath: string = path.join(__dirname, '../../index.html');
        // main_window.webContents.openDevTools();
        main_window.loadFile(htmlPath);
    // }

    if (isDev) {
        main_window.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    main_window.on('closed', () => {
        main_window = undefined!
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', create_window)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    app.quit()
})

ipcMain.on('showFileSaveDialog', (event, args) => {
    const filePath = dialog.showSaveDialogSync({
        defaultPath: args
    });
    event.sender.send('savedFilePath', filePath);
});

ipcMain.on('showFileOpenDialog', (event, args) => {
    const filePath = dialog.showOpenDialogSync({
        filters: [{name: args, extensions: [args]}]
    });
    event.sender.send('openFilePath', filePath);
});

ipcMain.on('showMessageBox', (event, ...args) => {
    const idx = dialog.showMessageBoxSync(main_window, {
        message: args[0],
        buttons: args[1]
    });
    event.sender.send('message', idx);
});