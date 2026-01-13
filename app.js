// Task data
let tasks = [];

// Points based on difficulty
function getPoints(task) {
  switch(task.difficulty) {
    case "Easy": return 10;
    case "Medium": return 20;
    case "Hard": return 40;
    default: return 5;
  }
}

// Badge based on points
function getBadge(totalPoints) {
  if(totalPoints >= 200) return "🏆 Superstar";
  if(totalPoints >= 100) return "🎖 Achiever";
  if(totalPoints >= 50) return "⭐ Rising Star";
  return "";
}

// Add new task
function addTask() {
  const title = document.getElementById("task-title").value;
  const subject = document.getElementById("task-subject").value;
  const difficulty = document.getElementById("task-difficulty").value;

  if(title.trim() === "") return alert("Please enter task title!");

  tasks.push({ title, subject, difficulty, completed: false, date: new Date().toISOString().split('T')[0] });

  document.getElementById("task-title").value = "";
  renderTasks();
  chart.update();
}

// Render tasks
function renderTasks() {
  const dashboard = document.getElementById("dashboard");
  dashboard.innerHTML = "";

  let totalPoints = 0;

  tasks.forEach((task, index) => {
    totalPoints += getPoints(task);

    const card = document.createElement("div");
    card.className = `card ${task.subject}`;
    card.innerHTML = `
      <h3>${task.title}</h3>
      <p>Subject: ${task.subject}</p>
      <p>Difficulty: ${task.difficulty}</p>
      <p>Points: ${getPoints(task)}</p>
      <span class="badge">${getBadge(totalPoints)}</span>
      <br>
      <button onclick="completeTask(${index})" ${task.completed ? 'disabled' : ''}>
        ${task.completed ? '✅ Completed' : 'Complete'}
      </button>
    `;
    dashboard.appendChild(card);
  });

  document.getElementById("streak").innerText = `🔥 Current streak: ${calculateStreak()} days`;
}

// Complete task
function completeTask(index) {
  if(!tasks[index].completed) {
    tasks[index].completed = true;

    // Confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    renderTasks();
    chart.update();
  }
}

// Calculate streak
function calculateStreak() {
  let streak = 0;
  tasks.sort((a,b) => new Date(b.date) - new Date(a.date));
  for(let task of tasks) {
    if(task.completed) streak++;
    else break;
  }
  return streak;
}

// Chart.js
const ctx = document.getElementById('subjectChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Math", "AI", "Web", "Productivity"],
    datasets: [{
      label: 'Tasks Completed',
      data: [
        tasks.filter(t=>t.subject=="Math" && t.completed).length,
        tasks.filter(t=>t.subject=="AI" && t.completed).length,
        tasks.filter(t=>t.subject=="Web" && t.completed).length,
        tasks.filter(t=>t.subject=="Productivity" && t.completed).length
      ],
      backgroundColor: ['#f59e0b','#6366f1','#10b981','#ec4899']
    }]
  },
  options: { responsive: true }
});

// Initial render
renderTasks();
