export const state = {
  // Data from Dictionary Api
  data: {

  }
}

// Fetch and save data to state
export const fetchData = async function (word) {
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await res.json();

    if(res.status === 404){
      throw new Error(`Can not find ${word} in my dictionary. Try again.`)
    }

    saveData(...data);
  } catch (err) {
    return err; // Jak obsłużyć ten error?
  }
};

// Save data to state
const saveData = function(data){
  state.data = data;
}

export const initDefaultFont = function(){
  if(localStorage.getItem('font') === 'sans-serif'){
    localStorage.setItem('font', 'sans-serif');
  }
  else{
    localStorage.setItem('font', 'serif');
  }

}

// export default fetchData;


