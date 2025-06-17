const homeButton = document.getElementById('home');
const catalogoButton = document.getElementById('btnCatalogo');
const saibaMaisButton = document.getElementById('btnSaibaMais');
const recursosButton = document.getElementById('btnRecursos');
const mapaButton = document.getElementById('btnMapa');

homeButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

catalogoButton.addEventListener('click', () => {
    window.location.href = 'catalogo.html';
});

saibaMaisButton.addEventListener('click', () => {
    window.location.href = 'saibamais.html';
});

recursosButton.addEventListener('click', () => {
    window.location.href = 'recursos.html';
});

mapaButton.addEventListener('click', () => {
    window.location.href = 'mapa.html';
});


