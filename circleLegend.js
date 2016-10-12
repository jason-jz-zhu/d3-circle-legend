var circleLegend = function() {
  "use strict";

  // Internals
  var _r_scale,  // must
      _orient = "right",
      _tick_value_list = null,
      _text_padding = 5,
      _title_name = "";

  function _circleLegend() {
    var legend_line_length = _r_scale(d3.max(_tick_value_list)) * 4/3,
        sign = _orient == "left" ? -1 : 1;
    ///////////////////////
    ///////// circle //////
    ///////////////////////
    var circle = this.append("g").attr("class", "legend_circle")
    // circle selection data join
    circle = circle.selectAll("circle")
            .data(_tick_value_list);
    // circle selection enter
    circle.enter()
            .append("circle")
            .attr("r", function(d) { return _r_scale(d); })
            .attr("cx", 0)
            .attr("cy", function(d) { return -_r_scale(d); })
            .style("stroke-width", 1)
            .style("stroke", "#999")
            .style("stroke-dasharray", "2 2")
            .style("fill", "none");
    ///////////////////////////
    ///////// point line //////
    ///////////////////////////
    var line = this.append("g")
            .selectAll("line")
            .data(_tick_value_list, String);

    line.enter()
            .append("line")
            .attr("class", "legend_line")
            .attr('x1', 0)
            .attr("y1", function(d) { return -2*_r_scale(d); })
            .attr('x2', sign*legend_line_length)
            .attr("y2", function(d) { return -2*_r_scale(d); })
            .style("stroke-width", 1)
            .style("stroke", "#D1D1D1")
            .style("shape-rendering", "crispEdges");

    ///////////////////////////
    ///////// legend text /////
    ///////////////////////////
    var text = this.append("g")
            .selectAll("text")
            .data(_tick_value_list, String);

    text.enter()
            .append("text")
            .attr("class", "legend_text")
            .attr("x", sign*(legend_line_length + _text_padding))
            .attr("y", function(d) { return -2*_r_scale(d); })
            .attr("dy", "0.25em")
            .style("text-anchor", sign == -1 ? "end" : "start")
            .style("fill", "#949494")
            .style("font-size", "9px")
            .text(function(d) { return d  + " $/h"; });
    ///////////////////////////
    ///////// legent title ////
    ///////////////////////////
    this.append("text")
            .attr("class","legend_title")
            .attr("x", 0)
            .attr("y", -_r_scale(d3.max(_tick_value_list))*2.8 )
            .attr("dy", "1em")
            .text(_title_name)
            .style("font", "10px sans-serif")
            .style("text-anchor", "start");
  };

  // APIs
  _circleLegend.rScale = function(_) {
    if (!arguments.length) { return rScale; }
    _r_scale = _;
    return _circleLegend;
  };

  _circleLegend.tickValues = function(_) {
    if (!arguments.length) { return tickValues; }
    _tick_value_list = _;
    return _circleLegend;
  };

  _circleLegend.titleName = function(_) {
    if (!arguments.length) { return titleName; }
    _title_name = _;
    return _circleLegend;
  };

  _circleLegend.textPadding = function(_) {
    if (!arguments.length) { return textPadding; }
    _text_padding = _;
    return _circleLegend;
  };

  _circleLegend.orient = function(_) {
    if (!arguments.length) { return orient; }
    _orient = _;
    return _circleLegend;
  };

  return _circleLegend;
};
