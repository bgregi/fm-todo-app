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
    
    console.log(todoItem)
    
    input.value = ""
    
    listItems(todoList)
}

function listItems(list) {
    for (i in list) {
        let divTodoList = document.getElementById("todo-list")

        let divTodoItem = document.createElement("div")
        divTodoItem.className = "todo-item"
        
        let divTodoItemMain = document.createElement("div")
        divTodoItem.className = "todo-item-main"

        let divCheckBox = document.createElement("div")
        divCheckBox.className = "checkbox"
                
        let imgCheck = document.createElement("img")
        imgCheck.src = "images/icon-check.svg"
        imgCheck.alt = "Check"
        
        let pItem = document.createElement("p")

        let text = document.createTextNode(i.item)
        
        let imgCross = document.createElement("img")
        imgCross.scr = "images/icon-cross.svg"
        imgCross.alt = "Delete"
        imgCross.className = "delete-button"
        
        if (i.isChecked == true) {
            divCheckBox.className = "checkbox-checked"
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

