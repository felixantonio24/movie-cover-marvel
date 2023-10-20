const marvel = {
  render: () => {
    const urlAPI = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=8f485329359989e492459d24f3d4800c&hash=0e65c1d7131e068b809613845669f4cd';
    const container = document.querySelector('#marvel-row');
    let conntenHTML = '';

    fetch(urlAPI)
    .then(res =>res.json())
    .then((json) => {
      for (const hero of json.data.results){
        let urlHero = hero.urls[0].url;
        conntenHTML +=`
        <div class="col-md-4">
            <a href="${urlHero}" target="_blank">
                <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail">
            </a>
            <h3 class="title">${hero.name}</h3>
        </div>`
      }
      container.innerHTML = conntenHTML;
    })

  }
};
marvel.render();