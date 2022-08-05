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
        allBtn: document.querySelector('#all'),
        activeBtn: document.querySelector('#active'),
        completedBtn: document.querySelector('#completed')
    }

    /* Clear the input */
    const clearInput = () => {
        UISelectors.todoInput.value = '';
    }

    /* Checkbox for completed todos on reload */
    const checkboxReload = () => {
        const complete = document.querySelectorAll('.completed-todo input');
        Array.from(complete).forEach(item => {
            item.checked = true;
        });
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

    const populateList = todoList => {
        let html = '';
        todoList.forEach(todo => {
            let cls;
            if (todo.completed) cls = 'completed-todo';

            html += `
            <li class="todo ${cls}" id="item-${todo.id}">
            <label class="checkbox__container">
                    <input id="checkbox" type="checkbox">
                    <span class="checkmark"></span>
                </label>
            <p>${todo.name}</p>
            <a id="delete-todo">
                <img id="delete-icon" src="assets/img/icon-cross.svg">
            </a>
        </li>
            `;
        })

        UISelectors.todoList.innerHTML = html
    }

    /* Display only active todos (hide completed) */
    const populateActive = allTodos => {
        /* Filter only the active todos */
        const todoList = allTodos.filter(item => !item.completed);
        console.log(todoList);

    };

    /* Mark an item completed*/
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

        populateList,

        checkboxReload,

        addTodoItem,

        completedTodoItem,

        deleteTodoItem,

        clearCompletedTodoItems,

        populateActive,

        populateCompleted: () => 0,
    }

})()

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button');
const lightTheme = 'light-theme';
const iconTheme = 'ri-sun-line';

const bgDesktop = document.querySelector('.bg__desktop');
const bgMobile = document.querySelector('.bg__mobile');

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// Change the background image and icon
const changeBg = () => {
    if (document.body.classList.contains('light-theme')) {
        document.getElementById('theme-button').classList.remove('ri-sun-line');
        bgDesktop.src = './assets/img/bg-desktop-light.jpg';
        bgMobile.src = './assets/img/bg-mobile-light.jpg'
    } else {
        bgDesktop.src = './assets/img/bg-desktop-dark.jpg';
        bgMobile.src = './assets/img/bg-mobile-dark.jpg';
        document.getElementById('theme-button').classList.add('ri-sun-line');
    }
}

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'light' : 'dark';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-sun-line' : 'ri-moon-line';


// We validate if the user previously chose a theme
if (selectedTheme) {
    // If the validation is fulfilled, we check to know if we deactivated or activated
    document.body.classList[selectedTheme === 'light' ? 'add' : 'remove'](lightTheme);
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove dark / icon theme
    document.body.classList.toggle(lightTheme);
    themeButton.classList.toggle(iconTheme);

    // Call change background function when theme icon is clicked;
    changeBg()

    // Save the current theme to localStorage
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
})

changeBg()