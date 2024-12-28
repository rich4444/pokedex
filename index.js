async function getPokemon(pokemonName) {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName);
    let data = await response.json();

    let pokemonImage = data["sprites"]["front_default"];
    let pokemonTypes = data["types"];
    let secondType = pokemonTypes[1]
    console.log(secondType);
}

getPokemon("charizard");

