var circleLegend = function() {
  "use strict";

  // Internals
  var rScale,
      orient = "right",
      tickValues = null,
      textPadding = 5,
      titleName = "";

  function _circleLegend() {
    var legendLineLength = rScale(d3.max(tickValues)) * 4/3,
        sign = orient == "left" ? -1 : 1;
    ///////////////////////
    ///////// circle //////
    ///////////////////////
    var circle = this.append("g").attr("class", "legendCircle")
    // circle selection data join
    circle = circle.selectAll("circle")
            .data(tickValues);
    // circle selection enter
    circle.enter()
            .append("circle")
            .attr("r", function(d) { return rScale(d); })
            .attr("cx", 0)
            .attr("cy", function(d) { return -rScale(d); })
            .style("stroke-width", 1)
            .style("stroke", "#999")
            .style("stroke-dasharray", "2 2")
            .style("fill", "none");
    ///////////////////////////
    ///////// point line //////
    ///////////////////////////
    var line = this.append("g")
            .selectAll("line")
            .data(tickValues, String);

    line.enter()
            .append("line")
            .attr("class", "legendLine")
            .attr('x1', 0)
            .attr("y1", function(d) { return -2*rScale(d); })
            .attr('x2', sign*legendLineLength)
            .attr("y2", function(d) { return -2*rScale(d); })
            .style("stroke-width", 1)
            .style("stroke", "#D1D1D1")
            .style("shape-rendering", "crispEdges");

    ///////////////////////////
    ///////// legend text /////
    ///////////////////////////
    var text = this.append("g")
            .selectAll("text")
            .data(tickValues, String);

    text.enter()
            .append("text")
            .attr("class", "legendText")
            .attr("x", sign*(legendLineLength + textPadding))
            .attr("y", function(d) { return -2*scale(d); })
            .attr("dy", "0.25em")
            .style("text-anchor", sign == -1 ? "end" : "start")
            .style("fill", "#949494")
            .style("font-size", "9px")
            .text(function(d) { return d  + " $/h"; });
    ///////////////////////////
    ///////// legent title ////
    ///////////////////////////
    this.append("text")
            .attr("class","legendTitle")
            .attr("x", 0)
            .attr("y", -rScale(d3.max(tickValues))*2.8 )
            .attr("dy", "1em")
            .text(titleName)
            .style("font", "10px sans-serif")
            .style("text-anchor", "start");
  };

  // APIs
  _circleLegend.rScale = function(_) {
    if (!arguments.length) { return rScale; }
    rScale = _;
    return _circleLegend;
  };

  _circleLegend.tickValues = function(_) {
    if (!arguments.length) { return tickValues; }
    tickValues = _;
    return _circleLegend;
  };

  _circleLegend.titleName = function(_) {
    if (!arguments.length) { return titleName; }
    titleName = _;
    return _circleLegend;
  };

  _circleLegend.textPadding = function(_) {
    if (!arguments.length) { return textPadding; }
    textPadding = _;
    return _circleLegend;
  };

  _circleLegend.orient = function(_) {
    if (!arguments.length) { return orient; }
    orient = _;
    return _circleLegend;
  };

  return _circleLegend;
};
