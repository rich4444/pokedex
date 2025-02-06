let pokemonOptionsContainer = document.querySelector(".pokemonOptions");
let pokemonNameInput = document.querySelector(".pokemonNameInput");
let pokemonImage = document.querySelector(".pokemonPicture img");
let pokemonAudioButton = document.querySelector(".playSoundButton");

let pokemonSound;

pokemonAudioButton.addEventListener("click", () => {
    if (pokemonSound) {
        let audio = new Audio(pokemonSound);
        audio.volume = .2;
        audio.play();
    }
})

pokemonNameInput.addEventListener("input", async () => {
    let allPokemons = await getAllPokemons();
    createPokemonsLists(allPokemons, pokemonNameInput.value);
})


async function getPokemon(pokemonName) {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName);
    let data = await response.json();

    let descResponse = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + pokemonName);
    let descData = await descResponse.json();



    let pokemonImage = data["sprites"]["front_default"];
    let pokemonTypes = data["types"];
    let firstType = pokemonTypes[0]["type"]["name"];
    let secondType = "none";
    let pokemonCry = data["cries"]["legacy"];
    let pokemonHeight = data["height"];
    let pokemonWeight = data["weight"];

    let pokemonFlavors = descData["flavor_text_entries"];

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
        weight: pokemonWeight,
        height: pokemonHeight,
        cry: pokemonCry,
        flavors: pokemonFlavors,
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
    let prevMarked = document.querySelectorAll(".selectedType");
    prevMarked.forEach(el => {
        el.classList.remove("selectedType");
    })

    pokemonImage.src = pokemonData.image;

    pokemonData.types.forEach(el => {
        console.log(el);
        if (el == "none" || el == "fairy" || el == "steel" || el == "dark") return;

        let pokemonType = document.querySelector(".typeButton." + el);
        pokemonType.classList.add("selectedType");
    })

    let heightDisplay = document.querySelector(".heightDisplay");
    let weightDisplay = document.querySelector(".weightDisplay");

    heightDisplay.innerHTML = pokemonData.height + "ft";
    weightDisplay.innerHTML = pokemonData.weight + "lbs";

    pokemonSound = pokemonData.cry;

    let audio = new Audio(pokemonSound);
    audio.volume = .2;
    audio.play();

    let pokemonFlavor = pokemonData.flavors[0];

    let textDisplay = document.querySelector(".textDisplay");
    textDisplay.innerHTML = pokemonFlavor.flavor_text;

}


async function init() {
    let allPokemons = await getAllPokemons();
    createPokemonsLists(allPokemons);
}


init();