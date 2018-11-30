function renderDashboard() {
    return `
    <h1>What's In My Kitchen?</h1>
 
         <input id="input" placeholder="Please add an item to your kitchen!">
         <h5>*press enter to add item and click the item to delete*</h5>
         <ul id="list"></ul>`
}
 
firebase.auth().onAuthStateChanged(function(user) {
 
    if (user) {
        var dashboardHTML = renderDashboard()
        document.getElementById('main-container').innerHTML = dashboardHTML;
    } else {
        window.location = "http://localhost:3000";
        alert('Please log in.');
    }
});
 
function signOut(){
    firebase.auth().signOut()
        .then(function(){
            alert("You have signed out.");
            window.location="../";
        }).catch(function(error) {
            alert("Something went wrong!");
        });
};
 
 
function addNewItem() {
    var item = document.getElementById("input").value;
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode("- " + item));
    ul.appendChild(li);
    document.getElementById("input").value = "";
    li.onclick = removeItem;
};

document.onkeyup = function(e) {
    if (e.keyCode == 13) {
        addNewItem();
    }
};

function removeItem(e) {
    e.target.parentElement.removeChild(e.target);
};



