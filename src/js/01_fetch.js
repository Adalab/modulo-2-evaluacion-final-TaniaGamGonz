'use strict'
function getAnimes(anime){

  fetch(`https://api.jikan.moe/v3/search/anime?q=${anime}`)
  .then(response => response.json())
  .then(data =>{
      resultsPlaceholder.classList.add('hidden');
      listResult.classList.remove('hidden');
      resultSearch = data.results.map(anime => anime);
      resultSearch.forEach( anime => {
          createAnimeCard(anime, listResult, 'Añadir a series favoritas');
      }); 


  });
}
