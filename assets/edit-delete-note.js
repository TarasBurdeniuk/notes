document.getElementById('button').addEventListener('click', async function () {
    const title = document.getElementById('title-note').value;
    const description = document.getElementById('textarea').value;
    const id = window.location.pathname.substring(7);
    await fetch('/api/notes/:id', {
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
    await fetch('/api/notes/:id', {
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