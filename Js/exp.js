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



console.log(states);
let arr = [], count = 0;
for (let i = 0; i < states.length; i++) {
    arr.push(substr(searchText, states[i].name));
    arr.push(substr(searchText, states[i].abbr));
    arr.push(substr(searchText, states[i].capital));
}
for (let i = 0; i < arr.length; i++) {
    if (arr[i] === -1)
        count++;
}
if (count === arr.length) {
    matches = [];
    matchList.innerHTML = '';
}
