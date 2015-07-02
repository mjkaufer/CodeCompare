function setDisabled(){
	var button = $('submit')
	button.disabled = "true"
	button.className = baseButtonClassName + " btn-danger"
	$('wait').style.display = ""
	console.log("Disabled")
}

function setEnabled(){
	var button = $('submit')
	button.disabled = ""
	button.className = baseButtonClassName + " btn-success"
	$('wait').style.display = "none"
	console.log("Enabled")
}

function clear(){
	d3.selectAll("svg > *").remove();
}

function time(){
	if(performance && performance.now())
		return performance.now()
	return Date.now()
}

function dataFromFunctionString(startIter, endIter, funcString){

	// iterate through all functions, collect list of runtimes
	// todo - compatibility for async code
	console.log("")//message to 'warm' up console
	var __runTimes = []
	var __maxTime = -1
	for(var __i = startIter; __i <= endIter; __i++){
		var n = __i;
		var __start = performance.now()
		eval(funcString)
		var __end = performance.now()
		var d = __end - __start
		if(d > __maxTime || __maxTime == -1)
			__maxTime = d
		__runTimes.push({x: __i, y: d})
	}
	return {data: __runTimes, maxTime: __maxTime}

}
var vis = d3.select("#visualisation"),
	WIDTH = 1000,
	HEIGHT = 500,
	MARGINS = {
		top: 50,
		right: 50,
		bottom: 50,
		left: 100
	}

function newChart(startIter, endIter, func1, func2, col0, col1){

	clear()

	col0 = col0 || "blue"
	col1 = col1 || "green"

	var funcData1 = dataFromFunctionString(startIter, endIter, func1)
	var funcData2 = dataFromFunctionString(startIter, endIter, func2)

	var maxY = Math.max(funcData2.maxTime, funcData1.maxTime)


	var xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([startIter,endIter]),
		yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,maxY]),
		xAxis = d3.svg.axis()
			.scale(xScale)
			.tickFormat(d3.format("d")),
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
		.text("Time (ms)")

	var lineGen = d3.svg.line()
		.x(function(d) {
			return xScale(d.x);
		})
		.y(function(d) {
			return yScale(d.y);
		})
		.interpolate("basis");

	document.getElementById('code0').parentNode.children[0].style.color = col0
	document.getElementById('code1').parentNode.children[0].style.color = col1

	vis.append('svg:path')
		.attr('d', lineGen(funcData1.data))
		.attr('stroke', col0)
		.attr('stroke-width', 2)
		.attr('fill', 'none');

	vis.append('svg:path')
		.attr('d', lineGen(funcData2.data))
		.attr('stroke', col1)
		.attr('stroke-width', 2)
		.attr('fill', 'none');
	setEnabled()

	return vis
}


function $(id){
	return document.getElementById(id)
}

function generateChart(){

	var startN = parseInt($('n0').value)
	var endN = parseInt($('n1').value)

	var firstCode = $('code0').value
	var secondCode = $('code1').value

	setDisabled()

	setTimeout(function(){
		newChart(startN, endN, firstCode, secondCode)
	}, 50)
	

}

document.getElementById('submit').onclick = function(e){
	var v = document.getElementById('visualisation')
	v.style.height = HEIGHT
	v.style.width = WIDTH
	e.preventDefault()
	generateChart()
}

var baseButtonClassName = "btn btn-block";
