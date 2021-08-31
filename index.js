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

    //Gets theme toggle button for theme checking below
    let lightTheme = document.getElementById("moon-button")

    //Reconstructs all nodes with provided array
    for (i of list) {

        let divTodoItem = document.createElement("div")
        divTodoItem.classList.add("todo-item")

        let divTodoItemMain = document.createElement("div")
        divTodoItemMain.className = "todo-item-main"

        let divCheckBox = document.createElement("div")
        divCheckBox.classList.add("checkbox")
        divCheckBox.classList.add("checkbox-list")
        divCheckBox.id = "c-" + list.indexOf(i)

        let imgCheck = document.createElement("img")
        imgCheck.alt = "Check"
        imgCheck.id = "i-" + list.indexOf(i)
        
        let pItem = document.createElement("p")
        
        let text = document.createTextNode(i.item)
        
        let imgCross = document.createElement("img")
        imgCross.src = "./images/icon-cross.svg"
        imgCross.alt = "Delete"
        imgCross.className = "delete-button"
        imgCross.id = "d-" + list.indexOf(i)




        //Applies other settings according to theme
        if (lightTheme.classList.contains("disabled")) {
            imgCheck.src = "images/icon-check-dark.svg"            
            divCheckBox.classList.add("d-checkbox")
            divTodoItem.classList.add("d-todo-item")
            
        } else {
            imgCheck.src = "images/icon-check.svg"
            divCheckBox.classList.add("l-checkbox")
            divTodoItem.classList.add("l-todo-item")

        }





        if (i.isChecked == true) {
            divCheckBox.classList.add("checkbox-checked")
            imgCheck.src = "images/icon-check.svg"

            if (lightTheme.classList.contains("disabled")) {
                pItem.className = "d-todo-item-checked"
            } else {
                pItem.className = "l-todo-item-checked"                
            }
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

//Gets id of delete button when clicked (used in deleteItem and checkItem functions)
document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        text = target.textContent || target.innerText;
    
    if (target.className == "delete-button") {
        deleteItem(target)
    }

    if (target.classList.contains("checkbox-list") || target.alt == "Check") {
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

    //INPUT
    let input = document.getElementById("create-input")
    input.classList.toggle("l-input")
    input.classList.toggle("d-input")

    //CHECKBOX
    let checkbox = document.getElementsByClassName("checkbox")
    console.log(checkbox)

    ///Checks if light or dark theme is on
    let lightTheme = document.getElementById("moon-button")

    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].classList.toggle("l-checkbox")
        checkbox[i].classList.toggle("d-checkbox")

        ////Checks if it's the input checkbox
        if (checkbox[i].hasChildNodes()) {
            /////Checks theme and applies correct img path
            if (lightTheme.classList.contains("disabled")) {
                checkbox[i].childNodes[0].src = "images/icon-check-dark.svg"
            } else {
                checkbox[i].childNodes[0].src = "images/icon-check.svg"
            }
        }
    }

    //TODO ITEM
    let divTodoItem = document.getElementsByClassName("todo-item")

    for (let i = 0; i < divTodoItem.length; i ++) {
        divTodoItem[i].classList.toggle("l-todo-item")
        divTodoItem[i].classList.toggle("d-todo-item")
    }

    //BOTTOM INFO
    let bottomInfo = document.getElementById("bottom-info")
    bottomInfo.classList.toggle("d-bottom-info")

    //FILTER OPTIONS
    filterOptions.classList.toggle("d-filter-options")





}
let moonButton = document.getElementById("moon-button")
let sunButton = document.getElementById("sun-button")
moonButton.addEventListener("click", toggleTheme)
sunButton.addEventListener("click", toggleTheme)