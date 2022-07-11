function solution() {
    const main = document.getElementById('main');
    const baseUrl = 'http://localhost:3030/jsonstore/advanced/articles';

    fetch(`${baseUrl}/list`)
        .then(response => response.json())
        .then(data => {
            for (const article of data) {
                fetch(`${baseUrl}/details/${article._id}`)
                    .then(res => res.json())
                    .then(data => {
                        const art = generateElement(article.title, article._id, data.content);
                        main.appendChild(art);
                    })
                    .catch(e => console.log(e));
            }
        })
        .catch(e => console.log(e));
}

function showMore(event) {
    const head = event.target.parentElement.parentElement;

    if (head.querySelector('div.extra').style.display == 'inline-block') {
        head.querySelector('div.extra').style.display = ''
        event.target.textContent = 'More'
    } else {
        event.target.textContent = 'Less'
        head.querySelector('div.extra').style.display = 'inline-block'
    }
    console.log(head);
}


function generateElement(title, id, text) {
    const div = document.createElement('div');
    div.setAttribute('class', 'accordion');

    const headDiv = document.createElement('div');
    headDiv.setAttribute('class', 'head');

    const span = document.createElement('span');
    span.textContent = title;
    headDiv.appendChild(span);

    const btn = document.createElement('button');
    btn.setAttribute('class', 'button');
    btn.setAttribute('id', `${id}`);
    btn.textContent = 'More';
    btn.addEventListener('click', showMore)
    headDiv.appendChild(btn);
    div.appendChild(headDiv);

    const extraDiv = document.createElement('div');
    extraDiv.setAttribute('class', 'extra');

    const p = document.createElement('p');
    p.textContent = text;
    extraDiv.appendChild(p);
    div.appendChild(extraDiv);

    return div;
}

solution();