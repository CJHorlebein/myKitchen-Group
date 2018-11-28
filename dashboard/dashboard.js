function addNewItem() {
    var item = document.getElementById("input").value;
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode("- " + item));
    ul.appendChild(li);
    document.getElementById("input").value = "";
    li.onclick = removeItem;
}
document.onkeyup = function(e) {
    if (e.keyCode == 13) {
        addNewItem();
    }
};
function removeItem(e) {
    e.target.parentElement.removeChild(e.target);
}