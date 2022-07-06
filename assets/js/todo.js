/** ======== Todo Controller ========= 
 * Handles eveything about the todo items
 * Uses Module pattern: IIFEs
 */


TodoCtrl = (function() {
    /* Todo Constructor */
    const Todo = function(id, name) {
        this.id = id;
        this.name = name;
    }

    /* Data structure / State */
    const data = {
        todos: [],
        active: [],
        completed: [],
        currentTodo: null,
        itemsLeft: 0
    };

    return {
        logData: () => console.log(data),
        addTodo: () => 0,
        DeleteTodo: () => 0,
        completedTodo: () => 0,
    }
})()