// Base code and stored values for needed search information

// Pulls API information from firebase
var database = firebase.database();
var apiInfo = []
database.ref(`apiKey`).on('value', snapshot => {
    snapshot.forEach(entry =>{
        apiInfo.push(entry.node_.val());
    })
})

// List of different search parameters
var searchItems = [
    "meats", 
    "cuisines", 
    "diets"
];

// API Required Search Information for GET/PULL Request
var searchDict = {
    cuisines: "&allowedCuisine[]=cuisine^cuisine-",
    meats: "&allowedIngredient[]=",
    diets: "&allowedDiet[]="
};

// Ingredients to include
var meats = [
    "chicken",
    "pork",
    "steak"
];

// Diet types for API Request
var diets = [
    "388^Lacto vegetarian",
    "389^Ovo vegetarian",
    "390^Pescetarian",
    "386^Vegan",
    "387^Lacto-ovo vegetarian",
    "403^Paleo"
];

// Cuisine types for API Request
var cuisines = [
    "american",
    "kid-friendly",
    "italian",
    "asian",
    "mexican",
    "southern",
    "french",
    "southwestern",
    "barbecue-bbq",
    "indian",
    "chinese",
    "cajun",
    "mediterranean",
    "greek",
    "english",
    "spanish",
    "thai",
    "german",
    "moroccan",
    "irish",
    "japanese",
    "cuban",
    "hawaiian",
    "swedish",
    "hungarian",
    "portuguese"
];