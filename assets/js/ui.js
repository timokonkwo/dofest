/** ======== Todo Controller ========= 
 * Handles eveything about UI
 * Uses Module pattern: IIFEs
 */


UICtrl = (function() {

    const UISelectors = {
        changeMode: '#change-mode',
        todoInput: '#add-todo',
        todoList: '.todo__list',
        checked: '#checked',
        todoTitle: '#todo-title',
        deleteBtn: '#delete-todo',
        itemLeftBtn: '#items-left',
        clearCompletedBtn: '#clear-completed',
        allBtn: '#all',
        activeBtn: '#active',
        completedBtn: '#completed'
    }

    return {
        populateList: () => 0,
        addTodoItem: () => 0,
        deleteTodoItem: () => 0,
        populateActive: () => 0,
        populateCompleted: () => 0,

    }

})()