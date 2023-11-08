class SearchView {
    parentElement = document.querySelector('.search-view');
    
    generateMarkup(){
        return `
            <form class="search-bar">
                <input type="text" class="search-bar__input" placeholder="Search words...">
                <button class="search-bar__button"><img class="search-bar__button-img" src="./src/img/icons/magnifying-glass_2811806.png" alt="Magnifying glass"></button>
            </form>`
    }

    renderMarkup(){
        this.parentElement.insertAdjacentHTML('afterbegin', this.generateMarkup())
    }

    addHandlerClick(handler){
        // Setting click event and call handler function with input value [word]
        const searchInput = document.querySelector('.search-bar__input');
        const searchButton = document.querySelector('.search-bar__button');
        
        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            if(searchInput.value !== ""){
                handler(searchInput.value);
            }
            searchInput.value = "";
        });        
    }
}

export default new SearchView();