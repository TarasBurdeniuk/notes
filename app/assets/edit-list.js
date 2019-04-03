const ul = document.getElementById('todo-list');
const saveButton = document.getElementById('save-list');
const deleteButton = document.getElementById('delete-list');

function addTask() {
    const task = document.getElementById('list-input');
    if (!task.value) {
        return;
    }

    const li = document.createElement('li');
    li.className = 'todo-item';

    const input = document.createElement('input');
    input.className = 'checkbox';
    input.name = 'check';
    input.setAttribute('type', 'checkbox');

    const inputLabel = document.createElement('input');
    inputLabel.className = 'title';
    inputLabel.value = task.value;

    li.appendChild(input);
    li.appendChild(inputLabel);
    ul.appendChild(li);

    task.value = '';
}

document.getElementById('list-button').addEventListener('click', addTask);

saveButton.addEventListener('click', async function () {
    const text = Array.from(document.getElementsByClassName('title')).map(item => item.value);
    const title = document.getElementById('title-note').value;
    const id = window.location.pathname.substring(7);

    await fetch(':id/update', {
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
    await fetch(':id/delete', {
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