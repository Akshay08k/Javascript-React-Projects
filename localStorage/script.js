document.addEventListener("DOMContentLoaded", () => {
    const addTaskBtn = document.getElementById("add-task-btn");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => renderTasks(task));

    addTaskBtn.addEventListener("click", () => {
        const taskText = todoInput.value.trim()
        if (taskText === "") return;
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        }
        tasks.push(newTask);
        saveTask();
        window.location.reload();
        todoInput.value = "";
        console.log(tasks)
    });
    function renderTasks(task) {
        const li = document.createElement("li");
        if (task.completed) {
            li.classList.add("completed");
        }
        li.setAttribute("data-id", task.id)
        li.innerHTML = `
        <span>${task.text}</span>
        <button class="delete-btn">Delete</button>`
        li.addEventListener("click", (e) => {
            task.completed = !task.completed
            li.classList.toggle("completed")
            saveTask()
        })

        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation()
            tasks = tasks.filter(t => t.id != task.id)
            li.remove()
            saveTask()
        })

        todoList.appendChild(li)
    }

    function saveTask() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
})