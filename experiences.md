# The problem.

The machine learning tool I work with (R) is great for analysis and 
prototyping but shite for web based consumption. Like Excel :)

# The solution.

Find a way to construct and display results from machine learning problems using a web based platform using minimal time and effort. 

# First up.. a quick primer:

<!-- insert machine learning definition here -->

# Web publishing options available:

Shiny... the R publishing platform/language. This put me off:

"Shiny helps you turn your analyses into interactive web applications without requiring HTML, CSS, or JavaScript knowledge."

Sounds like DreamWeaver. Meh.

NodeJS



Steps:

Choose packages:

Server: NodeJS
Why: Easily available and installable packages.

# Time to go shopping for machine Learning packages:

List inclusion pre-requisite: Basic README on NPM.

ml-js

A little under-developed. No updates for 2 years.
Probs hard to get running in Windows environment (need cmake).
Not many techniques.

ml

Recently updated 5 months ago.
Reasonable technique spread.
Worked on by at least 2 people (who also put together a matrix library).

nodelearner

Only includes a decision tree algorithm.
Requires ES6.

shaman

Only provides very basic techniques.
Recently updated 2 months ago.

intelligence

Only provides genetic algorithm based techniques.
No updates for 2 years.

node-ml

Decent technique spread.
Not updated for 2 years.

machine_learning

Good technique spread
Not updated for 2 years.
Nice examples in README.

scikit-learn node.js wrapper

Steep learning curve.
Probably good if you're familiar with scikit (I'm not).

machinejs

Very automated (too much in my opinion).
Provides an automated front-end to scikit.
Very recently updated.

r-script

Pass data from node to R.
Probably good if you're familiar with R (I am).
Very recently updated.

Useful utilities

data-formatter


Decided on machine_learning

# Technique implementation.

# Benchmarking

Node
R-script
R

# Visualizations

# Future work

Implementation of webworker-threads (multi-core node processing)


# Conclusions

Nodes is usable for basic ML activities. For anything custom you'll have to write your own library.


# Examples

http://playground.tensorflow.org/#activation=tanh&batchSize=10&dataset=circle&regDataset=reg-plane&learningRate=0.03&regularizationRate=0&noise=0&networkShape=4,2&seed=0.31981&showTestData=false&discretize=false&percTrainData=50&x=true&y=true&xTimesY=false&xSquared=false&ySquared=false&cosX=false&sinX=false&cosY=false&sinY=false&collectStats=false&problem=classification


Included Node packages
d3
machine_learning
jsdom

# Other comments

machine_learning package hasn't been optimised for speed. E.g. no need for percentage completion output to console.

