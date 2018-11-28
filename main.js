







var url = `http://api.yummly.com/v1/api/recipes?_app_id=36fb4d31&_app_key=f367d40bf349da1721b89ad0f9c1a622&q=trending&maxResult=8`;
    axios.get(url).then(response => {
        var data = response.data.matches;
        recipeCards.innerHTML = "";
        data.forEach(recipe => {
            var imgURL = recipe.smallImageUrls;
            recipeCards.innerHTML += `
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                <div class="card h-100 recipe-cards" style="background-color:#EF6461">
                    <img class="card-img-top imgCard" src="${imgURL}" alt="${recipe.recipeName}">
                    <div class="card-body">
                        <h5 class="card-title">${recipe.recipeName}</h5>
                    </div>
                </div>
            </div>
            `;
        });
    });
