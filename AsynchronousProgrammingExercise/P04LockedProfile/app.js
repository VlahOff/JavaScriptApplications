function lockedProfile() {
    const main = document.getElementById('main');
    main.removeChild(document.querySelector('.profile'));

    fetch('http://localhost:3030/jsonstore/advanced/profiles')
        .then(res => res.json())
        .then(data => {
            let size = Object.keys(data).length;
            let index = 1;
            console.log(size);
            usersData = JSON.parse(JSON.stringify(data));

            for (const currentUser in data) {
                const user = data[currentUser];
                const profile = createProfile(index, user.username, user.email, user.age);

                main.appendChild(profile);
                index++;
            }

            Array.from(document.querySelectorAll('button'))
                .forEach(btn => btn.addEventListener('click', showOrHide));

            Array.from(document.querySelectorAll('input[type=radio]:nth-child(3)'))
                .forEach(btn => btn.addEventListener('click', showOrHide));
        })
        .catch(error => console.log(error));
}

function createProfile(num, username, email, age) {
    num = 1;
    const div = document.createElement('div');
    div.setAttribute('class', 'profile');
    div.innerHTML = `
    <img src="./iconProfile2.png" class="userIcon" />
    <label>Lock</label>
    <input type="radio" name="user${num}Locked" value="lock" checked>
    <label>Unlock</label>
				<input type="radio" name="user${num}Locked" value="unlock"><br>
				<hr>
				<label>Username</label>
				<input type="text" name="user${num}Username" value="${username}" disabled readonly />
				<div class="user${num}Username">
                <hr>
					<label>Email:</label>
					<input type="email" name="user${num}Email" value="${email}" disabled readonly />
					<label>Age:</label>
					<input type="text" name="user${num}Age" value="${age}" disabled readonly />
				</div>
				
				<button>Show more</button>
    `;
    return div;
}

function showOrHide(event) {
    const profile = event.target.parentElement;
    const showMoreBtn = event.target;
    const hiddenInfo = profile.querySelectorAll('div')[0];

    const stateOfInfo = hiddenInfo.style.display = 'inline-block';
    const lockBtn = profile.querySelectorAll('input[type=radio]')[0];

    const eventType = event.target.tagName;
    if (!lockBtn.checked && eventType == 'BUTTON') {
        stateOfInfo == 'none' ? hiddenInfo.style.display = 'inline-block' : hiddenInfo.style.display = 'none';
        stateOfInfo == 'inline-block' ? profile.getElementsByTagName('button')[0].textContent = 'Show more' : profile.getElementsByTagName('button')[0].textContent = 'Hide it';
    } else if (lockBtn.checked && eventType == 'INPUT') {
        hiddenInfo.style.display = 'none';
        profile.getElementsByTagName('button')[0].textContent = 'Show more';
    }
    // const profile = event.target.parentElement;
    // const showMoreBtn = event.target;
    // const hiddenInfo = profile.querySelector('div');

    // const stateOfHiddenElement = hiddenInfo.style.display = 'inline-block';
    // const lockBtn = profile.querySelectorAll('input[type=radio]')[0];

    // const eventType = event.target.tagName;
    // console.log(eventType);
    // console.log(stateOfHiddenElement);
    // if (!lockBtn.checked && eventType == 'BUTTON') {
    //     stateOfHiddenElement == 'none' ? hiddenInfo.style.display = 'inline-block' : hiddenInfo.style.display = 'none';
    //     stateOfHiddenElement == 'inline-block' ? showMoreBtn.textContent = 'Show more' : showMoreBtn.textContent = 'Hide it';
    // } else if (lockBtn.checked && eventType == 'INPUT') {
    //     hiddenInfo.style.display = 'none';
    //     profile.getElementsByTagName('button')[0].textContent = 'Show more';
    // }
}