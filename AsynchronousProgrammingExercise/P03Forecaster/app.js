function attachEvents() {
    const input = document.getElementById('location');
    const getBtn = document.getElementById('submit');
    const displayDiv = document.getElementById('forecast');
    const currentDiv = document.getElementById('current');
    const upcomingDiv = document.getElementById('upcoming');

    let baseUrl = 'http://localhost:3030/jsonstore/forecaster';
    let location = '';

    const conditionIcons = {
        sunny: '&#x2600',
        partlySunny: '&#x26C5',
        overcast: '&#x2601',
        rain: '&#x2614',
    };
    const degrees = '&#176;';

    getBtn.addEventListener('click', (e) => {
        currentDiv.innerHTML = '';
        upcomingDiv.innerHTML = '';

        displayDiv.style.display = 'inline';

        fetch(`${baseUrl}/locations`)
            .then(res => res.json())
            .then(data => {
                data.forEach(el => {
                    if (el.name == input.value) {
                        return location = el.code;
                    }
                });

                fetch(`${baseUrl}/today/${location}`)
                    .then(res => res.json())
                    .then(data => {
                        const div = document.createElement('div');
                        div.setAttribute('class', 'forecasts');

                        const conditionSpan = document.createElement('span');
                        conditionSpan.setAttribute('class', 'condition symbol');
                        let sym = data.forecast.condition.toLowerCase();
                        conditionSpan.innerHTML = `${conditionIcons[sym]}`;
                        div.appendChild(conditionSpan);

                        const mainSpan = document.createElement('span');
                        mainSpan.setAttribute('class', 'condition');

                        const locSpan = document.createElement('span');
                        locSpan.setAttribute('class', 'forecast-data');
                        locSpan.textContent = data.name;
                        mainSpan.appendChild(locSpan);

                        const tempSpan = document.createElement('span');
                        tempSpan.setAttribute('class', 'forecast-data');
                        tempSpan.innerHTML = `${data.forecast.low}${degrees}/${data.forecast.high}${degrees}`;
                        mainSpan.appendChild(tempSpan);

                        const conSpan = document.createElement('span');
                        conSpan.setAttribute('class', 'forecast-data');
                        conSpan.textContent = data.forecast.condition;
                        mainSpan.appendChild(conSpan);

                        div.appendChild(mainSpan);
                        currentDiv.appendChild(div);
                    });
            })
            .catch(error => console.log(error));

    });

}

attachEvents();