
const listResult = document.querySelector('.js-list-result');
const listFavourites = document.querySelector('.js-list-favourites');
const searchBtn = document.querySelector('.js-search-btn');
const resetBtn = document.querySelector('.js-reset-btn');
const resetFavouritesBtn = document.querySelector('.js-resetFavourites-btn');
let firstRender = true;

let resultSearch;
let favouriteAnimes = JSON.parse(localStorage.getItem("favourites")) || [] ;


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

function chekcIfItsFavourite(animeToCheckId, elementToAddClass){
    let isFavourite = favouriteAnimes.find(anime => anime.mal_id === animeToCheckId);
    if(isFavourite){
        elementToAddClass.classList.add('favourite');
    }
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
    if(listOnRender === listFavourites){
        li.classList.add('favourite');
    }
    listOnRender.appendChild(li);
    chekcIfItsFavourite(animeId, li);
    li.addEventListener('click', (event)=>{
        const animeId = event.currentTarget.dataset.id;
        setFavourite(animeId);
        event.currentTarget.classList.toggle('favourite');
    });
}

function setFavourite(animeId){
   const animeAlreadyInFavourites = searchAnimeById(animeId, favouriteAnimes);
   const anime =  searchAnimeById(animeId, resultSearch);
   renderFavourites(anime);
   if(!animeAlreadyInFavourites){
   favouriteAnimes.push(anime);
   localStorage.setItem("favourites", JSON.stringify(favouriteAnimes));
   }
}

function searchAnimeById(animeId, arrayToSearch){
   return arrayToSearch.find(anime => anime.mal_id === parseInt(animeId));
}

function renderFavourites(anime){
    const animeAlreadyInFavourites = searchAnimeById(anime.mal_id, favouriteAnimes);

    if(firstRender){
        createAnimeCard(anime, listFavourites, 'Borrar de favoritos');
    }else if(!animeAlreadyInFavourites){
    createAnimeCard(anime, listFavourites, 'Borrar de favoritos');
    }
}


//Render favourites at the start of the page 
favouriteAnimes.forEach( anime => renderFavourites(anime));

  searchBtn.addEventListener('click', (event) => {
      const animeSearched = document.querySelector('#anime').value;
      event.preventDefault();
      resetList(listResult);
      getAnimes(animeSearched);
  })
  resetBtn.addEventListener('click', ()=>{
      resetList(listResult);
  });
  resetFavouritesBtn.addEventListener('click', () =>{
    resetList(listFavourites);
    favouriteAnimes = [];
    localStorage.removeItem("favourites");
});