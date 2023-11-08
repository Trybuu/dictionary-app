class ResultView {
    parentElement = document.querySelector('.result');
    audioToPlay;

    #renderSynonyms(synonyms){
        const lastIndex = synonyms.length - 1;
        let html = "";

        if(lastIndex === -1){
            html = "";
        }
        else if(lastIndex >= 0){
            html += `<h3 class="synonyms__title">Synonyms</h3>`;
            synonyms.map((synonym, index) => {
                if(index !== lastIndex){
                    html += `<p class="synonyms__synonym"> ${synonym}, </p>`;
                }else{
                    html += `<p class="synonyms__synonym"> ${synonym}</p>`;
                }
            }).join('');
        }

        return html;
    }

    #renderDefinitions(definitions){
        const definitionsArr = new Array();
        definitions.forEach(def => {
            definitionsArr.push(`${def.definition}`);
        });
        console.log(definitionsArr);
        definitionsArr.map(def => {
            return `<li>${def}</li>`
        })
    }

    #clearMrkup(){
        this.parentElement.innerHTML = "";
    }
    
    #generateMarkup(data){
        let meanings = new Array();
        let audioSrc = new Array();
        data.phonetics.map(phonetic => audioSrc.push(phonetic.audio));
        this.getAudio(audioSrc);
        return `
            <div class="result__main">
                <div>
                    <h1>${data.word}</h1>
                    <span>${data.phonetics.map(phonetic => {
                        return `${!phonetic.hasOwnProperty('text') ? '' : phonetic.text} <br> `
                    })}</span>
                </div>
                <div>
                    <button class="button button--play"><img src="./src/img/icons/play_748134.png" alt="like to sepak"></button>
                </div>
            </div>

            ${data.meanings.map(meaning => {
                return `            
            <div class="part-of-speech">
                <h2 class="part-of-speech__title">${meaning.partOfSpeech}</h2>
                <div class="part-of-speech__stripe"></div> 
            </div>

            <div>
                <h3 class="meanings__meaning">Meaning</h3>
                <ul class="meanings__list">
                ${meaning.definitions.map(def => {
                    return `<li>${def.definition}</li>`
                }).join('')}
                </ul>
            </div>

            <div class="synonyms">
                ${this.#renderSynonyms(meaning.synonyms)}
            </div>
                `
            }).join('')}
            

            <div class="source">
            ${data.sourceUrls.map(src => {
                return `<a href="${src}" class="source__link" target="_blank">${src} <img src='./src/img/icons/send_8560618.png'></img></a>`
            }).join('')}
            
            </div>
        `
    }

    renderMarkup(data){
        this.#clearMrkup();
        this.parentElement.insertAdjacentHTML('afterbegin', this.#generateMarkup(data));
    }

    getAudio(audioSrc){
        let audioArr = audioSrc.filter(audio => audio !== "");
        const audioToPlay = audioArr[0];
        this.audioToPlay = audioToPlay;
    }

    addHandlerClick(handler){
        document.querySelector('.button--play').addEventListener('click', () => {
            handler(this.audioToPlay)
        })
    }

}

export default new ResultView();