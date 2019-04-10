const ul = document.getElementById('todo-list');
const saveButton = document.getElementById('save');
const returnButton = document.getElementById('return');

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
    if (!title) {
        alert('You must enter title');
        return;
    }

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