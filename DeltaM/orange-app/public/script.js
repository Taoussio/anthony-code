
let currentCsv = null

function toReg(str) {
    const refs = {}
    let count = 0
    let open = false
    let indexOpen = -1
    for (let i = 0; i < str.length; i++) {
        if (open) {
            if (str[i] === '"') {
                const key = '###ref_' + count++
                refs[key] = str.substring(indexOpen + 1, i)
                str = str.substring(0, indexOpen) + key + str.substring(i + 1)
                open = false
                i = indexOpen
                indexOpen = -1
            }
        } else {
            if (str[i] === '"') {
                open = true
                indexOpen = i
            }
        }
    }
    return {
        result: str,
        refs
    }
}

function toCsv(str) {
    const { result, refs } = toReg(str)
    const elems = result.split('\n').map(elem => elem.split(',').map(elem => refs[elem] || elem))
    if (elems.length === 0)
        throw new Error("No line")
    const length = elems[0].length
    for (let i = 1; i < elems.length; i++) {
        if (elems[i].length !== length)
            throw new Error("No match :" + elems[i].length + ' !== ' + length)
    }
    const objs = []
    for (let i = 1; i < elems.length; i++) {
        const obj = {}
        for (let j = 0; j < elems[i].length; j++) {
            obj[elems[0][j]] = elems[i][j]
        }
        objs.push(obj)
    }
    return objs
}

function onUpload() {
    const input = document.querySelectorAll('#file')[0]
    if (input.files[0]) {
        input.files[0].text().then(text => {
            text = text.split('\r').join('')
            try {
                currentCsv = toCsv(text)
                const tableRef = document.querySelectorAll('table')[0]
                while (tableRef.rows.length > 1)
                    tableRef.deleteRow(1)
                for (let i in currentCsv) {
                    const newRow = tableRef.insertRow();
                    const newCell0 = newRow.insertCell(0);
                    const newCell1 = newRow.insertCell(1);
                    const newCell2 = newRow.insertCell(2);
                    const newCell3 = newRow.insertCell(3);
                    const newText = document.createTextNode(currentCsv[i]['Adresse']);
                    currentCsv[i].raw = {
                        row: newRow,
                        cell0: newCell0,
                        cell1: newCell1,
                        cell2: newCell2,
                        cell3: newCell3,
                        empty1: () => { },
                        empty2: () => { },
                        empty3: () => { }
                    }
                    newCell0.appendChild(newText);
                }
            } catch (e) {
                alert("Warning ; File not valid : " + e.message)
            }
        })
    } else {
        alert("Warning : No file selected")
    }
}

function secureping(callback) {
    callback(true)
}

function eliTest(address, callback) {
    const url = 'https://boutiquepro.orange.fr/convergent/api/eligibility/test?address=' + encodeURIComponent(address)
    console.log(url)
    fetch(url).then(function (response) {
        console.log({ response })
        return response.json();
    }).then(function (json) {
        if (json.buildings && json.buildings.length > 0 && json.buildings[0].eligible) {
            callback(false, true)
        } else if (json.errorInfo && json.errorInfo !== "name required") {
            callback(json.errorInfo, false)
        } else {
            callback(false, false)
        }
    }).catch(err => {
        console.log("err", err)
        callback("Une erreur est survenue lors de la requete", false)
    })
}

const formatDate = (date) => {
    let str = ''
    if (date.getDate() < 10)
        str += '0'
    str += date.getDate()
    str += '/'
    if (date.getMonth() + 1 < 10)
        str += '0'
    str += date.getMonth() + 1
    str += '/'
    str += date.getFullYear()
    return str
}

let active = false

function onScrap() {
    secureping((ping) => {
        if (!ping) {
            return alert("L'application n'est plus disponible")
        }
        if (currentCsv) {
            if (active) {
                return alert("Le scrapping est déjà activé")
            }
            active = true
            document.getElementById('button_scrap').style.display = 'none'
            for (let i in currentCsv) {
                const line = currentCsv[i]
                line.raw.empty1()
                line.raw.empty2()
                line.raw.empty3()
            }
            alert(`Le Scrapping commence, il y en a pour environ ${3 * currentCsv.length} secondes`)
            let current = () => {
                alert('Le Scrapping est terminé')
            }
            const copy = [...currentCsv]
            copy.reverse()
            for (let i in copy) {
                const line = copy[i]
                const next = current
                current = () => {
                    eliTest(line["Adresse"], (error, success) => {
                        line["Resultat"] = error ? "NC" : (success ? "OUI" : "NON")
                        line["Date"] = formatDate(new Date())
                        line["Erreur"] = error || "Aucune erreur"
                        const newText = document.createTextNode(line["Resultat"]);
                        line.raw.cell1.appendChild(newText)
                        line.raw.empty1 = () => line.raw.cell1.removeChild(newText)
                        const newDate = document.createTextNode(line["Date"]);
                        line.raw.cell2.appendChild(newDate)
                        line.raw.empty2 = () => line.raw.cell2.removeChild(newDate)
                        const newError = document.createTextNode(line["Erreur"]);
                        line.raw.cell3.appendChild(newError)
                        line.raw.empty3 = () => line.raw.cell3.removeChild(newError)
                        setTimeout(() => {
                            next()
                        }, 2000)
                    })
                }
            }
            current()
        } else {
            alert("Warning : No file loaded")
        }
    })
}

function onDownload() {
    if (currentCsv) {
        let str = ''
        let keys = Object.keys(currentCsv[0]).filter(key => key !== 'raw')
        str += keys.map(elem => '"' + elem + '"').join(',') + '\n'
        for (let i in currentCsv) {
            for (let j in keys) {
                str += (j == 0 ? '' : ',') + '"' + currentCsv[i][keys[j]] + '"'
            }
            str += '\n'
        }
        const blob = new Blob([str], { type: "text/plain" });
        const dlink = document.createElement('a');
        dlink.download = 'download.csv';
        dlink.href = window.URL.createObjectURL(blob);
        dlink.onclick = function (e) {
            const that = this;
            setTimeout(function () {
                window.URL.revokeObjectURL(that.href);
            }, 1500);
        };
        dlink.click();
        dlink.remove();
    } else {
        alert("Warning : No file loaded")
    }
}