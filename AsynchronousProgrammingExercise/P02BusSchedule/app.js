function solve() {
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    const infoBox = document.querySelector('span.info');

    let busStop = {
        next: 'depot',
    };

    function depart() {
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${busStop.next}`)
            .then(response => response.json())
            .then((data) => {
                // we break the reference using this
                busStop = JSON.parse(JSON.stringify(data));
                infoBox.textContent = `Next stop ${busStop.name}`;
            })
            .catch(error => console.log(error));
            arriveBtn.disabled = false;
            departBtn.disabled = true;
    }

    function arrive() {
        infoBox.textContent = `Arriving at ${busStop.name}`;
        arriveBtn.disabled = true;
        departBtn.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();