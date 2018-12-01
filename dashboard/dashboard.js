
var UID = "";

function renderDashboard() {
    return `
    <h1>What's In My Kitchen?</h1>
 
         <input id="input" placeholder="Please add an item to your kitchen!">
         <h5>*press enter to add item and click the item to delete*</h5>
         <ul id="list"></ul>`
}
  
function signOut(){
    firebase.auth().signOut()
        .then(function(){
            alert("You have signed out.");
            window.location="../";
        }).catch(function(error) {
            alert("Something went wrong!");
        });
};
 

// adds data to firebase

var database = firebase.database();
var ingredients = [];

function listenForUpdates(){
  var pantry = database.ref(`${UID}`);

  pantry.on('value',function(snapshot){ 
    snapshot.forEach(function(entry){
      ingredients = entry.val();
    });
    if(document.getElementById("list").innerHTML == ""){
        recallList();
    }
  });
};

function writeUserData(ingredient) {
  if(ingredient == ""){
    alert("Please enter your ingredient.");
    return;
  }
  ingredients.push(ingredient);
  database.ref(`${UID}`).set({
    pantry: ingredients
  });
}

// code for adding and removing items
function addNewItem(item) {
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.innerHTML = "- " + item;
    ul.appendChild(li);
    document.getElementById("input").value = "";
    li.onclick = removeItem;
};

document.onkeyup = function(e) {
    if (e.keyCode == 13) {
        var item = document.getElementById("input").value;
        addNewItem(item);
        writeUserData(item);
    }
};

function removeItem(e) {
    e.target.parentElement.removeChild(e.target);
};

//write existing data from firebase database for the signed in user
function recallList(){
    ingredients.forEach(item => {
        addNewItem(item);
    });
}

firebase.auth().onAuthStateChanged(function(user) {
 
    if (user) {
        UID = user.uid 
        var dashboardHTML = renderDashboard()
        document.getElementById('main-container').innerHTML = dashboardHTML;
        listenForUpdates();
    } else {
        window.location = "../";
    }
});