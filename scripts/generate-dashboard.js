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
      background: #0f0f0f;
      color: #e5e7eb;
      min-height: 100vh;
      padding: 60px 20px;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
    }

    header {
      margin-bottom: 80px;
    }

    header h1 {
      font-size: 2.5em;
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: -0.02em;
      color: #ffffff;
    }

    header p {
      font-size: 1em;
      color: #9ca3af;
      font-weight: 400;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 24px;
      margin-top: 40px;
      max-width: 600px;
    }

    .stat {
      padding: 20px;
      background: #1a1a1a;
      border: 1px solid #2a2a2a;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .stat:hover {
      border-color: #3a3a3a;
      background: #242424;
    }

    .stat-number {
      font-size: 2.2em;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 0.85em;
      color: #9ca3af;
      font-weight: 500;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 24px;
      margin-bottom: 80px;
    }

    .card {
      background: #1a1a1a;
      border: 1px solid #2a2a2a;
      border-radius: 8px;
      padding: 28px;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .card:hover {
      border-color: #3a3a3a;
      background: #242424;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
      gap: 12px;
    }

    .card-header h2 {
      font-size: 1.25em;
      font-weight: 600;
      color: #ffffff;
      flex: 1;
      line-height: 1.4;
    }

    .status {
      padding: 5px 12px;
      border-radius: 20px;
      color: white;
      font-size: 0.8em;
      font-weight: 600;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .goal {
      color: #d1d5db;
      font-size: 0.95em;
      margin-bottom: 20px;
      line-height: 1.6;
      flex-grow: 1;
    }

    .meta {
      font-size: 0.85em;
      color: #9ca3af;
      margin-bottom: 16px;
      padding-top: 16px;
      border-top: 1px solid #2a2a2a;
    }

    .meta p {
      margin: 6px 0;
      line-height: 1.5;
    }

    .meta strong {
      color: #d1d5db;
      font-weight: 500;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 16px;
      margin-top: 12px;
    }

    .tag {
      background: #2a2a2a;
      color: #9ca3af;
      padding: 4px 10px;
      border-radius: 14px;
      font-size: 0.75em;
      font-weight: 500;
      border: 1px solid #3a3a3a;
    }

    .link {
      margin-top: auto;
      padding-top: 16px;
    }

    .link a {
      color: #60a5fa;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.9em;
      transition: color 0.2s;
      display: inline-block;
    }

    .link a:hover {
      color: #93c5fd;
    }

    .empty {
      text-align: center;
      padding: 80px 20px;
    }

    .empty h2 {
      font-size: 1.5em;
      color: #ffffff;
      margin-bottom: 8px;
    }

    .empty p {
      color: #9ca3af;
    }

    footer {
      text-align: center;
      color: #6b7280;
      margin-top: 60px;
      padding-top: 40px;
      border-top: 1px solid #2a2a2a;
      font-size: 0.85em;
    }

    footer p {
      margin: 6px 0;
    }

    footer a {
      color: #60a5fa;
      text-decoration: none;
      transition: color 0.2s;
    }

    footer a:hover {
      color: #93c5fd;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>RevGravy Projects</h1>
      <p>Command center for all projects</p>
      <div class="stats">
        <div class="stat">
          <div class="stat-number">${projects.length}</div>
          <div class="stat-label">Total</div>
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
        : `<div class="empty"><h2>No projects yet</h2><p>Create your first project to get started</p></div>`
    }

    <footer>
      <p>Last updated: ${new Date().toLocaleString()}</p>
      <p><a href="https://github.com/phil-rev/projects-dashboard">View on GitHub</a></p>
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
