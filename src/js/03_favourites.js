function handleFavourites(anime, isFavourite) {
  const animeId = anime.mal_id;
  if (isFavourite) {
    deleteFavourite(animeId);
  } else if (!isFavourite) {
    setFavourite(animeId, isFavourite);
  }
  renderFavourites(anime, isFavourite);
}

function setFavourite(animeId, isFavourite) {
  const anime = resultSearch.find((anime) => anime.mal_id === animeId);
  if (!isFavourite) {
    favouriteAnimes.push(anime);
    localStorage.setItem("favourites", JSON.stringify(favouriteAnimes));
  }
}

function addFavouriteClass(elementToAddClass, isFavourite) {
  if (isFavourite) {
    elementToAddClass.classList.add("favourite");
  }
}

function renderFavourites(anime, isAnimeAlreadyInFavourites) {
  listFavourites.classList.remove("hidden");
  favouritesPlaceholder.classList.add("hidden");
  if (firstRender) {
    createAnimeCard(anime, listFavourites, "X");
    firstRender = false;
  } else if (!isAnimeAlreadyInFavourites) {
    createAnimeCard(anime, listFavourites, "X");
  }
}

function deleteFavourite(animeId) {
  //first remove from array
  const animePosition = favouriteAnimes.findIndex(
    (anime) => anime.mal_id === parseInt(animeId)
  );
  favouriteAnimes.splice(animePosition, 1);
  //remove from local storage
  localStorage.removeItem("favourites");
  localStorage.setItem("favourites", JSON.stringify(favouriteAnimes));
  //clear the html
  listFavourites.innerHTML = "";
  if (favouriteAnimes.length === 0) {
    listFavourites.classList.add("hidden");
    favouritesPlaceholder.classList.remove("hidden");
  }
  favouriteAnimes.forEach((anime) => {
    createAnimeCard(anime, listFavourites, "X");
  });
}
