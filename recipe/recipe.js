firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user.displayName)
    } else {
        window.location = "../loginPage/login.html";
    }
});

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
    if(picture){
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

function mealDetails(details){
    var url = `http://api.yummly.com/v1/api/recipe/${details.id}?_app_id=${apiID}&_app_key=${apiKey}`;
    var ingredients = ingredients.split(",");
    axios.get(url).then(reply => {
        response = reply.data;
        var ingredientList = ingredients.map(recipe => {
            if(inventory.indexOf(recipe) == -1){
                return `<li class="h4"><span class="text-white">${recipe}</span></li>`;
            }
            else {
                return `<li class="h4"><span class="y-1">${recipe}</span></li>`;
            }
        });
        recipes.innerHTML = `
        <div class="w-75 p-3 mx-auto text-center rounded shadow recipe-cards">
            <h3>${response.name}</h3>
            <img class="w-75 shadow rounded" src="${foodImage}">
            <ul class="text-left mt-4 ml-4">${ingredientList.join("")}</ul>
            <h4>Recipe located at <a class="g-1" href="${response.source.sourceRecipeUrl}">${response.source.sourceDisplayName}</a></h4>
        </div>
        `;
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

function renderRecipeCard(details){
    return `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-3">
        <div class="card h-100 recipe-cards">
            <img class="card-img-top imgCard" src='${details.pic}' alt='${details.name}'>
            <div class="card-body">
                <h5 class="card-title">${details.name}</h5>
                <button onclick="mealDetails('${details.pic},${details.name},${details.ingredients}')" class="mt-auto btn btn-primary">See ingredients</button>
            </div>
        </div>
    </div>`
}

var submit = document.getElementById('submit');
submit.addEventListener('click', e => {
    e.preventDefault();
    axios.get(searchFormSubmitted()).then(response => {
        var data = response.data.matches;
        recipes.innerHTML = "";
        data.forEach(recipe => {
            var details = {
                pic: picCheck(recipe.smallImageUrls),
                name: recipe.recipeName,
                id: recipe.id,
                ingredients: recipe.ingredients
            }
            recipes.innerHTML += renderRecipeCard(details);
        });
    });

});



var recipes = document.getElementById('recipes');
renderSelects(meats, "meats");
renderSelects(cuisines, "cuisines");

