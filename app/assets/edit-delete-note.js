document.getElementById('save').addEventListener('click', async function () {
    const title = document.getElementById('title-note').value;
    const description = document.getElementById('textarea').value;
    const id = window.location.pathname.substring(7);

    if (!title) {
        alert('You must enter title');
        return;
    }

    await fetch('/notes/:id', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id,
            title,
            description
        })
    })
        .catch((err) => {
            if (err) throw err;
        });
    window.location.pathname = '/';
});

document.getElementById('delete').addEventListener('click', async function () {
    const id = window.location.pathname.substring(7);
    await fetch('/notes/:id', {
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