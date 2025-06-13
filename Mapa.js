google.charts.load('current', {'packages':['geochart']});
google.charts.setOnLoadCallback(DesenharMapa);
const TelaZoom = document.getElementById('TelaZoom');
var qntZoom = 1;
let Zoom = false;

function sleep (time) { // Eu precisava de um sleep :)
  return new Promise((resolve) => setTimeout(resolve, time));
}

function DesenharMapa() {
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
        break;
      case '150':
        Zoom = true;
        const XPorcentagem = 0.50; 
        const YPorcentagem = 0.50;
        qntZoom = 4;
        const X = window.innerWidth * XPorcentagem;
        const Y = window.innerHeight * YPorcentagem;

        const MeioTelaX = window.innerWidth / 2;
        const MeioTelaY = window.innerHeight / 2;
        const TranslateX = MeioTelaX - X;
        const TranslateY = MeioTelaY - Y;
        TelaZoom.style.setProperty('--quantidadeZoom', qntZoom);
        TelaZoom.style.setProperty('--origemX', `${X}px`);
        TelaZoom.style.setProperty('--origemY', `${Y}px`);
        TelaZoom.style.setProperty('--posicaoX', `${TranslateX}px`);
        TelaZoom.style.setProperty('--posicaoY', `${TranslateY}px`);

        TelaZoom.classList.add('active');
        sleep(700).then(() => {
          TelaZoom.classList.remove('active');
          options.region = '150';
          MapDraw.draw(data, options);
        });

        break;
      case '002':
        break;
      case '019':
        break;
      case '009':
        break;
    }
  }}
//X: 686, Y: 261