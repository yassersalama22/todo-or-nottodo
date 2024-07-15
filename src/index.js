// src/index.js
import './style.css';
import TodoList from './components/TodoList';
import TodoListItem from './components/TodoListItem';

// Create a new todo list
const todoList = new TodoList('My Todo List');
const item1 = new TodoListItem('Buy Groceries', 'Milk, Bread, Eggs', '2024-07-20');
const item2 = new TodoListItem('Study JavaScript', 'Finish the project', '2024-07-21');

todoList.addItem(item1);
todoList.addItem(item2);

// Save the todo list to local storage
todoList.saveToLocalStorage();

// Load all todo lists from local storage
const allTodoLists = TodoList.loadAll();
allTodoLists.forEach(list => {
  console.log(`Loaded Todo List Name: ${list.name}`);
  console.table(list.getItems());
});

// Update the name of the todo list
todoList.updateName('Updated Todo List Name');
todoList.saveToLocalStorage();

// Load the updated todo list from local storage
const updatedLoadedTodoList = TodoList.loadFromLocalStorage(todoList.id);
if (updatedLoadedTodoList) {
  console.log(`Loaded Updated Todo List Name: ${updatedLoadedTodoList.name}`);
  console.table(updatedLoadedTodoList.getItems());
} else {
  console.log('No updated todo list found in local storage.');
}

// Delete a todo list from local storage
TodoList.deleteFromLocalStorage(todoList.id);
console.log(`Deleted todo list with ID: ${todoList.id}`);