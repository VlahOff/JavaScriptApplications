import { request } from './api.js';
import { showCatalog } from './catalog.js';

const section = document.getElementById('createView');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
section.remove();

export function showCreate() {
    document.querySelector('main').replaceChildren(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const title = formData.get('title').trim();

    await request('/data/movies', { title });
    showCatalog();
}