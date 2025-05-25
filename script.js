fetch('projects.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('project-list');
    data.forEach((project, index) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.subtitle}</p>
        <p><strong>Tools:</strong> ${project.tools.join(', ')}</p>
        <div class="project-details" id="details-${index}">
          <p>${project.summary}</p>
          <ul>${project.details.map(d => `<li>${d}</li>`).join('')}</ul>
          <a href="${project.github}" target="_blank">GitHub</a>
        </div>
        <button onclick="toggleDetails(${index})">More</button>
      `;
      container.appendChild(card);
    });
  });

function toggleDetails(index) {
  const el = document.getElementById(`details-${index}`);
  el.style.display = el.style.display === 'block' ? 'none' : 'block';
}
