const textArea = document.getElementById('messages');

function attachEvents() {
    document.getElementById('refresh').addEventListener('click', displayComments);
    document.getElementById('submit').addEventListener('click', sendMessage);
}

async function sendMessage() {
    try {
        const name = document.querySelector('input[name="author"]');
        const message = document.querySelector('input[name="content"]');

        if (!name.value || !message.value) {
            return;
        }

        const response = await fetch('http://localhost:3030/jsonstore/messenger', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: name.value,
                content: message.value
            })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        name.value = '';
        message.value = '';
        displayComments();
    } catch (error) {
        alert(error.message);
    }
}

async function displayComments() {
    try {
        const response = await fetch('http://localhost:3030/jsonstore/messenger');
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();
        textArea.value = '';
        let comments = [];
        Object.entries(data).forEach(message => comments.push(`${message[1].author}: ${message[1].content}`));
        textArea.value += comments.join('\n');
    } catch (error) {
        alert(error.message);
    }
}

attachEvents();