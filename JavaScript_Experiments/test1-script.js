// Samuel Jacuinde
// CSE 4050
// file used with first-javascript-test.html

// will print "Hello user!" into the console in the browser
console.log("Hello user!")

//accesses all buttons found on the website
const buttons = document.querySelectorAll('button');

//defines the function that will ask for the user's name, and then prints out a hello message onto the website.
function Write_Your_Name()
{
    let para = document.createElement('p');                     //creates a temporary <p> element
    let name = prompt('What is your name?');                    //asks for the user's name
    para.textContent = 'Hello ' + name + ', nice to see you!';  //creates a string of text and puts it inside of the <p> element
    document.body.appendChild(para);                            //applies the string of text to the page
    alert('Your hello message will now be added to the page!'); //a simple alert message
}

//this loop will find all button elements on the page and apply the Write_Your_Name function onto them.
for (let i = 0; i < buttons.length ; i++)
{
    buttons[i].addEventListener('click', Write_Your_Name);
}