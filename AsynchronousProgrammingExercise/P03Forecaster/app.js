function attachEvents() {
    const input = document.getElementById('location');
    const getBtn = document.getElementById('submit');
    const displayDiv = document.getElementById('forecast');
    const currentDiv = document.getElementById('current');
    const upcomingDiv = document.getElementById('upcoming');

    let baseUrl = 'http://localhost:3030/jsonstore/forecaster';
    let code = '';

    const conditionIcons = {
        sunny: '&#x2600',
        'partly sunny': '&#x26C5',
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
                        return code = el.code;
                    }
                });

                fetch(`${baseUrl}/today/${code}`)
                    .then(res => res.json())
                    .then(data => {
                        const labelDiv = document.createElement('div');
                        labelDiv.setAttribute('class', 'label');
                        labelDiv.textContent = 'Current conditions'
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
                        currentDiv.appendChild(labelDiv);
                        currentDiv.appendChild(div);
                    });

                fetch(`${baseUrl}/upcoming/${code}`)
                    .then(res => res.json())
                    .then(data => {
                        const labelDiv = document.createElement('div');
                        labelDiv.setAttribute('class', 'label');
                        labelDiv.textContent = 'Three-day forecast';
                        const div = document.createElement('div');
                        div.setAttribute('class', 'forecast-info');

                        const firstSpan = document.createElement('span');
                        firstSpan.setAttribute('class', 'upcoming');

                        const fObject = data.forecast[0];
                        const symSpanF = document.createElement('span');
                        symSpanF.setAttribute('class', 'symbol');
                        symSpanF.innerHTML = conditionIcons[fObject.condition.toLowerCase()];
                        firstSpan.appendChild(symSpanF);
                        const tempSpanF = document.createElement('span');
                        tempSpanF.setAttribute('class', 'forecast-data');
                        tempSpanF.innerHTML = `${fObject.low}${degrees}/${fObject.high}${degrees}`;
                        firstSpan.appendChild(tempSpanF);
                        const conSpanF = document.createElement('span');
                        conSpanF.setAttribute('class', 'forecast-data');
                        conSpanF.textContent = fObject.condition;
                        firstSpan.appendChild(conSpanF);

                        const secondSpan = document.createElement('span');
                        secondSpan.setAttribute('class', 'upcoming');

                        const sObject = data.forecast[1];
                        const symSpanS = document.createElement('span');
                        symSpanS.setAttribute('class', 'symbol');
                        symSpanS.innerHTML = conditionIcons[sObject.condition.toLowerCase()];
                        secondSpan.appendChild(symSpanS);
                        const tempSpanS = document.createElement('span');
                        tempSpanS.setAttribute('class', 'forecast-data');
                        tempSpanS.innerHTML = `${sObject.low}${degrees}/${sObject.high}${degrees}`;
                        secondSpan.appendChild(tempSpanS);
                        const conSpanS = document.createElement('span');
                        conSpanS.setAttribute('class', 'forecast-data');
                        conSpanS.textContent = sObject.condition;
                        secondSpan.appendChild(conSpanS);

                        const thirdSpan = document.createElement('span');
                        thirdSpan.setAttribute('class', 'upcoming');

                        const tObject = data.forecast[2];
                        const symSpanT = document.createElement('span');
                        symSpanT.setAttribute('class', 'symbol');
                        symSpanT.innerHTML = conditionIcons[tObject.condition.toLowerCase()];
                        thirdSpan.appendChild(symSpanT);
                        const tempSpanT = document.createElement('span');
                        tempSpanT.setAttribute('class', 'forecast-data');
                        tempSpanT.innerHTML = `${tObject.low}${degrees}/${tObject.high}${degrees}`;
                        thirdSpan.appendChild(tempSpanT);
                        const conSpanT = document.createElement('span');
                        conSpanT.setAttribute('class', 'forecast-data');
                        conSpanT.textContent = tObject.condition;
                        thirdSpan.appendChild(conSpanT);

                        div.appendChild(firstSpan);
                        div.appendChild(secondSpan);
                        div.appendChild(thirdSpan);
                        upcomingDiv.appendChild(labelDiv);
                        upcomingDiv.appendChild(div);
                    });
            })
            .catch(error => console.log(error));

    });
}

attachEvents();