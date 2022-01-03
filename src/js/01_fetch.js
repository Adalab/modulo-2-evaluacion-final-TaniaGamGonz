
const listResult = document.querySelector('.js-list-result');
const listFavourites = document.querySelector('.js-list-favourites');
const searchBtn = document.querySelector('.js-search-btn');
const resetBtn = document.querySelector('.js-reset-btn');
const resetFavouritesBtn = document.querySelector('.js-resetFavourites-btn');

let resultSearch;
let favouriteAnimes = [];


function getAnimes(anime){

  fetch(`https://api.jikan.moe/v3/search/anime?q=${anime}`)
  .then(response => response.json())
  .then(data =>{
     resultSearch = data.results.map(anime => anime);
     resultSearch.forEach( anime => {
         createAnimeCard(anime, listResult, 'Añadir a series favoritas');
     }); 
  });
}

function resetList(listToClear){
    listToClear.replaceChildren();
}

function createAnimeCard(anime, listOnRender, buttonText){
    const animeImg = anime.image_url || 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    const animeName = anime.title;
    const animeId = anime.mal_id;
    const li = document.createElement('li');
    const liTitle = document.createElement('h3');
    const liImg = document.createElement('img');
    const button = document.createElement('button');
    button.innerText = buttonText;
    button.classList.add('btn');
    liTitle.innerText = animeName;
    liTitle.classList.add('card__title');
    liImg.src = animeImg;
    liImg.classList.add('card__img');
    li.append(liTitle, liImg, button);
    li.dataset.id = animeId;
    li.classList.add('card');
    listOnRender.appendChild(li);
    li.addEventListener('click', setFavourite);
}

function setFavourite(event){
   const animeId = event.currentTarget.dataset.id;
   const anime =  searchAnimeById(animeId, resultSearch);
   renderFavourites(anime);
   favouriteAnimes.push(anime);
}

function searchAnimeById(animeId, arrayToSearch){
   return arrayToSearch.find(anime => anime.mal_id === parseInt(animeId));
}

function renderFavourites(anime){
    const animeAlreadyInFavourites = searchAnimeById(anime.mal_id, favouriteAnimes);
    if(!animeAlreadyInFavourites){
    createAnimeCard(anime, listFavourites, 'Borrar de favoritos');
    }
}

  searchBtn.addEventListener('click', (event) => {
      const animeSearched = document.querySelector('#anime').value;
      event.preventDefault();
      resetList(listResult);
      getAnimes(animeSearched);
  })
  resetBtn.addEventListener('click', (event)=>{
      resetList(listResult);
  });
  resetFavouritesBtn.addEventListener('click', (event)=>{
    resetList(listFavourites);
});