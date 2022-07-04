function loadCommits() {
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const list = document.getElementById('commits');

    fetch(`https://api.github.com/repos/${username}/${repo}/commits`)
    
}