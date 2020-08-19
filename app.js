var list = document.getElementById('list');

firebase.database().ref('todos').on('child_added', function (data) {
    // console.log(data.val())
    var todo_item = document.getElementById("todo-item");
    if (data.val().value.length == 0) {
        alert("Input cannot be empty!");
    }
    else {
        var li = document.createElement('li');
        var liText = document.createTextNode(data.val().value);
        li.appendChild(liText);
        // create delete button 

        var delBtn = document.createElement("button");
        var delText = document.createTextNode("DELETE");
        delBtn.setAttribute("class", "btn")
        delBtn.setAttribute("id", data.val().key)
        delBtn.setAttribute("onclick", "deleteItem(this)");
        delBtn.appendChild(delText);

        // create edit button 
        var editBtn = document.createElement("button");
        var editText = document.createTextNode("EDIT");
        editBtn.setAttribute("class", "btn")
        editBtn.setAttribute("id", data.val().key)
        editBtn.appendChild(editText);
        editBtn.setAttribute("onclick", "editItem(this)")

        li.appendChild(delBtn);
        li.appendChild(editBtn);
        list.appendChild(li)
    }
})
function addTodo() {
    var todo_item = document.getElementById("todo-item");
    var key = firebase.database().ref('todos').push().key;
    var todo = {
        value: todo_item.value,
        key: key
    }
    firebase.database().ref('todos').child(key).set(todo)
    todo_item.value = ""
}

function deleteItem(e) {

    firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.remove();
}
function editItem(e) {
    var val = prompt("Enter update value", e.parentNode.firstChild.nodeValue);
    var editTodo = {
        value: val,
        key: e.id
    }
    firebase.database().ref('todos').child(e.id).set(editTodo)
    e.parentNode.firstChild.nodeValue = val;
}
function deleteAll() {
    list.innerHTML = "";
    firebase.database().ref('todos').remove()
}


