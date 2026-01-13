const tasks = [
  { title: "Finish Math assignment", subject: "Math", difficulty: "Medium", completed: false, date: "2026-01-13" },
  { title: "Watch AI lecture", subject: "AI", difficulty: "Easy", completed: false, date: "2026-01-13" },
];

let totalPoints = 0;

function getPoints(task) {
  switch(task.difficulty) {
    case "Easy": return 10;
    case "Medium": return 20;
    case "Hard": return 40;
    default: return 5;
  }
}

function getBadge(totalPoints) {
  if(totalPoints >= 200) return "🏆 Superstar";
  if(totalPoints >= 100) return "🎖 Achiever";
  if(totalPoints >= 50) return "⭐ Rising Star";
  return "";
}

function renderTasks() {
  const dashboard = document.getElementById("dashboard");
  dashboard.innerHTML = "";
  totalPoints = 0;

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
      <button onclick="completeTask(${index})">Complete</button>
    `;
    dashboard.appendChild(card);
  });

  document.getElementById("streak").innerText = `🔥 Current streak: ${calculateStreak()} days`;
}

function completeTask(index) {
  tasks[index].completed = true;
  renderTasks();
  chart.update();
}

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

renderTasks();
