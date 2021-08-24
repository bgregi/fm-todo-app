const input = document.getElementById("create-input")

let todoList = [{
    item: "hey",
    isChecked: true
}]

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
    
    console.log(todoItem)
    console.log(todoList)
    
    input.value = ""
    
    listItems(todoList)
}

function listItems(list) {
    let divTodoList = document.getElementById("todo-list")

    //Removes all child nodes
    while (divTodoList.firstChild) {
        divTodoList.removeChild(divTodoList.firstChild)
    }

    console.log(divTodoList.childNodes)
    console.log(typeof(divTodoList.childNodes))

    //Reconstructs all nodes with provided array
    for (i of list) {

        let divTodoItem = document.createElement("div")
        divTodoItem.className = "todo-item"
        
        let divTodoItemMain = document.createElement("div")
        divTodoItemMain.className = "todo-item-main"

        let divCheckBox = document.createElement("div")
        divCheckBox.className = "checkbox"
                
        let imgCheck = document.createElement("img")
        imgCheck.src = "images/icon-check.svg"
        imgCheck.alt = "Check"
        
        let pItem = document.createElement("p")

        let text = document.createTextNode(i.item)

        // console.log(list)
        
        let imgCross = document.createElement("img")
        imgCross.src = "./images/icon-cross.svg"
        imgCross.alt = "Delete"
        imgCross.className = "delete-button"
        
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