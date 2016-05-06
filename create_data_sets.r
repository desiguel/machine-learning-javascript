library(jsonlite)

jitterpoints = 40
jittersd = 0.40

# Function to generate random points.
p = function(point){
  w = matrix(cbind(rnorm(n = jitterpoints, mean = as.numeric(point[1]), sd = jittersd), 
                   rnorm(n = jitterpoints, mean = as.numeric(point[2]), sd = jittersd),
                   point[3]), ncol=3)
  return(w)
}

# Points required.
points = list(c(1,3,"pears"),
              c(4,1,"blueberries"))

# Generate the data.
df = lapply(points, p)
df = data.frame(do.call("rbind",df))

# Relabel
colnames(df) = c("weight","price","class")

# Cut down size of decimals
df$weight = round(as.numeric(as.character(df$weight)), 3)
df$price = round(as.numeric(as.character(df$price)), 3)

# Plot it!
plot(df$weight, df$price, col=df$class)
legend(2,2,unique(df$class),col=1:length(df$class),pch=1)

#write.csv(file="sample-data-complex.csv", x=df)
jsondf = toJSON(df, pretty=TRUE)
writeLines(jsondf,"data-set.json")
