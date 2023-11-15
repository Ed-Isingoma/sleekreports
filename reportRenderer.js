const ipcRenderer = window.theDataPath.renderer

const strungArr = ipcRenderer.sendSync('bringArr')
const bodyWrdsData = []
let allStrData;
//console.log('bodyWrdsData', bodyWrdsData)
const subjsList = ['ENGLISH', 'PHYSICS', 'HISTORY', 'GEOGRAPHY', 'BIOLOGY', 'MATHEMATICS', 'CHEMISTRY', 'PHYSICAL EDUCATION', 'AGRICULTURE', 'ENTREPRENEURSHIP', 'ART', 'ICT', 'CRE', 'IRE', 'LUGANDA', 'LITERATURE', 'KISWAHILI']
const topicsArrs = [
    ['engtop1', 'engtop2', 'engtop3', 'engtop4'],
    ['phytopp1', 'phytopp2', 'phytopp3', 'phytopp4'],
    ['histtop1', 'histopp2', 'hoisnn'],
    ['geogtoppp3', 'geogtop4', 'ihogdnn'],
    ['bioltoppp5', 'bioltope6'],
    ['mtctoppppp6', 'jsdfkjbd', 'lokmolkm lol'],
    ['chemtopp7'],
    ['pedtopp8', 'sdgsd'],
    ['agrninth', 'agrtenth'],
    ['ent11', 'entcomm'],
    ['snfkjvr', 'sdvvsgdg', 'yntrbrb'],
    ['dhybybf', 'untrvesv', 'wettbs'],
    ['hbytdsew'],
    [' hbtrer', 'ybtdsctv', 'brthgvve', 'btfourth comm']
]
const svaArr = ['Mathematical Computation', 'Communication', 'Creativity', 'Commitment', 'Critical Thinking', 'Cooperation', 'Self-directed learning', 'Problem solving', 'ICT proficiency', 'Logical thinking', 'Leadership', 'Empathy', 'Kindness', 'Sharing', 'Unnecessarily talkative', 'Generally stubborn', 'Often sleepy during class', 'Helpful', 'Disrupts normal order during class', 'Tends to be inactive']
const commentsObj = {
    'ENGLISH': ['one', 'two', 'three', 'four', 'five'],
    'PHYSICS': ['one', 'two', 'three', 'four', 'five'],
    'ENTREPRENEURSHIP': ['one', 'two', 'three', 'four', 'five'],
    'LITERATURE': ['one', 'two', 'three', 'four', 'five'],
    'GEOGRAPHY': ['one', 'two', 'three', 'four', 'five'],
    'CHEMISTRY': ['one', 'two', 'three', 'four', 'five'],
    'MATHEMATICS': ['one', 'two', 'three', 'four', 'five'],
    'BIOLOGY': ['one', 'two', 'three', 'four', 'five'],
    'HISTORY': ['one', 'two', 'three', 'four', 'five'],
    'ICT': ['one', 'two', 'three', 'four', 'five'],
    'CRE': ['one', 'two', 'three', 'four', 'five'],
    'LUGANDA': ['one', 'two', 'three', 'four', 'five'],
    'KISWAHILI': ['one', 'two', 'three', 'four', 'five'],
    'IRE': ['one', 'two', 'three', 'four', 'five'],
    'PHYSICAL EDUCATION': ['one', 'two', 'three', 'four', 'five'],
    'ART': ['one', 'two', 'three', 'four', 'five'],
    'AGRICULTURE': ['one', 'two', 'three', 'four', 'five'],
}
if (strungArr) {//if we're working with reportTemplate
    allStrData = strungArr.split('endOut')
    allStrData.forEach(el => {
        bodyWrdsData.push(el.split('endIn'))
    })
    document.querySelector('.populator').dispatchEvent(new MouseEvent("click"))
}
function populate() {
    //setting up divs for eoy assessment results
    let itsThirdTerm = true
    const eoycover = document.createElement('div') //declared in wider scope because someone else needs him
    if (itsThirdTerm) {
        eoycover.className = 'eoycover'
        const eoycoverHeading = document.createElement('div')
        eoycoverHeading.className = 'eoycoverHeading'
        eoycoverHeading.innerHTML = 'END OF YEAR ASSESSMENT'
        eoycover.appendChild(eoycoverHeading.cloneNode(true))
        const eoyheaderrow = document.createElement('div')
        eoyheaderrow.className = 'eoyheaderrow'
        const eoybodyrow = document.createElement('div')
        eoybodyrow.className = 'eoybodyrow'
        const longeoy = document.createElement('div')
        longeoy.className = 'longeoy'
        const shorteoy = document.createElement('div')
        shorteoy.className = 'shorteoy'
        
        eoyheaderrow.appendChild(longeoy.cloneNode(true))
        eoybodyrow.appendChild(longeoy.cloneNode(true))
        for (let i = 0; i < 4; i++) {
            eoyheaderrow.appendChild(shorteoy.cloneNode(true))
            eoybodyrow.appendChild(shorteoy.cloneNode(true))
        }
        const eoyheaderrowData = ['SUBJECT', 'Formative Score\n(makes up 20%)', 'End Of Year Exam Score\n(makes up 80%)', 'Total Score', 'Grade']
        function calcGrade(mark) {
            const rangeMin = [0, 30, 40, 50, 60, 70, 80, 90]
            const theGrades = ['G', 'F', 'E', 'D', 'C', 'B', 'A', 'A+']
            for (let i = rangeMin.length - 1; i >= 0; i--) {
                if (mark >= rangeMin[i]) return theGrades[i]
            }
            return 'G' //just in case, to prevent an error
        }
        const eoyheaderrowSlctr = [...eoyheaderrow.querySelectorAll('div')]
        for (let i = 0; i < eoyheaderrowData.length; i++) {
            eoyheaderrowSlctr[i].innerHTML = eoyheaderrowData[i]
        }
        eoycover.appendChild(eoyheaderrow.cloneNode(true))   
    }
    for (let i = 1; i < bodyWrdsData.length; i++) {
        const repClone = document.querySelector('.person1').cloneNode(true)
        document.querySelector('body').appendChild(repClone)
    }
    //this code gives names, classes n genders (and shifts them from the array). will also work for old curriculum
    const reportIntros = ['addName', 'addClass', 'addGender']
    for (let r = 0; r < reportIntros.length; r++) {
        for (let i = 1; i <= bodyWrdsData.length; i++) {
            const scoop = bodyWrdsData[i-1].shift()
            const theTarget = document.querySelector(`body>div:nth-of-type(${i})`).querySelector(`.${reportIntros[r]}`)
            theTarget.innerHTML = scoop
        }
    }
    //now the real populating. The loop below selects a particular learner
    for (let r = 1; r <= bodyWrdsData.length; r++) {
        const voidSubjRow = document.querySelector(`body>div:nth-of-type(${r})`).querySelector('.forSubj')
        //the second realReport table
        const newTabl = document.createElement('div')
        newTabl.className = 'realReport2'
        newTabl.appendChild(document.querySelector(`body>div:nth-of-type(${r}) .forHeading`).cloneNode(true))
        //working on a single subject
        let pageToll = 0
        for (let b = 0; b < topicsArrs.length; b++) {
            const rowClone = voidSubjRow.cloneNode(true)
            rowClone.querySelector('.subjName').innerHTML = subjsList[b]
            let whetherWeAppend = false
            let rowToll = 0
            for (let dee = 0; dee < topicsArrs[b].length; dee++) {
                if (topicsArrs[b][dee] && bodyWrdsData[r - 1][4 * b + dee]) {
                    const topicDiv = document.createElement('div')
                    topicDiv.classList.add('addTopic')
                    topicDiv.innerHTML = topicsArrs[b][dee]
                    rowClone.querySelector('.leftmid').appendChild(topicDiv)
                    const scoreDiv = document.createElement('div')
                    scoreDiv.classList.add('addScore')
                    scoreDiv.innerHTML = Math.round(+bodyWrdsData[r - 1][4 * b + dee], 3)
                    rowClone.querySelector('.rightmid').appendChild(scoreDiv)
                    rowToll += 1
                    whetherWeAppend = true
                }
            }
            if (whetherWeAppend) {
                //determining the div heights
                if (rowToll == 1) {
                    rowClone.querySelector('.leftmost').style.height = '84px'
                    rowClone.querySelector('.rightmost').style.height = '84px'
                    rowClone.querySelector('.addTopic').style.height = '84px'
                    rowClone.querySelector('.addScore').style.height = '84px'
                    pageToll += 2
                } else {
                    rowClone.querySelector('.leftmost').style.height = `${rowToll * 42}px`
                    rowClone.querySelector('.rightmost').style.height = `${rowToll * 42}px`
                    rowClone.querySelectorAll('.addTopic').forEach(el => el.style.height = '42px')
                    rowClone.querySelectorAll('.addScore').forEach(el => el.style.height = '42px')
                    pageToll += rowToll
                }
                rowClone.querySelector(`.trsRmrks`).innerHTML = calcRmrks(rowClone.querySelectorAll('.addScore'), subjsList[b])
                rowClone.style.display = 'block'
                let destinatnTab = document.querySelector(`body>div:nth-of-type(${r})`).querySelector('.realReport')
                if (pageToll >= 24) {
                    destinatnTab = document.querySelector(`body>div:nth-of-type(${r}) .realReport`).insertAdjacentElement("afterend", newTabl)
                }
                destinatnTab.appendChild(rowClone)
            }
        }
        //the end of year marks table
        if (itsThirdTerm) {
            const studentsEoy = eoycover.cloneNode(true)

            for (let p = 89; p < 105; p++) {//89 to 105 (instead of to bodyWrdsData[r-1].length). That is the range of subjects with EOY marks
                if (bodyWrdsData[r - 1][p]) {
                    const totalAOIs = +bodyWrdsData[r - 1][p + 17]
                    const eoyMrks = +bodyWrdsData[r - 1][p]
                    const studentsEoyrow = eoybodyrow.cloneNode(true)
                    const intoEoybodyrow = [subjsList[p - 89], totalAOIs, eoyMrks, totalAOIs + eoyMrks, calcGrade(totalAOIs + eoyMrks)]
                    const eoyBodyrowDivs = [...studentsEoyrow.querySelectorAll('div')]
                    eoyBodyrowDivs.forEach((e) => { e.innerHTML = intoEoybodyrow[eoyBodyrowDivs.indexOf(e)] })
                    studentsEoy.appendChild(studentsEoyrow)
                }
            }
            document.querySelector(`body>div:nth-of-type(${r})`).querySelector('.sva').before(studentsEoy)
        }
        //removing the first forSubj which is empty
        voidSubjRow.remove()
        //observed skills, values n attitudes
        for (let d = 68; d <= 88; d++) {//68 is the index of the first sva item. 4X17. This changes if the num of subjects changes. 88 is the index of the 21st sva item
            if (bodyWrdsData[r - 1][d] == 1) {
                const newSVA = document.createElement('li')
                newSVA.innerHTML = svaArr[d - 68]
                document.querySelector(`body>div:nth-of-type(${r})`).querySelector(`.svas>ul`).appendChild(newSVA)
            }
        }
    }
    nwReallyPrint() //Uncomment this function to really print
}

function calcRmrks(nodelis, subj) {
    let scores = []
    nodelis.forEach(el => {
        if (el.innerHTML) {
            scores.push(el.innerHTML)
        }
    })
    let avg = 0
    for (let i = 0; i < scores.length; i++) {
        avg += +scores[i]
    }
    avg = avg / scores.length
    let trsComm = ''
    if (avg < 1.3) {
        trsComm = commentsObj[subj][0]
    } else if (avg < 1.75) {
        trsComm = commentsObj[subj][1]
    } else if (avg < 2.2) {
        trsComm = commentsObj[subj][2]
    } else if (avg < 2.65) {
        trsComm = commentsObj[subj][3]
    } else if (avg > 2.65) {
        trsComm = commentsObj[subj][4]
    }
    return trsComm
}
//later, you can import the currbod from oldcurrtemp
function nwReallyPrint() {
    const dateArr = Date().toString().split(' ')
    dateArr.splice(-4, 4)
    let filename = ''
    for (let i = 0; i < dateArr.length; i++) {
        filename += dateArr[i]
    }
    ipcRenderer.send('doneLoading', filename)
}
//the UI teller. And it currently isnt showing output
document.querySelector('.teller').addEventListener('printed', () => {
    document.querySelector('.teller').innerHTML = 'Printed successfully to ' + document.querySelector('.teller').dataset.message
    document.querySelector('.teller').style.display = 'flex'
    setTimeout(() => { document.querySelector('.teller').style.display = 'none' }, 3000)
})
function goBack() {
    const theA = document.createElement('a')
    theA.href = "get results.html" 
    ipcRenderer.send('resetStoredArr')
    theA.dispatchEvent(new MouseEvent('click'))
}