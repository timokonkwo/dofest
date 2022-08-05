/** ======== Todo Controller ========= 
 * Handles eveything about the todo items
 * Uses Module pattern: IIFEs
 */


TodoCtrl = (function() {
    /* Todo Constructor */
    const Todo = function(id, name) {
        this.id = id;
        this.name = name;
        this.completed = false;
    }

    /* Data structure / State */
    const data = {
        todoList: StorageCtrl.getTodoListFromLS(),
        activeTodos: [],
        currentTodos: null,
        itemsLeft: 0
    };

    const addTodo = name => {
        const todoList = data.todoList;
        /* Create id */
        const id = todoList.length ? todoList.length + 1 : 1;

        /* Create new todo item */
        const newTodo = new Todo(id, name);

        /* Add to data structure */
        todoList.push(newTodo);

        /* Save to LocalStorage */
        StorageCtrl.saveToLS(todoList);

        return newTodo;
    };

    const markComplete = id => {
        /* Get the index of the item that has the id */
        const index = data.todoList.findIndex(todoItem => todoItem.id == id);

        /* Mark item as complete */
        data.todoList[index].completed = true;

        /* Save changes to LocalStorage */
        StorageCtrl.saveToLS(data.todoList);

        /* Checking if its better to be able to mark an item as completed from the active tab - Test the UX later */

        UICtrl.populateActive(data.todoList);
    };

    const removeComplete = id => {
        /* Get the index of the item that has the id */
        const index = data.todoList.findIndex(todoItem => todoItem.id == id);

        /* remove complete */
        data.todoList[index].completed = false;

        /* Save changes to LocalStorage */
        StorageCtrl.saveToLS(data.todoList);
    };

    const deleteTodo = id => {
        /* Get the index of the item that has the id */
        const index = data.todoList.findIndex(todoItem => todoItem.id == id);

        /* Delete the item */
        data.todoList.splice(index, 1)

        /* Save changes to LocalStorage */
        StorageCtrl.saveToLS(data.todoList);
    };


    const clearCompleteTodos = () => {
        data.todoList = data.todoList.filter(item => !item.completed);
        /* Save changes to LocalStorage */
        StorageCtrl.saveToLS(data.todoList);
    }

    return {
        logData: () => console.log(data),
        addTodo,
        deleteTodo,
        clearCompleteTodos,
        markComplete,
        removeComplete,
        populate: () => (data.todoList),

    }
})()