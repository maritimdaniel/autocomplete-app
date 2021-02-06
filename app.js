//selectors
const search = document.querySelector('.text-input');
const displayContainer = document.querySelector('.display-container');

//search states.json and filter
const searchStates = async searchText => {
    const res = await fetch('data.json')
    const states = await res.json();
    
    //get matches
    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regex) || state.abbr.match(regex)
    });
    if(searchText.length === 0){
        matches = [];
        displayContainer.innerHTML = '';
    }
    outputHtml(matches)
};

const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches.map(match => `
        <div class="state-display">
            <h1>${match.name} (${match.abbr})
                <span class="state-capital">${match.capital}</span>
            </h1>
            <p>Lat:${match.lat}
                <span class="latitude"></span>/ Long:${match.long}
                <span class="longitude"></span>
            </p>
        </div>
        `).join('');
        
        displayContainer.innerHTML = html;
    }
};

search.addEventListener('input',function(){
     searchStates(search.value);
});

