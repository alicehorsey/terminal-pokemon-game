const pokemon = require("./pokemon");

class Trainer {
    constructor(trainerName) {
        this.name = trainerName;
        this.currentPokemon = {};
        this.filledPokeballs = 0;
        this.maxFilledPokeballs = 6;
    }
    catchPokemon(pokemon) {
        this.currentPokemon[pokemon.name] = pokemon;
        this.filledPokeballs++;
    }
}


module.exports = { Trainer }
