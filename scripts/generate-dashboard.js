#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const projectsDir = path.join(__dirname, "../projects");

// Read all .project.yml files
function loadProjects() {
  if (!fs.existsSync(projectsDir)) {
    console.warn("projects/ directory not found");
    return [];
  }

  const projects = [];
  const entries = fs.readdirSync(projectsDir);

  for (const entry of entries) {
    const projectPath = path.join(projectsDir, entry);
    const stat = fs.statSync(projectPath);

    if (!stat.isDirectory()) continue;

    const projectYmlPath = path.join(projectPath, ".project.yml");
    if (fs.existsSync(projectYmlPath)) {
      try {
        const content = fs.readFileSync(projectYmlPath, "utf-8");
        const project = yaml.load(content);
        project.id = entry;
        projects.push(project);
      } catch (e) {
        console.error(`Error parsing ${projectYmlPath}:`, e.message);
      }
    }
  }

  return projects.sort(
    (a, b) => new Date(b.last_edited) - new Date(a.last_edited)
  );
}

// Generate HTML dashboard
function generateDashboard(projects) {
  const statusColors = {
    active: "#10b981",
    paused: "#f59e0b",
    completed: "#6b7280",
  };

  const projectCards = projects
    .map((p) => {
      const color = statusColors[p.status] || "#3b82f6";
      const link = p.github_url
        ? `<a href="${p.github_url}" target="_blank">View Project →</a>`
        : "No link";

      return `
    <div class="card">
      <div class="card-header">
        <h2>${p.name}</h2>
        <span class="status" style="background-color: ${color}">${p.status}</span>
      </div>
      <div class="goal">${p.goal || "No goal set"}</div>
      <div class="meta">
        <p><strong>Last edited:</strong> ${p.last_edited || "Never"}</p>
        <p><strong>Last action:</strong> ${p.last_action || "No actions yet"}</p>
      </div>
      ${p.tags ? `<div class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>` : ""}
      <div class="link">${link}</div>
    </div>
  `;
    })
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RevGravy Projects Dashboard</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 40px 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    header {
      text-align: center;
      color: white;
      margin-bottom: 50px;
    }

    header h1 {
      font-size: 3em;
      margin-bottom: 10px;
    }

    header p {
      font-size: 1.1em;
      opacity: 0.9;
    }

    .stats {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-top: 20px;
      color: white;
    }

    .stat {
      text-align: center;
    }

    .stat-number {
      font-size: 2em;
      font-weight: bold;
    }

    .stat-label {
      opacity: 0.8;
      margin-top: 5px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      gap: 10px;
    }

    .card-header h2 {
      font-size: 1.3em;
      color: #1f2937;
      flex: 1;
    }

    .status {
      padding: 4px 12px;
      border-radius: 20px;
      color: white;
      font-size: 0.85em;
      font-weight: 600;
      white-space: nowrap;
    }

    .goal {
      color: #4b5563;
      font-size: 0.95em;
      margin-bottom: 15px;
      line-height: 1.5;
    }

    .meta {
      font-size: 0.85em;
      color: #6b7280;
      margin-bottom: 15px;
    }

    .meta p {
      margin: 6px 0;
    }

    .meta strong {
      color: #1f2937;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 15px;
    }

    .tag {
      background: #e5e7eb;
      color: #374151;
      padding: 3px 10px;
      border-radius: 12px;
      font-size: 0.8em;
    }

    .link {
      margin-top: 15px;
    }

    .link a {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.2s;
    }

    .link a:hover {
      color: #764ba2;
    }

    .empty {
      text-align: center;
      color: white;
      padding: 60px 20px;
    }

    .empty h2 {
      margin-bottom: 10px;
    }

    footer {
      text-align: center;
      color: white;
      opacity: 0.8;
      margin-top: 40px;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>📊 RevGravy Projects</h1>
      <p>Your command center for all projects</p>
      <div class="stats">
        <div class="stat">
          <div class="stat-number">${projects.length}</div>
          <div class="stat-label">Total Projects</div>
        </div>
        <div class="stat">
          <div class="stat-number">${projects.filter((p) => p.status === "active").length}</div>
          <div class="stat-label">Active</div>
        </div>
        <div class="stat">
          <div class="stat-number">${projects.filter((p) => p.status === "completed").length}</div>
          <div class="stat-label">Completed</div>
        </div>
      </div>
    </header>

    ${
      projects.length > 0
        ? `<div class="grid">${projectCards}</div>`
        : `<div class="empty"><h2>No projects yet</h2><p>Create your first project to get started!</p></div>`
    }

    <footer>
      <p>Last updated: ${new Date().toLocaleString()}</p>
      <p><a href="https://github.com/your-username/projects-dashboard" style="color: white;">View on GitHub</a></p>
    </footer>
  </div>
</body>
</html>`;

  return html;
}

// Main
const projects = loadProjects();
const html = generateDashboard(projects);
const outputPath = path.join(__dirname, "../dashboard.html");
fs.writeFileSync(outputPath, html);

console.log(`✓ Dashboard generated: ${outputPath}`);
console.log(`✓ Total projects: ${projects.length}`);
console.log(
  `✓ Active: ${projects.filter((p) => p.status === "active").length}`
);
