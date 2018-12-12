var count = 0;
const evaluateAnswer = function (cost, area) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            let prices = JSON.parse(this.responseText);
            document.getElementById('res-heading').innerText = 'For ' + cost + ' you can get';
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
            let len = results.length;
            // let table = document.getElementById('resTable');
            // table.innerHTML = "";
            // while (results.length > 0) {
            //     // Table Method
            //     // let row = table.insertRow(0);
            //     // let cell1 = row.insertCell(0);
            //     // let cell2 = row.insertCell(1);

            //     // str = results.pop();
            //     // cell1.innerText = str.split('x')[0];
            //     // cell2.innerText = str.split('x')[1];
            // }

            // Span Method
            let resDisplayArea = document.getElementById('resDispArea');
            resDisplayArea.innerHTML = results[count];

            document.getElementById('prev').onclick = function() {
                if (count === 0)
                    count = results.length - 1;
                else 
                    count = count - 1;
                resDisplayArea.innerText = results[count];
            };

            document.getElementById('nex').onclick = function() {
                count = (count + 1) % (results.length);
                resDisplayArea.innerText = results[count];
            };

            if (len === 0)
                document.getElementById('res-heading').innerText = cost + ' is the same as nothing I know :\(';
            // else
                // document.getElementById('results').innerText = str;
            let hRow = table.insertRow(0);
            let hCell = document.createElement('TH');
            hCell.innerHTML = 'What';
            hRow.appendChild(hCell);
            hCell = document.createElement('TH');
            hCell.innerHTML = 'How many';
            hRow.appendChild(hCell);
        }
    });

    let url = 'https://worthit-convert.herokuapp.com/data?area=';
    url = url + area;
    xhr.open("GET", url);
    xhr.send(null);
}