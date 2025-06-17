document.addEventListener('DOMContentLoaded', async () => {
    const catalogoContainer = document.getElementById('catalogo-container');
    if (!catalogoContainer) {
        console.error('Elemento catalogo-container não encontrado.');
        return;
    }

    const arquivosInfo = [
        { nome: 'Nome_cientifico.txt', categoria: 'Nome Científico' },
        { nome: 'Familia.txt', categoria: 'Família' },
        { nome: 'Endemica.txt', categoria: 'Endêmica' },
        { nome: 'Habitat.txt', categoria: 'Habitat' },
        { nome: 'Mais.txt', categoria: 'Mais' }
    ];

    async function fetchTxtFile(fileName) {
        try {
            const response = await fetch(fileName);
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status} ao buscar ${fileName}`);
            }
            const text = await response.text();
            return text.trim().split('\n').map(line => line.trim()); // Trim each line
        } catch (error) {
            console.error(`Falha ao buscar o arquivo ${fileName}:`, error);
            return [];
        }
    }

    const todasAsLinhasPorArquivo = {};
    for (const arquivo of arquivosInfo) {
        todasAsLinhasPorArquivo[arquivo.categoria] = await fetchTxtFile(arquivo.nome);
    }

    const numSapos = todasAsLinhasPorArquivo['Nome Científico'] ? todasAsLinhasPorArquivo['Nome Científico'].length : 0;

    if (numSapos === 0) {
        catalogoContainer.innerHTML = '<p>Nenhum dado de sapo encontrado ou falha ao carregar arquivos. Verifique o console para mais detalhes.</p>';
        return;
    }

    for (let i = 0; i < numSapos; i++) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'sapo-card';

        let cardHTML = '';
        let nomeCientificoParaTitulo = 'Sapo Desconhecido';

        for (const arquivo of arquivosInfo) {
            const linhasDoArquivo = todasAsLinhasPorArquivo[arquivo.categoria];
            const infoLinha = linhasDoArquivo && i < linhasDoArquivo.length && linhasDoArquivo[i] ? linhasDoArquivo[i] : '(sem informação)';

            if (arquivo.categoria === 'Nome Científico') {
                nomeCientificoParaTitulo = infoLinha !== '(sem informação)' ? infoLinha : nomeCientificoParaTitulo;
            }

            if (arquivo.categoria === 'Mais') {
                cardHTML += `<details><summary><strong>${arquivo.categoria}:</strong></summary><p>${infoLinha}</p></details>`;
            } else {
                cardHTML += `<p><strong>${arquivo.categoria}:</strong> ${infoLinha}</p>`;
            }
        }

        cardDiv.innerHTML = `
                <h4>${nomeCientificoParaTitulo}</h4>
                ${cardHTML}
            `;
        catalogoContainer.appendChild(cardDiv);
    }
});