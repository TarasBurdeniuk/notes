const ul = document.getElementById('todo-list');
const saveButton = document.getElementById('save');
const deleteButton = document.getElementById('delete');
let checkbox = null || Array.from(document.getElementsByClassName('checkbox'));

function addTask() {
    const task = document.getElementById('list-input');
    if (!task.value) {
        return;
    }

    const li = document.createElement('li');
    li.className = 'todo-item todo-item_ml';

    const input = document.createElement('input');
    input.className = 'checkbox';
    input.setAttribute('type', 'checkbox');

    const inputLabel = document.createElement('input');
    inputLabel.className = 'list';
    inputLabel.type = 'text';
    inputLabel.value = task.value;

    li.appendChild(input);
    li.appendChild(inputLabel);
    ul.appendChild(li);

    task.value = '';
}

document.getElementById('list-button').addEventListener('click', addTask);

checkbox.forEach(item => item.addEventListener('click', function () {
    this.nextSibling.classList.toggle('checked');
    console.log(checkbox);
}));

saveButton.addEventListener('click', async function () {
    const text = Array.from(document.getElementsByClassName('list')).map(item => item.value);
    const title = document.getElementById('title-note').value;
    const id = window.location.pathname.substring(7);
    const classlist = Array.from(document.querySelectorAll('.list')).map(item => item.className.substring(5));

    if (!title) {
        alert('You must enter title');
        return;
    }

    await fetch('/lists/:id', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            classlist,
            id,
            title,
            text
        })
    })
        .catch((err) => {
            if (err) throw err;
        });
    window.location.pathname = '/';
});

deleteButton.addEventListener('click', async function f() {
    const id = window.location.pathname.substring(7);
    await fetch('/lists/:id', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id
        })
    })
        .catch((err) => {
            if (err) throw err;
        });
    window.location.pathname = '/';
});

document.getElementById('return').addEventListener('click', function () {
    fetch('/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .catch((err) => {
            if (err) throw err;
        });
    window.location.pathname = '/';
});