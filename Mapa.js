google.charts.load("current", { packages: ["geochart"] });
google.charts.setOnLoadCallback(DesenharMapa);
const TelaZoom = document.getElementById("TelaZoom");
let qntZoom = 1;
let Zoom = false;
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (TrackMovimento) => {
  mouseY = TrackMovimento.clientY;
});
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function DesenharMapa() {
  var data = google.visualization.arrayToDataTable([
    ["Continente", "Nome"],
    ["142", "Ásia"],
    ["150", "Europa"],
    ["002", "África"],
    ["019", "América"],
    ["009", "Oceania"],
    ["005", "América do Sul"],
    ["013", "América Central"],
    ["021", "América do Norte"],
  ]);

  var options = {
    resolution: "continents",
    region: "world",
  };

  var MapDraw = new google.visualization.GeoChart(document.getElementById("Mapa"));
  MapDraw.draw(data, options);
  google.visualization.events.addListener(MapDraw, "select", ClickUser);

  function ZoomMapa(XPorcentagem, YPorcentagem, qntZoom, resolucao, continenteID) { // Função para zoom, X e Y Porcentagem são pra onde o zoom vai, qntZoom é quanto zoom vai dar, resolucao é pra falar se são continentes ou subcontinentes, continenteID é o ID do continente que vai ser selecionado
    Zoom = true;
    let X = window.innerWidth * XPorcentagem; 
    let Y = window.innerHeight * YPorcentagem;

    let MeioTelaX = window.innerWidth / 2;
    let MeioTelaY = window.innerHeight / 2;
    let TranslateX = MeioTelaX - X;
    let TranslateY = MeioTelaY - Y;
    TelaZoom.style.setProperty("--quantidadeZoom", qntZoom);
    TelaZoom.style.setProperty("--origemX", `${X}px`);
    TelaZoom.style.setProperty("--origemY", `${Y}px`);
    TelaZoom.style.setProperty("--posicaoX", `${TranslateX}px`);
    TelaZoom.style.setProperty("--posicaoY", `${TranslateY}px`);

    TelaZoom.classList.add("active");
    sleep(300).then(() => {
      TelaZoom.classList.remove("active");
      options.resolution = resolucao;
      options.region = continenteID;
      MapDraw.draw(data, options);
      console.log(options.region);
    });
  }

  function ClickUser() { // Lida com o click do usuario em cada continente
    var Selecionado = MapDraw.getSelection();
    var ValorSelecionado = data.getValue(Selecionado[0].row, 0);
    switch (ValorSelecionado) {
      case "142": // Ásia
        ZoomMapa(0.6, 0.53, 3, "continents", "142");
        break;
      case "150": // Europa
        ZoomMapa(0.52, 0.49, 4, "continents", "150");

        break;
      case "002": // África
        ZoomMapa(0.55, 0.67, 3, "continents", "002");
        break;
      case "019": // Américas
        if (mouseY < window.innerHeight * 0.6) { // Check America do Norte
          ZoomMapa(0.35, 0.4, 2, "subcontinents", "021");
        } else if (mouseY < window.innerHeight * 0.7) {   // Check da America Central
          ZoomMapa(0.38, 0.6, 2.5, "subcontinents", "013");
        } else { // Check da America do Sul
          ZoomMapa(0.4, 0.7, 3, "subcontinents", "005");
        }
        break;
      case "009":// Oceania
        ZoomMapa(0.7, 0.68, 3, "continents", "009");
        break;
    }
  }
}

// Para voltar: options.resolution = 'continents'   options.region = 'world';
// Adicionar: Botão de voltar (talvez um X no texto)
// Adicionar: Caixa de texto sobre os sapos
// Adicionar: Header
// Notas: Pra mudar o zoom, só mudar XPorcentagem e YPorcentagem, e a quantidade de zoom