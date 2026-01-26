class Tasks {
    constructor(title, dueDate = null) {
        this.title = title;
        this.dueDate = dueDate;
        this.status = "pending";
    }
}

let tasksList = [];

const addTaskBtn = document.querySelector(".add-task-btn");
const formContainer = document.querySelector(".form-container");
const taskListWrapper = document.querySelector(".task-list-wrapper");
const filterTask = document.querySelector(".filter");

document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
    setupForm();
});

function dateFormatter(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function setupForm() {
    const addTaskForm = document.createElement("form");
    addTaskForm.classList.add("add-task-form", "hidden");

    addTaskForm.innerHTML = `<input type="text" class="task-input-title" placeholder="Task title" required/>
            <input type="date" class="task-input-date" required/>
           
         
            <button type='submit' class="add-task-confirm">Add</button>
            <button type='button' class='close-form'>Cancel</button>
            `;

    addTaskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = addTaskForm.querySelector(".task-input-title").value;
        const dueDate = new Date(
            addTaskForm.querySelector(".task-input-date").value,
        );

        const newTask = new Tasks(title, dueDate);
        tasksList.push(newTask);
        console.log(newTask);
        addTaskForm.reset();
        renderTasks();
    });

    addTaskForm
        .querySelector(".close-form")
        .addEventListener("click", (event) => {
            event.preventDefault();
            addTaskForm.reset();
            addTaskForm.classList.add("hidden");
        });
    formContainer.appendChild(addTaskForm);
}

addTaskBtn.addEventListener("click", () => {
    const form = document.querySelector(".add-task-form");
    form.classList.remove("hidden");
});

function renderTasks(filter= 'all') {
    taskListWrapper.innerHTML = "";
    const taskList = document.createElement("div");
    taskList.classList.add("task-list");

    tasksList.forEach((task, index) => {

        if (filter === "completed" && task.status !== "done") return;
        if (filter === "pending" && task.status === "done") return;

        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-task");
        deleteBtn.textContent = "X";

        const title = document.createElement("span");
        title.classList.add("task-title");
        title.textContent = task.title;

        const dueDate = document.createElement("span");
        dueDate.classList.add("task-due-date");
        dueDate.textContent = `Due: ${dateFormatter(task.dueDate)}`;

        taskDiv.append(deleteBtn, title, dueDate);

        taskCompletedLabel(task, taskDiv); //either checkbox if not completed or completed label

        deleteBtn.addEventListener("click", () => {
            tasksList.splice(index, 1);
            console.log(tasksList, index);
            renderTasks(filterTask.value);
        });

        taskList.appendChild(taskDiv);
    });
    taskListWrapper.appendChild(taskList);
}

function taskCompletedLabel(task, taskDiv) {
    if (task.status === "done") {
        taskDiv.classList.add("completed");
        const completedLabel = document.createElement("div");

        completedLabel.classList.add("task-status");
        completedLabel.textContent = "Done";
    } else {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-completed-checkbox");

        checkbox.addEventListener("change", () => {
            task.status = "done";
            
            renderTasks(filterTask.value);
        });
        taskDiv.prepend(checkbox);
    }
}
filterTask.addEventListener("change", function () {
    renderTasks(this.value);
});
