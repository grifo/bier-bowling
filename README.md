# Bier Bowling

## Demo

http://gri.fo/bier-bowling/

## Rules

The game consists of 10 frames as shown above.  In each frame the player has two opportunities to knock down 10 pins. The score for the frame is the total number of pins knocked down, plus bonuses for strikes and spares and the score of the last frame.

A **spare** is when the player knocks down all 10 pins in two tries. The bonus for that frame is the number of pins knocked down by the next roll.

A **strike** is when the player knocks down all 10 pins on his first try. The bonus for that frame is the value of the next two balls rolled.

In the tenth frame a player who rolls a spare or strike is allowed to roll the extra balls to complete the frame. However no more than three balls can be rolled in.

One game should goal 300 points performing 12 strikes.

    9 x (10 + 10 + 10) + (10 + 10 + 10) = 300

## Tests

http://gri.fo/bier-bowling/test/