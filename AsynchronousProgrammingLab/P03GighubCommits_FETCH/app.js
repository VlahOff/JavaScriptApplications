function loadCommits() {
    // Try it with Fetch API

    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const list = document.getElementById('commits');

    fetch(`https://api.github.com/repos/${username}/${repo}/commits`)
        .then(handleResponse)
        .then(displayRepos)
        .catch(handleError);

    function handleResponse(response) {
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    function displayRepos(data) {
        for (const commit of data) {
            const li = document.createElement('li');
            const p = document.createElement('p');
            p.textContent = `${commit.commit.author.name}: ${commit.commit.message}`;
            li.appendChild(p);
            list.appendChild(li);
            console.log(commit.commit)
        }
    }

    function handleError(error) {
        list.innerHTML = ''
        const li = document.createElement('li');
        li.textContent = `Error: ${error.statusText}(${error.status})  ${error}`
        list.appendChild(li)
        console.log(error)
    }
}