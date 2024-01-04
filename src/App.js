const todoValue = document.getElementById("todoText");
const AlertMessage = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdateClick = document.getElementById("AddUpdateClick");
let updateText;
let todoData = JSON.parse(localStorage.getItem("todoData")) || [];
if (!todoData) {
    todoData = [];
  }

todoValue.addEventListener("keypress", function(e) {
    setAlertMessage("");
    if (e.key === "Enter") {
        addUpdateClick.click();
    }
})

ReadToDoItems();
function ReadToDoItems() {
    todoData.forEach((element) => {
    let li = document.createElement("li");
    let style = "";
    if (element.status) {
        style = "style= 'text-decoration: line-through'";
    }
    const todoItems = `<div ${style} title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${
      element.item
    }</div><div>
      ${
        style === ""
          ? '<img class="edit todo-controls" onclick="UpdateToDoItems(this)" src=https://th.bing.com/th/id/R.3da1bc8265dad9a275d0898084460968?rik=doLSE8YQ2bhifg&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_435832.png&ehk=e1%2fap3NaM3bEzf4J1rQ95GDCYKBJVa9sASuicdfBxOU%3d&risl=&pid=ImgRaw&r=0" />'
          : ""
      }
      <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="https://www.pngplay.com/wp-content/uploads/7/Delete-Icon-Transparent-PNG.png" /></div>`;      
    li.innerHTML = todoItems;
    listItems.appendChild(li);
    });
}

function CreateToDoData() {
    if (todoValue.value === "") {
      setAlertMessage("Please enter your task!");
      todoValue.focus();
      return;
    }
   else {
    let IsPresent = false;
      todoData.forEach((element) => {
        if (element.item == todoValue.value) {
            IsPresent = true;
        } 
      });
      if (IsPresent) {
        setAlertMessage("This item is already present in the list!");
        return;
      }
     
      let li = document.createElement("li");
      const todoItems = `<div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${todoValue.value}</div><div>
                      <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="https://th.bing.com/th/id/R.3da1bc8265dad9a275d0898084460968?rik=doLSE8YQ2bhifg&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_435832.png&ehk=e1%2fap3NaM3bEzf4J1rQ95GDCYKBJVa9sASuicdfBxOU%3d&risl=&pid=ImgRaw&r=0" />
                      <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="https://www.pngplay.com/wp-content/uploads/7/Delete-Icon-Transparent-PNG.png" /></div></div>`;
      li.innerHTML = todoItems;
      listItems.appendChild(li);

      if (!todoData) {
        todoData = [];
      }


      let dataItem = { item: todoValue.value, status: false};
      todoData.push(dataItem);
      //localStorage.setItem("todoData", JSON.stringify(todoData));
      setLocalStorage();
      console.log(localStorage);
     
      todoValue.value = "";
      setAlertMessage("Task Created Successfully!");
      //setLocalStorage(itemList);
    }
}

  
     /* if (!todoData) {
        todoData = [];
      }


      let dataItem = { item: todoValue.value, status: false};
      todoData.push(dataItem);
      //localStorage.setItem("todoData", JSON.stringify(todoData));
      setLocalStorage();
      console.log(localStorage);
     
      todoValue.value = "";
      setAlertMessage("Task Created Successfully!");
      //setLocalStorage(itemList);
    } */
    
    

function CompletedToDoItems(e) { //when completed, double click and a line through appears
   
    let taskDiv = e.parentElement.querySelector("div");
    if (taskDiv && taskDiv.style.textDecoration === "") {
        taskDiv.style.textDecoration = "line-through";
        let editImage = e.parentElement.querySelector("img[src*='https://th.bing.com/th/id/R.3da1bc8265dad9a275d0898084460968?rik=doLSE8YQ2bhifg&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_435832.png&ehk=e1%2fap3NaM3bEzf4J1rQ95GDCYKBJVa9sASuicdfBxOU%3d&risl=&pid=ImgRaw&r=0']"); // Correct class selector
        if (editImage) {
            editImage.remove();
        }
        // Updating the status in todoData
        let itemText = taskDiv.innerText.trim();
        let element = todoData.find(element => element.item === itemText);
        if (element) {
            element.status = true;
        }
        
        // Save the updated todoData to localStorage
        setLocalStorage();
    }
}

function UpdateOnSelectionItems() {
    let oldValue = updateText.innerText.trim();
    let newValue = todoValue.value.trim();
    let found = false;
    if (updateText && newValue) {
        updateText.innerText = newValue;
    }
    for (let i = 0; i < todoData.length; i++) {
        if (todoData[i].item === oldValue) {
            todoData[i].item = todoValue.value.trim(); // Update the item
            found = true;
            break; // Stop the loop after updating the item
        }
    }
    if (found) {
        setLocalStorage();
    }

    // Log the updated todoData for debugging
    console.log(todoData);
    todoValue.value = "";
    addUpdateClick.setAttribute("onclick", "CreateToDoData()");
    addUpdateClick.setAttribute("src", "https://static.vecteezy.com/system/resources/previews/000/583/100/original/vector-button-plus-icon.jpg");
}

function UpdateToDoItems(e) {
    //if statement is checking if it's no text decoration has been applied
    // e.parentElement.parentElement.querySelector("div").innerText (value of todo task)
    if (e.parentElement.parentElement.querySelector("div").style.textDecoration === "") {
       todoValue.value = e.parentElement.parentElement.querySelector("div").innerText;
       addUpdateClick.setAttribute("onclick", "UpdateOnSelectionItems()");
       addUpdateClick.setAttribute("src", "https://www.pngarts.com/files/2/Refresh-Transparent-Background-PNG.png");
       updateText = e.parentElement.parentElement.querySelector("div");
       todoValue.focus();
       setLocalStorage();
    }
    
}

function DeleteToDoItems(e) {
    let deleteValue = e.parentElement.parentElement.querySelector("div").innerText;
    if (confirm(`Are you sure you want to delete this? ${deleteValue}`)) {
        //e.parentElement.parentElement.parentElement.querySelector("li").remove();
        let index = todoData.findIndex(element => element.item === deleteValue);
        // If the item is found, remove it from the todoData array
        if (index !== -1) {
            todoData.splice(index, 1);
            //setLocalStorage();
        }
        else {
            console.error('Task to delete not found:', deleteValue);
        }
        e.parentElement.parentElement.remove();
        setLocalStorage();
        addUpdateClick.setAttribute("onclick", "CreateToDoData()");
    addUpdateClick.setAttribute("src", "https://static.vecteezy.com/system/resources/previews/000/583/100/original/vector-button-plus-icon.jpg");
    todoValue.focus();
}
}

function setLocalStorage() {
    localStorage.setItem("todoData", JSON.stringify(todoData));
}

function setAlertMessage(message) {
    AlertMessage.removeAttribute("class");
    AlertMessage.innerText = message;
    setTimeout(() => {
        AlertMessage.classList.add("toggleMe");
    }, 1000);
}

