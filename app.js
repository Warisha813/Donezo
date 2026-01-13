document.addEventListener("DOMContentLoaded", function() {
  // Tasks array
  let tasks = [];

  // Chart.js context
  const ctx = document.getElementById("chartCanvas").getContext("2d");
  let chart;

  // Points & Badges
  function getPoints(difficulty){ ... }
  function getBadge(points){ ... }

  // Modal Controls
  const modal = document.getElementById("taskModal");
  const openModalBtn = document.getElementById("openModal");
  const closeModalBtn = document.getElementById("closeModal");

  openModalBtn.onclick = ()=> modal.style.display = "flex";
  closeModalBtn.onclick = ()=> modal.style.display = "none";
  window.onclick = (e)=> {if(e.target==modal) modal.style.display="none";}

  // Add Task
  document.getElementById("saveTask").onclick = ()=>{
    const title = document.getElementById("taskTitle").value.trim();
    const subject = document.getElementById("taskSubject").value.trim();
    const difficulty = document.getElementById("taskDifficulty").value;

    if(title=="" || subject=="") return alert("Enter task title and subject");

    tasks.push({
      title, 
      subject, 
      difficulty, 
      completed: false, 
      date: new Date().toISOString().split('T')[0]
    });

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskSubject").value = "";
    modal.style.display = "none";

    renderTasks();
    updateChart();
  };

  // Render Tasks
  function renderTasks(){ ... }

  // Complete Task
  window.completeTask = function(index){ ... }

  // Streak Calculation
  function calculateStreak(){ ... }

  // Update Chart
  function updateChart(){ ... }

  // Initial Render
  renderTasks();
  updateChart();
});
