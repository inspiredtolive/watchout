var svg = d3.select('svg');
var width = +svg.attr('width');
var height = +svg.attr('height');
var data = [];
for (var i = 0; i < 10; i++) {
  data.push('enemy');
}
data.push('player');

// add data to circles
var circles = svg.selectAll('circle')
    .data(data);

// add cirles to the dom as <circle>
circles.enter().append('circle')
    .attr('r', (d) => {
      if (d === 'enemy') { return 15; }
      return 10;
    })
    .style('background-color', 'black')
    .style('fill', (d) => {
      if (d === 'enemy') { return 'url(#image)'; }
    })
    .attr('class', (d) => d)
    .attr('cx', () => Math.random() * 750 + 15)
    .attr('cy', () => Math.random() * 470 + 15);

// update enemy's position to random location
var update = () => {
  svg.selectAll('.enemy')
      .transition()
      .duration(1000)
      .attr('cx', () => Math.random() * 750 + 15)
      .attr('cy', () => Math.random() * 470 + 15);
};

// update player's position to cursor
svg.on('mousemove', (e) => {
  var player = svg.select('.player')
      .attr('cx', d3.event.offsetX)
      .attr('cy', d3.event.offsetY);
});

update();
d3.interval(function() {
  update();
}, 1000);
