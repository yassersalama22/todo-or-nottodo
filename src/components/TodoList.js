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
    localStorage.setItem(this.id, JSON.stringify(data));
  }

  static loadFromLocalStorage(id) {
    const data = JSON.parse(localStorage.getItem(id));
    if (data) {
      const todoList = new TodoList(data.name);
      todoList.id = data.id; // Ensure the ID is set correctly
      todoList.items = data.items;
      return todoList;
    }
    return null;
  }

  static loadAll() {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('todo_'));
    return keys.map(id => TodoList.loadFromLocalStorage(id));
  }

  static deleteFromLocalStorage(id) {
    localStorage.removeItem(id);
  }
}

export default TodoList;