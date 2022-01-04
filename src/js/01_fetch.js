
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

function addFavouriteClass(elementToAddClass, isFavourite){
    if(isFavourite){
        elementToAddClass.classList.add('favourite');
    }
}


function handleFavourites(anime, isFavourite){
    const animeId = anime.mal_id;
    if(isFavourite){
      deleteFavourite(animeId);
    }else if(!isFavourite){
      setFavourite(animeId, isFavourite)
    }
    renderFavourites(anime, isFavourite);

}

function setFavourite(animeId, isFavourite){
   const anime =  resultSearch.find(anime => anime.mal_id === animeId);
   if(!isFavourite){
   favouriteAnimes.push(anime);
   localStorage.setItem("favourites", JSON.stringify(favouriteAnimes));
   }
}

function searchAnimeById(animeId, arrayToSearch){
 const anime =  arrayToSearch.find(anime => anime.mal_id === parseInt(animeId) );
  return anime ? true : false;
}

function renderFavourites(anime, isAnimeAlreadyInFavourites){

    if(firstRender){
        createAnimeCard(anime, listFavourites, 'Borrar de favoritos');
        firstRender = false;
    }else if(!isAnimeAlreadyInFavourites){
        createAnimeCard(anime, listFavourites, 'Borrar de favoritos');
    }
}
function deleteFavourite(animeId){
    //first remove from array
    const animePosition = favouriteAnimes.findIndex( anime => anime.mal_id === parseInt(animeId));
    favouriteAnimes.splice(animePosition, 1);
    //remove from local storage
    localStorage.removeItem('favourites');
    localStorage.setItem("favourites", JSON.stringify(favouriteAnimes));
    //clear the html
    listFavourites.innerHTML = '';
    favouriteAnimes.forEach( anime => {
        createAnimeCard(anime, listFavourites, 'Borrar de favoritos');
    })
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

