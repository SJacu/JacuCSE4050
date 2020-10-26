// Samuel Jacuinde
// CSE 4050
// guessing-game-script.js
// file used with leave-a-message.html
// Code from here has been learned following the following tutorials that can be found below:
// https://www.youtube.com/watch?v=4d-gIPGzmK4&list=PL4cUxeGkcC9itfjle0ji1xOZ2cjRGY_WB&ab_channel=TheNetNinja
// https://www.youtube.com/watch?v=aN1LnNq4z54&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&ab_channel=TheNetNinja


//------------TABLE OF CONTENTS-------------//
//firebase Auth Section:
//  Realtime auth status listener           -Line 35,   thirty-five
//  Sign_Up function                        -Line 81,   Eighty-one
//  Log_Out function                        -Line 115,  One-Hundred-Fifteen
//  Log_In function                         -Line 128,  One-Hundred-Twenty-Eight
//
//Cloud Firestore Section:
//  Write_Message function                  -Line 159,  One-Hundred-Fiftey-Nine
//  Add_Data function                       -Line 183,  One-Hundred-Eighty-Three
//  realtime listener/updater               -Line 204,  Two-Hundred-Four


const loginBar = document.querySelector("#loginBar");  //gets the whole top bar
const signUp = document.querySelector(".signUp");  //sign up button
const logout = document.querySelector(".logout");  //the logout button
const login = document.querySelector(".login");    //the login button
const submitData = document.querySelector(".submitData");    //message Submission
const username = document.querySelector(".username")    //what your display name is, at the top of the page

const messageList = document.querySelector(".messageList");  //reference to message list in page
const mainForm = document.querySelector("#mainContent");    //used to find the main form of sending a message
let sessionID = "";                                         //will be used to store who wrote what messages


//listen for auth status changes, returns user if user is considered "logged in"
auth.onAuthStateChanged(user => {
    if(user)
    {
        //user is logged in
        console.log("user logged in:", user);

        //populates current login informaiton
        username.textContent = user.email;
        sessionID = user.uid;

        //hides all login information from the top of the screen
        logout.style.display = "inline";
        login.style.display = "none";
        loginBar["email"].style.display = "none";
        loginBar["password"].style.display = "none";
        document.getElementById("emailLabel").style.display = "none";
        document.getElementById("passwordLabel").style.display = "none";
        signUp.style.display = "none";

        //allows showing the ability to write a message to the message list
        mainForm["message"].style.display = "inline";
        submitData.style.display = "inline";
    }else{
        //user is logged out
        console.log("user logged out");

        //erases login informaiton
        username.textContent = "";
        sessionID = "";

        //shows login or sign up information at the top of the screen
        logout.style.display = "none";
        login.style.display = "inline";
        loginBar["email"].style.display = "inline";
        loginBar["password"].style.display = "inline";
        document.getElementById("emailLabel").style.display = "inline";
        document.getElementById("passwordLabel").style.display = "inline";
        signUp.style.display = "inline";

        //removes the ability to add a message to the message list
        mainForm["message"].style.display = "none";
        submitData.style.display = "none";
    }
});

//function to sign up the user
function Sign_Up()
{
    //can use squarebracket notation for a form object
    const email = loginBar["email"].value;
    const password = loginBar["password"].value;

    //if both feilds have informatoin inside of them, and the password is of proper length:
    if((email != "")&&(password != "")&&(password.length >= 6))
    {
        //uses basic firebase auth sign-up method.
        auth.createUserWithEmailAndPassword(email, password).then(cred =>
        {
            //clears input feilds
            loginBar.reset();
        });
    }
    else if(password.length < 6) //if password is not of proper length
    {
        alert("Password must more than 6 characters!");
    }else{
        //if either form is not filled in
        alert("Please fill in all login information!");
    }
}
//attaches our sign-up button to our sign up function
//Using default event (E) allows us to use the preventDefault method, which doens't make the page refresh every time somthing happens
signUp.addEventListener("click", (e) =>
{
    e.preventDefault();
    Sign_Up();
});


//function will use firebase auth to log the user out
function Log_Out()
{
    auth.signOut();
}
//attaches logout function to logout button on page
logout.addEventListener("click", (e) =>
{
    e.preventDefault();
    Log_Out();
});


//function to log in user
function Log_In()
{
    //can use squarebracket notation for a form object
    const email = loginBar["email"].value;
    const password = loginBar["password"].value;

    //if both forms have data inside of them
    if((email != "")&&(password != ""))
    {
        //basic sign-in method
        auth.signInWithEmailAndPassword(email, password).then(cred =>
        {
            //clears information forms
            loginBar.reset();
        });
    }else{
        //if one of the forms are empty
        alert("Please fill in all login information!");
    }
}
login.addEventListener("click", (e) =>
{
    e.preventDefault();
    Log_In();
});


//------ BEGIN USAGE OF FIRESTORE ---------//

//will render a message onto our page
function Write_Message(doc)
{
    //Creates new elements to be added to the page
    let li = document.createElement("li");
    let user = document.createElement("span");
    let message = document.createElement("p");
    let date = document.createElement("div");

    //grabs data from the document and populates our elements
    li.setAttribute("dataID", doc.id);
    li.setAttribute("userID", doc.userid);
    user.textContent = doc.data().user;
    message.textContent = doc.data().message;
    date.textContent = doc.data().Time;

    //appends child elements to the main list element
    li.appendChild(user);
    li.appendChild(message);
    li.appendChild(date);

    //appends to our main list.
    messageList.appendChild(li);
}

//will save data to the database
function Add_Data()
{
    const displayName = document.querySelector(".displayName");
    let today = new Date();
    let date = (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear();
    db.collection("messages").add(
    {
        userid: sessionID,
        user: username.textContent,
        message: mainForm["message"].value,
        Time: date,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp()
    });
}
submitData.addEventListener("click", (e) =>
{
    e.preventDefault();
    Add_Data();
});

//realtime listener: whenever firebase detects a change in our database, it will add it to our document.
//Fires on page start up
db.collection("messages").orderBy("timeStamp").onSnapshot(snapshot =>
{
    //grabs list of changes from our database
    let changes = snapshot.docChanges();
    changes.forEach(change =>           //for each change in our list of changes
    {
        if(change.type == "added")
        {
            //for any "added" changes, apply those to our document.
            Write_Message(change.doc);
        }
        else if(change.type == "removed")
        {
            //for any "removed" changes, remove from the document.
            //may be applied soon if I can update the messenger to allow removing messages
            let li = messageList.querySelector("[dataID=" + change.doc.id + "]");
            messageList.removeChild(li);
        }
        });
});