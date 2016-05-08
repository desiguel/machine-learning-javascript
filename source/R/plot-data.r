library(jsonlite)

# Load data
rawJSON = readChar("data/data-set-large.json", 
                   file.info("data/data-set-large.json")$size)
df = fromJSON(rawJSON)
df$class = as.factor(df$class)

# Plot it!
plot(df$weight, df$price, col=df$class)
par(xpd=TRUE)
legend(4.6,4,unique(df$class),col=1:length(df$class),pch=1)