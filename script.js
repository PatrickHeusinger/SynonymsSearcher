async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

async function getSynonyms() {
    let query = document.getElementById('search').value;
    let url = `https://www.openthesaurus.de/synonyme/search?q=${query}&format=application/json`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let synsets = responseAsJson['synsets'];
    renderSynset(synsets);
    console.log('Response is', await responseAsJson);
}

function renderSynset(synsets) {
    let container = document.getElementById('container');
    container.innerHTML = '';
    container.innerHTML = `<div>Loading <b>${synsets.length}</b> Synonyms</div>`;

    for (let i = 0; i < synsets.length; i++) {
        const synset = synsets[i];
        let terms = synset['terms'];

        container.innerHTML += `
        <div class="head">
        <h2>${i + 1}. Synonyms</h2> 
        </div>`;

        for (let j = 0; j < terms.length; j++) {
            const term = terms[j];
            container.innerHTML += `<div class="term">${term['term']}</div>`;
        }
    }
    document.getElementById('container').scrollIntoView({
        behavior: 'smooth'
    });
}