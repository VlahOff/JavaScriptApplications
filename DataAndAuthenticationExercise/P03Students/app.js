window.addEventListener('load', loadData);
document.getElementById('submit').addEventListener('click', createNewStudent);
const table = document.querySelector('tbody');

async function createNewStudent(event) {
    event.preventDefault();
    const input = document.querySelector('div.inputs');
    const firstNameInput = input.querySelector('input[name="firstName"]');
    const lastNameInput = input.querySelector('input[name="lastName"]');
    const facultyInput = input.querySelector('input[name="facultyNumber"]');
    const gradeInput = input.querySelector('input[name="grade"]');

    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/students', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                facultyNumber: facultyInput.value,
                grade: gradeInput.value
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        firstNameInput.value = '';
        lastNameInput.value = '';
        facultyInput.value = '';
        gradeInput.value = '';

        loadData();
    } catch (error) {
        alert(error.message);
    }
}

async function loadData() {
    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/students');
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();

        table.innerHTML = '';
        for (const person in data) {
            const tr = document.createElement('tr');
            const personRow = createRow(data[person].firstName, data[person].lastName, data[person].facultyNumber, data[person].grade);
            tr.appendChild(personRow.firstNameTd);
            tr.appendChild(personRow.lastNameTd);
            tr.appendChild(personRow.facultyTd);
            tr.appendChild(personRow.gradeTd);

            table.appendChild(tr);
        }

    } catch (error) {
        alert(error.message);
    }
}

function createRow(firstName, lastName, facultyNumber, grade) {
    const firstNameTd = document.createElement('td');
    const lastNameTd = document.createElement('td');
    const facultyTd = document.createElement('td');
    const gradeTd = document.createElement('td');

    firstNameTd.textContent = firstName;
    lastNameTd.textContent = lastName;
    facultyTd.textContent = facultyNumber;
    gradeTd.textContent = grade;

    return {
        firstNameTd,
        lastNameTd,
        facultyTd,
        gradeTd
    };
}