import { showDetails } from "./details.js";

const section = document.getElementById('homeView');
section.querySelector('div.topic-title').addEventListener('click', showDetails);
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
section.querySelector('[name="cancel"]').addEventListener('click', clearForm);
const container = section.querySelector('div.topic-container');

section.remove();

export async function showHome(event) {
    event?.preventDefault();
    // /\/\/\ this == \/\/\/
    // if (event != undefined) {
    //     event.preventDefault();
    // }
    document.getElementById('main').replaceChildren('Loading...');

    const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
    const posts = await res.json();
    container.replaceChildren(...Object.values(posts).map(createPostPreview))

    document.getElementById('main').replaceChildren(section);
}

function createPostPreview(post) {
    const div = document.createElement('div');
    div.className = 'topic-name-wrapper';
    div.innerHTML = `
    <div class="topic-name">
        <a href="/" class="normal" id="${post._id}">
            <h2>${post.title}</h2>
        </a>
        <div class="columns">
            <div>
                <p>Date: <time>${post.dateCreated}</time> </p>
                <div class="nick-name">
                    <p>Username: <span>${post.username}</span></p>
                </div>
            </div>
        </div>
    </div>`;

    return div;
}

async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(form);

    const title = formData.get('topicName');
    const username = formData.get('username');
    const content = formData.get('postText');

    try {
        const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                username,
                content,
                dateCreated: new Date()
            })
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }

        clearForm();
        showHome(undefined);
    } catch (error) {
        alert(error.message);
    }
}

function clearForm() {
    form.reset();
}