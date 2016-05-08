calculationStart = Sys.time()

library(jsonlite)
library(nnet)

# Load data
rawJSON = readChar("data/data-set-large.json", 
                   file.info("data/data-set-large.json")$size)
trainingData = fromJSON(rawJSON)
trainingData$class = as.factor(trainingData$class)

# Train model.
classifier = multinom(class ~ ., data = trainingData)

# Unseen data.
weight = c(1,2,3.5)
price = c(3,2,1.5)

newData = data.frame(weight, price)

newData$predict = predict(classifier, newData)
newData$predict

calculationTime = Sys.time() - calculationStart
calculationTime