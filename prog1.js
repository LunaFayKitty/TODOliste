const TODOS = [];
const todoList = document.getElementById("ToDoList");
const emptyMessage = document.getElementById("emptyMessage");

function toggleEmptyMessage() {
  if (todoList.children.length === 0) {
    emptyMessage.style.display = "flex";
    emptyMessage.style.justifyContent = "center";
    emptyMessage.style.alignItems = "center";
    emptyMessage.style.flexDirection = "column";
  } else {
    emptyMessage.style.display = "none";
  }
}

/*add TODO (auslesen und hinzufügen wenn enter*/
function addTodo() {
  let input = document.getElementById("InputField").value;
  if (input !== "") {
    TODOS.push({ name: input });
    updateTodos();
    document.getElementById("InputField").value = "";
  } else {
    alert("Bitte geben Sie eine To-Do ein!");
  }
}

/*Remove function*/
function removeTodo(index) {
  TODOS.splice(index, 1);
  updateTodos();
}

/*update auf aktuelle Liste*/
function updateTodos() {
  todoList.innerHTML = "";

  TODOS.forEach(function (todo, index) {
    const listItem = document.createElement("li");

    // Checkbox für jedes ToDo erstellen
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "todoCheckbox";
    checkbox.className = "checkbox";
    listItem.appendChild(checkbox);

    /*text ToDo Hinzufügen*/
    const todoText = document.createElement("span");
    todoText.textContent = todo.name;
    listItem.appendChild(todoText);

    // Schließen-Symbol für jedes ToDo erstellen
    const closeIcon = document.createElement("img");
    closeIcon.src = "closebutton.jpg";
    closeIcon.alt = "closebutton";
    closeIcon.className = "closebutton";
    closeIcon.addEventListener("click", function () {
      removeTodo(index);
    });
    listItem.appendChild(closeIcon);

    todoList.appendChild(listItem);
  });
  toggleEmptyMessage();
}
/*hinzufügen funktion mit keyboard klick auf enter*/
document
  .getElementById("InputField")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addTodo();
    }
  });

toggleEmptyMessage();
