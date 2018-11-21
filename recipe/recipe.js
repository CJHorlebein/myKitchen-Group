var recipes = document.getElementById('recipes');

function runComparison(mealID){
    var url = `https://www.food2fork.com/api/get?key=${apiKey}&rId=${mealID}`
    var data = "";
    axios.get(url).then(response => {
        data = response.data.recipe.ingredients;
        var ingredientList = data.map(recipe => {
            return `<li>${recipe}</li>`;
        });
        recipes.innerHTML = `<ul>${ingredientList.join("")}</ul>`
    })
}

var submit = document.getElementById('submit');
submit.addEventListener('click', e => {
    e.preventDefault();
    recipes.innerHTML = "";
    e.prevent
    var searchItem = document.getElementById("searchBar").value;
    var meats = document.getElementById("meats").value;
    var cousine = document.getElementById("cousine").value;
    var restrictions = document.getElementById("restrictions").value;

    var searchTerm = encodeURIComponent(`${searchItem} ${meats} ${cousine} ${restrictions}`);
    document.getElementById("searchBar").value = "";

    var url = `https://www.food2fork.com/api/search?key=${apiKey}&q=${searchTerm}&page=1`
    var data = "";
    axios.get(url).then(response => {
        data = response.data.recipes;
        data.forEach(recipe => {
            recipes.innerHTML += `
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                <div class="card h-100 recipe-cards">
                    <img class="card-img-top imgCard" src="${recipe.image_url}" alt=“${recipe.title}">
                    <div class="card-body">
                        <h5 class="card-title">${recipe.title}</h5>
                        <button onclick="runComparison(${recipe.recipe_id})" class="mt-auto btn btn-primary">See ingredients</button>
                    </div>
                </div>
            </div>
            `;
        });
    });

});