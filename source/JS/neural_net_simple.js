
// Required functions
var fs = require("fs");
var vm = require('vm');
vm.runInThisContext(fs.readFileSync(__dirname + "/functions/lookups.js"));

// Load ML library.
var ml = require('machine_learning');

// Load data from file.
var dataSet = require('../../data/data-set-large.json');

// Get class names.
var classNames = getClassNames(dataSet);

// Process JSON into an array.
var weight = [];
var price = [];

for (var item, i = 0; item = dataSet[i++];) {
    weight.push([item.weight, item.price]);
    price.push(getResponse(item.class, classNames))
}

var mlp = new ml.MLP({
    'input' : weight,
    'label' : price,
    'n_ins' : 2,
    'n_outs' : classNames.length,
    'hidden_layer_sizes' : [3,3]
});

mlp.set('log level',1); // 0 : nothing, 1 : info, 2 : warning.

mlp.train({
    'lr' : 0.6,
    'epochs' : 20000
});

// New points.
var newInputs = [[1, 3],
    [2, 2],
    [3.5, 1.5]];

var newResponse = [];

// Predict results for points
var prediction = mlp.predict(newInputs);

console.log(prediction);

// Process results into usable information.
prediction.forEach(function(responseArray) {

    var maxResponse = Math.max.apply(Math, responseArray);
    var responseIndex = responseArray.indexOf(maxResponse);
    newResponse.push(classNames[responseIndex])

});

console.log("Result : ", newResponse);

