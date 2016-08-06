var svg = d3.select('svg');
var data = [];
var highScore = 0;
var currentScore = 0;
var collisions = 0;
var delay = 0;

for (var i = 0; i < 10; i++) {
  data.push('enemy');
}
data.push('player');

// add data to circles
var circles = svg.selectAll('circle')
    .data(data);

// add cirles to the dom as <circle>
circles.enter().append('circle')
    .attr('r', 15)
    .style('fill', (d) => {
      if (d === 'enemy') { 
        return 'url(#image)';
      }
      return 'orange';
    })
    .attr('class', (d) => d)
    .attr('cx', () => Math.random() * 750 + 15)
    .attr('cy', () => Math.random() * 470 + 15);

var enemies = svg.selectAll('.enemy');
var player = svg.select('.player');
// update enemy's position to random location
var update = () => {
  enemies.transition()
      .duration(1000)
      .attr('cx', () => Math.random() * 750 + 15)
      .attr('cy', () => Math.random() * 470 + 15)
      .on('end', update);
};

// update player's position to cursor
svg.on('mousemove', () => {
  var xOffset = d3.event.offsetX;
  var yOffset = d3.event.offsetY;
  if ( xOffset < 15) {
    xOffset = 15;
  }
  if ( yOffset < 15) {
    yOffset = 15;
  }
  if ( xOffset > 785) {
    xOffset = 785;
  }
  if ( yOffset > 485) {
    yOffset = 485;
  }
  player.attr('cx', xOffset)
      .attr('cy', yOffset);
});
var checkCollision = function () {
  svg.style('background-color', '#eee');
  delay = 0;
  var collided = false;


  enemies.each(function () { 
    var thisEnemy = d3.select(this);
    var xDiff = thisEnemy.attr('cx') - player.attr('cx');
    var yDiff = thisEnemy.attr('cy') - player.attr('cy');
    var dist = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    if (dist <= 30) {
      collided = true;
    }
  });


  if (collided) {
    player.transition()
      .duration(200)
      .attr('opacity', 0.3)
      .transition()
      .duration(200)
      .attr('opacity', 1)
      .transition()
      .duration(200)
      .attr('opacity', 0.3)
      .transition()
      .duration(200)
      .attr('opacity', 1);

    delay = 800;
    svg.style('background-color', 'red');
    if (highScore < currentScore) {
      highScore = currentScore;
      d3.select('.highscore span').text(highScore);
    }
    collisions++;
    d3.select('.collisions span').text(collisions);
    currentScore = 0;
    d3.select('.current span').text(currentScore);
    collided = false;
  }
  d3.timeout(checkCollision, 10 + delay);
};

d3.timeout(checkCollision, 10 + delay);

update();
d3.interval(function() {
  currentScore += 1;
  d3.select('.current span').text(currentScore);
}, 500);