async function getInfo() {
    const stopId = document.getElementById('stopId').value;
    const stopName = document.getElementById('stopName');
    const list = document.getElementById('buses');

    try {
        const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId}`);
        if (!response.ok) {
            throw new Error('Error');
        }

        const data = await response.json();
        stopName.textContent = data.name;
        list.innerHTML = '';
        for (const stop in data.buses) {
            list.appendChild(createLi(stop, data.buses[stop]))
        }

    } catch (error) {
        list.innerHTML = '';
        stopName.textContent = 'Error'
    }
}

function createLi(bus, time) {
    const li = document.createElement('li');
    let text = `Bus ${bus} arrives in ${time} minutes`;
    li.textContent = text;
    return li;
}