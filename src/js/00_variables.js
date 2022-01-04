const listResult = document.querySelector('.js-list-result');
const listFavourites = document.querySelector('.js-list-favourites');
const searchBtn = document.querySelector('.js-search-btn');
const resetBtn = document.querySelector('.js-reset-btn');
const resetFavouritesBtn = document.querySelector('.js-resetFavourites-btn');
let firstRender = true;

let resultSearch;
let favouriteAnimes = JSON.parse(localStorage.getItem("favourites")) || [] ;

