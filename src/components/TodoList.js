import TodoListItem from './TodoListItem';

class TodoList {
  constructor(name, id = null) {
    this.name = name;
    this.id = id ? id : TodoList.generateNextId();
    this.items = [];
  }

  static generateNextId() {
    const allKeys = Object.keys(localStorage).filter(key => key.startsWith('todo_'));
    if (allKeys.length === 0) return 'todo_1';
    const lastId = Math.max(...allKeys.map(key => parseInt(key.split('_')[1])));
    return `todo_${lastId + 1}`;
  }

  saveToLocalStorage() {
    localStorage.setItem(this.id, JSON.stringify(this));
  }

  static loadFromLocalStorage(key) {
    const data = JSON.parse(localStorage.getItem(key));
    const todoList = new TodoList(data.name, key);
    todoList.items = data.items.map(item => new TodoListItem(item.title, item.description, item.dueDate, item.status));
    return todoList;
  }

  static loadAll() {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('todo_'));
    keys.sort((a, b) => parseInt(a.split('_')[1]) - parseInt(b.split('_')[1])); // Ensure keys are sorted
    return keys.map(key => TodoList.loadFromLocalStorage(key));
  }

  static deleteFromLocalStorage(key) {
    localStorage.removeItem(key);
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(index) {
    this.items.splice(index, 1);
  }

  updateItem(index, item) {
    this.items[index] = item;
  }

  getItems() {
    return this.items;
  }
}

export default TodoList;