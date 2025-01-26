let pokemonOptionsContainer = document.querySelector(".pokemonOptions");
let pokemonNameInput = document.querySelector(".pokemonNameInput");
let pokemonImage = document.querySelector(".pokemonPicture img");

pokemonNameInput.addEventListener("input", async () => {
    let allPokemons = await getAllPokemons();
    createPokemonsLists(allPokemons, pokemonNameInput.value);
})


async function getPokemon(pokemonName) {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName);
    let data = await response.json();

    let pokemonImage = data["sprites"]["front_default"];
    let pokemonTypes = data["types"];
    let firstType = pokemonTypes[0]["type"]["name"];
    let secondType = "none";

    if (pokemonTypes.length > 1) {
        secondType = pokemonTypes[1]["type"]["name"];
    }

    let pokemon = {
        name: pokemonName,
        image: pokemonImage,
        types: [
            firstType,
            secondType
        ],
        talk: () => {
            let midPoint = Math.ceil(pokemonName.length / 2);
            let halfName = pokemonName.slice(0, midPoint)
            console.log(halfName + " " + halfName);
        }
    }

    return pokemon;
}

async function getAllPokemons() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    let data = await response.json();

    return data.results;
}

async function getMyPokemon(pokemonName) {
    let myPokemon = await getPokemon(pokemonName);
    myPokemon.talk();
}

// getMyPokemon("squirtle");

function createPokemonsLists(pokemons, filter) {
    pokemonOptionsContainer.innerHTML = "";

    for (let i = 0; i < pokemons.length; i++) {
        if (pokemons[i].name.includes(filter) || filter == undefined) {
            let pokemonOption = document.createElement("li");
            pokemonOption.classList.add("pokemonOption");
            pokemonOption.innerHTML = pokemons[i].name;

            pokemonOption.addEventListener("click", async () => {
                let pokemonName = pokemons[i].name;

                pokemonNameInput.value = pokemonName;
                createPokemonsLists(pokemons, pokemonName);

                let pokemonData = await getPokemon(pokemonName);

                updatePokemon(pokemonData);
            })

            pokemonOptionsContainer.appendChild(pokemonOption);
        }
    }
}

function updatePokemon(pokemonData) {
    /*
    Actualizar la imagen
    destacar el tipo de pokemon
    actualizar la descripcion
    */

    pokemonImage.src = pokemonData.image;
}


async function init() {
    let allPokemons = await getAllPokemons();
    createPokemonsLists(allPokemons);
}


init();