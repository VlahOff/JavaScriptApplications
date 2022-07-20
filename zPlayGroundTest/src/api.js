const host = 'http://localhost:3030';

export async function request(url, data) {
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData != null) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
        const res = await fetch(host + url, options);

        if (res.ok == false) {
            const error = await res.json();
            throw Error(error.message);
        }

        const result = await res.json();

        return result;
    } catch (err) {
        alert(err.message);
        throw err;
    }
}