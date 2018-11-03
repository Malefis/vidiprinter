const url = "https://www.footballwebpages.co.uk/vidiprinter.json?comp=4";
const outputDiv = document.getElementById('output');

function getData(){
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        data = data.vidiprinter.update;
        data.forEach(x => {
            makeCard(x);
        });
    })
}
function makeCard(data){
    let output = document.createElement('div');
    output.className = "card";
    if(data.type == "GOALS"){
        output.innerHTML = `<img src="https://vignette.wikia.nocookie.net/internationalbroadcasts/images/5/5c/Football.png/revision/latest?cb=20140205225823" alt="goal image" height="30px" width="30px">`;
    }else{
        output.innerHTML = `
            <p>${data.type}</p>
        `;
    };

    output.innerHTML += `
        <p class="card__title">${data.event}</p>
        <a href=${data.link}>Link</a>
    `;
    outputDiv.appendChild(output);
}

getData()