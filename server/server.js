var express = require('express');
var cors = require('cors');
var fs = require('fs');

var app = express();
app.use(cors());

app.get('/data', function(req, res) {
    let country = req.query['area'];
    let fileName = 'prices_' + country + '.csv';
    var contents = fs.readFileSync(fileName, 'utf8');
    
    let lines = contents.split('\n');
    let prices = {};
    lines.forEach(line => {
        if (line.includes(',')) {
            let split = line.split(',');
            prices[split[0]] = parseFloat(split[1].split(' ')[0]);
        }
    });
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(prices));
});

app.listen(3000, function () {
    console.log('Listening at port 3000');
});