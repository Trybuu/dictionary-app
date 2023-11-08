class DarkModeView{
    #parentElement = document.querySelector('.darkmode');
    darkModeActive = this.loadFromLocalStorage()

    #generateMarkup(){
        return `
            <button class="darkmode__switch" aria-label="toggle dark mode">
                <div class="darkmode__circle"></div>
            </button>
            <svg xmlns="http://www.w3.org/2000/svg" height="1.3rem" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#be63f9}</style><path d="M144.7 98.7c-21 34.1-33.1 74.3-33.1 117.3c0 98 62.8 181.4 150.4 211.7c-12.4 2.8-25.3 4.3-38.6 4.3C126.6 432 48 353.3 48 256c0-68.9 39.4-128.4 96.8-157.3zm62.1-66C91.1 41.2 0 137.9 0 256C0 379.7 100 480 223.5 480c47.8 0 92-15 128.4-40.6c1.9-1.3 3.7-2.7 5.5-4c4.8-3.6 9.4-7.4 13.9-11.4c2.7-2.4 5.3-4.8 7.9-7.3c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-3.7 .6-7.4 1.2-11.1 1.6c-5 .5-10.1 .9-15.3 1c-1.2 0-2.5 0-3.7 0c-.1 0-.2 0-.3 0c-96.8-.2-175.2-78.9-175.2-176c0-54.8 24.9-103.7 64.1-136c1-.9 2.1-1.7 3.2-2.6c4-3.2 8.2-6.2 12.5-9c3.1-2 6.3-4 9.6-5.8c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-3.6-.3-7.1-.5-10.7-.6c-2.7-.1-5.5-.1-8.2-.1c-3.3 0-6.5 .1-9.8 .2c-2.3 .1-4.6 .2-6.9 .4z"/></svg>
        `
    }

    renderMarkup(){
        this.#parentElement.insertAdjacentHTML('afterbegin', this.#generateMarkup());
    }

    addHandlerClick(handler){
        this.#parentElement.addEventListener('click', (e) => {
            if(e.target.classList.contains('darkmode__switch') || e.target.classList.contains('darkmode__circle')){
                this.darkModeActive = !this.darkModeActive;
                
                if(this.darkModeActive){
                    this.setDarkMode();
                    this.saveInLocalStorage(this.darkModeActive);
                }else{
                    this.setBrightMode();
                    this.saveInLocalStorage(this.darkModeActive);
                }
                
                handler(this.darkModeActive);
            }
            
        })
    }

    saveInLocalStorage(isActive){
        localStorage.setItem('darkMode', isActive);
    }

    loadFromLocalStorage(){
        const isTrue = JSON.parse(localStorage.getItem('darkMode'));
        if(isTrue === null){
            localStorage.setItem('darkMode', false);
            return JSON.parse(localStorage.getItem('darkMode'));
        }
        else{
            return JSON.parse(localStorage.getItem('darkMode'));
        }
        
    }


    setDarkModeIfTrue(loadFromLocalStorage){
        if(loadFromLocalStorage){
            this.setDarkMode()
        }else{
           this.setBrightMode()
        }
    }

    setDefaultMode(){
        if(JSON.parse(localStorage.getItem('darkMode')) === null){
            localStorage.setItem('darkMode', false);
            this.setDarkModeIfTrue(false);
        }
        if(JSON.parse(localStorage.getItem('darkMode')) === true){
            this.setDarkModeIfTrue(true);
        }
        if(JSON.parse(localStorage.getItem('darkMode')) === false){
            this.setDarkModeIfTrue(false);
        }
    }

    setDarkMode(){
        document.body.classList.add('night');
        this.#parentElement.classList.add('darkmode--active');
    }
    setBrightMode(){
        document.body.classList.remove('night');
        this.#parentElement.classList.remove('darkmode--active');
    }
}

export default new DarkModeView();