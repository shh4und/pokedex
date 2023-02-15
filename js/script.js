const pokemonName = document.querySelector(".pokemon_name");
const pokemonNum = document.querySelector(".pokemon_num");
const pokemonType1 = document.querySelector(".pokemon_type1");
const pokemonType2 = document.querySelector(".pokemon_type2");
const pokemonImg = document.querySelector(".pokemon_img");
const form = document.querySelector(".poke_form");
const input = document.querySelector(".input_search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");
const buttonUp = document.querySelector(".btn-up");
const buttonDown = document.querySelector(".btn-down");
let pokeID = 1;

screen.addEventListener("orientationchange", () => {
  console.log(`The orientation of the screen is: ${screen.orientation}`);
});

const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status == 200){ // status "OK" da resposta da API
        const APIdata = await APIResponse.json(); // convertendo pro formato JSON
        return APIdata;
    }
}

const renderPokemon = async (pokemon) =>{
    pokemonName.innerHTML = "Loading..."
    pokemonNum.innerHTML = ""
    const data = await fetchPokemon(pokemon); // acessar o JSON gerado
    if(data&&data.id<=649){ // devido a limitacao de imagens .gif da API 
        pokemonImg.style.display = "block"
        blackWhite_animated = data.sprites["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
        pokemonImg.src = blackWhite_animated
        pokemonName.innerHTML = data.name;
        if (data.id<100&&data.id>=10){
            pokemonNum.innerHTML = "0"+data.id;
        }else if(data.id<10){
            pokemonNum.innerHTML = "00"+data.id;
        }else{
            pokemonNum.innerHTML = data.id;
        }
        pokemonType1.innerHTML = data.types[0].type.name;
        if (data.types.length == 2){
            pokemonType2.innerHTML = data.types[1].type.name
        }else{
            pokemonType2.innerHTML = ""
        }
        input.value = "";
        pokeID = data.id
    }else{
        pokemonImg.style.display = "none"
        pokemonName.innerHTML = "Not found"
        pokemonNum.innerHTML = "000"
        input.value = "";
    }
}

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    renderPokemon(input.value.toLowerCase());
})

buttonPrev.addEventListener("click", ()=>{ // volta 1 pokemon a partir do ID atual
    if(pokeID>1){ // devido a limitacao de imagens .gif da API
        pokeID-=1
        renderPokemon(pokeID)
    }
})
buttonNext.addEventListener("click", ()=>{ // avanca 1 pokemon a partir do ID atual
    if(pokeID<649) // devido a limitacao de imagens .gif da API
        pokeID+=1
        renderPokemon(pokeID)
})
buttonUp.addEventListener("click", ()=>{ // avanca 10 pokemons a partir do ID atual
    if(pokeID<649) // devido a limitacao de imagens .gif da API
        pokeID+=10
        renderPokemon(pokeID)
})
buttonDown.addEventListener("click", ()=>{ // volta 10 pokemons a partir do ID atual
    if(pokeID>1) // devido a limitacao de imagens .gif da API
        pokeID-=10
        renderPokemon(pokeID)
})

renderPokemon(pokeID)
