const addStudentBtn = document.querySelector(".add-student");
const studentForm = document.querySelector(".student-form");
const tableBody = document.querySelector(".table-body");
const cancelBtn = document.querySelector(".cancel");

let studentList = [];


function calculateGPA(science, maths, english, computer, social) {
  const total = science + maths + english + computer + social;
  const average = total / 5;

  if (average >= 90) return 4.0;
  if (average >= 80) return 3.6;
  if (average >= 70) return 3.2;
  if (average >= 60) return 2.8;
  if (average >= 50) return 2.4;
  if (average >= 40) return 2.0;
  return 0.0;
}

function calculateResult(science, maths, english, computer, social) {
  const totalMarksObtained = science + maths + english + computer + social;
  const totalPercentage = (totalMarksObtained / 500) * 100;
  const GPA = calculateGPA(science, maths, english, computer, social);

  const isPassed =
    science >= 40 &&
    maths >= 40 &&
    english >= 40 &&
    computer >= 40 &&
    social >= 40;

  return {
    totalMarksObtained,
    totalPercentage,
    GPA,
    isPassed,
  };
}

function addToList(student) {
  studentList.push(student);
  displayStudentInfo();
}


function displayStudentInfo() {
  tableBody.innerHTML = "";

  studentList.forEach((student, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.name}</td>
      <td>${student.roll}</td>
      <td>${student.totalMarksObtained}</td>
      <td>${student.totalPercentage.toFixed(2)}%</td>
      <td>${student.GPA.toFixed(1)}</td>
      <td>
        <span class="badge ${student.isPassed ? "badge-pass" : "badge-fail"}">
          ${student.isPassed ? "PASS" : "FAIL"}
        </span>
      </td>
    `;

    tableBody.appendChild(tr);
  });
}


addStudentBtn.addEventListener("click", () => {
  studentForm.classList.remove("hidden");
});

cancelBtn.addEventListener("click", () => {
  studentForm.reset();
  studentForm.classList.add("hidden");
});


studentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(studentForm);


  const name = formData.get("name").trim();
  const roll = Number(formData.get("roll"));

  const science = Number(formData.get("science"));
  const maths = Number(formData.get("maths"));
  const english = Number(formData.get("english"));
  const computer = Number(formData.get("computer"));
  const social = Number(formData.get("social"));


  const marksArray = [science, maths, english, computer, social];
  const invalidMarks = marksArray.some((m) => m < 0 || m > 100 || isNaN(m));

  if (!name) {
    alert("Name cannot be empty!");
    return;
  }

  if (invalidMarks) {
    alert("Marks must be between 0 and 100.");
    return;
  }

  const result = calculateResult(science, maths, english, computer, social);

  const student = {
    name,
    roll,
    science,
    maths,
    english,
    computer,
    social,
    ...result,
  };

  addToList(student);

  studentForm.reset();
  studentForm.classList.add("hidden");
});
