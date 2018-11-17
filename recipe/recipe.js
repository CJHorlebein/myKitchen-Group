var recipes = document.getElementById('recipes');

for(var i = 0; i < 10; i++){
    recipes.innerHTML += `
    <div class="col-sm-12 col-md-6 col-lg-3 mt-3">
        <div class="card">
            <img class="card-img-top" src="http://static.food2fork.com/roastchicken2feab.jpg" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    </div>
    `;
}