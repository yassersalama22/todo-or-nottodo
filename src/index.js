import './style.css';
import TodoList from './components/TodoList';
import TodoListItem from './components/TodoListItem';

// Function to display all todos
function showAllTodos() {
  const mainContent = document.getElementById('main-content');
  const allTodoLists = TodoList.loadAll();

  mainContent.innerHTML = '';
  allTodoLists.forEach(list => {
    const listElement = document.createElement('div');
    listElement.className = 'todo-card';

    const listTitle = document.createElement('h3');
    listTitle.textContent = list.name;

    const addItemButton = document.createElement('button');
    addItemButton.textContent = 'Add Item';
    addItemButton.className = 'add-item-button';
    addItemButton.addEventListener('click', () => showAddItemForm(list.id));

    listTitle.appendChild(addItemButton);
    listElement.appendChild(listTitle);

    const itemsList = document.createElement('ul');
    list.getItems().forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.className = item.status ? 'completed' : '';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = item.status;
      checkbox.className = 'item-checkbox';
      checkbox.addEventListener('change', () => {
        item.status = !item.status;
        list.updateItem(index, item);
        list.saveToLocalStorage();
        showAllTodos();
      });

      const itemInfo = document.createElement('span');
      itemInfo.className = 'item-info';
      itemInfo.textContent = `${item.title}: ${item.description} (Due: ${item.dueDate})`;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete-item-button';
      deleteButton.addEventListener('click', () => {
        list.removeItem(index);
        list.saveToLocalStorage();
        showAllTodos();
      });

      listItem.appendChild(checkbox);
      listItem.appendChild(itemInfo);
      listItem.appendChild(deleteButton);
      itemsList.appendChild(listItem);
    });

    listElement.appendChild(itemsList);
    mainContent.appendChild(listElement);
  });
}

// Function to display the add item form for a specific todo list
function showAddItemForm(listId) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = `
    <div class="form-container">
      <h2>Add Item</h2>
      <form id="add-item-form">
        <div>
          <label for="item-title">Item Title:</label>
          <input type="text" id="item-title" name="item-title" required>
        </div>
        <div>
          <label for="item-description">Item Description:</label>
          <input type="text" id="item-description" name="item-description" required>
        </div>
        <div>
          <label for="item-due-date">Due Date:</label>
          <input type="date" id="item-due-date" name="item-due-date" required>
        </div>
        <div>
          <button type="submit">Add Item</button>
        </div>
      </form>
    </div>
  `;

  // Handle form submission
  const form = document.getElementById('add-item-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const itemTitle = document.getElementById('item-title').value;
    const itemDescription = document.getElementById('item-description').value;
    const itemDueDate = document.getElementById('item-due-date').value;

    const todoList = TodoList.loadFromLocalStorage(`todo_${listId}`);
    const newItem = new TodoListItem(itemTitle, itemDescription, itemDueDate);
    todoList.addItem(newItem);
    todoList.saveToLocalStorage();

    showAllTodos();
  });
}

// Function to display the add todo form
function showAddTodoForm() {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = `
    <div class="form-container">
      <h2>Add Todo</h2>
      <form id="add-todo-form">
        <div>
          <label for="list-name">List Name:</label>
          <input type="text" id="list-name" name="list-name" required>
        </div>
        <div>
          <button type="submit">Add Todo</button>
        </div>
      </form>
    </div>
  `;

  // Handle form submission
  const form = document.getElementById('add-todo-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const listName = document.getElementById('list-name').value;
    const todoList = new TodoList(listName);
    todoList.saveToLocalStorage();

    showAllTodos();
  });
}

// Initial view function to check local storage and set default list if none found
function initializeApp() {
  const allTodoLists = TodoList.loadAll();
  if (allTodoLists.length === 0) {
    // Create a default todo list with empty items
    const defaultTodoList = new TodoList('Default Todo List');
    defaultTodoList.saveToLocalStorage();
  }
  showAllTodos();
}

// Event listeners for navigation
document.getElementById('all-todos').addEventListener('click', (event) => {
  event.preventDefault();
  showAllTodos();
});

document.getElementById('add-todo').addEventListener('click', (event) => {
  event.preventDefault();
  showAddTodoForm();
});

// Initial view
initializeApp();