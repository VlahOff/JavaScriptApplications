function loadRepos() {
	// read input field
	const input = document.getElementById('username').value;
	const list = document.getElementById('repos');

	// send request
	fetch(`https://api.github.com/users/${input}/repos`)
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
		list.innerHTML = '';
		for (const repo of data) {
			list.innerHTML += `
			<li>
		    	<a href="${repo.html_url}" target="_blank">
		        	${repo.full_name}
		    	</a>
			</li>`;
		}
	}

	function handleError(error) {
		list.innerHTML = `${error.message}`;
	}
}