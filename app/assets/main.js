const notes = Array.from(document.getElementsByClassName('new-note'));
const lists = Array.from(document.getElementsByClassName('new-lists'));


document.getElementById('note-page').addEventListener('click', async function () {
    await fetch('/notes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .catch((err) => {
            if (err) throw err;
        });
});

async function getNotes() {
    await fetch('/notes/:id', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .catch((err) => {
            if (err) throw err;
        });
}

async function getList() {
    await fetch('/lists/:id', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .catch((err) => {
            if (err) throw err;
        });
}

notes.forEach(item => {
    item.addEventListener('click', getNotes);
});

document.getElementById('lists-page').addEventListener('click', async function () {
    await fetch('/lists', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .catch((err) => {
            if (err) throw err;
        });
});

lists.forEach(item => {
    item.addEventListener('click', getList);
});


const checkbox = Array.from(document.getElementsByClassName('checkbox'));

checkbox.forEach(item => item.addEventListener('click', async function () {
    const id = this.parentNode.parentNode.getAttribute("href").substring(7);
    const element = this.nextSibling;

    element.classList.toggle('checked');

    const classlist = Array.from(this.parentNode.parentNode.querySelectorAll('.list')).map(item => item.className.substring(5));

    await fetch('/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            classlist,
            id
        })
    })
        .catch((err) => {
            if (err) throw err;
        });
}));