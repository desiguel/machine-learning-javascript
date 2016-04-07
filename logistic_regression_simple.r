
# Create input variables.
input1 = c(1,1,1,0,0,0)
input2 = c(1,0,1,0,0,0)
input3 = c(1,1,1,1,1,1)
input4 = c(0,0,0,1,1,1)
input5 = c(0,0,0,1,0,1)
input6 = c(0,0,0,0,0,0)

# Create response variable.
response = c("win","win","win","lose","lose","lose")

# Store data in data.frame (it's like a Excel table).
trainingData = data.frame(input1, input2, input3, input4, input5, input6, response)

# Train model.
classifier = glm(response ~ ., data = trainingData, family = "binomial")

# Unseen data.
input1 = c(1,0,1)
input2 = c(1,0,1)
input3 = c(0,0,1)
input4 = c(0,1,1)
input5 = c(0,1,1)
input6 = c(0,0,0)

newData = data.frame(input1, input2, input3, input4, input5, input6)

newData$predict = predict(classifier, newData, type = "response")
newData$predict

