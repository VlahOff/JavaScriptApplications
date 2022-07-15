document.querySelector('form').addEventListener('submit', onCreate);

async function onCreate(event) {
    event.preventDefault();

    const formData = new FormData(event.target);


    const name = formData.get('name').trim();
    const img = formData.get('img').trim();
    const ingredients = formData.get('ingredients').trim().split('\n');
    const steps = formData.get('steps').trim().split('\n');

    const recipe = {
        name,
        img,
        ingredients,
        steps
    };

    const token = sessionStorage.getItem('accessToken');

    if (token == null) {
        alert('Please login');
        window.localStorage = '/RemoteDataAndAuthenticationLab/login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3030/jsonstore/cookbook/recipes', {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(recipe)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error);
        }

        window.location = '/RemoteDataAndAuthenticationLab/index.html';
    } catch (error) {
        alert(error.message);
    }
}