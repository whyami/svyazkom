var initialEndTime = new Date(),
  initialStartTime = new Date(initialEndTime.getTime() - 5000 * 60),
  initialStartTimeInSeconds = Math.floor(initialStartTime.getTime() / 1000),
  initialEndTimeInSeconds = Math.floor(initialEndTime.getTime() / 1000),
  i = initialStartTimeInSeconds,
  sin = [];
  cos = [];

for (i; i<initialEndTimeInSeconds; i++) {
  sin.push([i, Math.sin(i)]);
  cos.push([i, Math.cos(i)]);
}

var chart = Highcharts.chart('chart1', {
  title: {text: ''},
  subtitle: {text: ''},
  yAxis: {
    title: {
      text: ''
    }
  },
  plotOptions: {
    series: {
      dataLabels: {
        enabled: false
      }
    }
  },
  series: [
    {
      name: 'sin',
      data: sin
    },
    {
      name: 'cos',
      data: cos
    }
  ]
});

document.getElementById('realtime').addEventListener('click', function(e) {
  if (e.target.getAttribute('disabled')) return;

  e.target.setAttribute('disabled', true);

  var endTimeInSeconds = Math.floor(new Date().getTime() / 1000),
    i = initialEndTimeInSeconds;

  for (i; i<endTimeInSeconds; i++) {
    addPointToChart(i);
  }

  setTimeout(updateChart, 1000, i);
});

function updateChart(i) {
  addPointToChart(i);

  setTimeout(updateChart, 1000, i+1);
}

function addPointToChart(i) {
  chart.series[0].addPoint([i, Math.sin(i)], false, true);
  chart.series[1].addPoint([i, Math.cos(i)], true, true);
}

