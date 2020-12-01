
class Pokemon {
    constructor(pokemonName, pokemonHealth, pokemonAttackDamage, pokemonSound, pokemonMove, pokemonType = "Normal") {
        this.name = pokemonName;
        this.health = pokemonHealth;
        this.attackDamage = pokemonAttackDamage;
        this.sound = pokemonSound;
        this.move = pokemonMove;
        this.type = pokemonType;
    }

    strongAgainst(defendingType) {

        const strength = {
            Normal: "nothing",
            Fire: "Grass",
            Grass: "Water",
            Water: "Fire",
            Electric: "Water",
            Psychic: "Ghost",
            Ice: "Dragon",
            Dragon: "Dragon",
            Fighting: "Normal",
            Flying: "Ground",
            Poison: "Bug",
            Ground: "Electric",
            Rock: "Electric",
            Bug: "Psychic",
            Ghost: "Fighting",
            Steel: "Rock",
            Dark: "Psychic",
            Fairy: "Dark",
        }
        return strength[this.type] === defendingType;
    }

    // strongAgainst(defendingType) {
    //     if (this.type === "Normal") return "This pokemon is not strong against anything";
    //     if (this.type === "Grass") return "This pokemon is strong against Water types";
    //     if (this.type === "Fire") return "This pokemon is strong against Grass types";
    //     if (this.type === "Water") return "This pokemon is strong against Fire types";

    weakAgainst(defendingType) {

        const weakness = {
            Normal: "Fighting",
            Fire: "Water",
            Grass: "Fire",
            Water: "Grass",
            Electric: "Rock",
            Psychic: "Dark",
            Ice: "Fire",
            Dragon: "Fairy",
            Fighting: "Ghost",
            Flying: "Electric",
            Poison: "Rock",
            Ground: "Flying",
            Rock: "Water",
            Bug: "Fire",
            Ghost: "Psychic",
            Steel: "Fire",
            Dark: "Fairy",
            Fairy: "Dragon",
        }
        return weakness[this.type] === defendingType;
    }

    // weakAgainst() {
    //     if (this.type === "Normal") return "This pokemon is not weak against anything";
    //     if (this.type === "Grass") return "This pokemon is weak against Fire types";
    //     if (this.type === "Fire") return "This pokemon is weak against Water types";
    //     if (this.type === "Water") return "This pokemon is weak against Grass types";

    soundMade() {
        return this.sound;
    }

    useYourMoves() {
        return this.move;
    }
}


module.exports = { Pokemon }