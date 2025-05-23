window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem("List")) || [];
  renderTasks(tasks);
};

function func() {
  const input = document.getElementById("inp");
  const error = document.getElementById("error");

  let tasks = JSON.parse(localStorage.getItem("List")) || [];

  if (input.value.trim() === "") {
    error.innerText = "Yo, form must be filled. 😀";
    error.style.color = "red";
    return;
  } else {
    error.innerText = "";
  }

  const date = new Date();
  const time = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${date.getHours() >= 12 ? 'pm' : 'am'}`;

  const task = {
    id: Date.now(),
    text: input.value.trim(),
    time: time,
    completed: false
  };

  tasks.push(task);
  localStorage.setItem("List", JSON.stringify(tasks));

  input.value = "";
  renderTasks(tasks);
}

function renderTasks(tasks) {
  const list = document.getElementById("list");
  list.innerHTML = "";

  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.className = "task_item";

    const isChecked = task.completed ? "checked" : "";

    div.innerHTML = `
      <span class="list_header">
        <input type="checkbox" ${isChecked} onchange="toggleComplete(${task.id})" />
        <span class="time">${task.time}</span>
        <h3 style="text-decoration: ${task.completed ? 'line-through' : 'none'};">${task.text}</h3>
      </span>
      <div class="btns">
        <button onclick="editTask(${task.id})">Edit</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    list.appendChild(div);
  });
}

function toggleComplete(id) {
  let tasks = JSON.parse(localStorage.getItem("List")) || [];
  const index = tasks.findIndex(task => task.id === id);
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("List", JSON.stringify(tasks));
  renderTasks(tasks);
}

function deleteTask(id) {
  let tasks = JSON.parse(localStorage.getItem("List")) || [];
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem("List", JSON.stringify(tasks));
  renderTasks(tasks);
}

function editTask(id) {
  let tasks = JSON.parse(localStorage.getItem("List")) || [];
  const index = tasks.findIndex(task => task.id === id);

  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    localStorage.setItem("List", JSON.stringify(tasks));
    renderTasks(tasks);
  }
}
