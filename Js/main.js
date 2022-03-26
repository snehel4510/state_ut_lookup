const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const searchStates = async searchText => {
    const res = await fetch('./data/SC.json');
    const states = await res.json();
    {
        let matches = states.filter(state => {
            const regex = new RegExp(`^${searchText}`, 'gi');
            return state.name.match(regex) || state.abbr.match(regex) || state.capital.match(regex);
        });
        if (searchText.length === 0) {
            matches = [];
            matchList.innerHTML = '';
        }
        outputHtml(matches);
    }
    // console.log(matches);
}

const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
         <div class="card card-body mb-2">
          <i>${match.type}</i>
          <h4>${match.name}(${match.abbr})
          <span class="text-primary">${match.capital}</span></h4>
          <h6>Area: ${match.area}  &  Pop: ${match.population}</h6>
         </div>
        `).join('');
        matchList.innerHTML = html;
    }
}

search.addEventListener('input', () => searchStates(search.value));