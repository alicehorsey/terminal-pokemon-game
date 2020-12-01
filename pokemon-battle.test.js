const { Pokemon } = require("./pokemon");
const { Trainer } = require("./pokemon-trainer");
const { BattleArena, Battle } = require("./pokemon-battle");
const pokemon = require("./pokemon");

describe("Checking properties of created instances", () => {
    describe("Red Trainer", () => {
        test("Check first trainer's name is Red", () => {
            const redTrainer = new Trainer("Red");
            expect(redTrainer.name).toBe("Red");
        })

        test("Check what pokemon what Red has", () => {
            const redTrainer = new Trainer("Red");
            const rattata = new Pokemon("Rattata", 24, 7, "Rattata!", "Bite")
            redTrainer.catchPokemon(rattata);
            expect(redTrainer.currentPokemon).toEqual({
                "Rattata": {
                    name: 'Rattata',
                    health: 24,
                    attackDamage: 7,
                    sound: 'Rattata!',
                    move: 'Bite',
                    type: 'Normal'
                }
            });
        })

        test("Check that filledPokeballs shows how many pokemon Red has", () => {
            const redTrainer = new Trainer("Red");
            const rattata = new Pokemon("Rattata", 24, 7, "Rattata!", "Bite")
            redTrainer.catchPokemon(rattata);
            expect(redTrainer.filledPokeballs).toBe(1);
        })
    })

    describe("Blue Trainer", () => {
        test("Check first trainer's name is Blue", () => {
            const blueTrainer = new Trainer("Blue");
            expect(blueTrainer.name).toBe("Blue");
        })

        test("Check what pokemon what Blue has", () => {
            const zigzagoon = new Pokemon("Zigzagoon", 28, 6, "Zigzagoon!", "Tackle")
            const blueTrainer = new Trainer("Blue");
            blueTrainer.catchPokemon(zigzagoon);
            expect(blueTrainer.currentPokemon).toEqual({
                "Zigzagoon": {
                    name: 'Zigzagoon',
                    health: 28,
                    attackDamage: 6,
                    sound: 'Zigzagoon!',
                    move: 'Tackle',
                    type: 'Normal'
                }
            });
        })

        test("Check that filledPokeballs shows how many pokemon Blue has", () => {
            const zigzagoon = new Pokemon("Zigzagoon", 28, 6, "Zigzagoon!", "Tackle")
            const blueTrainer = new Trainer("Blue");
            blueTrainer.catchPokemon(zigzagoon);
            expect(blueTrainer.filledPokeballs).toBe(1);
        })
    })
})

describe("Testing the methods", () => {
    describe("Testing battle arena", () => {
        test("Check the battle arena has two trainers", () => {
            const firstBattle = new BattleArena("Peter", "Alice")
            expect(firstBattle.firstTrainer).toBe("Peter");
            expect(firstBattle.secondTrainer).toBe("Alice");
        })
        test("Check which pokemon the first trainer has - it should be rattata", () => {
            const rattata = new Pokemon("Rattata", 24, 7, "Rattata!", "Bite")
            const redTrainer = new Trainer("Red");
            redTrainer.catchPokemon(rattata);

            const zigzagoon = new Pokemon("Zigzagoon", 28, 6, "Zigzagoon!", "Tackle")
            const blueTrainer = new Trainer("Blue");
            blueTrainer.catchPokemon(zigzagoon);

            const testBattle = new BattleArena(redTrainer, blueTrainer)
            expect(testBattle.firstTrainer.name).toBe("Red")
            expect(Object.keys(testBattle.firstTrainer.currentPokemon)).toEqual(["Rattata"])
        })

        test("Check which pokemon the second trainer has - it should be zigzagoon", () => {
            const rattata = new Pokemon("Rattata", 24, 7, "Rattata!", "Bite")
            const redTrainer = new Trainer("Red");
            redTrainer.catchPokemon(rattata);

            const zigzagoon = new Pokemon("Zigzagoon", 28, 6, "Zigzagoon!", "Tackle")
            const blueTrainer = new Trainer("Blue");
            blueTrainer.catchPokemon(zigzagoon);

            const testBattle = new BattleArena(redTrainer, blueTrainer)

            expect(testBattle.secondTrainer.name).toBe("Blue")
            expect(Object.keys(testBattle.secondTrainer.currentPokemon)).toEqual(["Zigzagoon"])
        })
    })

    describe("Testing whoFightsFirst method", () => {
        test("When .whoFightsFirst() is invoked it returns a message saying who attacks first", () => {
            const redTrainer = new Trainer("Red");
            const blueTrainer = new Trainer("Blue");
            const rattata = new Pokemon("Rattata", 24, 7, "Rattata!", "Bite")
            const zigzagoon = new Pokemon("Zigzagoon", 28, 6, "Zigzagoon!", "Tackle")
            redTrainer.catchPokemon(rattata);
            blueTrainer.catchPokemon(zigzagoon);

            const testingBattle = new Battle(redTrainer, blueTrainer)

            const redPokemon = redTrainer.currentPokemon.Rattata.name
            const bluePokemon = blueTrainer.currentPokemon.Zigzagoon.name

            // console.log(testingBattle.whoFightsFirst(redPokemon, bluePokemon)) //<--- console.log shows random return messages (these work!)
            expect(typeof testingBattle.whoFightsFirst(redPokemon, bluePokemon)).toBe("string")
        })
        test("When .whoFightsFirst() is invoked the firstAttacker and secondAttacker values are updated", () => {
            const redTrainer = new Trainer("Red");
            const blueTrainer = new Trainer("Blue");
            const rattata = new Pokemon("Rattata", 24, 7, "Rattata!", "Bite")
            const zigzagoon = new Pokemon("Zigzagoon", 28, 6, "Zigzagoon!", "Tackle")
            redTrainer.catchPokemon(rattata);
            blueTrainer.catchPokemon(zigzagoon);

            const testingBattle = new Battle(redTrainer, blueTrainer)
            const redPokemon = redTrainer.currentPokemon.Rattata.name
            const bluePokemon = blueTrainer.currentPokemon.Zigzagoon.name
            testingBattle.whoFightsFirst(redPokemon, bluePokemon)
            // console.log(testingBattle.firstAttacker) //<--- this returns one pokemon object with all properties correctly 
            // console.log(testingBattle.secondAttacker) //<--- this returns the other pokemon object with all properties correctly 
            expect(testingBattle.firstAttacker).not.toBe(null)
            expect(testingBattle.secondAttacker).not.toBe(null)
        })
    })

    describe("Fight Method. Due to the random nature of finding out who attacks first and second using the whoFightsFirst method, we have just defined who is first and second explicitly for these tests.", () => {
        test("Every time the fight method is called the round counter increases by 1", () => {
            const redTrainer = new Trainer("Red");
            const blueTrainer = new Trainer("Blue");
            const rattata = new Pokemon("Rattata", 24, 7, "Rattata!", "Bite")
            const zigzagoon = new Pokemon("Zigzagoon", 28, 6, "Zigzagoon!", "Tackle")
            redTrainer.catchPokemon(rattata);
            blueTrainer.catchPokemon(zigzagoon);

            const testingBattle = new Battle(redTrainer, blueTrainer)
            const redPokemon = redTrainer.currentPokemon.Rattata
            const bluePokemon = blueTrainer.currentPokemon.Zigzagoon
            testingBattle.firstAttacker = redPokemon
            testingBattle.secondAttacker = bluePokemon

            expect(testingBattle.roundCounter).toBe(1)
            testingBattle.fight()
            expect(testingBattle.roundCounter).toBe(2)
            testingBattle.fight()
            expect(testingBattle.roundCounter).toBe(3)
        })

        test("When fight method is called and the round number is odd,firstAttacker attacks and secondAttacker's health goes down", () => {
            const redTrainer = new Trainer("Red");
            const blueTrainer = new Trainer("Blue");
            const rattata = new Pokemon("Rattata", 24, 7, "Rattata!", "Bite")
            const zigzagoon = new Pokemon("Zigzagoon", 28, 6, "Zigzagoon!", "Tackle")
            redTrainer.catchPokemon(rattata);
            blueTrainer.catchPokemon(zigzagoon);

            const testingBattle = new Battle(redTrainer, blueTrainer)
            const redPokemon = redTrainer.currentPokemon.Rattata
            const bluePokemon = blueTrainer.currentPokemon.Zigzagoon
            testingBattle.firstAttacker = redPokemon
            testingBattle.secondAttacker = bluePokemon

            expect(testingBattle.secondAttacker.health).toBe(28)
            testingBattle.fight()
            expect(testingBattle.secondAttacker.health).toBe(21)
        })

        test("When fight method is called and the round number is even,secondAttacker attacks and firstAttacker's health goes down", () => {
            const redTrainer = new Trainer("Red");
            const blueTrainer = new Trainer("Blue");
            const rattata = new Pokemon("Rattata", 24, 7, "Rattata!", "Bite")
            const zigzagoon = new Pokemon("Zigzagoon", 28, 6, "Zigzagoon!", "Tackle")
            redTrainer.catchPokemon(rattata);
            blueTrainer.catchPokemon(zigzagoon);

            const testingBattle = new Battle(redTrainer, blueTrainer)
            const redPokemon = redTrainer.currentPokemon.Rattata
            const bluePokemon = blueTrainer.currentPokemon.Zigzagoon
            testingBattle.firstAttacker = redPokemon
            testingBattle.secondAttacker = bluePokemon

            testingBattle.fight()
            expect(testingBattle.firstAttacker.health).toBe(24)
            testingBattle.fight()
            expect(testingBattle.firstAttacker.health).toBe(18)
        })

        test("When fight method is called, returns a string", () => {
            const redTrainer = new Trainer("Red");
            const blueTrainer = new Trainer("Blue");
            const rattata = new Pokemon("Rattata", 24, 7, "Rattata!", "Bite")
            const zigzagoon = new Pokemon("Zigzagoon", 28, 6, "Zigzagoon!", "Tackle")
            redTrainer.catchPokemon(rattata);
            blueTrainer.catchPokemon(zigzagoon);

            const testingBattle = new Battle(redTrainer, blueTrainer)
            const redPokemon = redTrainer.currentPokemon.Rattata
            const bluePokemon = blueTrainer.currentPokemon.Zigzagoon
            testingBattle.firstAttacker = redPokemon
            testingBattle.secondAttacker = bluePokemon

            expect(typeof testingBattle.fight()).toBe("string")
        })

        test("When fight method is called, it is the first round, and the both pokemon's health is above 0, returns a string saying the first pokemon attacked with its move, the damage it did, and the second pokemon's remaining health.", () => {
            const redTrainer = new Trainer("Red");
            const blueTrainer = new Trainer("Blue");
            const rattata = new Pokemon("Rattata", 24, 7, "Rattata!", "Bite")
            const zigzagoon = new Pokemon("Zigzagoon", 28, 6, "Zigzagoon!", "Tackle")
            redTrainer.catchPokemon(rattata);
            blueTrainer.catchPokemon(zigzagoon);

            const testingBattle = new Battle(redTrainer, blueTrainer)
            const redPokemon = redTrainer.currentPokemon.Rattata
            const bluePokemon = blueTrainer.currentPokemon.Zigzagoon
            testingBattle.firstAttacker = redPokemon
            testingBattle.secondAttacker = bluePokemon

            expect(testingBattle.fight()).toBe("Rattata attacked with Bite! It did 7 damage to Zigzagoon! Zigzagoon has 21 hp remaining!")
        })

        test("When fight method is called, it is the second round, and the both pokemon's health is above 0, returns a string saying the second pokemon attacked with its move, the damage it did, and the first pokemon's remaining health.", () => {
            const redTrainer = new Trainer("Red");
            const blueTrainer = new Trainer("Blue");
            const rattata = new Pokemon("Rattata", 24, 7, "Rattata!", "Bite")
            const zigzagoon = new Pokemon("Zigzagoon", 28, 6, "Zigzagoon!", "Tackle")
            redTrainer.catchPokemon(rattata);
            blueTrainer.catchPokemon(zigzagoon);

            const testingBattle = new Battle(redTrainer, blueTrainer)
            const redPokemon = redTrainer.currentPokemon.Rattata
            const bluePokemon = blueTrainer.currentPokemon.Zigzagoon
            testingBattle.firstAttacker = redPokemon
            testingBattle.secondAttacker = bluePokemon

            testingBattle.fight();
            expect(testingBattle.fight()).toBe("Zigzagoon attacked with Tackle! It did 6 damage to Rattata! Rattata has 18 hp remaining!")
        })

        test("When fight method is called, if first pokemon attacks and second pokemon's health drops to 0 or lower, return a message saying first pokemon won.", () => {
            const redTrainer = new Trainer("Red");
            const blueTrainer = new Trainer("Blue");
            const rattata = new Pokemon("Rattata", 24, 7, "Rattata!", "Bite")
            const zigzagoon = new Pokemon("Zigzagoon", 28, 6, "Zigzagoon!", "Tackle")
            redTrainer.catchPokemon(rattata);
            blueTrainer.catchPokemon(zigzagoon);

            const testingBattle = new Battle(redTrainer, blueTrainer)
            const redPokemon = redTrainer.currentPokemon.Rattata
            const bluePokemon = blueTrainer.currentPokemon.Zigzagoon
            testingBattle.firstAttacker = redPokemon
            testingBattle.secondAttacker = bluePokemon

            testingBattle.fight();
            testingBattle.fight();
            testingBattle.fight();
            testingBattle.fight();
            testingBattle.fight();
            testingBattle.fight();
            expect(testingBattle.fight()).toBe("Red's Rattata wins!");
        })

        test("When fight method is called, if first pokemon attacks and second pokemon's health drops to 0 or lower, return a message saying first pokemon won.", () => {
            const redTrainer = new Trainer("Red");
            const blueTrainer = new Trainer("Blue");
            const rattata = new Pokemon("Rattata", 24, 5, "Rattata!", "Bite")
            const zigzagoon = new Pokemon("Zigzagoon", 28, 7, "Zigzagoon!", "Tackle")
            redTrainer.catchPokemon(rattata);
            blueTrainer.catchPokemon(zigzagoon);

            const testingBattle = new Battle(redTrainer, blueTrainer)
            const redPokemon = redTrainer.currentPokemon.Rattata
            const bluePokemon = blueTrainer.currentPokemon.Zigzagoon
            testingBattle.firstAttacker = redPokemon
            testingBattle.secondAttacker = bluePokemon

            testingBattle.fight();
            testingBattle.fight();
            testingBattle.fight();
            testingBattle.fight();
            testingBattle.fight();
            testingBattle.fight();
            testingBattle.fight();
            expect(testingBattle.fight()).toBe("Blue's Zigzagoon wins!");
        })
        describe("Testing Strengths and Weaknesses", () => {
            test("If attacking pokemon is strong against defending pokemon returns a string", () => {
                const redTrainer = new Trainer("Red");
                const blueTrainer = new Trainer("Blue");
                const charmander = new Pokemon("Charmander", 24, 12, "Charmander!", "Ember", "Fire");
                const bulbasaur = new Pokemon("Bulbasaur", 36, 6, "Bulbasaur!", "Vine Whip", "Grass");
                redTrainer.catchPokemon(charmander);
                blueTrainer.catchPokemon(bulbasaur);

                const testingBattle = new Battle(redTrainer, blueTrainer)
                const redPokemon = redTrainer.currentPokemon.Charmander
                const bluePokemon = blueTrainer.currentPokemon.Bulbasaur
                testingBattle.firstAttacker = redPokemon
                testingBattle.secondAttacker = bluePokemon
                expect(typeof testingBattle.fight()).toBe("string");

            })
            test("If attacking pokemon is strong against defending pokemon in an odd numbered round returns a super effective damage message", () => {
                const redTrainer = new Trainer("Red");
                const blueTrainer = new Trainer("Blue");
                const charmander = new Pokemon("Charmander", 24, 12, "Charmander!", "Ember", "Fire");
                const bulbasaur = new Pokemon("Bulbasaur", 36, 6, "Bulbasaur!", "Vine Whip", "Grass");
                redTrainer.catchPokemon(charmander);
                blueTrainer.catchPokemon(bulbasaur);

                const testingBattle = new Battle(redTrainer, blueTrainer)
                const redPokemon = redTrainer.currentPokemon.Charmander
                const bluePokemon = blueTrainer.currentPokemon.Bulbasaur
                testingBattle.firstAttacker = redPokemon
                testingBattle.secondAttacker = bluePokemon
                expect(testingBattle.fight()).toBe("Charmander attacked with Ember! It did a boosted 15 damage to Bulbasaur! It's super effective! Bulbasaur has 21 hp remaining!");
            })
            test("If attacking pokemon is strong against defending pokemon in an even numbered round returns a super effective damage message", () => {
                const redTrainer = new Trainer("Red");
                const blueTrainer = new Trainer("Blue");
                const squirtle = new Pokemon("Squirtle", 40, 5, "Squirtle!", "Bubble", "Water");
                const bulbasaur = new Pokemon("Bulbasaur", 36, 6, "Bulbasaur!", "Vine Whip", "Grass");
                redTrainer.catchPokemon(squirtle);
                blueTrainer.catchPokemon(bulbasaur);

                const testingBattle = new Battle(redTrainer, blueTrainer)
                const redPokemon = redTrainer.currentPokemon.Squirtle
                const bluePokemon = blueTrainer.currentPokemon.Bulbasaur
                testingBattle.firstAttacker = redPokemon
                testingBattle.secondAttacker = bluePokemon
                testingBattle.fight()
                expect(testingBattle.fight()).toBe("Bulbasaur attacked with Vine Whip! It did a boosted 8 damage to Squirtle! It's super effective! Squirtle has 32 hp remaining!");
            })

            test("If attacking pokemon is weak against defending pokemon returns a string", () => {
                const redTrainer = new Trainer("Red");
                const blueTrainer = new Trainer("Blue");
                const charmander = new Pokemon("Charmander", 24, 12, "Charmander!", "Ember", "Fire");
                const bulbasaur = new Pokemon("Bulbasaur", 36, 6, "Bulbasaur!", "Vine Whip", "Grass");
                redTrainer.catchPokemon(bulbasaur);
                blueTrainer.catchPokemon(charmander);

                const testingBattle = new Battle(redTrainer, blueTrainer)
                const redPokemon = redTrainer.currentPokemon.Bulbasaur
                const bluePokemon = blueTrainer.currentPokemon.Charmander
                testingBattle.firstAttacker = redPokemon
                testingBattle.secondAttacker = bluePokemon
                expect(typeof testingBattle.fight()).toBe("string");

            })
            test("If attacking pokemon is weak against defending pokemon in an odd numbered round returns the not very effective message", () => {
                const redTrainer = new Trainer("Red");
                const blueTrainer = new Trainer("Blue");
                const charmander = new Pokemon("Charmander", 24, 12, "Charmander!", "Ember", "Fire");
                const bulbasaur = new Pokemon("Bulbasaur", 36, 6, "Bulbasaur!", "Vine Whip", "Grass");
                redTrainer.catchPokemon(bulbasaur);
                blueTrainer.catchPokemon(charmander);

                const testingBattle = new Battle(redTrainer, blueTrainer)
                const redPokemon = redTrainer.currentPokemon.Bulbasaur
                const bluePokemon = blueTrainer.currentPokemon.Charmander
                testingBattle.firstAttacker = redPokemon
                testingBattle.secondAttacker = bluePokemon

                expect(testingBattle.fight()).toBe("Bulbasaur attacked with Vine Whip! It did a reduced 4 damage to Charmander! It's not very effective! Charmander has 20 hp remaining!");

            })
            test("If attacking pokemon is weak against defending pokemon in an even numbered round returns the not very effective message", () => {
                const redTrainer = new Trainer("Red");
                const blueTrainer = new Trainer("Blue");
                const charmander = new Pokemon("Charmander", 24, 12, "Charmander!", "Ember", "Fire");
                const squirtle = new Pokemon("Squirtle", 40, 5, "Squirtle!", "Bubble", "Water");
                redTrainer.catchPokemon(squirtle);
                blueTrainer.catchPokemon(charmander);

                const testingBattle = new Battle(redTrainer, blueTrainer)
                const redPokemon = redTrainer.currentPokemon.Squirtle
                const bluePokemon = blueTrainer.currentPokemon.Charmander
                testingBattle.firstAttacker = redPokemon
                testingBattle.secondAttacker = bluePokemon
                testingBattle.fight()
                expect(testingBattle.fight()).toBe("Charmander attacked with Ember! It did a reduced 9 damage to Squirtle! It's not very effective! Squirtle has 31 hp remaining!");

            })

            test("If attacking pokemon is strong against defending pokemon in an odd numbered round and wins, a super effective winning message shows", () => {
                const redTrainer = new Trainer("Red");
                const blueTrainer = new Trainer("Blue");
                const charmander = new Pokemon("Charmander", 24, 12, "Charmander!", "Ember", "Fire");
                const bulbasaur = new Pokemon("Bulbasaur", 36, 6, "Bulbasaur!", "Vine Whip", "Grass");
                redTrainer.catchPokemon(charmander);
                blueTrainer.catchPokemon(bulbasaur);

                const testingBattle = new Battle(redTrainer, blueTrainer)
                const redPokemon = redTrainer.currentPokemon.Charmander
                const bluePokemon = blueTrainer.currentPokemon.Bulbasaur
                testingBattle.firstAttacker = redPokemon
                testingBattle.secondAttacker = bluePokemon
                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                expect(testingBattle.fight()).toBe("The attack was super effective and Bulbasaur fainted. Red's Charmander wins!");
            })
            test("If attacking pokemon is strong against defending pokemon in an even numbered round and wins, a super effective winning message shows", () => {
                const redTrainer = new Trainer("Red");
                const blueTrainer = new Trainer("Blue");
                const squirtle = new Pokemon("Squirtle", 40, 5, "Squirtle!", "Bubble", "Water");
                const bulbasaur = new Pokemon("Bulbasaur", 36, 6, "Bulbasaur!", "Vine Whip", "Grass");
                redTrainer.catchPokemon(squirtle);
                blueTrainer.catchPokemon(bulbasaur);

                const testingBattle = new Battle(redTrainer, blueTrainer)
                const redPokemon = redTrainer.currentPokemon.Squirtle
                const bluePokemon = blueTrainer.currentPokemon.Bulbasaur
                testingBattle.firstAttacker = redPokemon
                testingBattle.secondAttacker = bluePokemon
                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                expect(testingBattle.fight()).toBe("The attack was super effective and Squirtle fainted. Blue's Bulbasaur wins!");
            })

            test("If attacking pokemon is weak against defending pokemon in an odd numbered round and wins, a not very effective winning message shows", () => {
                const redTrainer = new Trainer("Red");
                const blueTrainer = new Trainer("Blue");
                const charmander = new Pokemon("Charmander", 24, 12, "Charmander!", "Ember", "Fire");
                const bulbasaur = new Pokemon("Bulbasaur", 360, 6, "Bulbasaur!", "Vine Whip", "Grass");
                redTrainer.catchPokemon(bulbasaur);
                blueTrainer.catchPokemon(charmander);

                const testingBattle = new Battle(redTrainer, blueTrainer)
                const redPokemon = redTrainer.currentPokemon.Bulbasaur
                const bluePokemon = blueTrainer.currentPokemon.Charmander
                testingBattle.firstAttacker = redPokemon
                testingBattle.secondAttacker = bluePokemon

                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                expect(testingBattle.fight()).toBe("The attack was not very effective but Charmander fainted. Red's Bulbasaur wins!");
            })

            test("If attacking pokemon is weak against defending pokemon in an even numbered round returns the not very effective message", () => {
                const redTrainer = new Trainer("Red");
                const blueTrainer = new Trainer("Blue");
                const charmander = new Pokemon("Charmander", 24, 12, "Charmander!", "Ember", "Fire");
                const squirtle = new Pokemon("Squirtle", 40, 5, "Squirtle!", "Bubble", "Water");
                redTrainer.catchPokemon(squirtle);
                blueTrainer.catchPokemon(charmander);

                const testingBattle = new Battle(redTrainer, blueTrainer)
                const redPokemon = redTrainer.currentPokemon.Squirtle
                const bluePokemon = blueTrainer.currentPokemon.Charmander
                testingBattle.firstAttacker = redPokemon
                testingBattle.secondAttacker = bluePokemon
                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                testingBattle.fight()
                expect(testingBattle.fight()).toBe("The attack was not very effective but Squirtle fainted. Blue's Charmander wins!");
            })
        })
    })
})

describe("Playing the Game in the Terminal!", () => {

    //In order the see the console logs for the game playing out in the terminal, please run "npm test" in the terminal! The first Pokemon to attack is chosen at random and is either Charmander or Squirtle in this example game...

    test.only("Playing the game! - console logs show a full game being played, each time a battle arena is created and a log shows which Pokemon will attack first (generated at random)", () => {
        const redTrainer = new Trainer("Red");
        // console.log(redTrainer)
        const blueTrainer = new Trainer("Blue");
        // console.log(blueTrainer)
        const charmander = new Pokemon("Charmander", 24, 12, "Charmander!", "Ember", "Fire");
        // console.log(charmander)
        const squirtle = new Pokemon("Squirtle", 40, 5, "Squirtle!", "Bubble", "Water");
        // console.log(squirtle)
        redTrainer.catchPokemon(squirtle);
        // console.log(redTrainer)
        blueTrainer.catchPokemon(charmander);
        // console.log(blueTrainer)

        const testingBattle = new Battle(redTrainer, blueTrainer)
        console.log(testingBattle)

        console.log(testingBattle.whoFightsFirst(redTrainer.currentPokemon.Squirtle.name, blueTrainer.currentPokemon.Charmander.name))

        console.log(testingBattle.fight())
        console.log(testingBattle.fight())
        console.log(testingBattle.fight())
        console.log(testingBattle.fight())
        console.log(testingBattle.fight())
        console.log(testingBattle.fight())
        console.log(testingBattle.fight())
        console.log(testingBattle.fight())


        //The console logs may go past the point of one of the Pokemon winning!
        // Further code is coming soon to make sure that the game fully ends when one of the Pokemon faints!!! 
    })

})







// Useful characters and information used in the tests:

// const redTrainer = new Trainer("Red");
// const blueTrainer = new Trainer("Blue");

// const rattata = new Pokemon("Rattata", 24, 7, "Rattata!", "Bite")
// const zigzagoon = new Pokemon("Zigzagoon", 28, 6, "Zigzagoon!", "Tackle")
// const bulbasaur = new Pokemon("Bulbasaur", 36, 6, "Bulbasaur!", "Vine Whip", "Grass");
// const charmander = new Pokemon("Charmander", 24, 12, "Charmander!", "Ember", "Fire");
// const squirtle = new Pokemon("Squirtle", 40, 5, "Squirtle!", "Bubble", "Water");

// redTrainer.catchPokemon(rattata);
// blueTrainer.catchPokemon(zigzagoon);

// const testBattle = new BattleArena(redTrainer, blueTrainer)