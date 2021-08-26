const input = document.getElementById("create-input")

let todoList = []

function registerItem() {
    const item = input.value

    if (item == "") {
        alert("You forgot to type something!")

        return
    }

    let todoItem = {
        item,
        isChecked: false
    }

    todoList.push(todoItem)

    input.value = ""

    listItems(todoList)
}
const createButton = document.getElementById("create-button")
createButton.addEventListener("click", registerItem)

// Runs registerItem function when Enter key is released
input.addEventListener("keyup", function (event) {
    event.preventDefault()
    if (event.keyCode === 13) {
        createButton.click()
    }
}
)

function listItems(list) {
    let divTodoList = document.getElementById("todo-list")

    //Removes all child nodes
    while (divTodoList.firstChild) {
        divTodoList.removeChild(divTodoList.firstChild)
    }

    //Reconstructs all nodes with provided array
    for (i of list) {

        let divTodoItem = document.createElement("div")
        divTodoItem.className = "todo-item"

        let divTodoItemMain = document.createElement("div")
        divTodoItemMain.className = "todo-item-main"

        let divCheckBox = document.createElement("div")
        divCheckBox.classList.add("checkbox")
        divCheckBox.classList.add("checkbox-list")
        divCheckBox.id = "c-" + list.indexOf(i)

        let imgCheck = document.createElement("img")
        imgCheck.src = "images/icon-check.svg"
        imgCheck.alt = "Check"
        imgCheck.id = "i-" + list.indexOf(i)

        let pItem = document.createElement("p")

        let text = document.createTextNode(i.item)

        let imgCross = document.createElement("img")
        imgCross.src = "./images/icon-cross.svg"
        imgCross.alt = "Delete"
        imgCross.className = "delete-button"
        imgCross.id = "d-" + list.indexOf(i)

        if (i.isChecked == true) {
            divCheckBox.classList.add("checkbox-checked")
            pItem.className = "todo-item-checked"
        }

        //Appends
        divCheckBox.appendChild(imgCheck)
        pItem.appendChild(text)

        divTodoItemMain.appendChild(divCheckBox)
        divTodoItemMain.appendChild(pItem)

        divTodoItem.appendChild(divTodoItemMain)
        divTodoItem.appendChild(imgCross)

        divTodoList.appendChild(divTodoItem)
    }

    //Shows how many items are unchecked
    itemsLeft(list)

}

function itemsLeft(list) {
    //Filters checked items in the list
    let onlyUnchecked = list.filter(i => i.isChecked == false)

    let divBottomInfo = document.getElementById("bottom-info")

    //Clears existing span
    divBottomInfo.removeChild(divBottomInfo.firstChild)

    let length = document.createTextNode(onlyUnchecked.length + " items left")

    let span = document.createElement("span")

    //Appends new span
    span.appendChild(length)
    divBottomInfo.prepend(span)

}

//Gets id of delete button when clicked (used in deleteItem function)
document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        text = target.textContent || target.innerText;
    

    // let deleteIndex = parseInt(target.id)

    if (target.className == "delete-button") {
        deleteItem(target)
    }

    if (target.className == "checkbox-list" || target.alt == "Check") {
        checkItem(target)
    }

}, false);

function deleteItem(target) {
    let deleteIndex = parseInt(target.id.split("-").pop())

    todoList.splice(deleteIndex, 1)

    listItems(todoList)
}

function checkItem(target) {
    let deleteIndex = parseInt(target.id.split("-").pop())

    let itemIsChecked = todoList[deleteIndex].isChecked

    if (itemIsChecked) {
        todoList[deleteIndex].isChecked = false
    } else {
        todoList[deleteIndex].isChecked = true
    }

    listItems(todoList)
}

function clearCompleted() {
    let onlyUnchecked = todoList.filter(i => i.isChecked == false)

    // console.log(todoList)
    todoList = onlyUnchecked

    listItems(onlyUnchecked)
}
let clearButton = document.getElementById("clear-button")
clearButton.addEventListener("click", clearCompleted)

function filterAll() {
    listItems(todoList)

    if (allButton.className != "span-active") {
        allButton.className = "span-active"
        activeButton.className = ""
        completedButton.className = ""
    }
}
let allButton = document.getElementById("filter-all")
allButton.addEventListener("click", filterAll)

function filterActive() {
    let onlyActive = todoList.filter(i => i.isChecked == false)

    listItems(onlyActive)

    if (activeButton.className != "span-active") {
        activeButton.className = "span-active"
        allButton.className = ""
        completedButton.className = ""
    }
}
let activeButton = document.getElementById("filter-active")
activeButton.addEventListener("click", filterActive)

function filterCompleted() {
    let onlyCompleted = todoList.filter(i => i.isChecked == true)

    listItems(onlyCompleted)

    if (completedButton.className != "span-active") {
        completedButton.className = "span-active"
        allButton.className = ""
        activeButton.className = ""
    }
}
let completedButton = document.getElementById("filter-completed")
completedButton.addEventListener("click", filterCompleted)

function toggleTheme() {
    //THEME BUTTON
    moonButton.classList.toggle("disabled")
    sunButton.classList.toggle("disabled")

    //BODY
    let body = document.getElementById("body")
    body.classList.toggle("d-body")
    body.classList.toggle("l-body")

    //BOX
    let createBox = document.getElementById("create-box")
    let todoBox = document.getElementById("todo-box")
    let filterOptions = document.getElementById("filter-options")
    createBox.classList.toggle("l-box")
    todoBox.classList.toggle("l-box")
    filterOptions.classList.toggle("l-box")
    createBox.classList.toggle("d-box")
    todoBox.classList.toggle("d-box")
    filterOptions.classList.toggle("d-box")

}
let moonButton = document.getElementById("moon-button")
let sunButton = document.getElementById("sun-button")
moonButton.addEventListener("click", toggleTheme)
sunButton.addEventListener("click", toggleTheme)