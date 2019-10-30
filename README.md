# Ceros Ski Code Challenge

Welcome to the Ceros Code Challenge - Ski Edition!

For this challenge, we have included some base code for Ceros Ski, our version of the classic Windows game SkiFree. If
you've never heard of SkiFree, Google has plenty of examples. Better yet, you can play our version here: 
http://ceros-ski.herokuapp.com/  

Or deploy it locally by running:
```
npm install
npm run dev
```

There is no exact time limit on this challenge and we understand that everyone has varying levels of free time. We'd 
rather you take the time and produce a solution up to your ability than rush and turn in a suboptimal challenge. Please 
look through the requirements below and let us know when you will have something for us to look at. If anything is 
unclear, don't hesitate to reach out.

**Requirements**

* **Fix a bug:**

  There is a bug in the game. Well, at least one bug that we know of. Use the following bug report to debug the code
  and fix it.
  * Steps to Reproduce:
    1. Load the game
    1. Crash into an obstacle
    1. Press the left arrow key
  * Expected Result: The skier gets up and is facing to the left
  * Actual Result: Giant blizzard occurs causing the screen to turn completely white (or maybe the game just crashes!)
  
* **Write unit tests:**

  The base code has Jest, a unit testing framework, installed. Write some unit tests to ensure that the above mentioned
  bug does not come back.
  
* **Extend existing functionality:**

  We want to see your ability to extend upon a part of the game that already exists. Add in the ability for the skier to 
  jump. The asset file for jumps is already included. All you gotta do is make the guy jump. We even included some jump 
  trick assets if you wanted to get really fancy!
  * Have the skier jump by either pressing a key or use the ramp asset to have the skier jump whenever he hits a ramp.
  * The skier should be able to jump over some obstacles while in the air. 
    * Rocks can be jumped over
    * Trees can NOT be jumped over
  * Anything else you'd like to add to the skier's jumping ability, go for it!
   
* **Build something new:**

  Now it's time to add something completely new. In the original Ski Free game, if you skied for too long, 
  a yeti would chase you down and eat you. In Ceros Ski, we've provided assets for a Rhino to run after the skier, 
  catch him and eat him.
  * The Rhino should appear after a set amount of time or distance skied and chase the skier, using the running assets
    we've provided to animate the rhino.
  * If the rhino catches the skier, it's game over and the rhino should eat the skier. 

* **Documentation:**

  * Update this README file with your comments about your work; what was done, what wasn't, features added & known bugs.
  * Provide a way for us to view the completed code and run it, either locally or through a cloud provider
  
* **Be original:**  
  * This should go without saying but don’t copy someone else’s game implementation!

**Grading** 

Your challenge will be graded based upon the following:

* How well you've followed the instructions. Did you do everything we said you should do?
* The quality of your code. We have a high standard for code quality and we expect all code to be up to production 
  quality before it gets to code review. Is it clean, maintainable, unit-testable, and scalable?
* The design of your solution and your ability to solve complex problems through simple and easy to read solutions.
* The effectiveness of your unit tests. Your tests should properly cover the code and methods being tested.
* How well you document your solution. We want to know what you did and why you did it.

**Bonus**

*Note: You won’t be marked down for excluding any of this, it’s purely bonus.  If you’re really up against the clock, 
make sure you complete all of the listed requirements and to focus on writing clean, well organized, and well documented 
code before taking on any of the bonus.*

If you're having fun with this, feel free to add more to it. Here's some ideas or come up with your own. We love seeing 
how creative candidates get with this.
 
* Provide a way to reset the game once it's over
* Provide a way to pause and resume the game
* Add a score that increments as the skier skis further
* Increase the difficulty the longer the skier skis (increase speed, increase obstacle frequency, etc.)
* Deploy the game to a server so that we can play it without having to install it locally
* Write more unit tests for your code

We are looking forward to see what you come up with!



***GEORGE KOMEN PROGRESS***
1.) Crash bug fixed (*Actually two bugs, turning left or right after a crash*).

Bug Description : Turning skier left after crashing into a rock or a tree caused the whole game to crash and end.

**Root cause:**
- Calling the function below when the skier has crashed means `this.direction` is `Constants.SKIER_DIRECTIONS.CRASH`
 and therefore the else block will be executed.

- From `Constants.SKIER_DIRECTIONS` enum, `CRASH` has the value number `0` and therefore executing the line 
`this.setDirection(this.direction - 1)` tries to look for an asset from `Constants.SKIER_DIRECTION_ASSET` map with key `-1` which 
does not exist e.g. `Constants.SKIER_DIRECTION_ASSET[-1]` then causes the error: `cannot read property 'width' of undefined`, asset is undefined.

```
turnLeft() {
    if(this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
        this.moveSkierLeft();
    }
    else {
        this.setDirection(this.direction - 1);
    }
}
```
**game crash unit tests**
2.) Wrote unit tests to make sure the following conditions are satisfied by the new function:
- skier should move left down if turned left while moving down.
- skier should move left if turned left while moving left down.
- skier should wake up facing left and move if turned left when crashed.
* Same conditions apply when turning skier right after a crash.

**Jumping feature**
3.) Added jumping feature under the following conditions:
- skier should always automatically jump over jumping rumps.
- skier can jump over rocks by pressing `SHIFT KEY` just before colliding with the rock.
- skier can never jump over tress even by pressing `SHIFT KEY`.
* Unit tests to assert this conditions also included.

To make an impression of a skier jumping, we increase his speed and change his asset for a specified amount of time. The skier 
continues to move in the original direction only with an increased speed and a different asset.
To end the jumping, we subscribe to a setTimeOut event that executes after our desired time of making the skier jump and in the 
event callback we change skier's asset to match the direction he is currently heading to and set his speed to the normal starting speed.

**jumping animations**
4.) Animated skier jumping
To do so, I've added a function that changes skier's asset from one jumping asset to the next at a set interval. It does so with the help of rxjs interval function that generates numbers from 0 - 5 and streams each individually at an interval of (`time taken to jump / number of jumping assets`).
This is to make the animation be as smooth and fancy as much as possible. We then call the function that changes skier's asset in the callback.

**rhino feature**
5.) Added rhino preying on skier feature
After some time of skier coming into live, a rhino will wake up some distance above the skier and starts chasing after the skier.
The skier has more speed than the rhino and can only be caught if you keep colliding with rocks or trees.
Once caught, the rhino eats the skier and the game ends.

Points to note:
- I've calculated the gradient / slope between the rhino and the skier to determine how the rhino will smoothly go after the skier from any direction.
- I've added a field `isAlive` on skier class to help know if he has been caught and eated by the rhino. `isAlive` is false then we stop drawing the skier on the canvas. Also keys pressed to move the skier are disabled as well unless you press the space bar key.
- Similarly the `isAwake` field of the rhino class helps us determine if it should keep going after the skier and appear on the screen or not.

**eating animation**
6.) Rhino animations
The rhino is animated eating the skier. Each of the png images illustrating eating is streamed one at a time with the help of rxjs and shown for 250 milliseconds untill the last one.

**restart game**
7.) Resart feature
Once eated by a rhino, the game ends but you can restart by pressing `SPACE KEY`. The rhino will again appear after some time of skier
ressurecting.

**DEPLOYMENT !!!!!**
8.) Finally deployed app to a kunbernetes cluster in gcp
STEPS:
- Modified webpack to include images that will be needed to run the application in production, this is with help of CopyWebpackPlugin.
- Created a docker file that builds our app by placing it behind an nginx web server.
- Added a shell script that runs tests, builds the application then builds the final image with the help of the docker file and uploads it to our gcr.io image repository.
- Added a kubernetes deploment file that also creates a service and an ingress to allow us access the application from the internet.