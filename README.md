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

                                       **************************************************

***George Komen's Solution***

***Live link - http://35.244.216.186/***

1.) **crash bug fixed**

(*Actually fixed two bugs, turning left or right after a crash*).

Bug Description : Turning skier left after crashing into a rock or a tree caused the whole game to crash and end.

**root cause:**
- Calling the function below when the skier already crashed means `this.direction` is `Constants.SKIER_DIRECTIONS.CRASH` and therefore the else block gets executed.

- From `Constants.SKIER_DIRECTIONS` object, `CRASH` has the value of `0` and therefore executing the line 
`this.setDirection(this.direction - 1)` tries to look for an asset from `Constants.SKIER_DIRECTION_ASSET` map with key `-1` which 
doesn't exist i.e. `Constants.SKIER_DIRECTION_ASSET[-1]` then causes the error: `cannot read property 'width' of undefined` because asset with key `-1` is undefined.

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
2.) **crash bug solution unit tests**

 I've written unit tests to make sure the following conditions are satisfied by the new function:
- skier should move left down if turned left while moving down.
- skier should move left if turned left while moving left down.
- skier should wake up facing left and move if turned left when crashed.
* Same conditions apply when turning skier right after a crash.

3.) **jumping feature**

 Added jumping feature under the following conditions:
- skier should automatically jump over jumping rumps.
- skier should jump over rocks by pressing `SHIFT KEY` just before colliding with a rock.
- skier should never jump over trees even by pressing `SHIFT KEY`.
* Unit tests to assert this conditions also included.

To make an impression of skier jumping, his asset keeps on changing for a specified amount of time. Also the skier continues to move in the same direction only with different asset.
To end jumping, we subscribe to a setTimeOut event that executes after some time of skier jumping. In the callback event of the setTimeout we change skier's asset to match the direction he heads to at that time.

4.) **jumping animation**

Skier gets animated when jumping. Its done by executing a function that changes skier's asset from one jumping asset to the next at an interval and does so with the help of `rxjs interval` function that generates numbers 0 - 5 and streams each individually at an interval of (`time taken to jump / number of jumping assets`).
With each stream, we execute a function that changes skier's asset in the callback of this rxjs observable.

5.) **rhino feature**

After some time of skier coming to live, a rhino will appear some distance above him and starts chasing after him.
The skier has more speed than the rhino and can only be caught if he keeps colliding with rocks and trees.
Once the skier is caught, the rhino eats him and the game ends.

Points to note:
- I've calculated the gradient / slope between the rhino and the skier to determine how the rhino will smoothly go after the skier from any direction.
- I've also added a property `isAlive` in Skier class to flag when he has been eaten by the rhino. If `isAlive` is false, we stop drawing him in the canvas and also disable control keys for his movement.
- Similarly `isAwake` property in Rhino class is for determining when the rhino should be active. When false, he is stationary at position (0, 0) and is not drawn in the canvas otherwise when true he moves after the skier and is drawn in the canvas.

6.) **rhino eating animation**

The rhino is animated eating the skier. Each of the png images of rhino eating is streamed and displayed one at a time. It's also done with the help of `rxjs interval` function. Each of the images is displayed for 250 milliseconds until the last one.

7.) **scoring feature**

- Skier earns one point after every 800 ms of continuous movement.
- He also get deducted 0.5 points for colliding with rock and trees. 
- He looses 0.5 points every 800 ms of staying in crash mode. To stop loosing points, the skier should immediately get up and move after a crash :-).
* this time period of scoring i.e. 800 ms is configurable in the constants file.

8.) **increasing difficulty feature**

 Skier's and rhino's speed increases by 0.1 every the skier earns one point. So the more the skier earns points, the tougher the game becomes because of increased speeds of both the skier and the rhino.

9.) **pause game feature**

The game can be paused by pressing `SPACE KEY`, you also proceed with the game by pressing thesame key again. It pauses the game by stopping the continuous execution of the `move()` skier function in a loop.


10.) **restart/reset game feature**

Once the skier is eaten by the rhino, the game ends.
You can however restart the game by pressing `ENTER KEY`. It basically works by resseting the state of rhino and skier objects i.e. skier's `isAlive` prop is set to true and rhinio's `isAwake` prop set to false, the speeds of both rhino and skier are also reset to default starting speeds. The same rules apply again and you can do this countless times.

11.) **deployment!!!**

Finally deployed the application to kubernetes cluster in google cloud platform (GCP).

STEPS:
- Modified webpack to include images needed to run the application in production, this was done with help of CopyWebpackPlugin.
- Created a docker file that builds our application image by packaging it together with nginx web server.
- Added a shell script that runs tests, builds the application then package the final image with the help of the docker file. It finally uploads it to google cloud container repository.
- Added a kubernetes deploment file that also creates a service and an ingress.
- Link to the final app is: http://35.244.216.186/.

**remarks**

I've used a lot of observables to achieve an asynchronous behaviour of various functions in my code. I've specifically used `rxjs` library which provides a functional manner of doing this.