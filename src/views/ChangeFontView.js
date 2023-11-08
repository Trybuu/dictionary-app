class ChangeFontView{
    #parentElement = document.querySelector('.fonts');

    #generateMarkup(){
        return `
            <button class="fonts-container">
                <span class="fonts__active-font">${localStorage.getItem('font')}</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="1.3rem" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#be63f9}</style><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
            </button>
            <div class="fonts-options">
                <ul class="fonts-options__list">
                    <li class="fonts-options__list-el"><button class="fonts-options__list-el__btn font-option" aria-label="change to serif font button">serif</button></li>
                    <li class="fonts-options__list-el"><button class="fonts-options__list-el__btn font-option" aria-label="change to sans serif button">sans-serif</button></li>
                </ul>
            </div>
        `
    }

    renderMarkup(){
        this.#parentElement.innerHTML = "";
        this.#parentElement.insertAdjacentHTML('afterbegin', this.#generateMarkup());
    }

    addHandlerClick(handler){
        this.#parentElement.addEventListener('click', (e) => {
            const clicked = e.target;
            
            if(clicked.closest('.fonts-container')){
                this.#showFontsOptions();
            }
            if(clicked.classList.contains('font-option')){
                handler(clicked.textContent);
                this.renderMarkup();
                this.#closeFontsOptions()
            }
        })
    }

    #showFontsOptions(){
        this.#parentElement.classList.toggle('fonts--active');
    }
    #closeFontsOptions(){
        this.#parentElement.classList.remove('fonts--active');
    }

    saveFontToLocalStorage(){
        
    }

    setActiveFont(){
        const activeFont = localStorage.getItem('font');
        document.body.classList.remove('sans-serif');
        document.body.classList.remove('serif');
        document.body.classList.add(activeFont);
    }

}

export default new ChangeFontView();