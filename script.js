document.addEventListener('DOMContentLoaded', () => {
    fetch('projects.json')
        .then(res => res.json())
        .then(projects => {
            const grid = document.getElementById('project-grid');
            projects.sort((a, b) => b.index - a.index);
            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.dataset.skills = project.tools.map(t => t.toLowerCase()).join(',');

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

    document.querySelectorAll('.skill-wrapper').forEach(skill => {
        const handleToggle = () => {
            const skillKey = skill.dataset.skill;
            const isAlreadySelected = skill.classList.contains('selected');
            const allCards = document.querySelectorAll('.project-card');

            document.querySelectorAll('.skill-wrapper').forEach(s => s.classList.remove('selected'));

            if (isAlreadySelected) {
                allCards.forEach((card, index) => {
                    if (card.classList.contains('flipped')) {
                        setTimeout(() => {
                            card.classList.remove('flipped');
                        }, index * 200);
                    }
                });
            } else {
                skill.classList.add('selected');
                const matchingCards = Array.from(allCards).filter(card => {
                    const cardSkills = card.dataset.skills?.split(',') || [];
                    return cardSkills.includes(skillKey);
                });

                allCards.forEach((card, index) => {
                    const isMatch = matchingCards.includes(card);
                    const isFlipped = card.classList.contains('flipped');

                    setTimeout(() => {
                        if (isMatch && !isFlipped) {
                            card.classList.add('flipped');
                        } else if (!isMatch && isFlipped) {
                            card.classList.remove('flipped');
                        }
                    }, index * 200);
                });
            }
        };

        skill.addEventListener('pointerup', (e) => {
            handleToggle();
        });
    });
});