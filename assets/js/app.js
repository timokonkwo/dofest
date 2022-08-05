/** ======== Todo Controller ========= 
 * Handles eveything about the App
 * Combines all other controllers together
 * Uses Module pattern: IIFEs
 */

App = (function(StorageCtrl, TodoCtrl, UICtrl) {

    /* UI selectors from UICTRL */
    const UISelectors = UICtrl.UISelectors;

    /* Function to add new todo */
    const addTodoClick = function(e) {
        const text = UISelectors.todoInput.value;
        if (text.length > 2) {
            /* Create a todo Item */
            const newtodoItem = TodoCtrl.addTodo(text);

            /* Add to the DOM */
            UICtrl.addTodoItem(newtodoItem);

        }

        e.preventDefault();
    }

    const completeTodoClick = e => {

        const todoItem = UICtrl.completedTodoItem(e);
        if (todoItem && todoItem.action === 'add') {
            TodoCtrl.markComplete(todoItem.id);
        } else if (todoItem && todoItem.action === 'remove') {
            TodoCtrl.removeComplete(todoItem.id);
        }

    }

    /* Function to delete todo */
    const deleteTodoClick = function(e) {
        if (e.target.id === 'delete-icon') {
            todoElementID = e.target.parentElement.parentElement.id;
            /* Delete from UI */
            UICtrl.deleteTodoItem(todoElementID);

            /* Delete from Data Structure */
            TodoCtrl.deleteTodo(todoElementID.split('-')[1]);

            e.preventDefault();
        }
    };

    const clearCompleted = function(e) {
        /* Clear from data structure */
        TodoCtrl.clearCompleteTodos();

        /* Remove from the DOM */
        UICtrl.clearCompletedTodoItems();
        e.preventDefault();
    }

    /* Public Functions */
    return {
        init: function() {

            /* Populate the UI with existing Items from LocalStorage */
            UICtrl.populateList(TodoCtrl.populate())

            /* Check the already completed tasks */
            UICtrl.checkboxReload();

            /* Function to Load Event listeners */
            /* Todo Submit event */
            UISelectors.form.addEventListener('submit', addTodoClick);

            /* Completed Todo event - checkbox */
            UISelectors.todoList.addEventListener('click', completeTodoClick);

            /* Delete Todo Event */
            UISelectors.todoList.addEventListener('click', deleteTodoClick);

            /* Clear all complete todos Event */
            UISelectors.clearCompletedBtn.addEventListener('click', clearCompleted);

            /* All todos event */
            UISelectors.allBtn.addEventListener('click', () => UICtrl.populateList(TodoCtrl.populate()))

            /* Active todos event */
            UISelectors.activeBtn.addEventListener('click', () => UICtrl.populateActive(TodoCtrl.populate()))

            /* completed todos event */
            // UISelectors.completedBtn.addEventListener('click', () => UICtrl.populateActive(TodoCtrl.populate()))
        },

    }

})(StorageCtrl, TodoCtrl, UICtrl)

App.init();