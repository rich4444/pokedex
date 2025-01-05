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

    console.log(data);
}

async function getMyPokemon(pokemonName) {
    let myPokemon = await getPokemon(pokemonName);
    myPokemon.talk();
}

getMyPokemon("squirtle");
