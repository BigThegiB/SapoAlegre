document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('Mapa', {
        'worldCopyJump': true
    })

    const infoBox = document.getElementById('caixa-info');
    map.setView([0, 0], 2)
    const originalView = { lat: 0, lng: 0, zoom: 2 };

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.control.resetView({
        position: "topleft",
        title: "Reiniciar visão",
        latlng: L.latLng([0, 0]),
        zoom: 2,
    }).addTo(map);

    async function carregarDadosSapo(index) {
        const arquivos = ['Nome_cientifico.txt', 'Familia.txt', 'Endemica.txt', 'Habitat.txt', 'Ameacas.txt', 'Mais.txt'];
        const categorias = ['Nome Científico', 'Família', 'Endêmica', 'Habitat', 'Ameaças', 'Mais'];

        let resultado = '';

        for (let i = 0; i < arquivos.length; i++) {
            const resposta = await fetch(arquivos[i]);
            const texto = await resposta.text();
            const linhas = texto.trim().split('\n');

            if (index >= 0 && index < linhas.length) {
                resultado += `<strong>${categorias[i]}:</strong> ${linhas[index]}<br><br>`;
            } else {
                resultado += `<strong>${categorias[i]}:</strong> (sem informação)<br><br>`;
            }
        }
        console.log(resultado)
        return resultado
    }

    const ContinenteDados = [
        {
            name: "África", id: "AF",
            markers: [
                { lat: 5, lng: 13, nomeSapo: "Rã-Golias", imagePath: "img/Rã-Goliath.png", caixinha: "A gigante dos rios e a maior rã do mundo.", caixona: "", Index: 17 },
                { lat: -34.2148808, lng: 18.4109938, nomeSapo: "Rã-de-chuva-do-cabo", imagePath: "img/Rã-de-chuva-do-cabo.png", caixinha: "A bolinha que anda em vez de pular e vive debaixo da terra.", caixona: "", Index: 18 },
                { lat: -20.546977, lng: 22.72753, nomeSapo: "Sapo-leopardo-ocidental", imagePath: "img/Sapo-leopardo-ocidental.png", caixinha: "O dono da pele de leopardo que luta contra a urbanização.", caixona: "", Index: 19 }
            ]
        },
        {
            name: "Ásia", id: "AS",
            markers: [
                { lat: 13.8177445, lng: 108.2004015, nomeSapo: "Rã-arbórea-de-Gia Lai", imagePath: "img/Rã-arbórea-de-Gia Lai.png", caixinha: "A pequena habitante das poças d'água nas plantas do Vietnã.", caixona: "", Index: 12 },
                { lat: 10.337442743140283, lng: 76.7013429028683, nomeSapo: "Rã-do-pântano-de-Anamalai ", imagePath: "img/Rã-do-pântano-de-Anamalai.png", caixinha: "Uma joia noturna das florestas úmidas da Índia.", caixona: "", Index: 13 },
                { lat: 25, lng: 102, nomeSapo: "Perereca-arbórea-de-Himalaya", imagePath: "img/Perereca-arbórea-de-Himalaya.png", caixinha: "O bioindicador verde da saúde das florestas do Himalaia.", caixona: "", Index: 14 },
                { lat: 18.697612008389648, lng: 104.10655390036958, nomeSapo: "Rã-de-musgo-vietnamita", imagePath: "img/Rã-de-musgo-vietnamita.png", caixinha: "A especialista em camuflagem que se veste de musgo para viver.", caixona: "", Index: 15 },
                { lat: 1, lng: 114, nomeSapo: " Perereca-de-árvore-de-Borneo", imagePath: "img/Perereca-de-árvore-de-Borneo.png", caixinha: "A construtora de ninhos de espuma nas altas florestas de Bornéu.", caixona: "", Index: 16 },
            ]
        },
        {
            name: "Europa", id: "EU",
            markers: [
                { lat: 46.7336138, lng: 24.5273587, nomeSapo: "Rã-dos-Cárpatos", imagePath: "img/Rã-dos-Cárpatos.png", caixinha: "A rã adaptável que chama a Europa de lar.", caixona: "", Index: 9 },
                { lat: 49.475500567332205, lng: 4.91141487631642, nomeSapo: "Sapo-de-barriga-amarela", imagePath: "img/Sapo-de-barriga-amarela.png", caixinha: "Mostrando sua barriga amarela para avisar do perigo.", caixona: "", Index: 10 },
                { lat: 38.52779802129506, lng: -6.9503811560080635, nomeSapo: "Perereca-ibérica", imagePath: "img/Perereca-ibérica.png", caixinha: "A voz da Península Ibérica que canta alto na primavera.", caixona: "", Index: 11 }
            ]
        },
        {
            name: "América do Norte", id: "NA",
            markers: [
                { lat: 38.3544843, lng: -116.406961, nomeSapo: "Sapo-de-Hot Creek", imagePath: "img/Sapo-de-Hot Creek.png", caixinha: "O recém-descoberto morador dos oásis termais de Nevada.", caixona: "", Index: 6 },
                { lat: 32.9715285, lng: -89.7348497, nomeSapo: "Rã-gopher-do-Mississippi", imagePath: "img/Rã-gopher-do-Mississippi.png", caixinha: "O sobrevivente que depende de tocas subterrâneas para viver.", caixona: "", Index: 7 },
                { lat: 35.187133, lng: -117.885359, nomeSapo: "Perereca-arborícola-da-Califórnia", imagePath: "img/Perereca-arborícola-da-Califórnia.png", caixinha: "A mestra da camuflagem com um canto que \"gagueja\" nas rochas.", caixona: "", Index: 8 }
            ]
        },
        {
            name: "América Central", id: "CA",
            markers: [
                { lat: 10.308338165283203, lng: -84.8111572265625, nomeSapo: "Sapo Dourado", imagePath: "img/Sapo-dourado.png", caixinha: "O símbolo dourado da crise climática que nos deixou cedo demais.", caixona: "", Index: 3 },
                { lat: 10.096455940304972, lng: -84.37623643242833, nomeSapo: "Sapo-arlequim-da-Costa-Rica", imagePath: "img/Sapo-arlequim-da-Costa-Rica.png", caixinha: "A beleza tóxica com cores de advertência.", caixona: "", Index: 4 },
                { lat: 8.67791857328065, lng: -81.80857261020175, nomeSapo: "Sapo-arlequim-de-Chiriqui", imagePath: "img/Sapo-arlequim-de-Chiriqui.png", caixinha: "Uma vítima silenciosa da devastadora quitridiomicose.", caixona: "", Index: 5 }
            ]
        },
        {
            name: "América do Sul", id: "SA",
            markers: [
                { lat: -22.357261657714844, lng: -44.68425750732422, nomeSapo: "Rãzinha-verrugosa-do-itatiaia", imagePath: "img/rãzinha-verrugosa-do-itatiaia.png", caixinha: "A pequena notável que só o Brasil tem.", caixona: "", Index: 0 },
                { lat: -21.40507800895613, lng: -42.680404297464854, nomeSapo: "Perereca-de-capacete-do-Rio-Pomba", imagePath: "img/perereca-de-capacete-do-Rio-Pomba.png", caixinha: "Um tesouro de Minas Gerais em perigo crítico.", caixona: "", Index: 1 },
                { lat: -1.9003036707210565, lng: -78.34157504717315, nomeSapo: "Sapo-arlequim-da-noite-estrelada", imagePath: "img/sapo-arlequim-da-noite-estrelada.png", caixinha: "A joia dos Andes que renasceu da extinção.", caixona: "", Index: 2 }
            ]
        },
        {
            name: "Oceania", id: "OC",
            markers: [
                { lat: -28.3944444, lng: 153.0672222, nomeSapo: "Rã-de-bolso", imagePath: "img/Rã-de-bolso.png", caixinha: "O pai dedicado que carrega seus filhotes em bolsos na pele.", caixona: "", Index: 20 },
                { lat: -36.448, lng: 148.265, nomeSapo: "Rã-corroboree-do-sul", imagePath: "img/Rã-corroboree-do-sul.png", caixinha: "A beleza listrada e venenosa que luta para não desaparecer.", caixona: "", Index: 21 },
                { lat: -8.956345179581513, lng: 148.2053861271226, nomeSapo: "Rã-arbórea-das-montanhas-de-Lamington", imagePath: "img/Rã-arbórea-das-montanhas-de-Lamington.png", caixinha: "A sobrevivente dos riachos rochosos em uma batalha contra a doença.", caixona: "", Index: 22 }
            ]
        }
    ];

    ContinenteDados.forEach(continente => { // for loop que passa por cada continente criando uma variavel
        continente.markers.forEach(markerData => { // passa por cada marcador dentro do continente 
            const iconHtml = `
                <div class="marcador-mapa">
                    <img src="${markerData.imagePath}" alt="${markerData.nomeSapo}" class="marker-image">
                </div>`;

            const customIcon = L.divIcon({
                html: iconHtml,
                className: 'custom-div-icon', 
                iconSize: [40, 40], 
                iconAnchor: [20, 20], 
                popupAnchor: [0, -20] 
            });

            const marker = L.marker([markerData.lat, markerData.lng], { icon: customIcon }).addTo(map);

            const popupContent = `
                <div class="conteudo-popup">
                    <h4>${markerData.nomeSapo}</h4>
                    <img src="${markerData.imagePath}" alt="${markerData.nomeSapo}" style="width:100px; height:auto; margin-top:5px; border-radius:5px;">
                    <p>${markerData.caixinha}</p>
                    <small>Continente: ${continente.name}</small><br>
                    <small>Coordenadas: ${markerData.lat.toFixed(2)}, ${markerData.lng.toFixed(2)}</small>
                </div>
            `;
            marker.bindPopup(popupContent);

            marker.on('click', async () => {
                caixonacontent = await carregarDadosSapo(markerData.Index);
                markerData.caixona = caixonacontent;
                infoBox.innerHTML = `
                    <div id="infoClose">
                        <img src="img/x-lg.svg" alt="Fechar" style="width: 30px; height: 20px;">
                    </div>
                    <div class="caixa-info-content">
                        <h4>${markerData.nomeSapo}</h4>
                        <img class="imagem-caixona" src="${markerData.imagePath}" alt="${markerData.nomeSapo}">
                        <div class="info-sapo">
                            <p>${markerData.caixona}</p>
                            <p><b>Continente:</b> ${continente.name}</p>
                            <p><b>Coordenadas:</b> ${markerData.lat.toFixed(2)}, ${markerData.lng.toFixed(2)}</p>
                        </div>
                    </div>
                `;
                infoBox.style.display = 'block';
                infoBox.scrollTo(0, 0);
                var infoClose = document.getElementById('infoClose');
                infoClose.addEventListener('click', () => {
                    infoBox.style.display = 'none';
                });
            });
        });
    });
});




