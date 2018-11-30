function signOut(){
    firebase.auth().signOut()
        .then(function(){
            alert("You have signed out.");
            window.location="../";
        }).catch(function(error) {
            alert("Something went Wrong!");
        });
}

function picCheck(picture){
    if(picture && picture != "null=s90-c"){
        return picture[0].slice(0, -4);
    }
    return "https://cdn.dribbble.com/users/1012566/screenshots/4187820/topic-2.jpg"
}

function renderSelects(options, optionType){
    var temp = document.getElementById(optionType);
    options.forEach(type => {
        temp.innerHTML += `<option value="${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</option>`;
    })
}

function listIngredients(ingredients){
    return ingredients.map(item => {
        return `<li class="h4"><span class="food">${item}</span></li>`;
    });
}

function tagMissingIngredients(basic){
    var foodList = Array.from(document.getElementsByClassName("food"));
    for(var i = 0; i < basic.length; i++){
        foodList[i].className += pantry.indexOf(basic[i]) != -1 ? " text-white" : " y-1";
    }
}

function renderMealDetails(mealDetails){
    
    var meal = {
        name: mealDetails.name,
        pic: picCheck([mealDetails.images[0].imageUrlsBySize["90"]]),
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

function mealDetails(mealInfo){
    var recipes = document.getElementById('recipes');
    var mealInfo = mealInfo.split(",");
    var ingredients = mealInfo.splice(1);
    var url = `http://api.yummly.com/v1/api/recipe/${mealInfo[0]}?_app_id=${apiID}&_app_key=${apiKey}`;
    axios.get(url).then(response => {
        recipes.innerHTML = renderMealDetails(response.data);
        tagMissingIngredients(ingredients);
    })
}

function searchFormSubmitted(){
    var searchTerm = encodeURIComponent(document.getElementById("searchBar").value);
    document.getElementById("searchBar").value = "";
    searchItems.forEach(item => {
        var temp = document.getElementById(item).value;
        if(temp){
            searchTerm += searchDict[item] + temp;
        }
    });
    return `http://api.yummly.com/v1/api/recipes?_app_id=${apiID}&_app_key=${apiKey}&q=${searchTerm}&maxResult=32`;
}

function renderRecipeCard(recipe){
    var details = {
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

function renderSearchFunction(){
    var recipes = document.getElementById('recipes');
    var submit = document.getElementById('submit');
    submit.addEventListener('click', e => {
        e.preventDefault();
        axios.get(searchFormSubmitted()).then(response => {
            recipes.innerHTML = "";
            response.data.matches.forEach(recipe => {
                recipes.innerHTML += renderRecipeCard(recipe);
            });
        });
    });
}

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

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        renderRecipeSearch()
        renderSelects(meats, "meats");
        renderSelects(cuisines, "cuisines");
        renderSearchFunction();
    } else {
        window.location = "../loginPage/login.html";
    }
});

