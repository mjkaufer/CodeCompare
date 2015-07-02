var n = 100;

var data = [{
	"sale": "0",
	"year": "0"
}, {
	"sale": "10",
	"year": "01"
}, {
	"sale": "20",
	"year": "02"
}, {
	"sale": "30",
	"year": "03"
}, {
	"sale": "40",
	"year": "03"
}, {
	"sale": "50",
	"year": "10"
}];

var data2 = [{
	"sale": "10",
	"year": "0"
}, {
	"sale": "20",
	"year": "01"
}, {
	"sale": "30",
	"year": "02"
}, {
	"sale": "30",
	"year": "03"
}, {
	"sale": "40",
	"year": "03"
}, {
	"sale": "50",
	"year": "10"
}];

function clear(){
	d3.selectAll("svg > *").remove();
}

function newData(points, maxY){
	return d3.range(points).map(function(item,index){
		return { x:index, y:Math.random() * (maxY || 10) };
	});
}


function newChart(maxX, maxY){
	clear()
	var vis = d3.select("#visualisation"),
		WIDTH = 1000,
		HEIGHT = 500,
		MARGINS = {
			top: 50,
			right: 50,
			bottom: 50,
			left: 100
		},
		xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0,maxX]),
		yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,maxY]),
		xAxis = d3.svg.axis()
			.scale(xScale),
		yAxis = d3.svg.axis()
			.scale(yScale)
			.orient("left");

	vis.append("svg:g")
		.attr("class","axis")
		.attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
		.call(xAxis);

	vis.append("svg:g")
		.attr("class","axis")
		.attr("transform", "translate(" + (MARGINS.left) + ",0)")
		.call(yAxis);

	vis.append("text")
		.attr("transform", "translate(" + WIDTH / 2 + "," + HEIGHT + ")")
		.style("text-anchor", "middle")
		.text("Iteration")

	vis.append("text")
		.attr("transform", "translate(" + MARGINS.left / 2 + "," + HEIGHT / 2 + ") rotate(-90)")
		.style("text-anchor", "middle")
		.text("Time")

	var lineGen = d3.svg.line()
		.x(function(d) {
			return xScale(d.x);
		})
		.y(function(d) {
			return yScale(d.y);
		})
		.interpolate("basis");


	vis.append('svg:path')
		.attr('d', lineGen(newData(maxX, maxY)))
		.attr('stroke', 'blue')
		.attr('stroke-width', 2)
		.attr('fill', 'none');

	vis.append('svg:path')
		.attr('d', lineGen(newData(maxX, maxY)))
		.attr('stroke', 'green')
		.attr('stroke-width', 2)
		.attr('fill', 'none');

	return vis
}

newChart(50, 50)
