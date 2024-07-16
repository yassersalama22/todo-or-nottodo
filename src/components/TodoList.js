// src/components/TodoList.js
import { v4 as uuidv4 } from 'uuid';

class TodoList {
  constructor(name) {
    this.id = uuidv4();
    this.name = name;
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(index) {
    this.items.splice(index, 1);
  }

  updateItem(index, newItem) {
    this.items[index] = newItem;
  }

  getItems() {
    return this.items;
  }

  updateName(newName) {
    this.name = newName;
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    const data = {
      id: this.id,
      name: this.name,
      items: this.items,
    };
    localStorage.setItem(`todo_${this.id}`, JSON.stringify(data));
  }

  static loadFromLocalStorage(key) {
    const data = JSON.parse(localStorage.getItem(key));
    if (data) {
      const todoList = new TodoList(data.name);
      todoList.id = data.id; // Ensure the ID is set correctly
      todoList.items = data.items || []; // Handle empty items
      return todoList;
    }
    return null;
  }

  static loadAll() {
    const todoLists = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('todo_')) {
        const todoList = TodoList.loadFromLocalStorage(key);
        if (todoList) {
          todoLists.push(todoList);
        }
      }
    }
    return todoLists;
  }

  static deleteFromLocalStorage(key) {
    localStorage.removeItem(key);
  }
}

export default TodoList;