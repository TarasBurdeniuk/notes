const ul = document.getElementById('todo-list');
const saveButton = document.getElementById('save');
const returnButton = document.getElementById('return');

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
    const text = Array.from(document.getElementsByClassName('list-text')).map(item => item.value);
    const title = document.getElementById('title-note').value;

    await fetch('/lists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            text
        })
    })
        .catch((err) => {
            if (err) throw err;
        });
    window.location.pathname = '/';
});

returnButton.addEventListener('click', function () {
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