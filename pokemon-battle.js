const { Pokemon } = require("./pokemon");
const { Trainer } = require("./pokemon-trainer");

class BattleArena {
    constructor(trainer1, trainer2) {
        this.firstTrainer = trainer1;
        this.secondTrainer = trainer2;
    }
}

class Battle extends BattleArena {
    constructor(trainer1, trainer2) {
        super(trainer1, trainer2)
        this.firstAttacker = null;
        this.secondAttacker = null;
        this.roundCounter = 1;
    }

    whoFightsFirst(firstPokemon, secondPokemon) {
        const randomGenerator = Math.round(Math.random());
        if (randomGenerator === 1) {
            this.firstAttacker = this.secondTrainer.currentPokemon[secondPokemon]
            this.secondAttacker = this.firstTrainer.currentPokemon[firstPokemon]
            return `${secondPokemon} attacks first`;

        } else {
            this.firstAttacker = this.firstTrainer.currentPokemon[firstPokemon]
            this.secondAttacker = this.secondTrainer.currentPokemon[secondPokemon]
            return `${firstPokemon} attacks first`;
        }
    }

    fight() {
        if (this.roundCounter % 2 === 0) {

            if (this.secondAttacker.strongAgainst(this.firstAttacker.type)) {
                this.firstAttacker.health -= (Math.ceil(this.secondAttacker.attackDamage * 1.25))
                this.roundCounter++

                if (this.firstAttacker.health < 1) {

                    if (this.firstTrainer.currentPokemon.hasOwnProperty(this.secondAttacker.name)) {
                        return `The attack was super effective and ${this.firstAttacker.name} fainted. ${this.firstTrainer.name}'s ${this.secondAttacker.name} wins!`
                    }
                    return `The attack was super effective and ${this.firstAttacker.name} fainted. ${this.secondTrainer.name}'s ${this.secondAttacker.name} wins!`
                }


                return `${this.secondAttacker.name} attacked with ${this.secondAttacker.move}! It did a boosted ${(Math.ceil(this.secondAttacker.attackDamage * 1.25))} damage to ${this.firstAttacker.name}! It's super effective! ${this.firstAttacker.name} has ${this.firstAttacker.health} hp remaining!`
            } else if (this.secondAttacker.weakAgainst(this.firstAttacker.type)) {
                this.firstAttacker.health -= (Math.floor(this.secondAttacker.attackDamage * 0.75))
                this.roundCounter++

                if (this.firstAttacker.health < 1) {

                    if (this.firstTrainer.currentPokemon.hasOwnProperty(this.secondAttacker.name)) {
                        return `The attack was not very effective but ${this.firstAttacker.name} fainted. ${this.firstTrainer.name}'s ${this.secondAttacker.name} wins!`
                    }
                    return `The attack was not very effective but ${this.firstAttacker.name} fainted. ${this.secondTrainer.name}'s ${this.secondAttacker.name} wins!`
                }


                return `${this.secondAttacker.name} attacked with ${this.secondAttacker.move}! It did a reduced ${(Math.floor(this.secondAttacker.attackDamage * 0.75))} damage to ${this.firstAttacker.name}! It's not very effective! ${this.firstAttacker.name} has ${this.firstAttacker.health} hp remaining!`
            }

            this.firstAttacker.health -= this.secondAttacker.attackDamage
            this.roundCounter++

            if (this.firstAttacker.health < 1) {
                if (this.firstTrainer.currentPokemon.hasOwnProperty(this.secondAttacker.name)) {
                    return `${this.firstTrainer.name}'s ${this.secondAttacker.name} wins!`
                }
                return `${this.secondTrainer.name}'s ${this.secondAttacker.name} wins!`
            }

            return `${this.secondAttacker.name} attacked with ${this.secondAttacker.move}! It did ${this.secondAttacker.attackDamage} damage to ${this.firstAttacker.name}! ${this.firstAttacker.name} has ${this.firstAttacker.health} hp remaining!`
        }


        if (this.firstAttacker.strongAgainst(this.secondAttacker.type)) {
            this.secondAttacker.health -= (Math.ceil(this.firstAttacker.attackDamage * 1.25))
            this.roundCounter++

            if (this.secondAttacker.health < 1) {

                if (this.firstTrainer.currentPokemon.hasOwnProperty(this.firstAttacker.name)) {
                    return `The attack was super effective and ${this.secondAttacker.name} fainted. ${this.firstTrainer.name}'s ${this.firstAttacker.name} wins!`
                }
                return `The attack was super effective and ${this.secondAttacker.name} fainted. ${this.secondTrainer.name}'s ${this.firstAttacker.name} wins!`
            }



            return `${this.firstAttacker.name} attacked with ${this.firstAttacker.move}! It did a boosted ${(Math.ceil(this.firstAttacker.attackDamage * 1.25))} damage to ${this.secondAttacker.name}! It's super effective! ${this.secondAttacker.name} has ${this.secondAttacker.health} hp remaining!`

        } else if (this.firstAttacker.weakAgainst(this.secondAttacker.type)) {
            this.secondAttacker.health -= (Math.floor(this.firstAttacker.attackDamage * 0.75))
            this.roundCounter++

            if (this.secondAttacker.health < 1) {

                if (this.firstTrainer.currentPokemon.hasOwnProperty(this.firstAttacker.name)) {
                    return `The attack was not very effective but ${this.secondAttacker.name} fainted. ${this.firstTrainer.name}'s ${this.firstAttacker.name} wins!`
                }
                return `The attack was not very effective but ${this.secondAttacker.name} fainted. ${this.secondTrainer.name}'s ${this.firstAttacker.name} wins!`
            }

            return `${this.firstAttacker.name} attacked with ${this.firstAttacker.move}! It did a reduced ${(Math.floor(this.firstAttacker.attackDamage * 0.75))} damage to ${this.secondAttacker.name}! It's not very effective! ${this.secondAttacker.name} has ${this.secondAttacker.health} hp remaining!`
        }

        this.secondAttacker.health -= this.firstAttacker.attackDamage
        this.roundCounter++

        if (this.secondAttacker.health < 1) {

            if (this.firstTrainer.currentPokemon.hasOwnProperty(this.firstAttacker.name)) {
                return `${this.firstTrainer.name}'s ${this.firstAttacker.name} wins!`
            }
            return `${this.secondTrainer.name}'s ${this.firstAttacker.name} wins!`
        }

        return `${this.firstAttacker.name} attacked with ${this.firstAttacker.move}! It did ${this.firstAttacker.attackDamage} damage to ${this.secondAttacker.name}! ${this.secondAttacker.name} has ${this.secondAttacker.health} hp remaining!`
    }

}

module.exports = { BattleArena, Battle }