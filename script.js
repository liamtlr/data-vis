// customer journey stuff

var barData = [{value: 20, text: 'Event', date: new Date(2017, 0, 14), event_detail: "checkout view" },
			  {value: 50, text: 'Impression', date: new Date(2017, 0, 17), event_detail: "email sign up" },
			  {value: 85, text: 'Event', date: new Date(2017, 01, 23), event_detail: "item view" },
			  {value: 15, text: 'Event', date: new Date(2017, 03, 14), event_detail: "item view" },
			  {value: 70, text: 'Impression', date: new Date(2017, 04, 2), event_detail: "checkout view" },
			  {value: 20, text: 'Conversion', date: new Date(2017, 04, 3), event_detail: "email sign up"},
			  {value: 245, text: 'Conversion 2', date: new Date(2017, 04, 5), event_detail: "email sign up"}]

var height = 800,
	width = 600,
	radius = 5
	xCoord = 350
	yCoord = 20
	circleOffset = 50,
	rectWidth = 2

var minDate = barData[0].date
var maxDate = barData[barData.length - 1].date

var yScale = d3.scaleBand()
			   .domain(d3.range(0, barData.length))
			   .range([20, height - 20])
			   .paddingInner(.8)

// Below requires that dates are sorted chronologically from DB query

var yDateScale = d3.scaleTime()
    .domain([minDate, maxDate])
    .range([20, height - 20]);



var yScaleRect = d3.scaleLinear()
				   .range([20, height-20])

var toolTip = d3.select('body').append('div')
				.classed('tooltip', true)

d3.select('#chart')
  .append('svg')
  	  .attr('id', 'customer-journey')
	  .attr('width', width)
	  .attr('height', height)
	  .classed('background', true)
	  .selectAll('circle').data(barData)
	  .enter().append('circle')
	  	.classed('event-circle', true)
	  	.attr('cy', function(d,i){
  			return yDateScale(d.date);
  		})
	  	.attr('cx', xCoord)
	  	.attr('r', function(d, i){
	  		if (i === 0 || i === (barData.length - 1)){
	  			return radius * 2;
	  		} else {
	  			return radius;
	  		}
	  	})

d3.select('svg#customer-journey')
   .append('rect')
	   .attr('x', (xCoord - (rectWidth / 2)) )
	   .attr('y', yCoord )
	   .attr('width', rectWidth)
	   .attr('height', function(d,i){
	   	return yScale.step() * (barData.length - 1);
	   })
	   .style('fill', '#C61C6F')

d3.select('svg#customer-journey')
  .selectAll('text#desc').data(barData)
  .enter().append('text')
  	.attr('id', 'desc')
  	.classed('event-desc', true)
  	.text(function(d){
  		return d.text;
  	})
  	.attr('x', xCoord + 25)
  	.attr('y', function(d,i){
  		return yDateScale(d.date) + 5;
  	})
  	.on('mouseover', function(d){
  		toolTip.transition()
  			   .style('opacity', .9)
  			   .style('left', (d3.event.pageX - 35) + 'px')
  			   .style('top', (d3.event.pageY -30) + 'px')
  		toolTip.html(d.event_detail)
  	})
  	.on('mouseout', function(d){
  		toolTip.transition()
  			   .style('opacity', 0)
  	})
  	.on('click', function(d){
  		d3.selectAll('text.event-detail-desc')
  		  .remove()
  		d3.select('svg#event-detail')
  			.append('text')
  			.text(d.event_detail)
  			.classed('event-detail-desc', true)
  			.attr('x', 15)
  			.attr('y', 15)
  	})

d3.select('svg#customer-journey')
  .selectAll('text#date').data(barData)
  .enter().append('text')
  	.attr('id', 'date')
  	.classed('event-desc', true)
  	.text(function(d){
  		return d.date;
  	})
  	.attr('text-anchor', 'end')
  	.attr('x', xCoord -25)
  	.attr('y', function(d,i){
  		return yDateScale(d.date) + 5;
  	})

d3.select('svg#customer-journey').append('svg')
		.attr('id', 'event-detail')
		.attr('width', 150)
		.attr('height', 150)
		.attr('x', width - 160)
		.attr('y', 10)
