const generateFieldsBtn = document.getElementById('generateFields');
const attendanceForm = document.getElementById('attendanceForm');
const summaryDiv = document.getElementById('summary');

generateFieldsBtn.addEventListener('click', () => {
    attendanceForm.innerHTML = '';
    summaryDiv.innerHTML = '';
    const numEmployees = parseInt(document.getElementById('numEmployees').value);

    for (let i = 0; i < numEmployees; i++) {
        const label = document.createElement('label');
        label.textContent = `Employee ${i + 1} Name:`;
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Enter name';
        nameInput.required = true;

        const attendanceLabel = document.createElement('label');
        attendanceLabel.textContent = 'Attendance String (P/A for 30 days):';
        const attendanceInput = document.createElement('input');
        attendanceInput.type = 'text';
        attendanceInput.placeholder = 'e.g., PPPAPPPAPPPAPPPAPPPAPPPAPPPP';
        attendanceInput.required = true;

        attendanceForm.appendChild(label);
        attendanceForm.appendChild(nameInput);
        attendanceForm.appendChild(attendanceLabel);
        attendanceForm.appendChild(attendanceInput);
        attendanceForm.appendChild(document.createElement('br'));
        attendanceForm.appendChild(document.createElement('br'));
    }

    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Generate Summary';
    submitBtn.type = 'button';
    submitBtn.addEventListener('click', generateSummary);
    attendanceForm.appendChild(submitBtn);
});

function generateSummary() {
    summaryDiv.innerHTML = '';
    const inputs = attendanceForm.querySelectorAll('input');

    for (let i = 0; i < inputs.length; i += 2) {
        const name = inputs[i].value.trim();
        const attendanceStr = inputs[i + 1].value.trim().toUpperCase();

        const totalDays = attendanceStr.length;
        const present = (attendanceStr.match(/P/g) || []).length;
        const absent = (attendanceStr.match(/A/g) || []).length;
        const percentage = ((present / totalDays) * 100).toFixed(2);

        const card = document.createElement('div');
        card.className = 'summary-card';
        card.innerHTML = `
            <strong>Employee:</strong> ${name}<br>
            <strong>Present:</strong> ${present}<br>
            <strong>Absent:</strong> ${absent}<br>
            <strong>Attendance %:</strong> ${percentage}%
        `;
        summaryDiv.appendChild(card);
    }
}
