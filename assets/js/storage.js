/** ======== Todo Controller ========= 
 * Handles eveything about the storage items
 * Uses Module pattern: IIFEs
 */


StorageCtrl = (function() {

    const getTodoListFromLS = () => {
        let todoList;
        if (localStorage.getItem('todoList') === null) todoList = [];
        else {
            todoList = JSON.parse(localStorage.getItem('todoList'));
        };

        return todoList;
    }

    const saveToLS = (todoList) => {
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }


    return {
        getTodoListFromLS,
        saveToLS,
        deleteFromLS: () => 0,
        clearCompletedFromLS: () => 0,
    }
})()