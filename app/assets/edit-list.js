const ul = document.getElementById('todo-list');
const saveButton = document.getElementById('save');
const deleteButton = document.getElementById('delete');
let checkbox = null || Array.from(document.getElementsByClassName('checkbox'));
Array.from(document.querySelectorAll('#delItem')).forEach(item => item.addEventListener('click', deleteTodoItem));

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

    const button = document.createElement('button');
    button.id = 'delItem';
    button.innerHTML = '<i class="fas fa-times-circle"></i>';
    button.addEventListener('click', deleteTodoItem);

    const inputLabel = document.createElement('input');
    inputLabel.className = 'list';
    inputLabel.type = 'text';
    inputLabel.value = task.value;
    inputLabel.setAttribute('maxlength', '20');

    li.appendChild(input);
    li.appendChild(inputLabel);
    li.appendChild(button);
    ul.appendChild(li);

    task.value = '';
}

document.getElementById('list-button').addEventListener('click', addTask);

checkbox.forEach(item => item.addEventListener('click', function () {
    this.nextSibling.classList.toggle('checked');
}));

function deleteTodoItem() {
    const listItem = this.parentNode;
    ul.removeChild(listItem);
}

saveButton.addEventListener('click', async function () {
    const text = Array.from(document.getElementsByClassName('list')).map(item => item.value);
    const title = document.getElementById('title-note').value;
    const id = window.location.pathname.substring(7);
    const classlist = Array.from(document.querySelectorAll('.list')).map(item => item.className.substring(5));

    if (!title) {
        alert('You must enter title');
        return;
    } else if (!text.length) {
        alert('You must enter description in task');
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