/**
 * Basic logistic regression example.
 * Original from: 
 * Modified by @desiguel.
 */

var ml = require('machine_learning');
var x = [[1,1,1,0,0,0],
         [1,0,1,0,0,0],
         [1,1,1,0,0,0],
         [0,0,1,1,1,0],
         [0,0,1,1,0,0],
         [0,0,1,1,1,0]];

// Response variable setup as dummy variables.
var y = [[1, 0],
         [1, 0],
         [1, 0],
         [0, 1],
         [0, 1],
         [0, 1]];

var classifier = new ml.LogisticRegression({
    'input' : x,
    'label' : y,
    'n_in' : 6,
    'n_out' : 2
});

classifier.set('log level',1);

var training_epochs = 800, lr = 0.5;

classifier.train({
    'lr' : lr,
    'epochs' : training_epochs
});

x = [[1, 1, 0, 0, 0, 0],
     [0, 0, 0, 1, 1, 0],
     [1, 1, 1, 1, 1, 0]];

console.log("Result : ",classifier.predict(x));