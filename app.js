const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const statusText = document.getElementById("statusText");
const progressFill = document.getElementById("progressFill");

let tasks = JSON.parse(localStorage.getItem("donezo") || "[]");

function save() {
  localStorage.setItem("donezo", JSON.stringify(tasks));
}

function render() {
  list.innerHTML = "";
  let completed = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.done) {
      li.classList.add("done");
      completed++;
    }

    li.onclick = () => {
      task.done = !task.done;
      save();
      render();
    };

    list.appendChild(li);
  });

  statusText.textContent = `${completed} of ${tasks.length} done`;
  progressFill.style.width = tasks.length
    ? `${(completed / tasks.length) * 100}%`
    : "0%";
}

addBtn.onclick = () => {
  if (!input.value.trim()) return;
  tasks.push({ text: input.value, done: false });
  input.value = "";
  save();
  render();
};

render();
