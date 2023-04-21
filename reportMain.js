const { app, BrowserWindow, ipcMain, Menu} = require('electron')
const fs = require('fs')
const path = require('path')
const thePath = app.getPath('userData')

ipcMain.on('bringLink', (ee, argu)=> {
    ee.returnValue = thePath
})
//initialising main browserWindow
let mainWin;
function createWindow() {
    mainWin = new BrowserWindow({
        width: 1100,
        height: 700,
        backgroundColor: 'rgb(185, 184, 255)',
        webPreferences: {
            preload: path.join(app.getAppPath(), 'reportPreload.js')
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
//let transitArr;
let printWin;
ipcMain.on('printThis', (e)=> {
    //transitArr = theArr;
    printWin = new BrowserWindow({
        width: 800,
        height: 600,
        show: true,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'reportPreload.js'),
        }
    })
    //printWin.minimize()
    printWin.loadFile('./reportTemplate.html')
})
ipcMain.on('doneLoading', (e, filename)=> {
    printWin.webContents.printToPDF({
        printBackground: false,
        landscape: false
    }).then(data => {
        fs.appendFileSync(path.join(app.getPath('documents'), filename + '.pdf'), data)
        mainWin.webContents.send('printPath', path.join(app.getPath('documents'), filename + '.pdf'))
        e.sender.send('printInfo', 'Finished writeFileSync')
    }).then(()=> {printWin.close()}).then(()=>{fs.unlinkSync(thePath + '/reportTemplate.html')}).catch(err =>e.sender.send('printInfo', err))
})

/*ipcMain.on('doneLoading', (e, filename)=> {
    printWin.webContents.printToPDF({
        //pageSize: 'A4',
        landscape: false,
        printBackground: false
    }).then(data => {
        //fs.appendFileSync(path.join(app.getPath('documents'), filename + '.pdf'), data)
        //fs.appendFileSync('~/Documents/pdfReports/' + filename + '.pdf', data)
        fs.writeFileSync(path.join(app.getPath('desktop'), filename + '.pdf'), data)
        mainWin.webContents.send('printPath', path.join(app.getPath('desktop'), filename + '.pdf'))
        e.sender.send('printInfo', 'Finished writeFileSync')
    }).then(()=> {
        //printWin.close()
    }).then(()=>{fs.unlinkSync(path.join(app.getPath('desktop'), filename + '.pdf'))}).catch(err =>e.sender.send('printInfo', err))
})*/
/*
ipcMain.on('bringArr', (e, arg)=> {
    e.returnValue = transitArr
})
ipcMain.on('doneLoadingg', (e, filename)=> {
    printWin.webContents.printToPDF({
        printBackground: true,
        landscape: true
    }, (err, data)=> {
        if (err) e.sender.send('printInfo', err);
        fs.writeFileSync(path.join(app.getPath('documents'), filename + '.pdf'), data)
        mainWin.webContents.send('printPath', path.join(app.getPath('documents'), filename + '.pdf'))
        e.sender.send('printInfo', 'Finished writeFileSync')
    }).then(()=> {//printWin.close() //this should go away
    }).then(()=>{fs.unlinkSync(thePath + '/printable.html')}).catch(err => 
        e.sender.send('printInfo', err))
})
//now the contextmenus
ipcMain.on('miniMenu', (e, id)=>{
    const template = [{
        label: 'Cut',
        click() {
            e.sender.send('miniMenu', 'cut ' + id)
        }
    }, {
        label: 'Copy',
        click(){
            e.sender.send('miniMenu', 'copy ' + id)
        }
    }, {
        label: 'Bold',
        click(){
            e.sender.send('miniMenu', 'bold ' + id)
        }
    }, {
        label: 'Select All',
        click() {
            e.sender.send('miniMenu', 'selectAll ' + id)
        }
    }, /*{
        label: 'Paste',
        click() {
            e.sender.send('miniMenu', 'paste ' + id)

        }
    }]
    const smallMenu = Menu.buildFromTemplate(template)
    smallMenu.popup(BrowserWindow.fromWebContents(e.sender))
})
ipcMain.on('showMenu', (e, msg)=> {
    const template = [{
        label: 'Edit entry',
        click() {
            e.sender.send('clicked', 'editEntry ' + msg)
        }
    }, {
        label: 'Delete entry',
        click() {
            e.sender.send('clicked', 'deleteEntry ' + msg)
        }
    }, {
        label: 'Copy',
        click() {
            e.sender.send('clicked', 'copy')
        }
    }, {
        label: 'Select all',
        click() {
            e.sender.send('clicked', 'selectAll')
        }
    }, {
        label: 'Print selection',
        click() {
            e.sender.send('clicked', 'printSelection')
        }
    }, /*{
        label: 'Settings',
        click() {
            e.sender.send('clicked', 'settings')
        }
    }]
    const theMenu = Menu.buildFromTemplate(template)
    theMenu.popup(BrowserWindow.fromWebContents(e.sender))
})*/