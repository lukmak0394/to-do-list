document.onload = getTasks();

const tasksList = document.querySelector('.collection');

const taskForm = document.querySelector('#create-task-form');
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    createTask(e);
})

const clearListBtn = document.querySelector('.clear-list');
clearListBtn.addEventListener('click', (e) => {
    fetch('./src/removeAll.php')
    .then(res => res.json())
    .then(data => {
        getTasks();
    })
});

// Getting tasks list from DB
function getTasks() {
    fetch('./src/getTasks.php')
        .then(res => res.json())
        .then(data => {
            // Called function creating elements in order to create list items with all tasks while getting them
            createElement(data);
        })
}

// Creating tasks
function createTask() {

    const taskName = document.querySelector('#task-name').value;
    console.log(taskName)

    const data = {
        task_name: null
    }

    if (taskName.trim() !== '' && taskName !== '') {

        data.task_name = taskName

        fetch('./src/newTask.php', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                /* Called function getting tasks list in order to display tasks list with newly added one */
                getTasks();
            })
            .catch(error => console.error(error));
        document.querySelector('.error-msg').innerText = "";
    } else {
        document.querySelector('.error-msg').innerText = "Task name can't be blank";
    }

    
}

// Creating list items from data passed in getTasks() function
function createElement(data) {

    tasksList.innerHTML = '';

    if (data.length === 0) {
        tasksList.innerHTML = '<li class="collection-item">No tasks to display<li>'
    } else {
        data.forEach(el => {

            const newTask = document.createElement('li');
            newTask.setAttribute('class', 'collection-item');
    
            newTask.innerHTML = `
            <span class="task-id">${el.task_id}</span>`
                + el.task_name + 
            `<button class="btn delete-item">
                <i class="fas fa-trash fa-2x"></i>
            </button>
            `;
    
            tasksList.appendChild(newTask);

        })
    }
}

// DELETING ELEMENT FROM LIST
tasksList.addEventListener('click', (e) => {

    const taskId = e.target.parentNode.parentNode.children[0].innerText;

    const data = {
        task_id: taskId
    }

    fetch('./src/deleteTask.php', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            getTasks();
        })
        .catch(error => console.error(error));

});

// FILTERING TASKS
const searchField = document.querySelector('#search-task');
searchField.addEventListener('keyup', filterTasks);

function filterTasks(e) {

    const searchedItem = e.target.value;

    const liCollection = document.querySelectorAll('.collection-item');

    // For each element in list items check if its' text includes searched value
    liCollection.forEach(el => {
        const taskContent = el.textContent;

        taskContent.includes(searchedItem) ? el.style.display = 'flex' : el.style.display = 'none';
    })

}






