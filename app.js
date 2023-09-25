const apiKey = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym';
const searchForm = document.querySelector('#giphy-search-form');
const clearImagesBtn = document.querySelector('#clear-images-button');

searchForm.addEventListener('submit', handleSubmit);
clearImagesBtn.addEventListener('click', clearImages);

async function handleSubmit(e){
    e.preventDefault();

    const giphyInput = document.querySelector('#search-term');
    const searchTerm = giphyInput.value;
    
    if (searchTerm.length < 3){
        alert('Search term must be min 3 characters long')
        return;
    }
    const giphyImgUrl = await getGiphy(apiKey, searchTerm);
    
    addGiphyToDom(giphyImgUrl);
    
    giphyInput.value = '';

}

async function getGiphy(apiKey, searchTerm){
    try {
        const giphyImgUrl = await axios.get(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}`);
        const randomIndex = Math.floor(Math.random() * giphyImgUrl.data.data.length);
        return giphyImgUrl.data.data[randomIndex].images.fixed_height.url.split('?')[0];
        
    } catch(e) {
        alert('Something went wrong, try again.');
    }
}

function addGiphyToDom(giphyUrl){
    const giphyContainer = document.querySelector('#insert-images');
    const newLi = document.createElement('li');
    const newImg = document.createElement('img');
    newImg.src = `${giphyUrl}`;
    newLi.append(newImg);
    giphyContainer.append(newLi);
}

function clearImages(){
    const giphyContainer = document.querySelector('#insert-images');
    giphyContainer.innerHTML = '';
}