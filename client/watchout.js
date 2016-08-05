var svg = d3.select('svg');
var width = +svg.attr('width');
var height = +svg.attr('height');
var data = [];
for (var i = 0; i < 10; i++) {
  data.push(i);
}

var circles = svg.selectAll('circle')
    .data(data);

circles.exit().remove();

circles.enter().append('circle')
    .attr('r', 10)
    .style('background-color', 'black')
    .transition()
    .attr('cx', () => Math.random() * 760 + 10)
    .attr('cy', () => Math.random() * 480 + 10);

var update = (data) => {

  var circles = svg.selectAll('circle')
      .transition()
      .duration(1000)
      .attr('cx', () => Math.random() * 760 + 10)
      .attr('cy', () => Math.random() * 480 + 10);
};

d3.interval(function() {
  update(data);
}, 1000);
