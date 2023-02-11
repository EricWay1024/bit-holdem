Front-end pages

- Room list

  - a list of available rooms
    - when click on each room, enter your username and the password (set by the admin) to join
  - a button to create a new room
    - when clicked, enter your name and set the password for the room. you'll be the admin (dealer). you can choose whether you're in the game. you can set the blind for the room. is there time limit for each action and how much.

- in the game

  - the game:
    - has an admin
    - has a fixed set of players
    - has several rounds. each round
      - has the button position (who's the BB, SB, dealer, etc)
      - has the blind level (might raise blinds as time goes by)
      - has several stages. each stage
        - the pot size
        - the list of players still in the game
        - the last aggressor's action (history of all actions before the current actor)
        - the player who's acting
        - possible actions for the current player
        - the time remaining for the player (if set)
      - when all-in, can be different

  ```
  procedure: round
  change button
  dealer clicks on "start betting" after dealing cards for each player
  betting:
  	each play makes an option
  	ends until every play puts in the same amount or only one player is in the game
  	if <= 1 player in the game has not been all-in, simply run all rounds
  dealer clicks on "start betting" after dealing the flop cards
  betting (repeat)
  dealer deals the turn card
  betting
  dealer deals the river card
  betting
  if show down is needed:
  	dealer determines who wins the pot or is it a split. dealer input that info and the chips get allocated.
  otherwise:
  	all chips goes to the only player (when all other players fold) 
  ```

the game page:

- my stack size
- the pot size
- actions of each player before me
- time remaining
- options:
  - check, fold, bet, raise
  - 1/3 bet, 1/2 bet, etc, all-in, and custom bet size
  - if all-in already, no option