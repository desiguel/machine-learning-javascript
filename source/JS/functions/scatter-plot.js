var fs = require("fs");
var d3 = require("d3");
var jsdom = require("jsdom");
var lookup = require("./lookups.js");

/**
 * Creates a x-y scatter plot of the provided data.
 *
 * @param data x-y data in JSON format.
 * @param filename for the saved scatter-plot
 * @param xlab x-axis label
 * @param ylab y-axis label
 */
var scatter = function(data, filename, xlab, ylab) {

    var document = jsdom.jsdom();

    // SVG dimensions
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 700 - margin.left - margin.right,
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

    svg.selectAll("path")
        .data(data)
        .enter().append("path")
        .attr("transform", function(d) {
            return "translate(" + x(d.weight) + "," + y(d.price) + ")";
        })
        .attr("d", d3.svg.symbol().type(function(d) {
                return lookup.pointStyle(d.class);
            })
            .size(function(d) {
                return lookup.pointSize(d.class);
            }))
        .style("fill", function(d) {
            if (d.class != "unknown")
                return color(d.class);
            return "black";})
        .style("stroke", function(d) {
            if (d.class != "unknown")
                return color(d.class);
            return "black";})
        .style("stroke-width", "1.5px");


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

    // Add css stylesheet.
    var svg_style = svg.append("defs")
        .append('style')
        .attr('type','text/css');

    // CSS styling
    var css_text = "<![CDATA[\
        svg {\
            font-family: serif;\
            font-size: 10pt;\
            fill: black;\
            stroke-width='20'\
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
        }\
    ]]>";

    svg_style.text(css_text);

    // Print SVG to file.
    fs.writeFile(filename, d3.select(document.body).html(), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Image saved!");
    });
}

module.exports.scatter = scatter;