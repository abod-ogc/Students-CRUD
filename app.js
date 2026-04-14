import { Student } from "./Modules/Logic/student.js";
import { studentCard } from "./Modules/UI/studentsControllers.js";
import {validateEmail} from "./Modules/Logic/util.js";
import {toggleToast} from "./Modules/UI/toast.js";

const student = new Student();
const API_ENDPOINT = "https://jsonplaceholder.typicode.com/users";

const studentsCount = document.querySelector(".studentsCount");
const studentsListArea = document.querySelector(".studentsList");
const studentIDPara = document.querySelector(".sid");
const overlay = document.querySelector(".overlay");

let debounceTimer;
let studentsList = [];

const Inputs = {
  searchInput: document.querySelector(".searchInput"),
  studentNameInput: document.querySelector(".studentName"),
  studentEmailInput: document.querySelector(".studentEmail"),
  studentMajorInput: document.querySelector(".majorList"),
  studentGPAInput: document.querySelector(".studentGPA"),
};

const editInputs = {
  studentNameInput: overlay.querySelector(".studentName"),
  studentEmailInput: overlay.querySelector(".studentEmail"),
  studentMajorInput: overlay.querySelector(".majorList"),
  studentGPAInput: overlay.querySelector(".studentGPA")
};

const Btns = {
  reloadBtn: document.querySelector(".reload"),
  clearBtn: document.querySelector(".clear"),
  createBtn: document.querySelector(".create"),
  cancelBtn: document.querySelector(".cancel"),
  updateBtn: document.querySelector(".update"),
};

Inputs.searchInput.addEventListener("input", (e) => {
  let value = e.target.value.trim();
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
      if (value !== "") {
          searchStudents(value);
      } else {
          loadStudents();
      }
  }, 300);
});

Btns.reloadBtn.addEventListener("click", () => {
  if (Inputs.searchInput) Inputs.searchInput.value = "";
  clearInputs();
  loadStudents();
});

Btns.clearBtn.addEventListener("click", () => {
  clearInputs();
});

Btns.cancelBtn.addEventListener("click", () => {
  overlay.style.display = "none";
});

Btns.updateBtn.addEventListener("click", () => {
  if(!validateInput(
  editInputs.studentNameInput, 
  (val) => val.trim().length >= 3 && val.includes(' '), 
  "you should write the first & Last Name."
  )) return;

  if(!validateInput(
    editInputs.studentEmailInput, 
    (val) => validateEmail(val.trim()) && val !== "", 
    "you should write acorrect email."
  )) return;

  let studentToUpdate = studentsList.find(s => s.id === student.id);

  if (studentToUpdate) {
      studentToUpdate.name = editInputs.studentNameInput.value.trim();
      studentToUpdate.email = editInputs.studentEmailInput.value.trim();
      studentToUpdate.major = editInputs.studentMajorInput.options[editInputs.studentMajorInput.selectedIndex].text;
      studentToUpdate.gpa = parseFloat(editInputs.studentGPAInput.value);

      appendStudents(studentsList);
      toggleToast(`✅ Student with id: ${student.id} Updated Successfully.`);
      overlay.style.display = "none";
  }
});

overlay.addEventListener("click", (e) => {
  if(e.target === overlay)
    overlay.style.display = "none";
});

Btns.createBtn.addEventListener("click", () => {
  if(!validateInput(
        Inputs.studentNameInput, 
        (val) => val.trim().length >= 3 && val.includes(' '), 
        "you should write the first & Last Name."
  )) return;

  if(!validateInput(
      Inputs.studentEmailInput, 
      (val) =>  validateEmail(val.trim()) && val !== "", 
      "you should write acorrect email."
  )) return;

  student.name = Inputs.studentNameInput.value.trim();
  student.email = Inputs.studentEmailInput.value.trim();
  student.major = Inputs.studentMajorInput.options[Inputs.studentMajorInput.selectedIndex].text;
  student.gpa = parseFloat(Inputs.studentGPAInput.value);
  student.id = studentsList.length > 0 ? Math.max(...studentsList.map(s => s.id)) + 1 : 1;

  studentsList.push(new Student(
  student.id,
  student.name,
  student.email,
  student.major,
  student.gpa
));

  appendStudents(studentsList);
  toggleToast(`✅ Student with id: ${student.id} Created Successfully.`);
  clearInputs();
});

function clearInputs() {
  if (Inputs.studentNameInput){
    Inputs.studentNameInput.value = "";
    if(Inputs.studentNameInput.classList.contains('input-error'))
    {
      Inputs.studentNameInput.classList.remove('input-error');
      Inputs.studentNameInput.parentElement.querySelector('.error-msg')?.remove();
    }
  };
  if (Inputs.studentEmailInput){
    Inputs.studentEmailInput.value = "";
    if(Inputs.studentEmailInput.classList.contains('input-error'))
    {
      Inputs.studentEmailInput.classList.remove('input-error');
      Inputs.studentEmailInput.parentElement.querySelector('.error-msg')?.remove();
    }
  };
  if (Inputs.studentEmailInput) Inputs.studentEmailInput.value = "";
  if (Inputs.studentMajorInput) Inputs.studentMajorInput.value = "2";
  if (Inputs.studentGPAInput) Inputs.studentGPAInput.value = "3";
}

/**
 * @param {HTMLInputElement} input
 * @param {Function} condition
 * @param {string} message
 */

const validateInput = (input, condition, message) =>{
  let errorElement = input.parentElement.querySelector('.error-msg');

  if(!condition(input.value))
  {
    input.classList.add('input-error');
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.className = 'error-msg';
      input.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;
    return false;
  }
  else
  {
    input.classList.remove('input-error');
    if(errorElement)
      errorElement.remove();

    return true;
  }
}

function appendStudents(data){
  studentsListArea.innerHTML = "";
  const fragment = document.createDocumentFragment();
  data.forEach((s) =>
    fragment.appendChild(
      studentCard(s, { onDelete: handelDelete, onEdit: handelEdit }),
    ),
  );

  studentsCount.textContent = `${data.length} shown`;
  studentsListArea.appendChild(fragment);
}

function searchStudents(value)
{
  studentsCount.style.display = "block";
  let result = studentsList.filter(item => 
  item.name.toLowerCase().includes(value.toLowerCase()) || item.email.toLowerCase().includes(value.toLowerCase()));

  if(result.length > 0)
    appendStudents(result);
  else
  {
    studentsCount.textContent = `${result.length} shown`;
    studentsListArea.innerHTML = "<p>No Results Found..</p>";
  }
}

async function loadStudents() {
  let {data, result} = await Student.getStudents(API_ENDPOINT);

  if (result.success)
  {
    studentsCount.style.display = "block";
    studentsList = data;
    appendStudents(studentsList);
  }
  else
    studentsListArea.innerHTML = `<p>${result.error}</p>`;
}

function handelDelete(id) {
  if(!confirm("Are you sure you want to delete student with ID: " + id + "?"))return;

  studentsList = studentsList.filter(s => s.id !== id);
  studentsListArea.innerHTML = "";
  appendStudents(studentsList);
  toggleToast(`✅ Student with id: ${id} Deleted Successfully.`);
}

function handelEdit(id) {
  overlay.style.display = "flex";
  let selectedStudent = studentsList.find(s => s.id === id);
  
  if(selectedStudent)
  {
    student.id = selectedStudent.id;
    student.name = selectedStudent.name;
    student.email = selectedStudent.email;
    student.major = selectedStudent.major;
    student.gpa = selectedStudent.gpa;

    studentIDPara.textContent = `Editing Student with ID: ${student.id}`;
    editInputs.studentNameInput.value = student.name;
    editInputs.studentEmailInput.value = student.email;
    editInputs.studentMajorInput.value = Array.from(editInputs.studentMajorInput.options).find(o => o.text === student.major)?.value || "2";
    editInputs.studentGPAInput.value = student.gpa;
  }
}

loadStudents();