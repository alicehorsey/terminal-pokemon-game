# Terminal Pokemon Battle Game

## About the Project
This project was the culmination of my Javascript fundamentals and Object-oriented Programming block on the Northcoders Coding Bootcamp. A two-day pair-programming sprint, our task was to implement a Pokemon battle game which could be played in the terminal using OOP and full TDD.

## Set up
In order the see an example of the game being played out please run `npm install` to install the required dev dependencies.

Once Jest has been installed you can run `npm run test` which will log a full version of an instance of the Pokemon battle to your console!

## Game talk through
The Pokemon each have a Pokemon Trainer (Red or Blue) which catch Pokemon (Charmander and Squirtle) and take them to the Battle Arena.

`Battle {
        firstTrainer: Trainer {
          name: 'Red',
          currentPokemon: { Squirtle: [Pokemon] },
          filledPokeballs: 1,
          maxFilledPokeballs: 6
        },
        secondTrainer: Trainer {
          name: 'Blue',
          currentPokemon: { Charmander: [Pokemon] },
          filledPokeballs: 1,
          maxFilledPokeballs: 6
        },
        firstAttacker: null,
        secondAttacker: null,
        roundCounter: 1
      }`

When the battle is ready to begin a randomly generated "who fights first?" function is called to find out which Pokemon will attack first.

`Squirtle attacks first`

The Pokemon Battle commences! As each Pokemon fights their attacks cause damage to the other Pokemon. Depending on whether Pokemon and stronger or weaker against eachother depends on whether damage points are boosted or reduced.

`Squirtle attacked with Bubble! It did a boosted 7 damage to Charmander! It's super effective! Charmander has 17 hp remaining!`
...
`Charmander attacked with Ember! It did a reduced 9 damage to Squirtle! It's not very effective! Squirtle has 31 hp remaining!`
...

Eventually the game ends as one of the Pokemon faints.

`The attack was super effective and Charmander fainted. Red's Squirtle wins!`

I hope you have fun watching!


## Future plans for the project:
1. Implementing some extra code to ensure that the whole game ends when the first Pokemon faints.
2. Creating a front end to the project so that there is a fun user interface for players to enjoy the game!
