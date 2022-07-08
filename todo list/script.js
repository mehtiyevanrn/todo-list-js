let todoList = document.querySelector(".todo-list");
let todoInput = document.querySelector("#todo-input");
let todoBtn = document.querySelector("#todo-btn");

let getTodosFromStorage = () => {
    let storage = JSON.parse(localStorage.getItem("todos"));
    return (storage) ? storage : []
}
let getDonesFromStorage = () => {
    let storage = JSON.parse(localStorage.getItem("dones"));
    return (storage) ? storage : []
}
let todos = getTodosFromStorage();
let dones = getDonesFromStorage();

let getTodoPage = () => {
    todos.forEach((todo) => {
        creatTodoItem(todo)
    })
}
let getDonePage = () => {
    dones.forEach((done) => {
        creatDoneItem(done)
    })
}
let saveTodosToStorage = (todo) => {
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
    creatTodoItem(todo);
}
todoBtn.addEventListener("click", () => {
    let value = todoInput.value;
    if (value == "") {
        alert("bos olmaz")
    } else {
        saveTodosToStorage(value);
        todoInput.value = "";
    }

})
todoInput.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) todoBtn.click();
})

window.addEventListener("load", () => {
    getTodoPage();
    getDonePage();
})

let removeTodo = (target) => {
    let todo = target.parentNode.childNodes[0].innerHTML;
    removeTodoFromStorage(todo);
    target.parentNode.classList.add("animate__animated", "animate__slideOutLeft", "animate__faster");
    target.parentNode.addEventListener("animationend", () => {
        target.parentNode.remove();
    })
}
let removeTodoFromStorage = (todo) => {
    let index = todos.indexOf(todo);
    if (index > -1) {
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos))
    }
}
let removeDoneFromStorage = (done) => {
    let index = dones.indexOf(done);
    if (index > -1) {
        dones.splice(index, 1);
        localStorage.setItem("dones", JSON.stringify(dones))
    }
}
let checkTodo = (target) => {
    let todo = target.parentNode.childNodes[0].innerHTML;
    moveTodoToDone(todo, target)
}
let moveTodoToDone = (todo, target) => {
    removeTodoFromStorage(todo);
    dones.push(todo);
    localStorage.setItem("dones", JSON.stringify(dones));
    makeItDone(target);
}
let moveDoneToTodes = (done, target) => {
    removeDoneFromStorage(done);
    todos.push(done);
    localStorage.setItem("todos", JSON.stringify(todos));
    makeItTodo(target);
}
let makeItDone = (target) => {
    const done = target.parentNode.classList.add("done");
    target.parentNode.classList.remove("todo");
    target.parentNode.childNodes[2].setAttribute("onclick", "removeDone(this)");
    target.className = "";
    target.classList.add("fas", "fa-check-square");
    target.setAttribute("onclick", "uncheckDone(this)")
}
let makeItTodo = (target) => {
    target.parentNode.classList.remove("done");
    target.parentNode.classList.add("todo");
    target.parentNode.childNodes[2].setAttribute('onclick', "removeTodo(this)");
    target.className = "";
    target.classList.add("fas", "fa-square");
    target.setAttribute("onclick", "checkTodo(this)")
}
let uncheckDone = (target) => {
    let done = target.parentNode.childNodes[0].innerHTML;
    moveDoneToTodes(done, target)
}
let removeDone = (target) => {
    let done = target.parentNode.childNodes[0].innerHTML;
    removeDoneFromStorage(done);
    target.parentNode.classList.add("animate__animated", "animate__slideOutLeft", "animate__faster");
    target.parentNode.addEventListener("animationend", () => {
        target.parentNode.remove();
    })
}
let creatTodoItem = (text) => {
    let todoItem = document.createElement("div");
    todoItem.classList.add("todo-item", "todo");
    let todoItemLi = document.createElement("li");
    todoItemLi.innerHTML = text;
    let todoItemCheck = document.createElement("i");
    todoItemCheck.classList.add("fas", "fa-square");
    todoItemCheck.setAttribute("onclick", "checkTodo(this)");
    let todoItemRemove = document.createElement("i");
    todoItemRemove.classList.add("fas", "fa-trash-alt");
    todoItemRemove.setAttribute("onclick", "removeTodo(this)");
    todoItem.appendChild(todoItemLi);
    todoItem.appendChild(todoItemCheck);
    todoItem.appendChild(todoItemRemove);
    todoList.appendChild(todoItem);
}
let creatDoneItem = (text) => {
    let todoItem = document.createElement("div");
    todoItem.classList.add("todo-item", "done");
    let todoItemLi = document.createElement("li");
    todoItemLi.innerHTML = text;
    let todoItemCheck = document.createElement("i");
    todoItemCheck.classList.add("fas", "fa-check-square");
    todoItemCheck.setAttribute("onclick", "uncheckDone(this)");
    let todoItemDelete = document.createElement("i");
    todoItemDelete.classList.add("fas", "fa-trash-alt");
    todoItemDelete.setAttribute("onclick", "removeDone(this)");
    todoItem.appendChild(todoItemLi);
    todoItem.appendChild(todoItemCheck);
    todoItem.appendChild(todoItemDelete);
    todoList.appendChild(todoItem);
}