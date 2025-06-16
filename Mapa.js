// Mapa.js - Leaflet Implementation with Markers

document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('Mapa').setView([0, 0], 2); // Initial view: center of the world, zoom level 2
    const infoBox = document.getElementById('caixa-info');
    const backButton = document.getElementById('btn-voltar');
    const originalView = { lat: 0, lng: 0, zoom: 2 };

    // Add a tile layer (e.g., OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Define continent data with specific marker locations, nomeSapos, and image paths
    const ContinenteDados = [
        {
            name: "África", id: "AF",
            markers: [
                { lat: 5, lng: 13, nomeSapo: "Rã-Golias", imagePath: "img/Rã-Goliath.png", caixinha: "A fascinating frog from central Africa.", caixona: "" },
                { lat: -34.2148808, lng: 18.4109938, nomeSapo: "Rã-de-chuva-do-cabo", imagePath: "img/Rã-de-chuva-do-cabo.png", caixinha: "Found in arid regions of Africa.", caixona: "" },
                { lat: -20.546977, lng: 22.72753, nomeSapo: "Sapo-leopardo-ocidental", imagePath: "img/Sapo-leopardo-ocidental.png", caixinha: "Lives near African rivers.", caixona: "" }
            ]
        },
        {
            name: "Ásia", id: "AS",
            markers: [
                { lat: 13.8177445, lng: 108.2004015, nomeSapo: "Rã-arbórea-de-Gia Lai", imagePath: "img/Rã-arbórea-de-Gia Lai.png", caixinha: "Inhabits high-altitude areas in Asia.", caixona: "" },
                { lat: 10.337442743140283, lng: 76.7013429028683, nomeSapo: "Rã-do-pântano-de-Anamalai ", imagePath: "img/Rã-do-pântano-de-Anamalai.png", caixinha: "Common in Asian rice paddies.", caixona: "" },
                { lat: 25, lng: 102, nomeSapo: "Perereca-arbórea-de-Himalaya", imagePath: "img/Perereca-arbórea-de-Himalaya.png", caixinha: "A vibrant frog from Asian jungles.", caixona: "" },
                { lat: 18.697612008389648, lng: 104.10655390036958, nomeSapo: "Rã-de-musgo-vietnamita", imagePath: "img/Rã-de-musgo-vietnamita.png", caixinha: "A vibrant frog from Asian jungles.", caixona: "" },
                { lat: 1, lng: 114, nomeSapo: " Perereca-de-árvore-de-Borneo", imagePath: "img/Perereca-de-árvore-de-Borneo.png", caixinha: "A vibrant frog from Asian jungles.", caixona: "" },
            ]
        },
        {
            name: "Europa", id: "EU",
            markers: [
                { lat: 46.7336138, lng: 24.5273587, nomeSapo: "Rã-dos-Cárpatos", imagePath: "img/Rã-dos-Cárpatos.png", caixinha: "Widespread across Europe.", caixona: "" },
                { lat: 49.475500567332205, lng: 4.91141487631642, nomeSapo: "Sapo-de-barriga-amarela", imagePath: "img/Sapo-de-barriga-amarela.png", caixinha: "Prefers European woodlands.", caixona: "" },
                { lat: 38.52779802129506, lng: -6.9503811560080635, nomeSapo: "Perereca-ibérica", imagePath: "img/Perereca-ibérica.png", caixinha: "Adapted to European moorlands.", caixona: "" }
            ]
        },
        {
            name: "América do Norte", id: "NA",
            markers: [
                { lat: 37.6489825, lng: -118.8676299, nomeSapo: "Sapo-de-Hot Creek", imagePath: "img/Sapo-de-Hot Creek.png", caixinha: "The special Sapinho frog!", caixona: "" }, // Using an existing image for one
                { lat: 32.9715285, lng: -89.7348497, nomeSapo: "Rã-gopher-do-Mississippi", imagePath: "img/Rã-gopher-do-Mississippi.png", caixinha: "A large North American frog.", caixona: "" },
                { lat: 35.187133, lng: -117.885359, nomeSapo: "Perereca-arborícola-da-Califórnia", imagePath: "img/Perereca-arborícola-da-Califórnia.png", caixinha: "Found in northern NA.", caixona: "" }
            ]
        },
        {
            name: "América Central", id: "CA",
            markers: [
                { lat: 10.308338165283203, lng: -84.8111572265625, nomeSapo: "Sapo Dourado", imagePath: "img/Sapo-dourado.png", caixinha: "Um sapo icônico da América Central.", caixona: "" },
                { lat: 10.096455940304972, lng: -84.37623643242833, nomeSapo: "Sapo-arlequim-da-Costa-Rica", imagePath: "img/Sapo-arlequim-da-Costa-Rica.png", caixinha: "Conhecida por seus olhos vibrantes.", caixona: "" },
                { lat: 8.67791857328065, lng: -81.80857261020175, nomeSapo: "Sapo-arlequim-de-Chiriqui", imagePath: "img/Sapo-arlequim-de-Chiriqui.png", caixinha: "Encontrado em florestas tropicais da região.", caixona: "" }
            ]
        },
        {
            name: "América do Sul", id: "SA",
            markers: [
                { lat: -22.357261657714844, lng: -44.68425750732422, nomeSapo: "Rãzinha-verrugosa-do-itatiaia", imagePath: "img/rãzinha-verrugosa-do-itatiaia.png", caixinha: "A colorful poison dart frog.", caixona: "" }, // UPDATED IMAGE PATH
                { lat: -21.40507800895613, lng: -42.680404297464854, nomeSapo: "Perereca-de-capacete-do-Rio-Pomba", imagePath: "img/perereca-de-capacete-do-Rio-Pomba.png", caixinha: "Lives in the Andes mountains.", caixona: "" },
                { lat: -1.9003036707210565, lng: -78.34157504717315, nomeSapo: "Sapo-arlequim-da-noite-estrelada", imagePath: "img/sapo-arlequim-da-noite-estrelada.png", caixinha: "Known for its translucent skin.", caixona: "" }
            ]
        },
        {
            name: "Oceania", id: "OC",
            markers: [
                { lat: -28.3944444, lng: 153.0672222, nomeSapo: "Rã-de-bolso", imagePath: "img/Rã-de-bolso.png", caixinha: "Common in Australia.", caixona: "" },
                { lat: -36.448, lng: 148.265, nomeSapo: "Rã-corroboree-do-sul", imagePath: "img/Rã-corroboree-do-sul.png", caixinha: "A critically endangered Australian frog.", caixona: "" },
                { lat: -8.956345179581513, lng: 148.2053861271226, nomeSapo: "Rã-arbórea-das-montanhas-de-Lamington", imagePath: "img/Rã-arbórea-das-montanhas-de-Lamington.png", caixinha: "Adapted to arid parts of Oceania.", caixona: ""  }
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
                className: 'custom-div-icon', // Class for the divIcon wrapper
                iconSize: [40, 40], // Size of the circle
                iconAnchor: [20, 20], // Center of the circle
                popupAnchor: [0, -20] // Popup above the circle
            });

            const marker = L.marker([markerData.lat, markerData.lng], { icon: customIcon }).addTo(map);

            const popupContent = `
                <div class="conteudo-popup">
                    <h4>${markerData.nomeSapo}</h4>
                    <img src="${markerData.imagePath}" alt="${markerData.nomeSapo}" style="width:100px; height:auto; margin-top:5px; border-radius:5px;">
                    <p>${markerData.caixinha}</p>
                    <small>Continent: ${continente.name}</small><br>
                    <small>Coords: ${markerData.lat.toFixed(2)}, ${markerData.lng.toFixed(2)}</small>
                </div>
            `;
            marker.bindPopup(popupContent);

            // Evento para mostrar informações na caixa de informações ao clicar no marcador
            marker.on('click', () => {
                    infoBox.innerHTML =`
                    

                    <div class="caixa-info-content">
                        <h4>${markerData.nomeSapo}</h4>
                        <img src="${markerData.imagePath}" alt="${markerData.nomeSapo}" style="width:80px; height:auto; margin-top:5px; border-radius:5px;">
                        <p>${markerData.caixinha}</p>
                        <p><b>Continente:</b> ${continente.name}</p>
                        <p><b>Coordinates:</b> ${markerData.lat.toFixed(2)}, ${markerData.lng.toFixed(2)}</p>
                    </div>
                `;
               infoBox.style.display = 'block';  
            });
        });
    });

    // Show/hide back button based on map view changes
    map.on('zoomend moveend', () => {
        const currentZoom = map.getZoom();
        const currentCenter = map.getCenter();
        // A small tolerance for floating point comparisons of center
        const latDiff = Math.abs(currentCenter.lat - originalView.lat);
        const lngDiff = Math.abs(currentCenter.lng - originalView.lng);

        if (currentZoom !== originalView.zoom || latDiff > 0.0001 || lngDiff > 0.0001) {
            backButton.style.display = 'block';
        } else {
            backButton.style.display = 'none';
        }
         
    });

    // Back button functionality
    backButton.addEventListener('click', () => { 
        map.setView([originalView.lat, originalView.lng], originalView.zoom);
        infoBox.innerHTML = '<p>Informações sobre a região selecionada aparecerão aqui.</p>';
        // The zoomend/moveend event will hide the button
        infoBox.style.display = 'none';

    });

    // Ensure button is hidden on initial load if view matches original
    if (map.getZoom() === originalView.zoom && map.getCenter().lat === originalView.lat && map.getCenter().lng === originalView.lng) {
        backButton.style.display = 'none';

    }
});




