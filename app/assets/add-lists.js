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

saveButton.addEventListener('click', async function () {
    const text = Array.from(document.getElementsByClassName('list')).map(item => item.value);
    const title = document.getElementById('title-note').value;
    const classlist = Array(Array.from(document.getElementsByClassName('list')).length).fill('');
    console.log(classlist);
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
            classlist,
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