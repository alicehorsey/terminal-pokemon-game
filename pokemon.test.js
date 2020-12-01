const pokemon = require("./pokemon");
const { Pokemon } = require("./pokemon");

describe("Pokemon", () => {
    describe("Testing the new instance", () => {
        test("Creates an object", () => {
            expect(typeof new Pokemon).toBe("object");
        })

        test("Check the instance's properties", () => {
            const expectedOutcome = [
                "name",
                "health",
                "attackDamage",
                "sound",
                "move",
                "type",
            ]
            const testPokemon = new Pokemon;
            expect(Object.keys(testPokemon)).toEqual(expectedOutcome)
        })

        test("Check the pokemon's name when passed as name argument", () => {
            const rattata = new Pokemon("Rattata");
            expect(rattata.name).toBe("Rattata");
        })

        test("Check the pokemon's health when passed a name and health argument", () => {
            const rattata = new Pokemon("Rattata", 24);
            expect(rattata.name).toBe("Rattata");
            expect(rattata.health).toBe(24);
        })

        test("Check the pokemon's Attack Damage when passed a name, health value, and attackDamage value argument", () => {
            const rattata = new Pokemon("Rattata", 24, 7);
            expect(rattata.name).toBe("Rattata");
            expect(rattata.health).toBe(24);
            expect(rattata.attackDamage).toBe(7);
        })

        test("Check what sound the pokemon makes when passed a name, health value, attackDamage value, and sound argument", () => {
            const rattata = new Pokemon("Rattata", 24, 7, "Rattata!");
            expect(rattata.name).toBe("Rattata");
            expect(rattata.health).toBe(24);
            expect(rattata.attackDamage).toBe(7);
            expect(rattata.sound).toBe("Rattata!");
        })

        test("Check what move the pokemon uses when passed a name, health value, attackDamage value, sound, and move argument", () => {
            const rattata = new Pokemon("Rattata", 24, 7, "Rattata!", "Bite");
            expect(rattata.name).toBe("Rattata");
            expect(rattata.health).toBe(24);
            expect(rattata.attackDamage).toBe(7);
            expect(rattata.sound).toBe("Rattata!");
            expect(rattata.move).toBe("Bite");
        })

        test("Check the pokemon's default type is 'normal' when all the arguments except a type is passed", () => {
            const rattata = new Pokemon("Rattata", 24, 7, "Rattata!", "Bite");
            expect(rattata.name).toBe("Rattata");
            expect(rattata.health).toBe(24);
            expect(rattata.attackDamage).toBe(7);
            expect(rattata.sound).toBe("Rattata!");
            expect(rattata.move).toBe("Bite");
            expect(rattata.type).toBe("Normal")
        })

        test("Check the pokemon's type can be re-assigned", () => {
            const bulbasaur = new Pokemon("Bulbasaur", 36, 6, "Bulbasaur!", "Vine Whip", "Grass");
            const charmander = new Pokemon("Charmander", 24, 12, "Charmander!", "Ember", "Fire");
            const squirtle = new Pokemon("Squirtle", 40, 5, "Squirtle!", "Bubble", "Water");
            expect(bulbasaur.type).toBe("Grass")
            expect(charmander.type).toBe("Fire")
            expect(squirtle.type).toBe("Water")
        })
    })

    describe("Testing the instance's methods", () => {
        // test("Check what pokemon is strong against", () => {

        //     const rattata = new Pokemon("Rattata", 24, 7, "Rattata!", "Bite");
        //     const bulbasaur = new Pokemon("Bulbasaur", 36, 6, "Bulbasaur!", "Vine Whip", "Grass");
        //     const charmander = new Pokemon("Charmander", 24, 12, "Charmander!", "Ember", "Fire");
        //     const squirtle = new Pokemon("Squirtle", 40, 5, "Squirtle!", "Bubble", "Water");

        //     expect(rattata.strongAgainst()).toBe("This pokemon is not strong against anything")
        //     expect(bulbasaur.strongAgainst()).toBe("This pokemon is strong against Water types")
        //     expect(charmander.strongAgainst()).toBe("This pokemon is strong against Grass types")
        //     expect(squirtle.strongAgainst()).toBe("This pokemon is strong against Fire types")
        // })

        test("Check what pokemon is strong against - returning a boolean true if it is stronger, false if not", () => {
            const rattata = new Pokemon("Rattata", 24, 7, "Rattata!", "Bite");
            const bulbasaur = new Pokemon("Bulbasaur", 36, 6, "Bulbasaur!", "Vine Whip", "Grass");
            const charmander = new Pokemon("Charmander", 24, 12, "Charmander!", "Ember", "Fire");
            const squirtle = new Pokemon("Squirtle", 40, 5, "Squirtle!", "Bubble", "Water");
            expect(rattata.strongAgainst(bulbasaur.type)).toBe(false)
            expect(bulbasaur.strongAgainst(squirtle.type)).toBe(true)
            expect(charmander.strongAgainst(bulbasaur.type)).toBe(true)
            expect(squirtle.strongAgainst(rattata.type)).toBe(false)
        })

        // test("Check what pokemon is weak against", () => {

        //     const rattata = new Pokemon("Rattata", 24, 7, "Rattata!", "Bite");
        //     const bulbasaur = new Pokemon("Bulbasaur", 36, 6, "Bulbasaur!", "Vine Whip", "Grass");
        //     const charmander = new Pokemon("Charmander", 24, 12, "Charmander!", "Ember", "Fire");
        //     const squirtle = new Pokemon("Squirtle", 40, 5, "Squirtle!", "Bubble", "Water");

        //     expect(rattata.weakAgainst()).toBe("This pokemon is not weak against anything")
        //     expect(bulbasaur.weakAgainst()).toBe("This pokemon is weak against Fire types")
        //     expect(charmander.weakAgainst()).toBe("This pokemon is weak against Water types")
        //     expect(squirtle.weakAgainst()).toBe("This pokemon is weak against Grass types")
        // })

        test("Check what pokemon is weak against - returning a boolean true if it is stronger, false if not", () => {
            const rattata = new Pokemon("Rattata", 24, 7, "Rattata!", "Bite");
            const bulbasaur = new Pokemon("Bulbasaur", 36, 6, "Bulbasaur!", "Vine Whip", "Grass");
            const charmander = new Pokemon("Charmander", 24, 12, "Charmander!", "Ember", "Fire");
            const squirtle = new Pokemon("Squirtle", 40, 5, "Squirtle!", "Bubble", "Water");
            expect(rattata.weakAgainst("Fighting")).toBe(true)
            expect(bulbasaur.weakAgainst(charmander.type)).toBe(true)
            expect(charmander.weakAgainst(bulbasaur.type)).toBe(false)
            expect(squirtle.weakAgainst(rattata.type)).toBe(false)
        })

        test("Check what sound the pokemon makes", () => {
            const rattata = new Pokemon("Rattata", 24, 7, "Rattata!", "Bite");
            expect(rattata.soundMade()).toBe("Rattata!")
        })

        test("Checks what move it is using", () => {
            const rattata = new Pokemon("Rattata", 24, 7, "Rattata!", "Bite");
            expect(rattata.useYourMoves()).toBe("Bite")
        })
    })
})

