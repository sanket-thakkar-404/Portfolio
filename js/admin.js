/**
 * Admin Panel Logic
 */

// Auth Check
if (!DataService.isAdmin()) {
    window.location.href = 'login.html';
}

function logout() {
    DataService.logout();
    window.location.href = 'login.html';
}

// Navigation
function showSection(sectionId) {
    document.getElementById('section-projects').classList.add('hidden');
    document.getElementById('section-skills').classList.add('hidden');
    document.getElementById(`section-${sectionId}`).classList.remove('hidden');

    document.getElementById('nav-projects').classList.remove('bg-brand-accent');
    document.getElementById('nav-skills').classList.remove('bg-brand-accent');
    // Simple active state toggle
}

// --- Projects Management ---

function renderProjects() {
    const projects = DataService.getProjects();
    const list = document.getElementById('projects-list');

    list.innerHTML = projects.map(p => `
        <div class="flex items-center gap-4 bg-brand-gray/10 p-4 rounded-lg border border-brand-gray">
            <img src="${p.image}" class="w-16 h-10 object-cover rounded">
            <div class="flex-1">
                <h4 class="font-bold">${p.title}</h4>
                <p class="text-xs text-brand-text-muted">${p.tags.join(', ')}</p>
            </div>
            <div class="flex gap-2">
                <button onclick="editProject('${p.id}')" class="p-2 hover:bg-brand-gray rounded"><i class="ph ph-pencil"></i></button>
                <button onclick="deleteProject('${p.id}')" class="p-2 hover:bg-red-500/20 text-red-500 rounded"><i class="ph ph-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function openProjectModal(projectId = null) {
    const modal = document.getElementById('project-modal');
    const form = document.getElementById('project-form');
    modal.classList.remove('hidden');

    if (projectId) {
        const project = DataService.getProjects().find(p => p.id === projectId);
        document.getElementById('project-modal-title').innerText = 'Edit Project';
        document.getElementById('p-id').value = project.id;
        document.getElementById('p-title').value = project.title;
        document.getElementById('p-image').value = project.image;
        document.getElementById('p-desc').value = project.description;
        document.getElementById('p-tags').value = project.tags.join(', ');
        document.getElementById('p-demo').value = project.demo;
        document.getElementById('p-repo').value = project.repo;
    } else {
        document.getElementById('project-modal-title').innerText = 'Add Project';
        form.reset();
        document.getElementById('p-id').value = '';
    }
}

function closeProjectModal() {
    document.getElementById('project-modal').classList.add('hidden');
}

document.getElementById('project-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const project = {
        id: document.getElementById('p-id').value || null,
        title: document.getElementById('p-title').value,
        image: document.getElementById('p-image').value,
        description: document.getElementById('p-desc').value,
        tags: document.getElementById('p-tags').value.split(',').map(t => t.trim()),
        demo: document.getElementById('p-demo').value,
        repo: document.getElementById('p-repo').value
    };
    DataService.saveProject(project);
    closeProjectModal();
    renderProjects();
});

function editProject(id) {
    openProjectModal(id);
}

function deleteProject(id) {
    if (confirm('Are you sure?')) {
        DataService.deleteProject(id);
        renderProjects();
    }
}


// --- Skills Management ---

function renderSkills() {
    const skills = DataService.getSkills();
    const list = document.getElementById('skills-list');

    list.innerHTML = skills.map(s => `
        <div class="flex items-center gap-4 bg-brand-gray/10 p-4 rounded-lg border border-brand-gray">
            <div class="w-12 h-12 flex items-center justify-center bg-brand-dark rounded border border-brand-gray">${s.percent}%</div>
            <div class="flex-1">
                <h4 class="font-bold">${s.name}</h4>
            </div>
            <div class="flex gap-2">
                <button onclick="editSkill('${s.id}')" class="p-2 hover:bg-brand-gray rounded"><i class="ph ph-pencil"></i></button>
                <button onclick="deleteSkill('${s.id}')" class="p-2 hover:bg-red-500/20 text-red-500 rounded"><i class="ph ph-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function openSkillModal(skillId = null) {
    const modal = document.getElementById('skill-modal');
    const form = document.getElementById('skill-form');
    modal.classList.remove('hidden');

    if (skillId) {
        const skill = DataService.getSkills().find(s => s.id === skillId);
        document.getElementById('skill-modal-title').innerText = 'Edit Skill';
        document.getElementById('s-id').value = skill.id;
        document.getElementById('s-name').value = skill.name;
        document.getElementById('s-percent').value = skill.percent;
    } else {
        document.getElementById('skill-modal-title').innerText = 'Add Skill';
        form.reset();
        document.getElementById('s-id').value = '';
    }
}

function closeSkillModal() {
    document.getElementById('skill-modal').classList.add('hidden');
}

document.getElementById('skill-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const skill = {
        id: document.getElementById('s-id').value || null,
        name: document.getElementById('s-name').value,
        percent: document.getElementById('s-percent').value
    };
    DataService.saveSkill(skill);
    closeSkillModal();
    renderSkills();
});

function editSkill(id) {
    openSkillModal(id);
}

function deleteSkill(id) {
    if (confirm('Are you sure?')) {
        DataService.deleteSkill(id);
        renderSkills();
    }
}


// Initial Render
renderProjects();
renderSkills();
