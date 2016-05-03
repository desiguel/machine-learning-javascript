
// Required functions
var fs = require("fs");
var vm = require('vm');
vm.runInThisContext(fs.readFileSync(__dirname + "/functions/lookups.js"));

// Load ML library.
var ml = require('machine_learning');

// Load data from file.
var dataSet = require('./data-set.json');

// Get class names.
var classNames = getClassNames(dataSet);

// Process JSON into an array.
var x = [];
var y = [];

for (var item, i = 0; item = dataSet[i++];) {
    x.push([item.x, item.y]);
    y.push(getResponse(item.class, classNames))
}

var mlp = new ml.MLP({
    'input' : x,
    'label' : y,
    'n_ins' : 2,
    'n_outs' : classNames.length,
    'hidden_layer_sizes' : [4,4,5]
});

mlp.set('log level',1); // 0 : nothing, 1 : info, 2 : warning.

mlp.train({
    'lr' : 0.6,
    'epochs' : 20000
});

// New points.
var newX = [[1, 3],
    [2, 2],
    [4, 3]];

var newY = [];

// Predict results for points
var prediction = mlp.predict(newX);

// Process results into useable information
prediction.forEach(function(responseArray) {

    var maxResponse = Math.max.apply(Math, responseArray);
    var responseIndex = responseArray.indexOf(maxResponse);
    newY.push(classNames[responseIndex])

});

console.log("Result : ", newY);

