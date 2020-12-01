const { Trainer } = require("./pokemon-trainer")
const { Pokemon } = require("./pokemon")

describe("Pokemon Trainer", () => {
    describe("Testing the instance and its properties and values", () => {
        test("Creates a new instance of Trainer", () => {
            expect(typeof new Trainer).toBe("object")
        })
        test("Check the new instance of Trainer has the correct properties", () => {
            const expectedOutput = [
                "name",
                "currentPokemon",
                "filledPokeballs",
                "maxFilledPokeballs"
            ]
            const testTrainer = new Trainer
            expect(Object.keys(testTrainer)).toEqual(expectedOutput)
        })
        test("Check initial values of Trainer", () => {
            const testTrainer = new Trainer("Red")
            const expectedOutput = [
                "Red",
                {},
                0,
                6
            ]
            expect(Object.values(testTrainer)).toEqual(expectedOutput)
        })
        test("Check 2 new trainers are not the same", () => {
            const redTrainer = new Trainer("Red")
            const blueTrainer = new Trainer("Blue")
            expect(redTrainer).not.toBe(blueTrainer)
        })
    })
    describe("Checking the new methods for Trainer", () => {
        test("catchPokemon", () => {
            const testTrainer = new Trainer("Red")
            const rattata = new Pokemon("Rattata", 24, 7, "Rattata!", "Bite")

            testTrainer.catchPokemon(rattata);

            expect(testTrainer.currentPokemon).toEqual({
                "Rattata": {
                    name: 'Rattata',
                    health: 24,
                    attackDamage: 7,
                    sound: 'Rattata!',
                    move: 'Bite',
                    type: 'Normal'
                }
            });
            expect(testTrainer.filledPokeballs).toBe(1);
        })
    })
})
