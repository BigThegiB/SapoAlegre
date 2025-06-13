google.charts.load('current', {'packages':['geochart']});
google.charts.setOnLoadCallback(DesenharMapa);
const TelaZoom = document.getElementById('TelaZoom');
let qntZoom = 1;
let Zoom = false;
let mouseX = 0;
let mouseY = 0;


document.addEventListener('mousemove', (TrackMovimento) => {
  mouseY = TrackMovimento.clientY;
});
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function DesenharMapa() {
var data = google.visualization.arrayToDataTable([
  ['Continente', 'Nome'],
  ['142', 'Ásia'],
  ['150', 'Europa'],
  ['002', 'África'],
  ['019', 'América'],
  ['009', 'Oceania'],
  ['005', 'América do Sul'],
  ['013', 'América Central'],
  ['021', 'América do Norte']
]);

  var options = {
  resolution: 'continents',
  region: 'world',
  };

  var MapDraw = new google.visualization.GeoChart(document.getElementById('Mapa'));
  MapDraw.draw(data, options);
  google.visualization.events.addListener(MapDraw, 'select', ClickUser);

  function ClickUser() {
  var Selecionado = MapDraw.getSelection();
  var ValorSelecionado = data.getValue(Selecionado[0].row, 0);
  switch (ValorSelecionado) {
    case '142':
    Zoom = true;
      options.region = '142';
      MapDraw.draw(data, options);
    
    break;
    case '150':
    Zoom = true;
      options.region = '150';
      MapDraw.draw(data, options);


    break;
    case '002':
    Zoom = true;
      options.region = '002';
      MapDraw.draw(data, options);

    break;
    case '019':
    Zoom = true;
        console.log('Case 019 - Checking condition: mouseY (' + mouseY + ') < 500?'); 
        if (mouseY < window.innerHeight *.6 && mouseY != 0) {
          options.resolution = 'subcontinents';
          options.region = '021'; 
          MapDraw.draw(data, options);
        } else if (mouseY < window.innerHeight *.7 && mouseY != 0) {
          options.resolution = 'subcontinents';
          options.region = '013'; 
          MapDraw.draw(data, options);
        } else if (mouseY != 0) {
          options.resolution = 'subcontinents';
          options.region = '005';
          MapDraw.draw(data, options);
        }
        break;

    break;
    case '009':
    Zoom = true;
      options.region = '009';
      MapDraw.draw(data, options);
    break;
  }
  }}

