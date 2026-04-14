export function studentCard(student, handlers) {
  const studentCardElement = document.createElement("div");
  studentCardElement.classList.add("studentCard");

  studentCardElement.innerHTML = `
        <h4 class="studentName">${student.name}</h4>
        <p class="studentEmail">${student.email}</p>
        <div class="extraInfo">
            <span class="tag">id: ${student.id}</span>
            <span class="tag">Major: ${student.major}</span>
            <span class="tag">GPA: ${student.gpa}</span>
        </div>
        <div class="studentActionBtns">
            <button class="editStudent">Edit</button>
            <button class="deleteStudent">Delete</button>
        </div>
    `;

  studentCardElement
    .querySelector(".deleteStudent")
    .addEventListener("click", () => handlers.onDelete(student.id));

  studentCardElement
    .querySelector(".editStudent")
    .addEventListener("click", () => handlers.onEdit(student.id));

  return studentCardElement;
}