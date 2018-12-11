const prices = {
    "Milk (regular)  (1 liter)": 186,
    "Loaf of Fresh White Bread (500g)": 208,
    "Rice (white)  (1kg)": 367,
    "Eggs (regular) (12)": 220,
    "Local Cheese (1kg)": 1733,
    "Apples (1kg)": 800,
    "Banana (1kg)": 250,
    "Oranges (1kg)": 500,
    "Tomato (1kg)": 800,
    "Potato (1kg)": 400,
    "Onion (1kg)": 300,
    "Lettuce (1 head)": 200,
    "Water (1.5 liter bottle)": 113,
    "Bottle of Wine (Mid-Range)": 1700,
    "Domestic Beer (0.5 liter bottle)": 275,
    "Imported Beer (0.33 liter bottle)": 288,
    "Cigarettes 20 Pack (Marlboro)": 480
};

// Map prices to goods
// let inverted = {};
// for (let key in prices) {
//     inverted[prices[key]] = key;
// }

const evaluateAnswer = function (cost) {
    // Map prices to goods
    let inverted = {};
    for (let key in prices) {
        inverted[prices[key]] = key;
    }
    console.log(inverted);
    let ans = -1;
    let results = [];
    Object.keys(inverted).sort(function(x, y) {
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
            let count = cost/ans;
            let result =  '' + inverted[ans] + ' x ' + count.toFixed(3);
            results.push(result);        
        }
    });
    let str = '';
    let count = 0;
    while (results.length > 0) {
        if (count === 3)
            str = str + '\n\n------ MORE -------';
        str = str + '\n\n' + results.pop();
        count++;
    }
    document.getElementById('results').innerText = str;
}