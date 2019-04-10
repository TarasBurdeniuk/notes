const ul = document.getElementById('todo-list');
const saveButton = document.getElementById('save');
const deleteButton = document.getElementById('delete');

function addTask() {
    const task = document.getElementById('list-input');
    if (!task.value) {
        return;
    }

    const li = document.createElement('li');
    li.className = 'todo-item todo-item_ml';

    const label = document.createElement('label');

    const input = document.createElement('input');
    input.className = 'checkbox';
    input.name = 'check';
    input.setAttribute('type', 'checkbox');

    const span = document.createElement('span');
    span.className = 'icon icon_top';

    const inputLabel = document.createElement('input');
    inputLabel.className = 'list list-text';
    inputLabel.value = task.value;

    label.appendChild(input);
    label.appendChild(span);
    label.appendChild(inputLabel);
    li.appendChild(label);
    ul.appendChild(li);

    task.value = '';
}

document.getElementById('list-button').addEventListener('click', addTask);

saveButton.addEventListener('click', async function () {
    const text = Array.from(document.getElementsByClassName('list-text')).map(item => item.value);
    const title = document.getElementById('title-note').value;
    const id = window.location.pathname.substring(7);

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