const section = document.getElementById('detailsView');
const postElement = {
    title: document.getElementById('details-title'),
    username: document.getElementById('details-username'),
    time: document.getElementById('details-time'),
    content: document.getElementById('details-content')
};
const commentsList = document.getElementById('user-comment');
section.remove();

export function showDetails(event) {
    let target = event.target;
    if (target.tagName == 'H2') {
        target = target.parentElement;
    }

    if (target.tagName = 'A') {
        event.preventDefault();
        const postId = target.id;
        showPost(postId);
    }
}

async function showPost(postId) {
    document.getElementById('main').replaceChildren('Loading...');

    const res = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts${postId}`);
    const post = await res.json();

    postElement.title.textContent = post.title;
    postElement.username.textContent = post.username;
    postElement.time.textContent = post.dateCreated;
    postElement.content.textContent = post.content;

    document.getElementById('main').replaceChildren(section);
}