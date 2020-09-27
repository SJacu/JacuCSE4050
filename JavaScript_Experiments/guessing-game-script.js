// Samuel Jacuinde
// CSE 4050
// guessing-game-script.js
// file used with the-guessing-game.html
// This guessing game and it's code are a re-written and small expansion to the tutorial provided in the learning material here:
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/A_first_splash


//begins as all initial variables.  They find the labeled peices in the document that they will be interacting with.
//These are found by using the class identifies in the html document.

let minVal = 1      //The minimum number in our number range.

let maxVal = 101    //Maximum number should be 1 more than what you intend. ((This will actually produce random numbers up to 100, not 101))

let randomNumber = Math.floor(Math.random() * (maxVal - minVal)) + minVal;   //The random number generated at the start of the game

const guesses = document.querySelector(".guesses");                 //Finds the list of guesses in the document.

const lastResult = document.querySelector(".lastResult");           //Finds where it will tell you if you were right or wrong in the document.

const lowOrHi = document.querySelector(".lowOrHi");                 //Finds where it will scream at you about how off your answer was in the document.

const guessSubmit = document.querySelector(".guessSubmit");         //Finds where the submit button is in the document.

const guessField = document.querySelector(".guessField");           //Finds where the input feild is in the document.

const setGuesses = document.querySelector(".setGuesses");           //Finds the buttom to set your number of guesses.

const setRangeMin = document.querySelector(".setRangeMin");         //Finds the buttom to set your minimum number range.

const setRangeMax = document.querySelector(".setRangeMax");         //Finds the buttom to set your maximum number range.

let guessCount = 1;     //Initializes us to be on our first guess

let resetButton;        //Prepares an empty space for a reset button

let numberOfGuesses = 10; //defines the number of guesses the player has



//Function allows the player to set the number of guesses they are allowed
function Set_Number_Of_Guesses()
{
    //Prompts the player to put in their desired number of guesses
    tempVal = Number(prompt("Enter the number of guesses that you would like?"));
    while (tempVal <= 0)
    {
        if(tempVal === 0) //If the value is 0, or if the user pressed cancel, tempVal is set to what the guess number currently is
        {
            tempVal = numberOfGuesses;
            break;
        }else{
            //If the value is negative, it prompts the user to enter a valid number
            tempVal = Number(prompt("Number of Guesses should be a POSITIVE NUMBER!"));
        }
    }

    numberOfGuesses = tempVal; //number of guesse is set to tempVal
    turns = document.querySelector("turns");
    turns.textContent = numberOfGuesses;
}

//links this function to the setguess button
setGuesses.addEventListener("click", Set_Number_Of_Guesses);



function Set_Minumum()
{
    //Prompts the player to put in their desired minimum number
    tempVal = Number(prompt("Enter the lower end of the range you would like"));
    while ((tempVal > maxVal) || (tempVal === 0))
    {
        if (tempVal === 0) //If the value is 0, or if the user pressed cancel, tempVal is set to current minimum value
        {
            tempVal = minVal;
            break;
        } else {
            //if entered value is larger than maximum, it prompts for re-entry
            tempVal = Number(prompt("Lower Range should not be higher than the max range"));
        }
    }

    minVal = tempVal; //number of guesse is set to tempVal
    min = document.querySelector("min");
    min.textContent = minVal;

    //generates a new random number with new minimum value
    randomNumber = Math.floor(Math.random() * (maxVal - minVal)) + minVal;
}
//links this function to the set minimum value button
setRangeMin.addEventListener("click", Set_Minumum);



function Set_Maximum() {
    //Prompts the player to put in their desired maximum number
    tempVal = Number(prompt("Enter the higher end of the range you would like"));
    while ((tempVal < minVal) || (tempVal === 0)) {
        if (tempVal === 0) //If the value is 0, or if the user pressed cancel, tempVal is set to current maximum value
        {
            tempVal = maxVal;
            break;
        } else {
            //if entered value is smaller than minumum, it prompts for re-entry
            tempVal = Number(prompt("Max range should not be smaller than lower range!"));
        }
    }

    maxVal = tempVal; //number of guesses is set to tempVal
    max = document.querySelector("max");
    max.textContent = maxVal;

    //generates a new random number with new maximum value
    randomNumber = Math.floor(Math.random() * (maxVal - minVal)) + minVal;
}
//links this function to the set minimum value button
setRangeMax.addEventListener("click", Set_Maximum);



//this function is called whenever the user clicks on "submit guess" in the html document.
function Check_My_Guess()
{
    let userGuess = Number(guessField.value);  //Will take the value in the input feild and turn it into a number

    //If this is the user's first guess, it will begin to keep a list of guesses under the input feild
    //It will also disable any changes to the game's settings
    if (guessCount === 1)
    {
        guesses.textContent = "Previous guesses: ";
        setGuesses.disabled = true;
        setRangeMin.disabled = true;
        setRangeMax.disabled = true;
    }

    //This if-else will put commas after the first guess, up to before the last guess.
    if (guessCount > 1)
    {
        guesses.textContent += ", " + userGuess;
    }else{
        guesses.textContent += userGuess;
    }

    //This the user's guess is correct, give them a feeling of success by displaying a congradulations message in the last result feild, as well as giving it a green color.
    if (userGuess === randomNumber)
    {
        lastResult.textContent = "Congratulations, you got it right!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        Game_Over();      //Calls the game-over function, defined below.

    }
    else if (guessCount === numberOfGuesses)     //If the user was inccorect, and you're on your last guess, let the player know the game is over and what the number was.
    {
        lastResult.textContent = "Game Over: number was " + randomNumber;
        lowOrHi.textContent = "";   //Empty the feild that tells you if your guess is too high.
        Game_Over();                //Call the game over function.

    }else{      //If the user is just wrong in general
        lastResult.textContent = "Wrong!";          //Scream wrong at the user in the result feild, and add a red background for effect
        lastResult.style.backgroundColor = "red";

        //If-else-if statement tells the user if the guess was too low or too high.
        if (userGuess < randomNumber)
        {
            lowOrHi.textContent = "Guess too low!";
        }
        else if (userGuess > randomNumber)
        {
            lowOrHi.textContent = "Guess too high!";
        }
    }

    
    guessCount++;           //increases the guess count by one
    guessField.value = "";  //Resets the value in the guessField
    guessField.focus();     //Sets focus on the input feild as if it was selected by user
}

//Attaches the Check_My_Guess function to the guess submit button
guessSubmit.addEventListener("click", Check_My_Guess);



//This function prevents the player from inputting anymore guesses, and allows them to restart the game
function Game_Over()
{
    guessField.disabled = true;     //disables input feild
    guessSubmit.disabled = true;    //disables submit button

    //Creates a new restart button at the bottom of the game screen
    resetButton = document.createElement("button");
    resetButton.textContent = "Start new game";
    document.body.appendChild(resetButton);

    //Attaches the Reset_Game function to the reset button
    resetButton.addEventListener("click", Reset_Game);
}



//Resets all game data for a fresh new game
function Reset_Game()
{
    //Sets guess count back to 1
    guessCount = 1;

    //Finds all paragraph children of the class "resultParas," and clears their text to remove them.
    const resetParas = document.querySelectorAll(".resultParas p");
    for (let i = 0 ; i < resetParas.length ; i++)
    {
        resetParas[i].textContent = "";
    }

    //Deletes the reset button from the page
    resetButton.parentNode.removeChild(resetButton);

    //Re-allows the player to input and submit more guesses
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    //allows player to change game settings again
    setGuesses.disabled = false;
    setRangeMin.disabled = false;
    setRangeMax.disabled = false;

    //Sets the backgroundColor of the result feild to the web-page background color, and generates a new number
    lastResult.style.backgroundColor = "cornflowerblue";
    randomNumber = Math.floor(Math.random() * (maxVal - minVal)) + minVal;
}