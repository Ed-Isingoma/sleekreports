const ipcRenderer = window.theDataPath.renderer
const fs = window.theDataPath.fs
const dataPath = ipcRenderer.sendSync('bringLink', '')

function printeryBe() {//for the new curriculum
    const bodyWrds = document.querySelectorAll('table:nth-of-type(1) tr')//>tbody>
    const bodyWrdsArrs = []
    for (let i=0; i<bodyWrds.length; i++) {
        const tempNode = bodyWrds[i].querySelectorAll('td')
        const tempArr = []
        tempNode.forEach(e=>{tempArr.push(e.innerHTML)})
        bodyWrdsArrs.push(tempArr)
    }
    let freshArr = []
    for (let i=0;i<bodyWrdsArrs.length;i++) {
        freshArr.push(bodyWrdsArrs[i].join('endIn')) //but do we need to join 'endIn' when there's square brackets which are unique?
    }
    const newDataSet = freshArr.join('endOut')
    //console.log('newData', newDataSet)
    ipcRenderer.send('printThis', newDataSet)
}
function printeryBe2() {//for the old curriculum
    const headWrds = document.querySelectorAll('table:nth-of-type(1) > tbody>tr>td')
    const headWrdsArr = [] //contains each of the divs going to printery
    headWrds.forEach(e=> {headWrdsArr.push(e.innerHTML)})
    //headWrdsArr.shift();
    const newHeadWrds = []
    headWrdsArr.forEach(e=>{
         newHeadWrds.push(e.replace('<font style="FONT-SIZE:11pt" face="Calibri" color="#000000">', '').replace('</font>', ''))
    })
    const bodyWrds = document.querySelectorAll('table:nth-of-type(2)>tbody>tr')
    const bodyWrdsArrs = []
    for (let i=0; i<bodyWrds.length; i++) {
        const tempNode = bodyWrds[i].querySelectorAll('td')
        const tempArr = []
        tempNode.forEach(e=>{tempArr.push(e.innerHTML.replace('<font style="FONT-SIZE:11pt" face="Calibri" color="#000000">', '').replace('</font>', ''))})
        bodyWrdsArrs.push(tempArr)
    }
    bodyWrdsArrs.unshift(newHeadWrds)
    let freshArr = []
    for (let i=0;i<bodyWrdsArrs.length;i++) {
        freshArr.push(bodyWrdsArrs[i].join('endIn'))
    }
    const newDataSet = freshArr.join('endOut')
    //console.log('newData', newDataSet)
    ipcRenderer.send('printThese', newDataSet)
}
function exitWork(){
    const theA = document.createElement('a')
    theA.href = "logoff.html"
    const ev = new MouseEvent('click')
    theA.dispatchEvent(ev)
}
