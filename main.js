const { app, BrowserWindow } = require('electron')
const usb = require('usb');

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();

        // This line causes the crash
        usb.on('attach', attachDetected);

    })
})

const attachDetected = (device) => {
    console.debug('\n\n\nh ========> id-listen Device add detected:', device);
    // debouncedPoll();
};

app.on('window-all-closed', function () {
    usb.removeListener("attach", attachDetected);
    app.quit();
})
