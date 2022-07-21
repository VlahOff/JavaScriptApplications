import { post } from './api.js';
import { showHome } from './home.js';
import { checkUserNav } from './util.js';

const section = document.getElementById('registerView');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
section.remove();


export function showRegister(ctx) {
    ctx.render(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const repass = formData.get('repass').trim();

    if (email == '' || password == '') {
        return alert('All fields are required!');
    }
    if (password != repass) {
        return alert('Passwords don\'t match!');
    }

    const { accessToken, _id } = await post('/users/register', { email, password });
    const userData = {
        email,
        accessToken,
        id: _id
    };
    sessionStorage.setItem('userData', JSON.stringify(userData));
    checkUserNav();
    showHome();
}