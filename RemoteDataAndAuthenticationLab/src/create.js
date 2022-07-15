document.querySelector('form').addEventListener('submit', onCreate);

async function onCreate(event) {
    event.preventDefault();

    const recipe = {
        name: document.querySelector('input[name="name"]');
    }

    console.log(recipe)

}