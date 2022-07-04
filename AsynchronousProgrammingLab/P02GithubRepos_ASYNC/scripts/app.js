async function loadRepos() {
	// read input field
	const input = document.getElementById('username').value;
	const list = document.getElementById('repos');

	// send request
	try {
		const response = await fetch(`https://api.github.com/users/${input}/repos`);
		if (!response.ok) {
			throw new Error(`${response.status} ${response.statusText}`);
		}

		const data = await response.json();
		list.innerHTML = '';
		for (const repo of data) {
			list.innerHTML += `
			<li>
		    	<a href="${repo.html_url}" target="_blank">
		        	${repo.full_name}
		    	</a>
			</li>`;
		}
	} catch (error) {
		list.innerHTML = `${error.message}`;
	}
}