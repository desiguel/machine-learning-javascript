/**
 * Basic logistic regression example.
 * Original from: 
 * Modified by @desiguel.
 */

// Required functions

// Get list of unique class names
function getClassNames(items) {
    var lookup = {};
    var result = [];

    for (var item, i = 0; item = items[i++];) {
        var name = item.class;

        if (!(name in lookup)) {
            lookup[name] = 1;
            result.push(name);
        }
    }
    return result;
}

// Get response.
function getResponse(responseClass, classNames) {
    var response = [];
    classNames.forEach(function(className) {
        if (responseClass == className) {
            response.push(1);
        } else {
            response.push(0);
        }
    });
    return response;
}

// Load library.
var ml = require('machine_learning');

// Load data from file
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

// Run model.
var classifier = new ml.LogisticRegression({
    'input' : x,
    'label' : y,
    'n_in' : 2,
    'n_out' : classNames.length
});

classifier.set('log level',1);

var training_epochs = 800, lr = 0.5;

classifier.train({
    'lr' : lr,
    'epochs' : training_epochs
});

// New points.
var newX = [[1, 3],
     [2, 2],
     [4, 3]];

var newY = [];

// Predict results for points
var prediction = classifier.predict(newX);

// Process results into useable information
prediction.forEach(function(responseArray) {

    var maxResponse = Math.max.apply(Math, responseArray);
    var responseIndex = responseArray.indexOf(maxResponse);
    newY.push(classNames[responseIndex])

});

console.log("Result : ", newY);




