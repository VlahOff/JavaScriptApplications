import './src/api/api.js';
import { showHome } from './src/views/home.js';

const main = document.querySelector('main');

const links = {
    'homeLink': 'home',
    'getStartedLink': 'home',
    'loginLink': 'login',
    'registerLink': 'register',
    'createLink': 'create',
    'catalogLink': 'catalog'
};

const views = {
    'home': showHome
};

const nav = document.querySelector('nav');
nav.addEventListener('click', onNavigation);

function onNavigation(event) {
    event.preventDefault();
    const name = links[event.target.id];
    console.log(name);
}

function goTo(name, ...)

const ctx = {
    showSection
};

function showSection(name) {
    main.replaceChildren(name);
};

showHome(ctx);