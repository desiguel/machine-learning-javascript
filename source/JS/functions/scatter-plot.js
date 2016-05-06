var d3 = require("d3");
var jsdom = require("jsdom");

/**
 * Creates a x-y scatter plot of the provided data.
 *
 * @param data x-y data in JSON format.
 * @param filename for the saved scatter-plot
 * @param xlab x-axis label
 * @param ylab y-axis label
 */
function scatterPlot(data, filename, xlab, ylab) {

    var document = jsdom.jsdom();

    // SVG dimensions
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var svg = d3.select(document.body).append("svg")
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // TODO convert attributes to keys picked from JSON
    data.forEach(function(d) {
        d.price = +d.price;
        d.weight = +d.weight;
    });

    x.domain(d3.extent(data, function(d) { return d.weight; })).nice();
    y.domain(d3.extent(data, function(d) { return d.price; })).nice();

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text(xlab);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(ylab);

    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.weight); })
        .attr("cy", function(d) { return y(d.price); })
        .style("fill", function(d) { return color(d.class); });

    var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

    //add css stylesheet
    var svg_style = svg.append("defs")
        .append('style')
        .attr('type','text/css');

    //text of the CSS stylesheet below -- note the multi-line JS requires
    //escape characters "\" at the end of each line
    var css_text = "body {\
    font: 10px sans-serif;\
    }\
    \
    .axis path,\
    .axis line {\
        fill: none;\
        stroke: #000;\
        shape-rendering: crispEdges;\
    }\
    \
    .dot {\
        stroke: #000;\
    }";

    svg_style.text(css_text);

    // Print SVG to file.
    fs.writeFile(filename, d3.select('body').html(), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Image saved!");
    });
}