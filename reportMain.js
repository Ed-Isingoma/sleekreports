const { app, BrowserWindow, ipcMain, Menu} = require('electron')
// const fs = require('fs')
const path = require('path')
// const thePath = app.getPath('userData')

//initialising main browserWindow
let mainWin;
function createWindow() {
    mainWin = new BrowserWindow({
        width: 1100,
        height: 700,
        backgroundColor: 'rgb(185, 184, 255)',
        webPreferences: {
            preload: path.join(app.getAppPath(), 'reportPreload.js'),
            contextIsolation: true
        }
    })
    //mainWin.removeMenu()
    mainWin.maximize()
    mainWin.loadFile('reportXIndex.html')
}
app.on('ready', () => {createWindow()})
app.on('window-all-closed', ()=> {
    if (process.platform !== "darwin") app.quit();});
app.on('activate', ()=> {
    if (BrowserWindow.getAllWindows().length === 0) loadMainWindow();})
ipcMain.on('quit', ()=> {app.quit()})
//concerning the second browserwindow
let transitArr;
//let printWin;
ipcMain.on('printThis', (e, theArr)=> {
    transitArr = theArr;
    // printWin = new BrowserWindow({
    //     width: 800,
    //     height: 600,
    //     show: true,
    //     webPreferences: {
    //         preload: path.join(app.getAppPath(), 'reportPreload.js'),
    //         contextIsolation: true
    //     }
    // })
    // printWin.maximize()
    // printWin.loadFile('./reportTemplate.html')
})
// ipcMain.on('printThese', (e, theArr)=> {
//     transitArr = theArr;
//     printWin = new BrowserWindow({
//         width: 800,
//         height: 600,
//         show: true,
//         webPreferences: {
//             preload: path.join(app.getAppPath(), 'reportPreload.js'),
//             contextIsolation: true
//         }
//     })
//     printWin.maximize()
//     printWin.loadFile('./oldCurrTempl.html')
// })
ipcMain.on('doneLoading', (e, filename)=> {
    printWin.webContents.printToPDF({
        printBackground: true,
        pageSize: 'A4',
        landscape: false
    }).then(data => {
        fs.appendFileSync(path.join(app.getPath('documents'), filename + '.pdf'), data)
        mainWin.webContents.send('printPath', path.join(app.getPath('documents'), filename + '.pdf'))
        e.sender.send('printInfo', 'Finished writeFileSync')
    }).then(()=> {//printWin.close()
    }).catch(err =>e.sender.send('printInfo', err))
})
ipcMain.on('bringArr', (e)=> {
    if (transitArr) {
        e.returnValue = transitArr
    } else {
        e.returnValue = false
    }
})
ipcMain.on('resetStoredArr', ()=>{
    transitArr = false
})