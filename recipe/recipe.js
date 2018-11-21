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
    console.log(searchTerm)

    var url = `https://www.food2fork.com/api/search?key=${apiKey}&q=${searchTerm}&page=1`
    var data = "";
    axios.get(url).then(response => {
        console.log(response.data)
        data = response.data.recipes;
        var recipes = document.getElementById('recipes');
        data.forEach(recipe => {
            recipes.innerHTML += `
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                <div class="card h-100 recipe-cards">
                    <img class="card-img-top imgCard" src="${recipe.image_url}" alt="C${recipe.title}">
                    <div class="card-body">
                        <h5 class="card-title">${recipe.title}</h5>
                        <a href="#" class="mt-auto btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
            `;
        });
    });

});