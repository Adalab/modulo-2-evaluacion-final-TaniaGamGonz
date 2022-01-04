function createAnimeCard(anime, listOnRender, buttonText){

    const animeImg = anime.image_url || 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    const animeName = anime.title;
    const animeId = anime.mal_id;
    let isFavourite = searchAnimeById(animeId, favouriteAnimes);

    //elements created 
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


    //Add favourite class to the element after check if it's favourite
    addFavouriteClass(li, isFavourite);


    //Listener on the card to set a new favourite or remove it. 
    li.addEventListener('click', (event)=>{


        const animeId = event.currentTarget.dataset.id;
        let isFavourite = searchAnimeById(animeId, favouriteAnimes);

        event.currentTarget.classList.toggle('favourite');
        handleFavourites(anime, isFavourite);
    });

    //listener to the button on the card to remove favourite

    button.addEventListener('click', event =>{
       // deleteHtmlFavourite(event);
    })


}
