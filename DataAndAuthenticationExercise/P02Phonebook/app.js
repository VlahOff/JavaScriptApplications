const baseUrl = 'http://localhost:3030/jsonstore/phonebook';
const phoneBook = document.getElementById('phonebook');

function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadContacts);
    document.getElementById('btnCreate').addEventListener('click', createContact);
}

async function createContact() {
    const name = document.getElementById('person');
    const number = document.getElementById('phone');

    if (!name.value || !number.value) {
        return;
    }

    try {
        const response = await fetch(baseUrl, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                person: name.value,
                phone: number.value
            })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        name.value = '';
        number.value = '';
        loadContacts();
    } catch (error) {
        alert(error.message);
    }
}

async function loadContacts() {
    try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();
        phoneBook.innerHTML = '';
        for (const number in data) {
            const li = document.createElement('li');
            li.textContent = `${data[number].person}: ${data[number].phone}`;
            li.setAttribute('id', `${data[number]._id}`);

            const delBtn = document.createElement('button');
            delBtn.setAttribute('id', 'deleteBtn');
            delBtn.textContent = 'Delete';
            delBtn.addEventListener('click', deleteElement);

            li.appendChild(delBtn);
            phoneBook.appendChild(li);
        }
    } catch (error) {
        alert(error.message);
    }
}

async function deleteElement(event) {
    const liElement = event.target.parentElement;

    try {
        const response = await fetch(`${baseUrl}/${liElement.id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        loadContacts();
    } catch (error) {
        alert(error.message);
    }
}

attachEvents();