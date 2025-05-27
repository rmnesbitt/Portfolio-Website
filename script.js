// Load and render project cards
fetch("projects.json")
    .then(res => {
        if (!res.ok) throw new Error("Failed to load JSON");
        return res.json();
    })
    .then(projects => {
        const grid = document.getElementById("project-grid");

        // Group every 2 projects into a row
        for (let i = 0; i < projects.length; i += 2) {
            const row = document.createElement("div");
            row.classList.add("project-row");

            row.appendChild(createCard(projects[i]));
            if (projects[i + 1]) {
                row.appendChild(createCard(projects[i + 1]));
            }

            grid.appendChild(row);
        }
    })
    .catch(err => console.error("Error loading projects:", err));

// Create a single project card
function createCard(project) {
    const card = document.createElement("div");
    card.classList.add("project-card");

    const inner = document.createElement("div");
    inner.classList.add("card-inner");

    const front = document.createElement("div");
    front.classList.add("card-front");
    const img = document.createElement("img");
    img.src = project.image;
    img.alt = `Project ${project.index}`;
    front.appendChild(img);

    const back = document.createElement("div");
    back.classList.add("card-back");
    back.innerHTML = `
    <div class="project-description">
      <h3>Project ${project.index}</h3>
      <p>${project.description}</p>
      <p><strong>Tools:</strong> ${project.tools.join(", ")}</p>
      <p><a href="${project.github}" target="_blank">GitHub Repo</a></p>
    </div>
  `;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    // Flip on click
    card.addEventListener("click", () => {
        card.classList.toggle("flipped");
    });

    return card;
}