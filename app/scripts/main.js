console.log('\'Allo \'Allo!');

$("#container1").html("From the scripting world, I bring greetings, if this works why do we need HMR ?");

$(function () {
    $('#container').highcharts({

        title: {
            text: 'Logarithmic axis demo'
        },

        xAxis: {
            tickInterval: 1
        },

        yAxis: {
            type: 'logarithmic',
            minorTickInterval: 0.1
        },

        tooltip: {
            headerFormat: '<b>{series.name}</b><br />',
            pointFormat: 'x = {point.x}, y = {point.y}'
        },

        series: [{
            data: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
            pointStart: 1
        }]
    });
});