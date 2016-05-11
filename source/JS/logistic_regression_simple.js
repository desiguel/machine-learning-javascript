/**
 * Basic logistic regression example.
 * Created by @desiguel.
 */

var calculationStart = Date.now();

// Required packages
var ml = require('machine_learning');

// User defined functions
var lookup = require("./functions/lookups.js");
var plot = require("./functions/scatter-plot.js");

// Load training data from file.
var dataSet = require('../../data/data-set-large.json');

// Get class/category names.
var classNames = lookup.classNames(dataSet);

// Process JSON into an array.
var weight = [];
var price = [];

for (var item, i = 0; item = dataSet[i++];) {
    weight.push([item.weight, item.price]);
    price.push(lookup.responseMap(item.class, classNames))
}

// Run model.
var classifier = new ml.LogisticRegression({
    'input' : weight,
    'label' : price,
    'n_in' : 2,
    'n_out' : classNames.length
});

classifier.set('log level',1); // 0 : nothing, 1 : info, 2 : warning.

var training_steps = 800, lr = 0.5;

classifier.train({
    'lr' : lr,
    'epochs' : training_steps
});

// Define new points.
var newInputs = [[1, 3],
     [2, 2],
     [3.5, 1.5]];

var newResponse = [];

// Predict results for new points.
var prediction = classifier.predict(newInputs);

// Process results into usable information.
prediction.forEach(function(responseArray) {

    var maxResponse = Math.max.apply(Math, responseArray);
    var responseIndex = responseArray.indexOf(maxResponse);
    newResponse.push(classNames[responseIndex])

});

console.log("Result : ", newResponse);
console.log("Time elapsed : ", (Date.now() - calculationStart) / 1000);

// Plot the original dataset.
// plot.scatter(dataSet, "./scatterplot1.svg", "Weight (kg)", "Price($)");


