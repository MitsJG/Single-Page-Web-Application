function Mobile() {
    
    this.firstName = ko.observable("");
    this.lastName = ko.observable("");
    this.address = ko.observable("");
    this.array = ko.observableArray();
    this.array.push('Name');
    this.array.push('Surname');
    this.array.push('Address');
    

	
	
	this.optionValues = ko.observableArray(["","Google Nexus 5","Iphone 6","Samsung Galaxy S5","HTC One M8"]);
	
	this.selectedValues = ko.observable();

	

	
       

}
ko.applyBindings(new Mobile());




var width = 1200,
    height = 400,
    i = -1,
    a = 0,
    b = 0.03,
    n = 2000,
    k = 20; // samples to replace per frame

var randomX = d3.random.normal(width / 2, 80),
    randomY = d3.random.normal(height / 2, 80),
    points = d3.range(n).map(function() { return [randomX(), randomY()]; });

var color = d3.scale.linear()
    .domain([0, 20])
    .range(["white", "steelblue"])
    .interpolate(d3.interpolateLab);

var hexbin = d3.hexbin()
    .size([width, height])
    .radius(20);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var hexagon = svg.append("g")
    .attr("class", "hexagons")
  .selectAll("path")
    .data(hexbin(points))
  .enter().append("path")
    .attr("d", hexbin.hexagon(19.5))
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .style("fill", function(d) { return color(d.length); });

d3.timer(function() {
  a += b;
  randomX = d3.random.normal(width / 2 + 80 * Math.cos(a), 80);
  randomY = d3.random.normal(height / 2 + 80 * Math.sin(a), 80);

  for (var j = 0; j < k; ++j) {
    i = (i + 1) % n;
    points[i][0] = randomX();
    points[i][1] = randomY();
  }

  hexagon = hexagon
      .data(hexbin(points), function(d) { return d.i + "," + d.j; });

  hexagon.exit().remove();

  hexagon.enter().append("path")
      .attr("d", hexbin.hexagon(19.5))
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  hexagon
      .style("fill", function(d) { return color(d.length); });
});

