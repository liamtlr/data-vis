var myStyles = ['#268BD2', '#BD3613']

d3.selectAll('.item')
  .data(myStyles)
  .style({
    'color': 'white',
    'background': function(d){
      return d;
    }
  })
