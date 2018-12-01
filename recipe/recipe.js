// Logs out user from App/Firebase
function signOut(){
    firebase.auth().signOut()
        .then(function(){
            alert("You have signed out.");
            window.location="../";
        }).catch(function(error) {
            alert("Something went Wrong!");
        });
}

// Removes size selector for image URL or returns generic url if missing image
function picCheck(picture){
    if(picture && picture != "null=s90"){
        return picture[0].slice(0, -4);
    }
    return "https://cdn.dribbble.com/users/1012566/screenshots/4187820/topic-2.jpg"
}


// Returns list of search options for drop down menus
function renderSelects(options, optionType){
    var temp = document.getElementById(optionType);
    options.forEach(type => {
        temp.innerHTML += `<option value="${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</option>`;
    })
}

// returns list of ingredients for meal
function listIngredients(ingredients){
    return ingredients.map(item => {
        return `<li class="h4"><span class="food">${item}</span></li>`;
    });
}

// Compares current ingredient to current inventory and highlights missing items in white
function tagMissingIngredients(basic){
    var foodList = Array.from(document.getElementsByClassName("food"));
    for(var i = 0; i < basic.length; i++){
        foodList[i].className += ingredients.indexOf(basic[i]) != -1 ? " text-white" : " y-1";
    }
}

// Renders detailed meal information
function renderMealDetails(mealDetails){
    var meal = { // Required meal Info
        name: mealDetails.name,
        pic: picCheck([mealDetails.images[0].imageUrlsBySize["90"].slice(0,-2)]),
        ingredients: listIngredients(mealDetails.ingredientLines).join(""),
        sourceLink: mealDetails.source.sourceRecipeUrl,
        sourceName: mealDetails.source.sourceDisplayName
    }

    return `<div class="w-75 p-3 mx-auto text-center rounded shadow recipe-cards">
        <h3>${meal.name}</h3>
        <img class="w-75 shadow rounded" src="${meal.pic}">
        <ul class="text-left mt-4 ml-4">${meal.ingredients}</ul>
        <h4>Recipe located at <a class="g-1" href="${meal.sourceLink}">${meal.sourceName}</a></h4>
        </div>`;
}

// Performs API call for meal and renders meal info to page
function mealDetails(mealInfo){
    // Meal id and basic ingredients as input
    var recipes = document.getElementById('recipes');
    var mealInfo = mealInfo.split(",");
    var ingredients = mealInfo.splice(1); // Ingredients list starts at 1
    var url = `http://api.yummly.com/v1/api/recipe/${mealInfo[0]}?_app_id=${apiInfo[0]}&_app_key=${apiInfo[1]}`;
    axios.get(url).then(response => {
        // Renders meal based on API call
        recipes.innerHTML = renderMealDetails(response.data);
        tagMissingIngredients(ingredients);
    })
}

// Combines searched term with with drop down selections into a request URL
function searchFormSubmitted(){
    var searchTerm = encodeURIComponent(document.getElementById("searchBar").value);
    document.getElementById("searchBar").value = "";
    searchItems.forEach(item => {
        // Checks drop down for input
        var temp = document.getElementById(item).value;
        if(temp){
            searchTerm += searchDict[item] + temp;
        }
    });
    return `http://api.yummly.com/v1/api/recipes?_app_id=${apiInfo[0]}&_app_key=${apiInfo[1]}&q=${searchTerm}&maxResult=32`;
}

// Renders recipe card layout
function renderRecipeCard(recipe){
    var details = { // Info needed to render
        pic: picCheck(recipe.smallImageUrls),
        name: recipe.recipeName,
        id: recipe.id,
        ingredients: recipe.ingredients
    }
    return `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-3">
        <div class="card h-100 recipe-cards">
            <img class="card-img-top imgCard" src='${details.pic}' alt='${details.name}'>
            <div class="card-body">
                <h5 class="card-title">${details.name}</h5>
                <button onclick="mealDetails('${details.id},${details.ingredients}')" class="mt-auto btn btn-primary">See ingredients</button>
            </div>
        </div>
    </div>`
}

// Renders basic search box / search drop down buttons
function renderSearchFunction(){
    var recipes = document.getElementById('recipes');
    var submit = document.getElementById('submit');
    submit.addEventListener('click', e => {
        // Event listener for when to perform search
        e.preventDefault();
        axios.get(searchFormSubmitted()).then(response => {
            // Performs API call using all inputted data using search func searchFormSubmitted()
            recipes.innerHTML = "";
            response.data.matches.forEach(recipe => { // appends new recipe card to page
                recipes.innerHTML += renderRecipeCard(recipe);
            });
        });
    });
}

// Pulls current pantry from Firebase
var ingredients = [];
function pullIngredients(uid){
    database.ref(uid).on('value', snapshot => { 
        snapshot.forEach(entry => {
            ingredients = entry.val();
        });
    });
}

// Render function for basic page layout. 
function renderRecipeSearch(){
    document.getElementById("main-container").innerHTML = `
        <div class="text-center">
            <h1 class="pt-5">Search for a recipe!</h1>
            <form class="justify-content-center w-75 mt-3 mx-auto">
                <input id="searchBar" class="w-lg-50 w-75 shadow-sm" type=text /> <br />
                <h2 class="my-2">Or let us decide!</h2>
                <select id="cuisines" class="border" name="cuisines">
                    <option selected="true" value="" disabled="disabled">Cuisine</option>
                    <option value="">Any</option>
                </select>
                <select id="meats" class="border" name="meats">
                    <option selected="true" value="" disabled="disabled">Meat</option>
                    <option value="">Any</option>
                </select>
                <select id="diets" class="border" name="diets">
                    <option selected="true" value="" disabled="disabled">Restrictions</option>
                    <option value="">Any</option>
                    <option value="386^Vegan">Vegan</option>
                    <option value="387^Lacto-ovo vegetarian">Lacto-ovo vegetarian</option>
                    <option value="388^Lacto vegetarian">Lacto vegetarian</option>
                    <option value="389^Ovo vegetarian">Ovo vegetarian</option>
                    <option value="390^Pescetarian">Pescetarian</option>
                    <option value="403^Paleo">Paleo</option>
                </select> <br />
                <button id="submit" class="btn btn-success mt-2" type="submit">Submit</button>
            </form>
        </div>
        <div id="recipes" class="d-flex flex-wrap justify-content-start py-3 px-5 mx-auto row">
        </div>
        <div class="text-center mb-3">
            Recipe search powered by <a href='http://www.yummly.co/recipes'><img alt='Yummly' src='https://static.yummly.co/api-logo.png'/></a>
        </div>`
}

// Waits for firebase to authorize user, then renders page
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        pullIngredients(user.uid);
        renderRecipeSearch();
        renderSelects(meats, "meats");
        renderSelects(cuisines, "cuisines");
        renderSearchFunction();
    } else {
        window.location = "../loginPage/login.html";
    }
});

