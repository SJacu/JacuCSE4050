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
        for(let i = 0; i < this.size; i++)
        {
            this.table.push(new Tile(this));
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

                // if the tile is a bomb, display a bomb.  Otherwise, display an empty tile ((soon to include a number inside));
                if(this.table[i].isBomb)
                {
                    img.src = "https://raw.githubusercontent.com/SJacu/JacuCSE4050/e6ed31cb5b9dc53e97dc8bb5b0b4ecd3a0635de3/Web_Application/images/Bomb.svg";
                }else{
                    img.src = "https://raw.githubusercontent.com/SJacu/JacuCSE4050/e6ed31cb5b9dc53e97dc8bb5b0b4ecd3a0635de3/Web_Application/images/Uncovered.svg";
                }

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
        // if type is reveal, and it's not flagged, then reveal it.
        if((type == "reveal") && (this.table[index].isFlagged == false))
        {
            this.table[index].revealed = true;
        }

        // if type is flag, then toggle between flagged and unflagged
        if(type == "flag")
        {
            if(this.table[index].isFlagged == false)
            {
                this.table[index].isFlagged = true;
            }
            else if(this.table[index].isFlagged == true)
            {
                this.table[index].isFlagged = false;
            }
        }
        this.Render_Table();
    }

    // will reset the table, and create a new game.
    Reset_Table()
    {
        // sets current bombs back to 0
        this.currentBombs = 0;

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
}


//simple tile class, keeps booleans of it's current state.
//Has an internal reference to the board which will be needed for checking ajacent tiles
class Tile
{
    constructor(board)
    {
        this.revealed = false;
        this.isBomb = false;
        this.isFlagged = false;
        this.board = board;
    }
}

// the "main" function.  generates new board, and adds an event listener for "reset table" to the new game button.
let playSpace = new Board(8, 8);
newGame.addEventListener("click", (e) =>
{
    playSpace.Reset_Table();
});