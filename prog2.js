const TODOS_KEY = "todos";
let TODOS = [];
const todoList = document.getElementById("ToDoList");
const emptyMessage = document.getElementById("emptyMessage");
const inputField = document.getElementById("InputField");

/* --------------------------------------LOCAL STORAGE EXTRA----------------- */
function renderTodos() {
  // Zuerst alle vorhandenen Todos im DOM löschen
  todoList.innerHTML = "";
  // Dann jedes Todo-Objekt in der TODOS-Liste durchgehen und hinzufügen
  TODOS.forEach((todo) => {
    const newTodoItem = createTodoItem(todo);
    todoList.appendChild(newTodoItem);
  });
  // Nachdem die Todos gerendert wurden, Toggle-Empty-Message aufrufen
  toggleEmptyMessage();
}
// Laden der Todo-Liste aus dem Local Storage beim Laden der Seite
document.addEventListener("DOMContentLoaded", function () {
  const todosFromLocalStorage = localStorage.getItem(TODOS_KEY);
  if (todosFromLocalStorage) {
    TODOS = JSON.parse(todosFromLocalStorage);
    renderTodos();
  }
});
// Funktion zum Speichern der Todo-Liste im Local Storage
function saveTodosToLocalStorage() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(TODOS));
}
/* ---------------------------------------------------------------------------- */

/* --------------------------------------Wenn Liste LEER ist!---------- */
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

/* ------------------------Funktion zum Erstellen einer neuen Aufgabe ---------*/
function createTodoItem(todo) {
  const listItem = document.createElement("li");
  // Checkbox für jedes ToDo erstellen
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "todoCheckbox";
  checkbox.className = "checkbox";
  checkbox.checked = todo.completed; // Setze den Status der Checkbox entsprechend dem Status der Aufgabe
  checkbox.addEventListener("change", function () {
    todo.completed = checkbox.checked; // Aktualisiere den Status der Aufgabe basierend auf dem Checkbox-Status
    saveTodosToLocalStorage();
  });
  listItem.appendChild(checkbox);
  // Text ToDo hinzufügen
  const todoText = document.createElement("span");
  todoText.textContent = todo.name;
  listItem.appendChild(todoText);
  // Schließen-Symbol für jedes ToDo erstellen
  const closeIcon = document.createElement("img");
  closeIcon.src = "closebutton.jpg";
  closeIcon.alt = "closebutton";
  closeIcon.className = "closebutton";
  closeIcon.addEventListener("click", function () {
    removeTodo(listItem);
  });
  listItem.appendChild(closeIcon);
  return listItem;
}
/*--------------------- Funktion zum Hinzufügen einer neuen Aufgabe ---------*/
function addTodo() {
  let input = inputField.value.trim();
  if (input !== "") {
    TODOS.push({ name: input, completed: false });
    saveTodosToLocalStorage(); // Speichern der aktualisierten Todo-Liste im Local Storage
    const newTodoItem = createTodoItem({ name: input, completed: false });
    todoList.appendChild(newTodoItem);
    inputField.value = "";
    toggleEmptyMessage();
  } else {
    alert("Bitte geben Sie eine To-Do ein!");
  }
}
/* ---------------------------Funktion zum Entfernen einer Aufgabe----------- */
function removeTodo(todoItem) {
  const index = Array.from(todoList.children).indexOf(todoItem);
  if (index !== -1) {
    TODOS.splice(index, 1);
    saveTodosToLocalStorage(); // Speichern der aktualisierten Todo-Liste im Local Storage
    todoList.removeChild(todoItem); // Entferne das Listenelement aus dem DOM
    toggleEmptyMessage();
  }
}
/* -------------------------Hinzufügen der Event-Listener ENTER Taste---------*/
document
  .getElementById("InputField")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addTodo();
    }
  });
/* -------------CLOSE BUTTON Event Listener - Entfernen eines Listenelements---*/
todoList.addEventListener("click", function (event) {
  if (event.target.classList.contains("closebutton")) {
    const listItem = event.target.closest("li");
    removeTodo(listItem);
  }
});
toggleEmptyMessage();
renderTodos();
