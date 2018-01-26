
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
    console.log("dfff" + params);
    let parametri = "";
    for(let i = 0; i < params.length; i++) {
        parametri += invocationParameters[i] + "=" + invocationParameters[params[i]] + "&";
        console.log("sssss" + invocationParameters[i]);
    }
  
    //Tolgo la & finale.
    parametri = parametri.substring(0, parametri.length-1);
    let page = url + "?" + parametri;

    return fetch(page)
        .then(response => {
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
        .catch(error => {
            console.log(error);
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


module.exports = check;