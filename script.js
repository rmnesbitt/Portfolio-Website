document.addEventListener('DOMContentLoaded', () => {
    fetch('projects.json')
        .then(res => res.json())
        .then(projects => {
            const grid = document.getElementById('project-grid');
            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';

                card.innerHTML = `
          <div class="card-inner">
            <div class="card-front">
              <img src="${project.image}" alt="${project.title}" />
            </div>
            <div class="card-back">
              <div class="card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
              </div>
              <div class="card-footer">
                <div class="tools">
                  ${project.tools.map(tool => `<img src="icons/${tool.toLowerCase()}-inverse.png" alt="${tool}" title="${tool}" class="tool-icon">`).join('')}
                </div>
                <a href="${project.github}" target="_blank" class="github-link">
                  <img src="icons/github-inverse.png" alt="GitHub" title="GitHub" class="tool-icon">
                </a>
              </div>
            </div>
          </div>
        `;

                card.addEventListener('click', () => {
                    card.classList.toggle('flipped');
                });

                grid.appendChild(card);
            });
        })
        .catch(err => console.error('Failed to load projects.json:', err));
});