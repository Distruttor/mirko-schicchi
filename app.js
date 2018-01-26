
const express = require('express'),
    bodyParser = require('body-parser');

const app = express();
const checker = require('./checker');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));




// a useless function that returns a fixed object. you can use it, if you want, for testing purposes
app.get('/count',function (req, res) {
    res.json({count: 3})
})

app.post('/check', (req, res) => {
    const url = req.body.url;
    const invocationParameters = req.body.invocationParameters;
    const expectedResultData = req.body.expectedResultData;
    const expectedResultStatus = req.body.expectedResultStatus;


    checker(url,invocationParameters,expectedResultData,expectedResultStatus)
    .then(risultato => {
        console.log("sdsf" + risultato);
        res.json(risultato);
    })   
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
