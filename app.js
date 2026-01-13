let tasks = [];

// Points per difficulty
function getPoints(difficulty){
  switch(difficulty){
    case "Easy": return 10;
    case "Medium": return 20;
    case "Hard": return 40;
    default: return 5;
  }
}

// Badges
function getBadge(points){
  if(points >= 200) return "🏆 Superstar";
  if(points >= 100) return "🎖 Achiever";
  if(points >= 50) return "⭐ Rising Star";
  return "";
}

// Modal controls
const modal = document.getElementById("taskModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");

openModalBtn.onclick = ()=> modal.style.display = "flex";
closeModalBtn.onclick = ()=> modal.style.display = "none";
window.onclick = (e)=> {if(e.target==modal) modal.style.display="none";}

// Add Task
document.getElementById("saveTask").onclick = ()=>{
  const title = document.getElementById("taskTitle").value;
  const subject = document.getElementById("taskSubject").value;
  const difficulty = document.getElementById("taskDifficulty").value;
  if(title.trim()=="") return alert("Enter task title");

  tasks.push({title, subject, difficulty, completed:false, date:new Date().toISOString().split('T')[0]});
  document.getElementById("taskTitle").value="";
  modal.style.display="none";
  renderTasks();
  updateChart();
};

// Render Tasks
function renderTasks(){
  const container = document.getElementById("taskContainer");
  container.innerHTML="";
  let totalPoints=0;

  tasks.forEach((task,index)=>{
    if(task.completed) totalPoints += getPoints(task.difficulty);
    const card = document.createElement("div");
    card.className="task-card";
    card.innerHTML=`
      <h3>${task.title}</h3>
      <p>Subject: ${task.subject}</p>
      <p>Difficulty: ${task.difficulty}</p>
      <p>Points: ${getPoints(task.difficulty)}</p>
      <button class="complete-btn" ${task.completed?'disabled':''} onclick="completeTask(${index})">
        ${task.completed?'✅ Completed':'Complete'}
      </button>
    `;
    container.appendChild(card);
  });

  document.getElementById("totalPoints").innerText = totalPoints;
  document.getElementById("pointsBar").style.width = Math.min(totalPoints,300)+"px";
  document.getElementById("badge").innerText = getBadge(totalPoints);
  document.getElementById("streak").innerText = `🔥 Current streak: ${calculateStreak()} days`;
}

// Complete Task
function completeTask(index){
  if(!tasks[index].completed){
    tasks[index].completed = true;
    confetti({particleCount:100, spread:70, origin:{y:0.6}});
    renderTasks();
    updateChart();
  }
}

// Streak
function calculateStreak(){
  let streak=0;
  tasks.sort((a,b)=> new Date(b.date)-new Date(a.date));
  for(let t of tasks){
    if(t.completed) streak++;
    else break;
  }
  return streak;
}

// Chart.js
const ctx = document.getElementById("subjectChart").getContext("2d");
const chart = new Chart(ctx,{
  type:"bar",
  data:{
    labels:["Math","AI","Web","Productivity"],
    datasets:[{
      label:"Completed Tasks",
      data:[0,0,0,0],
      backgroundColor:['#f59e0b','#6366f1','#10b981','#ec4899']
    }]
  },
  options:{responsive:true}
});

function updateChart(){
  chart.data.datasets[0].data = [
    tasks.filter(t=>t.subject=="Math"&&t.completed).length,
    tasks.filter(t=>t.subject=="AI"&&t.completed).length,
    tasks.filter(t=>t.subject=="Web"&&t.completed).length,
    tasks.filter(t=>t.subject=="Productivity"&&t.completed).length
  ];
  chart.update();
}

// Initial render
renderTasks();
updateChart();
