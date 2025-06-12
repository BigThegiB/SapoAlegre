google.charts.load('current', {'packages':['geochart']});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
var data = google.visualization.arrayToDataTable([
    ['Continente', 'Nome'],
    ['142', 'Ásia'],
    ['150', 'Europa'],
    ['002', 'África'],
    ['019', 'América'], 
    ['009', 'Oceania']
]);

  var options = {
    resolution: 'continents',
  };

  var MapDraw = new google.visualization.GeoChart(document.getElementById('Mapa'));
  MapDraw.draw(data, options);
  google.visualization.events.addListener(MapDraw, 'select', ClickUser);
}