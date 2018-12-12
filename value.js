const evaluateAnswer = function (cost, area) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            let prices = JSON.parse(this.responseText);
            
            document.getElementById('res-heading').innerText = 'That\'s the same as';
            // Map prices to goods
            let inverted = {};
            for (let key in prices) {
                inverted[prices[key]] = key;
            }
            console.log(inverted);
            let ans = -1;
            let results = [];
            Object.keys(inverted).sort(function (x, y) {
                x = parseInt(x);
                y = parseInt(y);

                if (x < y) {
                    return -1;
                }
                if (x > y) {
                    return 1;
                }

                return 0;
            }).forEach(k => {
                if (k <= cost) {
                    console.log(k);
                    ans = k;
                    let count = cost / ans;
                    let result = '' + inverted[ans] + ' x ' + count.toFixed(3);
                    results.push(result);
                }
            });
            let str = '';
            let count = 0;
            let len = results.length;

            while (results.length > 0) {
                if (count === 3)
                    str = str + '\n\n------ MORE -------';
                str = str + '\n\n' + results.pop();
                count++;
            }

            if (len === 0)
                document.getElementById('res-heading').innerText = 'That\'s the same as nothing I know :\(';
            else
                document.getElementById('results').innerText = str;
        }
    });

    let url = 'http://localhost:3000/data?area=';
    url = url + area;
    xhr.open("GET", url);
    xhr.send(null);
}