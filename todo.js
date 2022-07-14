// declaring existing html elements as DOM objects
const addButton = document.getElementById("addButton");
const allDelete = document.getElementById("allDelete");
const todoInput = document.getElementById("todoInput");
const todoDiv = document.getElementById("todoDiv");

let count = 0;
let date = new Date();
let stringDate = date.toDateString();

function addTodo() {
  count++;
  // creating elements for the todo items
  const todoContainer = document.createElement("div");
  const newTodo = document.createElement("p");
  //   creating the delete button element
  const deleteButton = document.createElement("button");
  //   creating an img element for the bin icon
  const binIcon = document.createElement("img");
  //   adding source, width, and height to the bin icon img element
  binIcon.src = "./trash-svgrepo-com.svg";
  binIcon.width = "25";
  binIcon.height = "15";
  //   appending the checkmark img element to the done button element
  deleteButton.appendChild(binIcon);

  //   creating the done button element
  const doneButton = document.createElement("button");
  //   creating an img element for the check mark
  const checkMark = document.createElement("img");
  //   adding source, width, and height to the check mark img element
  checkMark.src = "./check-mark-sign-svgrepo-com.svg";
  checkMark.width = "20";
  checkMark.height = "13";
  //   appending the checkmark img element to the done button element
  doneButton.appendChild(checkMark);

  //   assign the entered value to the todo item then clears the input field
  newTodo.innerText = todoInput.value;
  todoInput.value = "";

  // adding style to the elements of the todoDiv
  todoContainer.classList.add("todoContainer");
  newTodo.classList.add("newTodo");
  deleteButton.classList.add("todoButtons");
  doneButton.classList.add("todoButtons");

  //   IIFE that creates each todo item
  (() => {
    if (todoDiv.childNodes.length > 10) return; //condition that ensures user cannot create more than 10 todo items
    // condition that gives even-number todo items a different color from the odd-number todo items
    if (todoDiv.childNodes.length % 2 == 0) {
      newTodo.style.backgroundColor = "rgb(198, 198, 198)";
      doneButton.style.backgroundColor = "rgb(198, 198, 198)";
      deleteButton.style.backgroundColor = "rgb(198, 198, 198)";
      checkMark.style.filter = "invert(100%)";
      binIcon.style.filter = "invert(100%)";
    } else {
      newTodo.style.backgroundColor = "white";
      doneButton.style.backgroundColor = "white";
      deleteButton.style.backgroundColor = "white";
    }
    // methods that append the todo elements to the todoDiv
    todoContainer.appendChild(newTodo);
    todoContainer.appendChild(doneButton);
    todoContainer.appendChild(deleteButton);
    todoDiv.appendChild(todoContainer);
    // storing todo items to local storage
    const todoStored = JSON.parse(localStorage.getItem("todo")) || [];
    const todoItem = {
      date: stringDate,
      index: count,
      todo: newTodo.innerText,
    };
    todoStored.unshift(todoItem);
    todoStored.splice(10);
    localStorage.setItem("todo", JSON.stringify(todoStored));
    //  removes todoDiv and its content
    deleteButton.addEventListener("click", () => {
      todoDiv.removeChild(todoContainer);
    });
    // runs a line through the todo text
    doneButton.addEventListener("click", () => {
      newTodo.style.textDecoration = "line-through";
    });
    //   deletes all todo items
    allDelete.addEventListener("click", () => {
      if (todoDiv.lastElementChild) {
        todoDiv.removeChild(todoDiv.lastElementChild);
      }
    });
  })();
}

// add event listener to the add button
addButton.addEventListener("click", addTodo);
document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    addTodo();
  }
});
