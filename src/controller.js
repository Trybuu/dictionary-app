import {state, fetchData, initDefaultFont} from './model.js';
import ChangeFontView from './views/ChangeFontView.js';
import DarkModeView from './views/DarkModeView.js';
import SearchView from './views/SearchView.js';
import ResultView from './views/ResultView.js';

const controlSearchWord = async function(word){
    try{
        // 1) Get data from API and save it to state
        await fetchData(word);
        // 2) Render search result
        if(!state.data) return;
        await ResultView.renderMarkup(state.data);
        await ResultView.addHandlerClick(controlPlayAudio)
    }catch(err){
        console.log(err);
    } 
}

const controlDarkMode = function(darkModeActive){
    // state.userSettings.darkMode = darkModeActive;
    console.log(darkModeActive);
}

const controlFontChange = function(font){
    // 1) Get font value and set in localstorage
    console.log(font);
    localStorage.setItem('font', font);
    console.log(localStorage)
    // 2) Set choosed font from localstorage
    ChangeFontView.setActiveFont();
}

const controlPlayAudio = function(src){
    const audio = new Audio(src);
    audio.play();
}

const init = function(){
    initDefaultFont();
    ChangeFontView.renderMarkup();
    ChangeFontView.setActiveFont();
    ChangeFontView.addHandlerClick(controlFontChange)
    DarkModeView.setDefaultMode();
    DarkModeView.renderMarkup();
    DarkModeView.addHandlerClick(controlDarkMode);
    SearchView.renderMarkup();
    SearchView.addHandlerClick(controlSearchWord);
}

init();

// HELPER FUNCTIONS
