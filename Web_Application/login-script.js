// Samuel Jacuinde
// CSE 4050
// login-script.js
// file used with minesweeper.html
// Code from here has been learned following the following tutorials that can be found below:
// https://www.youtube.com/watch?v=4d-gIPGzmK4&list=PL4cUxeGkcC9itfjle0ji1xOZ2cjRGY_WB&ab_channel=TheNetNinja
// https://www.youtube.com/watch?v=aN1LnNq4z54&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&ab_channel=TheNetNinja


//------------TABLE OF CONTENTS-------------// ((Will be completed apon full functionality.  It is a reuse from my firebase-auth assignment))
//firebase Auth Section:
//  Realtime auth status listener           
//  Sign_Up function                        
//  Log_Out function                        
//  Log_In function                         


const loginBar = document.querySelector("#loginBar");  //gets the whole top bar
const signUp = document.querySelector(".signUp");  //sign up button
const logout = document.querySelector(".logout");  //the logout button
const login = document.querySelector(".login");    //the login button
const submitData = document.querySelector(".submitData");    //message Submission
const username = document.querySelector(".username")    //what your display name is, at the top of the page
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