
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value.trim();

        if (username === "admin" && password === "admin123") {

            alert("Login Successful");
            window.location.href = "dashboard.html";

        } else {

            alert("Invalid Username or Password");

        }

    });

}



function logout() {

    alert("Logged Out Successfully");
    window.location.href = "index.html";

}


const studentForm = document.getElementById("studentForm");

if (studentForm) {

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let editIndex = localStorage.getItem("editIndex");


    if (editIndex !== null) {

        let student = students[editIndex];

        document.getElementById("name").value = student.name;
        document.getElementById("email").value = student.email;
        document.getElementById("phone").value = student.phone;
        document.getElementById("department").value = student.department;
        document.getElementById("dob").value = student.dob;

        let gender = document.getElementsByName("gender");

        for (let i = 0; i < gender.length; i++) {

            if (gender[i].value === student.gender) {

                gender[i].checked = true;

            }

        }

    }

    studentForm.addEventListener("submit", function (event) {

        event.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let department = document.getElementById("department").value;
        let dob = document.getElementById("dob").value;

        let gender = "";

        let genderList = document.getElementsByName("gender");

        for (let i = 0; i < genderList.length; i++) {

            if (genderList[i].checked) {

                gender = genderList[i].value;

            }

        }

      

        if (name === "" || email === "" || phone === "" || department === "" || gender === "" || dob === "") {

            alert("All Fields are Required");
            return;

        }

        let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        if (!email.match(emailPattern)) {

            alert("Enter Valid Email");
            return;

        }

        if (phone.length != 10 || isNaN(phone)) {

            alert("Phone Number Must Contain Exactly 10 Digits");
            return;

        }

        let student = {

            name,
            email,
            phone,
            department,
            gender,
            dob

        };

        if (editIndex !== null) {

            students[editIndex] = student;

            localStorage.removeItem("editIndex");

            alert("Student Updated Successfully");

        } else {

            students.push(student);

            alert("Student Added Successfully");

        }

        localStorage.setItem("students", JSON.stringify(students));

        window.location.href = "student-list.html";

    });

}


function displayStudents() {

    let tableBody = document.getElementById("tableBody");

    if (!tableBody) {

        return;

    }

    tableBody.innerHTML = "";

    let students = JSON.parse(localStorage.getItem("students")) || [];

    students.forEach(function (student, index) {

        tableBody.innerHTML += `

        <tr>

            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.department}</td>
            <td>${student.gender}</td>
            <td>${student.dob}</td>

            <td>

                <button onclick="editStudent(${index})">Edit</button>

                <button onclick="deleteStudent(${index})">Delete</button>

            </td>

        </tr>

        `;

    });

}

displayStudents();


function deleteStudent(index) {

    let confirmDelete = confirm("Are you sure you want to delete this student?");

    if (!confirmDelete) {

        return;

    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();

}



function editStudent(index) {

    localStorage.setItem("editIndex", index);

    window.location.href = "student.html";

}



function searchStudent() {

    let input = document.getElementById("search").value.toLowerCase();

    let rows = document.querySelectorAll("#tableBody tr");

    rows.forEach(function (row) {

        let name = row.cells[0].innerText.toLowerCase();

        if (name.includes(input)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}