// Mapa.js - Leaflet Implementation with Markers

document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('Mapa').setView([0, 0], 2); // Initial view: center of the world, zoom level 2
    const infoBox = document.getElementById('info-box');
    const backButton = document.getElementById('back-button');
    const originalView = { lat: 0, lng: 0, zoom: 2 };

    // Add a tile layer (e.g., OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Define continent data with specific marker locations, titles, and image paths
    const continentsData = [
        {
            name: "Africa", id: "AF",
            markers: [
                { lat: 10, lng: 20, title: "African Frog Species 1", imagePath: "img/placeholder_frog.png", description: "A fascinating frog from central Africa." },
                { lat: 0, lng: 25, title: "Desert Froglet", imagePath: "img/placeholder_frog.png", description: "Found in arid regions of Africa." },
                { lat: -15, lng: 30, title: "River Hopper", imagePath: "img/placeholder_frog.png", description: "Lives near African rivers." }
            ]
        },
        {
            name: "Asia", id: "AS",
            markers: [
                { lat: 40, lng: 90, title: "Mountain Leaper", imagePath: "img/placeholder_frog.png", description: "Inhabits high-altitude areas in Asia." },
                { lat: 30, lng: 105, title: "Paddy Frog", imagePath: "img/placeholder_frog.png", description: "Common in Asian rice paddies." },
                { lat: 20, lng: 80, title: "Jungle Croaker", imagePath: "img/placeholder_frog.png", description: "A vibrant frog from Asian jungles." }
            ]
        },
        {
            name: "Europe", id: "EU",
            markers: [
                { lat: 50, lng: 10, title: "Common European Frog", imagePath: "img/placeholder_frog.png", description: "Widespread across Europe." },
                { lat: 45, lng: 20, title: "Forest Dweller Frog", imagePath: "img/placeholder_frog.png", description: "Prefers European woodlands." },
                { lat: 55, lng: 0, title: "Moorland Frog", imagePath: "img/placeholder_frog.png", description: "Adapted to European moorlands." }
            ]
        },
        {
            name: "North America", id: "NA",
            markers: [
                { lat: 45, lng: -100, title: "Great Plains Toad", imagePath: "img/sapinho.jpg", description: "The special Sapinho frog!" }, // Using an existing image for one
                { lat: 39, lng: -95, title: "Bullfrog", imagePath: "img/placeholder_frog.png", description: "A large North American frog." },
                { lat: 55, lng: -110, title: "Boreal Chorus Frog", imagePath: "img/placeholder_frog.png", description: "Found in northern NA." }
            ]
        },
        {
            name: "South America", id: "SA",
            markers: [
                { lat: -10, lng: -60, title: "Amazon Dart Frog", imagePath: "img/blue_dart_frog.jpg", description: "A colorful poison dart frog." }, // UPDATED IMAGE PATH
                { lat: -20, lng: -50, title: "Andean Water Frog", imagePath: "img/placeholder_frog.png", description: "Lives in the Andes mountains." },
                { lat: 0, lng: -70, title: "Glass Frog", imagePath: "img/placeholder_frog.png", description: "Known for its translucent skin." }
            ]
        },
        {
            name: "Oceania", id: "OC",
            markers: [
                { lat: -25, lng: 135, title: "Green Tree Frog (AU)", imagePath: "img/placeholder_frog.png", description: "Common in Australia." },
                { lat: -20, lng: 145, title: "Corroboree Frog", imagePath: "img/placeholder_frog.png", description: "A critically endangered Australian frog." },
                { lat: -30, lng: 120, title: "Desert Tree Frog", imagePath: "img/placeholder_frog.png", description: "Adapted to arid parts of Oceania." }
            ]
        }
    ];

    // Add markers for each continent
    continentsData.forEach(continent => {
        continent.markers.forEach(markerData => {
            const iconHtml = `
                <div class="custom-marker-circle">
                    <img src="${markerData.imagePath}" alt="${markerData.title}" class="marker-image">
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
                <div class="popup-content">
                    <h4>${markerData.title}</h4>
                    <img src="${markerData.imagePath}" alt="${markerData.title}" style="width:100px; height:auto; margin-top:5px; border-radius:5px;">
                    <p>${markerData.description}</p>
                    <small>Continent: ${continent.name}</small><br>
                    <small>Coords: ${markerData.lat.toFixed(2)}, ${markerData.lng.toFixed(2)}</small>
                </div>
            `;
            marker.bindPopup(popupContent);

            marker.on('click', () => {
                    infoBox.innerHTML =`
                    

                    <div class="info-box-content">
                        <h4>${markerData.title}</h4>
                        <img src="${markerData.imagePath}" alt="${markerData.title}" style="width:80px; height:auto; margin-top:5px; border-radius:5px;">
                        <p>${markerData.description}</p>
                        <p><b>Continent:</b> ${continent.name} (${continent.id})</p>
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

// Old GeoJSON related code (style, getContinentColor, onEachFeature, zoomToFeature, fetch) is removed.
// Old mousemove listener for mouseY is removed as it's not used in this version.





