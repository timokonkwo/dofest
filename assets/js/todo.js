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
        todoList: [],
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

        return newTodo;
    };

    const markComplete = id => {
        const item = data.todoList[id - 1]
        item.completed = true;
    };

    const removeComplete = id => {
        const item = data.todoList[id - 1];
        item.completed = false;
    };

    const deleteTodo = id => {
        const item = data.todoList[id - 1];
        data.todoList.splice(item.id - 1, 1);
    };


    const clearCompleteTodos = () => {
        data.todoList = data.todoList.filter(item => !item.completed);
    }

    return {
        logData: () => console.log(data),
        addTodo,
        deleteTodo,
        clearCompleteTodos,
        markComplete,
        removeComplete
    }
})()