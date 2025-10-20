document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('meeting-form');
    const reserveButton = document.getElementById('reserve-btn');
    const submitButton = document.getElementById('submit-btn');

    // Add event listener for the Reserve button
    reserveButton.addEventListener('click', (event) => {
        event.preventDefault();
        reserveForm();
    });

    function reserveForm() {
        const meetDate = document.getElementById("meet-date").value;

        if (!isValidDate(meetDate)) {
            alert("Please enter a valid day between 1 and 31.");
            return;
        }

        // Remove any previous highlights
        document.querySelectorAll(".calendar td").forEach(td => {
            td.classList.remove("highlighted");
        });

        // Find and highlight the cell with the selected date
        const dateCells = document.querySelectorAll(".calendar td");
        dateCells.forEach(td => {
            if (td.textContent.trim() == meetDate) {
                td.classList.add("highlighted");
            }
        });
    }

    function isValidDate(date) {
        const day = parseInt(date, 10);
        return !isNaN(day) && day >= 1 && day <= 31;
    }

    // Add event listener for the Submit button
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        submitForm();
    });

    function submitForm() {
        const meetDate = document.getElementById("meet-date").value;

        if (!isValidDate(meetDate)) {
            alert("Please enter a valid day between 1 and 31.");
            return;
        }

        const formData = new FormData(form);
        const queryString = new URLSearchParams(formData).toString();
        const url = `http://www.randyconnolly.com/tests/process.php?${queryString}`;

        // Redirect to the URL with form data
        window.location.href = url;
    }

    function resetForm(event) {
        event.preventDefault();
        const answer = prompt('Solve this equation to reset the form: 10 + 24 = ?');
        if (parseInt(answer, 10) === 34) {
            form.reset();
            alert("Form reset successfully.");
            // Optionally remove highlights when form is reset
            document.querySelectorAll(".calendar td").forEach(td => {
                td.classList.remove("highlighted");
            });
        } else {
            alert("Reset canceled due to incorrect answer.");
        }
    }

    // Add event listener for the Reset button
    const resetButton = document.getElementById('reset-btn');
    resetButton.addEventListener('click', resetForm);
});
