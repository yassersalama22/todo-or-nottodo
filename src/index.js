import './style.css';
import TodoList from './components/TodoList';
import TodoListItem from './components/TodoListItem';

// Function to display all todos
function showAllTodos() {
  const mainContent = document.getElementById('main-content');
  const allTodoLists = TodoList.loadAll();

  mainContent.innerHTML = '<h2>All Todos</h2>';
  allTodoLists.forEach(list => {
    const listElement = document.createElement('div');
    listElement.className = 'todo-card';

    const listTitle = document.createElement('h3');
    listTitle.textContent = list.name;
    listElement.appendChild(listTitle);

    const itemsList = document.createElement('ul');
    list.getItems().forEach(item => {
      const listItem = document.createElement('li');
      listItem.className = item.status ? 'completed' : '';
      listItem.textContent = `${item.title}: ${item.description} (Due: ${item.dueDate})`;
      itemsList.appendChild(listItem);
    });

    listElement.appendChild(itemsList);
    mainContent.appendChild(listElement);
  });
}

function showAddTodoForm() {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = `
    <h2>Add Todo</h2>
    <form id="add-todo-form">
      <div>
        <label for="list-name">List Name:</label>
        <input type="text" id="list-name" name="list-name" required>
      </div>
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
        <button type="submit">Add Todo</button>
      </div>
    </form>
  `;

  const form = document.getElementById('add-todo-form');
  form.addEventListener('submit', (event)=> {
    event.preventDefault();

    const listName = document.getElementById('list-name').value;
    const itemTitle = document.getElementById('item-title').value;
    const itemDescription = document.getElementById('item-description').value;
    const itemDueDate = document.getElementById('item-due-date').value;

    const todoList = new TodoList(listName);
    const newItem = new TodoListItem(itemTitle, itemDescription, itemDueDate);
    todoList.addItem(newItem);
    todoList.saveToLocalStorage();

    showAllTodos();

  });
}

function initializeApp() {
  const allTodolists = TodoList.loadAll();
  if(allTodolists.length === 0) {
    // Create default list
    const defaultTodoList = new TodoList('Default Todo List');
    defaultTodoList.saveToLocalStorage();
  }
  showAllTodos();
}

// Event listeners for navigation
document.getElementById('all-todos').addEventListener('click',(event)=>{
  event.preventDefault();
  showAllTodos();
});

document.getElementById('add-todo').addEventListener('click',(event)=>{
  event.preventDefault();
  showAddTodoForm();
});

initializeApp();