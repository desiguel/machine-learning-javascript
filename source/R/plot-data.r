library(jsonlite)

# Load data
rawJSON = readChar("data/data-set-small.json", 
                   file.info("data/data-set-small.json")$size)
df = fromJSON(rawJSON)
df$class = as.factor(df$class)

# Plot it!
plot(df$weight, df$price, col=df$class)
legend(3,4,unique(df$class),col=1:length(df$class),pch=1)