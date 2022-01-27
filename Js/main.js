const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

function substr(s1, s2) {
    let m = s1.length;
    let n = s2.length;
    if (m > n)
        return -1;
    let x = Math.min(m, n);
    for (var j = 0; j < x; j++) {
        if (s2[j] != s1[j])
            return -1;
    }
    return 1;
}

const searchStates = async searchText => {
    const res = await fetch('./data/SC.json');
    const states = await res.json();
    // console.log(states);
    // let arr = [], count = 0;
    // for (let i = 0; i < states.length; i++) {
    //     arr.push(substr(searchText, states[i].name));
    //     arr.push(substr(searchText, states[i].abbr));
    //     arr.push(substr(searchText, states[i].capital));
    // }
    // for (let i = 0; i < arr.length; i++) {
    //     if (arr[i] === -1)
    //         count++;
    // }
    // if (count === arr.length) {
    //     matches = [];
    //     matchList.innerHTML = '';
    // }
    // else
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