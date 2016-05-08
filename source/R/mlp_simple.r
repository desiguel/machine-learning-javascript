calculationStart = Sys.time()

library(neuralnet)
library(plyr)
library(jsonlite)

# Load data
rawJSON = readChar("data/data-set-large.json", 
                   file.info("data/data-set-large.json")$size)
trainingData = fromJSON(rawJSON)
trainingData$class = as.factor(trainingData$class)

# Create names list of input variables
n = trainingData
n$class = NULL
n = names(n)

# Create vector of response classes
classes = unique(trainingData$class)

# Create dummy variables for the response variable
for(t in classes) {
  trainingData[paste("class",t,sep="_")] = ifelse(trainingData$class==t,1,0)
}
trainingData$class = NULL

# Create input / output structure for neural net input
f = as.formula(paste(paste0(paste(paste("class",classes[!classes %in% "y"],sep="_"), collapse = " + "), " ~ "), 
                     paste(n[!n %in% "y"], collapse = " + ")))

# Calculate the net
nnet.class = neuralnet(f,trainingData, hidden=c(3,3), stepmax=10000, threshold=0.1, algorithm = "rprop+", lifesign="full", lifesign.step=10)

# Unseen data.
weight = c(1,2,3.5)
price = c(3,2,1.5)

newData = data.frame(weight, price)

nnet.results = compute(nnet.class, newData) #Run them through the neural network

newData$predict = mapvalues(apply(nnet.results$net.result, 1, which.max), to = as.character(classes), from = c(1:length(classes)))
newData$predict

calculationTime = Sys.time() - calculationStart
calculationTime