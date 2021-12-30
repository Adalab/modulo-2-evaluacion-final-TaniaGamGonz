
const listResult = document.querySelector('.js-list-result');
const searchBtn = document.querySelector('.js-search-btn');
const resetBtn = document.querySelector('.js-reset-btn');

let resultSearch;
let favouriteAnimes;


function getAnimes(anime){

  fetch(`https://api.jikan.moe/v3/search/anime?q=${anime}`)
  .then(response => response.json())
  .then(data =>{
     resultSearch = data.results.map(anime => anime);
     resultSearch.forEach( anime => {
         createAnimeCard(anime);
     }); 
  });
}

function resetSearch(){
    listResult.replaceChildren();
}

function createAnimeCard(anime){
    const animeImg = anime.image_url || 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    const animeName = anime.title;
    const li = document.createElement('li');
    const liTitle = document.createElement('h3');
    const liImg = document.createElement('img');
    liTitle.innerText = animeName;
    liImg.src = animeImg;
    li.append(liTitle, liImg);
    listResult.appendChild(li);
    li.addEventListener('click', setFavourite);
}

function setFavourite(event){
    console.dir(event.target.parentNode);
    favouriteAnimes.push('a');
}

  searchBtn.addEventListener('click', (event) => {
      const animeSearched = document.querySelector('#anime').value;
      event.preventDefault();
      resetSearch();
      getAnimes(animeSearched);
  })
  resetBtn.addEventListener('click', resetSearch);