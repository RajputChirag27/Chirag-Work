document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault();


    var startYear = document.getElementById('startYear').value;
    var graduationYear = document.getElementById('graduationYear').value;
    var dob = new Date(document.getElementById('dob').value);
    var today = new Date();
    var age = today.getFullYear() - dob.getFullYear();
    var m = today.getMonth() - dob.getMonth();
    var email = document.getElementById('email').value;

    // Form Handling 

    var formData = new FormData(this); // Get form data
    var data = {};


    formData.forEach(function (value, key) {
        data[key] = value;
    });




    // Email Validation

    if (validateEmail(email)) {
        console.log("Valid email");
    } else {
        alert("Invalid email");
        event.preventDefault();
    }



    // Age Validation
    if (m < 0 || (m == 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    if (age < 18) {
        alert("You must be atleast 18 years old");
        event.preventDefault();
    }

    // Graduation Year Validation
    if (graduationYear <= startYear) {
        alert("Graduation year must be greater than start year.");
        event.preventDefault();
    }

    addDatatoTable(data);
    $('#exampleModal').modal('hide'); // Hide modal

    this.reset(); // Reset form
});


// Email Validation Function 

function validateEmail(email) {
    // Regular expression pattern for validating email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function addDatatoTable(data) {
    var tableBody = document.getElementById('data-table-body');
    var newRow = document.createElement('tr');
    var tableShow = document.getElementById("collTable").style.display = "block";
    newRow.innerHTML = `
            <td>${data.firstName}</td>
            <td>${data.lastName}</td>
            <td>${data.dob}</td>
            <td>${data.email}</td>
            <td>${data.address}</td>
            <td>${data.startYear}</td>
            <td>${data.graduationYear}</td>
            <td>
                <button type="button" class="btn btn-success btn-sm" onclick="editEntry(this)">Edit</button>
                <button type="button" class="btn btn-danger btn-sm" onclick="deleteEntry(this)">Delete</button>
            </td>
        `;
    tableBody.appendChild(newRow);
}

function deleteEntry(button) {
    var row = button.closest('tr');
    row.remove();

    // Check if the table has any remaining rows
    var table = document.getElementById('data-table-body');
    if (table.rows.length === 0) {
        // If the table is empty, remove the entire table
        table.parentNode.parentNode.remove();
    }
}

// Edit Function 

function editEntry(button) {
    var row = button.closest('tr');
    var cells = row.getElementsByTagName('td');

    // Extract data from the selected row
    var firstName = cells[0].innerText;
    var lastName = cells[1].innerText;
    var dob = cells[2].innerText;
    var email = cells[3].innerText;
    var address = cells[4].innerText;
    var startYear = cells[5].innerText;
    var graduationYear = cells[6].innerText;

    // Populate form fields with the extracted data
    document.getElementById('firstName').value = firstName;
    document.getElementById('lastName').value = lastName;
    document.getElementById('dob').value = dob;
    document.getElementById('email').value = email;
    document.getElementById('address').value = address;
    document.getElementById('startYear').value = startYear;
    document.getElementById('graduationYear').value = graduationYear;

    // Display the modal
    $('#exampleModal').modal('show');
    document.getElementById('myForm').addEventListener('submit', function (event) {
        event.preventDefault();
        row.remove();
    });
}