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
points = list(c(1,1,"apples"),
              c(1,2,"oranges"),
              c(1,3,"pears"),
              c(2,1,"bananas"),
              c(2,2,"peaches"),
              c(2,3,"watermelon"),
              c(3,1,"rockmelon"),
              c(3,2,"rasberries"),
              c(3,3,"mandarins"),
              c(4,1,"blueberries"),
              c(4,2,"nectarines"),
              c(4,4,"grapes"))

# Generate the data.
df = lapply(points, p)
df = data.frame(do.call("rbind",df))

# Relabel
colnames(df) = c("x","y","class")

# Cut down size of decimals
df$x = round(as.numeric(as.character(df$x)), 3)
df$y = round(as.numeric(as.character(df$y)), 3)

# Plot it!
plot(df$x, df$y, col=df$class)
legend(2,2,unique(df$class),col=1:length(df$class),pch=1)

#write.csv(file="sample-data-complex.csv", x=df)
jsondf = toJSON(df, pretty=TRUE)
writeLines(jsondf,"data-set.json")
