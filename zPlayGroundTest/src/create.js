import { post } from './api.js';

const section = document.getElementById('createView');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
section.remove();
let ctx = null;

export function showCreate(inCtx) {
    ctx = inCtx;
    ctx.render(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const title = formData.get('title').trim();

    await post('/data/movies', { title });
    ctx.goTo('catalogBtn');
}