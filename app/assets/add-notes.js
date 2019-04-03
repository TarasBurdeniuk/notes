document.getElementById('button').addEventListener('click', async function () {
    const title = document.getElementById('title-note').value;
    const description = document.getElementById('textarea').value;

    if (!title) {
        alert('area title must be is filled');
        return;
    } else if (!description) {
        alert('area description must be is filled');
        return;
    }

    await fetch('/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            description
        })
    })
        .catch((err) => {
            if (err) throw err;
        });
    window.location.pathname = '/';
});