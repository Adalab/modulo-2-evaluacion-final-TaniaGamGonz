'use strict';


function searchAnimeById(animeId, arrayToSearch){
    const anime =  arrayToSearch.find(anime => anime.mal_id === parseInt(animeId) );
     return anime ? true : false;
   }

function resetList(listToClear){
    listToClear.replaceChildren();
}
   
//Render favourites at the start of the page 



favouriteAnimes.forEach( anime => renderFavourites(anime));

if(listFavourites.childNodes.length !== 0){
    favouritesPlaceholder.classList.add('hidden');
    listFavourites.classList.remove('hidden');
}

  searchBtn.addEventListener('click', (event) => {
      const animeSearched = document.querySelector('#anime').value;
      event.preventDefault();
      resetList(listResult);
      getAnimes(animeSearched);
  })
  resetBtn.addEventListener('click', ()=>{
      resetList(listResult);
      resultsPlaceholder.classList.remove('hidden');
      listResult.classList.add('hidden');
  });
  resetFavouritesBtn.addEventListener('click', () =>{
    resetList(listFavourites);
    favouritesPlaceholder.classList.remove('hidden');
    listFavourites.classList.add('hidden');

    favouriteAnimes = [];
    localStorage.removeItem("favourites");
    if(listResult){
        listResult.querySelectorAll('li').forEach( li =>{
            li.classList.remove('favourite');
        });
    }
});

logBtn.addEventListener('click', () =>{
    console.log(`Tienes ${favouriteAnimes.length} animes favoritos.`);
})

