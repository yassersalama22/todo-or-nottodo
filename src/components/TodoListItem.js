class TodoListItem {
    constructor(title, description, dueDate, status = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
    }

    toggleStatus() {
        this.status = !this.status;
    }

    updateTitle(newTitle){
        this.title = newTitle;
    }

    updateDescription(newDescription) {
        this.description = newDescription;
    }

    updateDueDate(newDueDate) {
        this.dueDate = newDueDate;
    }
}

export default TodoListItem;