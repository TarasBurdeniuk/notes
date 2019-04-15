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
    inputLabel.setAttribute('maxlength', '20');
    inputLabel.type = 'text';
    inputLabel.value = task.value;

    const button = document.createElement('button');
    button.id = 'delItem';
    button.innerHTML = '<i class="fas fa-times-circle"></i>';
    button.addEventListener('click', deleteTodoItem);

    li.appendChild(input);
    li.appendChild(inputLabel);
    li.appendChild(button);
    ul.appendChild(li);

    task.value = '';
}

function deleteTodoItem() {
    const listItem = this.parentNode;
    ul.removeChild(listItem);
}

document.getElementById('list-button').addEventListener('click', addTask);

saveButton.addEventListener('click', async function () {
    const text = Array.from(document.getElementsByClassName('list')).map(item => item.value);
    const title = document.getElementById('title-note').value;
    const classlist = Array(Array.from(document.getElementsByClassName('list')).length).fill('');
    if (!title) {
        alert('You must enter title');
        return;
    } else if (!text.length) {
        alert('You must enter description in task');
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