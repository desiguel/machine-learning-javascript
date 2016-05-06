library(jsonlite)
library(nnet)

# Load data
rawJSON = readChar("../../data/data-set-small.json", 
                   file.info("../../data/data-set-small.json")$size)
trainingData = fromJSON(rawJSON)
trainingData$class = as.factor(trainingData$class)

# Train model.
classifier = multinom(class ~ ., data = trainingData)

# Unseen data.
weight = c(1,2,4)
price = c(3,2,1)

newData = data.frame(weight, price)

newData$predict = predict(classifier, newData)
newData$predict
