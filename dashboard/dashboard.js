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
    console.log("I'm a teapot")
  
  var list = document.getElementById("list");
  var foodList = [];
  var pantry = database.ref(`${UID}`);

  pantry.on('value',function(snapshot){ 

    while(list.firstChild){
      list.removeChild(list.firstChild);
    }
    
    snapshot.forEach(function(entry){
      var food = entry.val();
      foodList.push(food)
        
      list.innerHTML += foodList;
    });
    ingredients = foodList;
  });
};

function writeUserData() {
    console.log("short and stout")
    console.log(UID);
  
  var ingredient= document.getElementById("input").value;
  
  if(ingredient == ""){
    alert("Please enter your ingredient.");
    return;
  }
  
  ingredients.push(ingredient)
  database.ref(`${UID}`).set({
    pantry: ingredients,
  });
  ingredient = "";



}







// code for input box 
 
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
        writeUserData();
        addNewItem();
        
    }
};

function removeItem(e) {
    e.target.parentElement.removeChild(e.target);
};







firebase.auth().onAuthStateChanged(function(user) {
 
    if (user) {
        UID = user.uid 
        console.log(user);
        console.log(user.Wu);
        console.log(user.uid);
        var dashboardHTML = renderDashboard()
        document.getElementById('main-container').innerHTML = dashboardHTML;
        listenForUpdates();
    } else {
        window.location = "../";
        alert('Please log in.');
    }
});