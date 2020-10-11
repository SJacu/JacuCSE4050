// Samuel Jacuinde
// CSE 4050
// json-testing.js
// file used with json-example.html

const name = document.querySelector(".name");                   //Finds feild for name

const age = document.querySelector(".age");                     //Finds feild for age

const petName = document.querySelector(".petName");             //Finds feild for a pet's name

const favoriteColor = document.querySelector(".favoriteColor");         //Finds feild for a color

const favoriteFood = document.querySelector(".favoriteFood");           //Finds feild for a food

const saveData = document.querySelector(".saveData");           //Button to save feild information to json

const loadData = document.querySelector(".loadData");           //Button to load json information to feilds

const clearData = document.querySelector(".clearData");         //Button to clear our json informaiton

const storage = document.querySelector(".storage");             //Area on page where json information appears

let profile =
{
    name: "empty",
    age: 0,
    petName: "empty",
    favoriteColor: "empty",
    favoriteFood: "empty"
};

//Function allows user to save data into our profile object, which is converted to JSON format and displays it on the page
function Save_Data()
{
    //handles setting profile's variable to entered name
    let tempName = name.value;
    if(tempName != "")
    {
        profile.name = tempName;
    }

    //sets profile's age to entered age
    let tempAge = Number(age.value);
    if ((tempAge != 0) && (tempAge != NaN))
    {
        profile.age = tempAge;
    }

    //sets profile's pet name to entered name
    let tempPetName = petName.value;
    if (tempName != "")
    {
        profile.petName = tempPetName;
    }

    //sets profile's favorite color to entered color
    let tempFavCol = favoriteColor.value;
    if (tempName != "")
    {
        profile.favoriteColor = tempFavCol;
    }

    //sets profile's favorite food to entered food
    let tempFavFood = favoriteFood.value;
    if (tempName != "")
    {
        profile.favoriteFood = tempFavFood;
    }

    //turns the profile object into json tet format and is displayed onto the page
    let json = JSON.stringify(profile);
    storage.textContent = json;
}
//links this function to the setguess button
saveData.addEventListener("click", Save_Data);

//Function allows user to load data from JSON format and place it back into our text feilds and profile object
function Load_Data()
{
    let data = storage.textContent;
    profile = JSON.parse(data);

    let tempName = profile.name;
    if (tempName != "empty")
    {
        name.value = tempName;
    }

    let tempAge = profile.age;
    if (tempAge != 0)
    {
        age.value = tempAge;
    }

    let tempPetName = profile.petName;
    if (tempName != "empty")
    {
        petName.value = tempPetName;
    }

    let tempFavCol = profile.favoriteColor;
    if (tempName != "empty")
    {
        favoriteColor.value = tempFavCol;
    }

    let tempFavFood = profile.favoriteFood;
    if (tempName != "empty")
    {
        favoriteFood.value = tempFavFood;
    }
}

//links this function to the setguess button
loadData.addEventListener("click", Load_Data);

//Function allows user to load data from JSON format and place it back into our text feilds and profile object
function Clear_Data()
{
    //resets profile object back to default state
    profile.name = "empty";
    profile.age = 0;
    profile.petName = "empty";
    profile.favoriteColor = "empty";
    profile.favoriteFood = "empty";

    storage.textContent = "[Empty]";
}

//links this function to the setguess button
clearData.addEventListener("click", Clear_Data);