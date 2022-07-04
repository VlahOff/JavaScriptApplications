async function loadCommits() {
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const list = document.getElementById('commits');

    try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);
        if (!response.ok) {
            throw new Error(`${response.status}(${response.statusText})`);
        }

        const data = await response.json();
        console.log(data)
        for (const commit of data) {
            list.innerHTML = '';
            const li = document.createElement('li');
            const p = document.createElement('p');
            p.textContent = `${commit.commit.author.name}: ${commit.commit.message}`;
            li.appendChild(p);
            list.appendChild(li);
        }
    } catch (error) {
        list.innerHTML = `${error}`;
    }
}