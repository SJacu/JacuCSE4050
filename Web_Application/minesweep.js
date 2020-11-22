// Samuel Jacuinde
// CSE 4050
// minesweep.js
// file used with minesweeper.html

const newGame = document.querySelector(".startNewGame");    // The start new game button
const gameSpace = document.querySelector(".gameSpace");     // Finds where the game will be displayed on the page
const playModeButton = document.querySelector(".playMode"); // The button that will switch the user between flagging and revealing
let playmode = "reveal";    //Will keep track of what current playmode the user is in.

// This function will allow the player to toggle between the two different click-modes from the page
playModeButton.addEventListener("click", (e) =>
{
    if(playmode == "reveal")
    {
        playmode = "flag";
        playModeButton.textContent = "Flag"
    }
    else if(playmode == "flag")
    {
        playmode = "reveal";
        playModeButton.textContent = "Reveal"
    }
});

// This function will be used to generate random numbers later, when we fill the table with bombs.
function Generate_Random_Number(min, max)
{
    let randomNumber = Math.floor(Math.random() * (max - (min))) + (min);
    return randomNumber;
}

// A custom Board class that will act as the main holder for the game
class Board
{
    // Constructor accepts integer size for a SIZExSIZE board, as well as the maximum amount of bombs you want.
    constructor(size, maxbs)
    {
        // initializes an empty table
        this.width = size;
        this.size = size * size;
        this.maxBombs = maxbs
        this.table = [];
        this.currentBombs = 0;
        this.flagCount = 0;
        for(let i = 0; i < this.size; i++)
        {
            this.table.push(new Tile());
        }

        // Initializes the game
        this.Generate_Game();
        this.Render_Table();
    }

    // This function is what will update the whole table each time there's an update,
    // either by internal computation or user interaction
    Render_Table()
    {
        // begins by completly deleting the table that exists on the web page
        gameSpace.innerHTML = "";

        // Sets size of the tiles
        let imageSize = 50;

        //For every tile currently in the board:
        for(let i = 0; i < this.size; i++)
        {
            // represetn tile as a "div" element, will have attributes id=tile and tableIndex=(relevant tile in board object)
            let tile = document.createElement("div");
            tile.setAttribute("id", "tile")
            tile.setAttribute("tableIndex", i);

            // creates new image for the tile
            let img = new Image(imageSize);

            // if the tile is unrevealed
            if(!this.table[i].revealed)
            {
                // If the tile is flagged, set the image to a flagged tile.
                // otherwise, display a normal unmarked tile
                if(this.table[i].isFlagged)
                {
                    img.src = "https://raw.githubusercontent.com/SJacu/JacuCSE4050/e6ed31cb5b9dc53e97dc8bb5b0b4ecd3a0635de3/Web_Application/images/Flagged.svg";
                }else{
                    img.src = "https://raw.githubusercontent.com/SJacu/JacuCSE4050/e6ed31cb5b9dc53e97dc8bb5b0b4ecd3a0635de3/Web_Application/images/Covered.svg";
                }

                // Append final tile to the gameboard
                tile.appendChild(img);
                gameSpace.appendChild(tile);

                // Adds an event listener specifc to unrevealed tiles:
                img.addEventListener("click", (e) =>
                {
                    // if the playmode is "reveal", then it will reveal the tile and update the table to show a revealed tile
                    if((playmode == "reveal"))
                    {
                        // The event (e) will call the tile element (target) and get it's parent element (the div representing the tile)
                        // then uses getAttribute to return the index value we want to update in the table.  Update type is a reveal.
                        this.Update_Table(e.target.parentElement.getAttribute("tableIndex"), "reveal");
                    }
                    else if(playmode == "flag") //if the playmode is "flag," it will update the tile accordingly
                    {
                        // Same as above but update type will be a "flagging".
                        this.Update_Table(e.target.parentElement.getAttribute("tableIndex"), "flag");
                    }
                });

            }else{  // if the tile is revealed... no need to attach event listener.  Nothing you can wo with a revealed tile.

                // if the tile is a bomb, display a bomb.  Otherwise, display an empty tile with relevant number
                // If 0 bombs around tile, then reveal surrounding tiles.
                if(this.table[i].isBomb)
                {
                    img.src = "https://raw.githubusercontent.com/SJacu/JacuCSE4050/e6ed31cb5b9dc53e97dc8bb5b0b4ecd3a0635de3/Web_Application/images/Bomb.svg";
                }else{
                    img.src = "https://raw.githubusercontent.com/SJacu/JacuCSE4050/e6ed31cb5b9dc53e97dc8bb5b0b4ecd3a0635de3/Web_Application/images/Uncovered.svg";

                    //Create a Span that will represent the number of bombs around the tile
                    let span = document.createElement("span");
                    let listOfIndecies = this.Get_Adjacent_Tiles(i);
                    let amount = this.Get_Number_Of_Bombs(listOfIndecies);

                    //if there is at least one bomb around this specific tile...
                    if(amount != 0)
                    {
                        //Set the colors depending on the amount of bombs around the tile
                        //Uses classic Minesweeper colors
                        span.textContent = amount;
                        switch(amount)
                        {
                            case 1:
                                span.style.color = "Blue";
                                break;
                            case 2:
                                span.style.color = "Green";
                                break;
                            case 3:
                                span.style.color = "Red";
                                break;
                            case 4:
                                span.style.color = "Purple";
                                break;
                            case 5:
                                span.style.color = "FireBrick";
                                break;
                            case 6:
                                span.style.color = "DarkCyan";
                                break;
                            case 7:
                                span.style.color = "Black";
                                break;
                            case 8:
                                span.style.color = "DimGrey";
                                break;
                            default:
                          }
                    }
                    //Appends the number to the tile
                    tile.appendChild(span);
                }

                //apend image to the tile, and append to the table on the webpage
                tile.appendChild(img);
                gameSpace.appendChild(tile);
            }

            // creates <br> elements at the end of each "row" for the minesweeper table/
            // use of Modulus to tell if the next index would be the start of the next row.
            if(((i+1) % this.width) == 0)
            {
                let br = document.createElement("br");
                gameSpace.appendChild(br);
            }
        }

        // prints out the current state of the table after every rendering.
        console.log(this);
    }

    // function used to update the table.  Will take in the index we want to update, and by what kind of move.
    Update_Table(index, type)
    {
        let finishedGame = true;
        // if type is reveal, and it's not flagged, then reveal it.
        if((type == "reveal") && (this.table[index].isFlagged == false))
        {

            //will make sure the index grabbed is of form integer
            let numIndex = parseInt(index)
            if(numIndex == undefined)
            {
                numIndex = 0;
            }

            //Reveal the tile
            this.table[index].revealed = true;

            //Player revealed a bomb, kill player
            if(this.table[index].isBomb === true)
            {
                playmode = "dead";
                Game_Over();
            }

            //check if there are any bombs around our current tile
            let tempIndicies = this.Get_Adjacent_Tiles(numIndex);
            let amount = this.Get_Number_Of_Bombs(tempIndicies);
            //if there are no bombs, then call the clear out function
            if(amount == 0)
            {
                this.Clear_Out_Board(numIndex);
            }
        }

        // if type is flag, then toggle between flagged and unflagged
        if(type == "flag")
        {
            //player flags tile
            if(this.table[index].isFlagged == false)
            {
                //flag the tile and increase flagCount by 1
                this.table[index].isFlagged = true;
                this.flagCount = this.flagCount + 1;


                //if # of flags on the board are equal to number of bombs on the board
                if(this.flagCount === this.currentBombs)
                {
                    //checks to see if all bombed tiles are flagged
                    for(let i = 0; i < this.size; i++)
                    {
                        //set game end to false if we find a bomb tile not flagged
                        if((this.table[i].isBomb) && !(this.table[i].isFlagged))
                        {
                            finishedGame = false;
                            break;
                        }
                    }
                }else{
                    //if wrong amount of flags, the game is not over yet
                    finishedGame = false;
                }

                //runs gameOver if player wins
                if(finishedGame)
                {
                    playmode = "ascended";
                    Game_Over();
                }
            }
            else if(this.table[index].isFlagged == true)    //player un-flags tile
            {
                this.table[index].isFlagged = false;

                //retuce flag count by 1
                this.flagCount = this.flagCount - 1;
            }
        }
        this.Render_Table();
    }

    // will reset the table, and create a new game.
    Reset_Table()
    {
        // sets current bombs and flagCount back to 0
        this.currentBombs = 0;
        this.flagCount = 0;

        // uses splicing method to clear the array and garbage collect all the old tile objects.
        this.table.splice(0, this.table.length);

        // repeated code from constructor.  Push empty tiles, and prime them for the next game.
        for(let i = 0; i < this.size; i++)
        {
            this.table.push(new Tile(this));
        }
        this.Generate_Game();
        this.Render_Table();
    }

    // will randomly place bombs on the board untill the maximum amount of bombs have been placed.
    Generate_Game()
    {
        // keep placing bombs untill we've reached max amount, or bombs fill the whole table.
        while((this.currentBombs < this.maxBombs) && (this.currentBombs < this.size))
        {
            // randomly chooses any index from the board.
            let boardIndex = Generate_Random_Number(0, this.size);
            //console.log("Index generated: " + boardIndex);

            // if there is no bomb on the tile, place bomb. If there is, move on.
            if(!this.table[boardIndex].isBomb)
            {
                this.table[boardIndex].isBomb = true;
                this.currentBombs++;
            }
        }
    }

    //given an index, it will return ajacent tile index numbers
    Get_Adjacent_Tiles(index)
    {
        let working = [];

        /*-------------First row of indicies---------------*/
        let topLeft = index - this.width - 1;
        //if the topleft index does not go into negative index
        //and not return rightward element of above row
        if(!(topLeft < 0) && !(topLeft % this.width === this.width - 1))
        {
            working.push(topLeft);
        }

        //if the topmiddle does not fall into negative index
        let topMiddle = index - this.width;
        if(!(topMiddle < 0))
        {
            working.push(topMiddle);
        }

        //if the top right does not fall into negatives
        //nor return leftmost element in same row
        let topRight = index - this.width + 1;
        if(!(topRight <= 0) && !(topRight % this.width === 0))
        {
            working.push(topRight);
        }

        /*-------------Second row of indicies---------------*/
        //If the middle left index does not fall into negative,
        //or become rightmost of above row
        let middleLeft = index - 1;
        if(!(middleLeft < 0) && !(middleLeft % this.width === this.width - 1))
        {
            working.push(middleLeft);
        }

        //If the middle left index does not become leftmost of row below or go over size,
        let middleRight = index + 1;
        if(!(middleRight % this.width === 0) && !(middleRight > this.size - 1))
        {
            working.push(middleRight);
        }

        /*-------------Third row of indicies---------------*/
        let bottomLeft = index + this.width - 1;
        if(!(bottomLeft % this.width === this.width - 1) && !(bottomLeft > this.size - 1))
        {
            working.push(bottomLeft);
        }

        let bottomMiddle = index + this.width;
        if(!(bottomMiddle > this.size - 1))
        {
            working.push(bottomMiddle);
        }

        let bottomRight = index + this.width + 1;
        if(!(bottomRight > this.size - 1) && !(bottomRight % this.width === 0))
        {
            working.push(bottomRight);
        }

        return working;
    }

    //From a list of tile indecies, it will return the number of bombs in the list
    Get_Number_Of_Bombs(listOfIndecies)
    {
        //console.log(listOfIndecies);

        let numOfBombs = 0;
        for(let i = 0; i < listOfIndecies.length; i++)
        {
            //if the tile indicated by the index is a bomb
            if(this.table[listOfIndecies[i]].isBomb === true)
            {
                //add to current count of bombs
                numOfBombs = numOfBombs + 1;
            }
        }
        return numOfBombs
    }

    //called by a tile assumed to have no bombs around it.
    //Used to clear out large spaces of no bombs to help make gameplay easier
    Clear_Out_Board(index)
    {
        //console.log("Beginning clearing board at index " + index);

        //if the user somehow clicked on a bomb...
        if(this.table[index].isBomb)
        {
           return; 
        }

        //Define a working and finished list
        let workingList = [];
        let finishedList = [];

        //initialize list by the surrounded tiles at index
        workingList = this.Get_Adjacent_Tiles(index);

        //keep working thorugh tiles untill there are no more tiles to work on
        while(workingList.length > 0)
        {
            //Grabs index from working list, removes from working
            let currentIndex = workingList.pop();
            
            //reveals tile, and adds it to finished
            this.table[currentIndex].revealed = true;
            finishedList.push(currentIndex);

            //grabs amount of bombs surrounding the current workign index.
            let newList = this.Get_Adjacent_Tiles(currentIndex);
            let amount = this.Get_Number_Of_Bombs(newList);

            //if the tile has no bombs around, it's surrounding tiles need to also be cleared
            if(amount === 0)
            {
                //for every tile in the surrounding tiles
                for(let i = 0; i < newList.length; i++)
                {   
                    
                    //if the tile was not already considered...
                    if(finishedList.indexOf(newList[i]) === -1)
                    {
                        //and if the tile is not currently planned to be worked on
                        if(workingList.indexOf(newList[i]) === -1)
                        {
                            //add tile to working list
                            workingList.push(newList[i]);

                        }//else, tile is planned, move on

                    }//else, tile was worked on, move on
                }
            }
            //else, tile has number, ignore and move on
        }
    }

    //used at the end of the game
    Reveal_All(typeOfReveal)
    {
        //if the reveal type is a win
        if(typeOfReveal == "lose")
        {
            //reveal ALL tiles
            for(let i = 0; i < this.size; i++)
            {
                this.table[i].revealed = true;
            }
        }
        else if(typeOfReveal == "win") //if the reveal type is a win
        {
            //reveal all tiles not flagged
            for(let i = 0; i < this.size; i++)
            {
                if(!(this.table[i].isFlagged))
                {
                    this.table[i].revealed = true;
                }
            }
        }
    }
}


//simple tile class, keeps booleans of it's current state.
class Tile
{
    //the reference to the board was removed, was un-needed
    constructor()
    {
        this.revealed = false;
        this.isBomb = false;
        this.isFlagged = false;
    }
}

// The "main" function.  generates new board, and adds an event listener for "reset table" to the new game button.
// Currently set to make a board of 10x10, with 10 bombs.
let playSpace = new Board(10, 10);
newGame.addEventListener("click", (e) =>
{
    //on a new game, reset table, and set buttons and playmode to appropriate mode
    playSpace.Reset_Table();
    newGame.textContent = "New Game"
    playmode = "reveal";
    playModeButton.textContent = "Reveal"
    playModeButton.disable = false;
});

//the game over function
function Game_Over()
{
    //if player died, disable gameplay button, and reveal tiles
    if(playmode === "dead")
    {
        playModeButton.textContent = "GAME OVER"
        playModeButton.disable = true;
        playSpace.Reveal_All("lose");
    }
    else if(playmode === "ascended") //if player wins, display win message, reveal non-bomb tiles
    {
        playModeButton.textContent = "YOU WIN"
        playModeButton.disable = true;
        playSpace.Reveal_All("win");
    }
}