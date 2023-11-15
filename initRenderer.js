const ipcRenderer = window.theDataPath.renderer

function printeryBe() {
    const bodyWrds = document.querySelectorAll('table tr')
    const bodyWrdsArrs = []
    for (let i = 0; i < bodyWrds.length; i++) {
        const tempNode = bodyWrds[i].querySelectorAll('td')
        const tempArr = []
        tempNode.forEach(e => { tempArr.push(e.innerHTML) })
        bodyWrdsArrs.push(tempArr)
    }
    let freshArr = []
    for (let i = 0; i < bodyWrdsArrs.length; i++) {
        freshArr.push(bodyWrdsArrs[i].join('endIn')) //but do we need to join 'endIn' when there's square brackets which are unique?
    }
    const newDataSet = freshArr.join('endOut')
    ipcRenderer.send('printThis', newDataSet)
    //console.log('newData', newDataSet)
    const toTempl = document.createElement('a')
    toTempl.href = 'reportTemplate.html'
    toTempl.dispatchEvent(new MouseEvent('click'))
}
function exitWork() {
    const theA = document.createElement('a')
    theA.href = "logoff.html"
    const ev = new MouseEvent('click')
    theA.dispatchEvent(ev)
}

