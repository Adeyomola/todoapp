const todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoDiv = document.getElementById("todoDiv");
const allDelete = document.getElementById("allDelete");

todoDiv.innerHTML = todo
  .map((todoItem) => {
    return `<p class="todoItems">${todoItem.date} : ${todoItem.todo}</p>`;
  })
  .join(" ");

//   clear previous todoItems
allDelete.onclick = () => {
  todoDiv.innerHTML = "";
  localStorage.clear();
};
