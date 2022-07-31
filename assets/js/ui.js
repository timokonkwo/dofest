/** ======== Todo Controller ========= 
 * Handles eveything about UI
 * Uses Module pattern: IIFEs
 */


UICtrl = (function() {

    const UISelectors = {
        form: document.querySelector('form'),
        changeMode: '#change-mode',
        todoInput: document.querySelector('#add-todo'),
        todoList: document.querySelector('.todo__list'),
        checked: '#checked',
        todoTitle: '#todo-title',
        itemLeftBtn: '#items-left',
        clearCompletedBtn: document.querySelector('#clear-completed'),
        allBtn: '#all',
        activeBtn: '#active',
        completedBtn: '#completed'
    }

    /* Clear the input */
    const clearInput = () => {
        UISelectors.todoInput.value = '';
    }

    /* Checkbox for completed todos on reload */
    const checkboxReload = () => {
        const complete = document.querySelectorAll('.completed-todo input');
        Array.from(complete).forEach(item => item.setAttribute("checked", true));
    }

    /* Function to add new todo to the DOM */
    const addTodoItem = (todo) => {

        /* HTML template */
        const html = `
        <li class="todo" id="item-${todo.id}">
        <label class="checkbox__container">
                <input id="checkbox" type="checkbox">
                <span class="checkmark"></span>
            </label>
        <p>${todo.name}</p>
        <a id="delete-todo">
            <img id="delete-icon" src="assets/img/icon-cross.svg">
        </a>
    </li>
        `
        UISelectors.todoList.innerHTML += html;

        /* Clear the input */
        clearInput()

        /* Persist the already checked checkbox */
        checkboxReload();
    };

    /* Fix automatic removing of checkbox on reload, later */
    const completedTodoItem = e => {
        let todoElement;
        if (e.target.id === 'checkbox' && e.target.checked) {
            todoElement = e.target.parentElement.parentElement;
            todoElement.classList.add('completed-todo');
            return {
                id: todoElement.id.split("-")[1],
                action: "add"
            };

        } else if (e.target.id === 'checkbox' && !e.target.checked) {
            todoElement = e.target.parentElement.parentElement;
            todoElement.classList.remove('completed-todo');
            e.target.checked = false;
            return {
                id: todoElement.id.split("-")[1],
                action: "remove"
            };
        }
    };

    const deleteTodoItem = id => {
        return document.querySelector(`#${id}`).remove();
    };

    const clearCompletedTodoItems = () => {
        const completed = document.querySelectorAll('.completed-todo');
        Array.from(completed).forEach(item => item.remove());
    }


    return {
        UISelectors,
        populateList: () => 0,

        addTodoItem,

        completedTodoItem,

        deleteTodoItem,

        clearCompletedTodoItems,

        populateActive: () => 0,

        populateCompleted: () => 0,
    }

})()