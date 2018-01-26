
const fetch = require('node-fetch')

function check(url, invocationParameters,  expectedResultData, expectedResultStatus) {
    const checkResult = { // this is the object you need to set and return
        urlChecked: url,
        resultData: null,
        resultStatus: null,
        statusTestPassed: null,
        resultDataAsExpected: null
    }

    let params = Object.keys(invocationParameters);
    let parametri = "";
    for(let p of params) {
        parametri += p + "=" + invocationParameters[p] + "&";
    }

    //Tolgo la & finale.
    parametri = parametri.substring(0, parametri.length-1);
    let page = url + "?" + parametri;

    return fetch(page)
        .then(response => {
            //response.status;
            return response.json();
        })
        .then(risposta => {
            let asExpected = compareResults(expectedResultData,risposta);
            let expectedStatusCode = (expectedResultStatus == risposta.status);

            checkResult.url = risposta.url;
            checkResult.resultData = risposta.resultData;
            checkResult.resultStatus = risposta.status;
            checkResult.statusTestPassed = expectedStatusCode;
            checkResult.resultDataAsExpected = asExpected;

            return checkResult;
        })
}


// funzione che confronta due oggetti semplici e verifica se actual contiene tutti gli attributi di expected, e se per
// questi ha gli stessi valori
function compareResults(expected, actual) {
    if (!expected) return true //always ok if there are no expectations
    if (!actual) return false
    for (let e of Object.keys(expected)) {
        if (actual[e]===undefined || expected[e]!=actual[e]  ) return false
    }
    return true
}

module.exports = check