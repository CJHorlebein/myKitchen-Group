var recipes = document.getElementById('recipes');

function renderSelects(options, optionType){
    var temp = document.getElementById(optionType);
    options.forEach(type => {
        temp.innerHTML += `<option value="${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</option>`;
    })
}
renderSelects(meats, "meats");
renderSelects(cuisines, "cuisines");

document.getElementById('sign-out').addEventListener('click', function(){
    firebase.auth().signOut().then(function() {
        alert("You have signed out.");
        window.location="http://localhost:3000/index.html";
    }).catch(function(error) {
        alert("Something went Wrong!");
    });
});




function mealDetails(mealID, ingredients, foodImage){
    var url = `http://api.yummly.com/v1/api/recipe/${mealID}?_app_id=${apiID}&_app_key=${apiKey}`;
    var ingredients = ingredients.split(",");
    var ingredientList = ingredients.map(recipe => {
        return `<li class="h4">${recipe}</li>`;
    });

    axios.get(url).then(reply => {
        response = reply.data;
        console.log(ingredients);
        console.log(response.ingredientLines);
        recipes.innerHTML = `
        <div class="w-75 p-3 mx-auto text-center rounded shadow recipe-cards">
            <h3>${response.name}</h3>
            <img class="w-75 shadow rounded" src="${foodImage}">
            <ul class="text-left mt-4 ml-4">${ingredientList.join("")}</ul>
            <h4>Recipe located at <a href="${response.source.sourceRecipeUrl}">${response.source.sourceDisplayName}</a></h4>
        </div>
        `;
    })
}

function picCheck(picture){
    if(picture){
        return picture[0].slice(0, -4);
    }
    return "https://cdn.dribbble.com/users/1012566/screenshots/4187820/topic-2.jpg"
}

var submit = document.getElementById('submit');
submit.addEventListener('click', e => {
    e.preventDefault();
    var searchTerm = document.getElementById("searchBar").value;
    var searchTerm = encodeURIComponent(searchTerm);
    document.getElementById("searchBar").value = "";

    var searchItems = ["meats", "cuisines", "diets"]
    var searchDict = {
        cuisines: "&allowedCuisine[]=cuisine^cuisine-",
        meats: "&allowedIngredient[]=",
        diets: "&allowedDiet[]="
    }

    searchItems.forEach(item => {
        var temp = document.getElementById(item).value;
        if(temp){
            searchTerm += searchDict[item] + temp;
        }
    });

    var url = `http://api.yummly.com/v1/api/recipes?_app_id=${apiID}&_app_key=${apiKey}&q=${searchTerm}&maxResult=32`;
    axios.get(url).then(response => {
        var data = response.data.matches;
        recipes.innerHTML = "";
        data.forEach(recipe => {
            var imgURL = picCheck(recipe.smallImageUrls);
            recipes.innerHTML += `
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                <div class="card h-100 recipe-cards">
                    <img class="card-img-top imgCard" src="${imgURL}" alt=“${recipe.recipeName}">
                    <div class="card-body">
                        <h5 class="card-title">${recipe.recipeName}</h5>
                        <button onclick="mealDetails('${recipe.id}', '${recipe.ingredients}', '${imgURL}')" class="mt-auto btn btn-primary">See ingredients</button>
                    </div>
                </div>
            </div>
            `;
        });
    });

});