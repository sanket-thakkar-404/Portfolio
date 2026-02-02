/**
 * Data Service for Portfolio
 * Handles LocalStorage operations for Projects and Skills
 */

const STORAGE_KEYS = {
    PROJECTS: 'portfolio_projects',
    SKILLS: 'portfolio_skills',
    ADMIN: 'admin_session'
};



// Initial Data Seeding
const initialProjects = [
  {
    id: '1',
    title: 'Chats Application',
    description: 'A real-time chat application with authentication, media sharing, and online/offline status using Socket.io and Cloudinary.',
    image: '../assets/images/chatWallpaer.png',
    tags: ['React', 'Node.js', 'Tailwind', 'Zustand', 'Express', "Cloudinary"],
    demo: 'https://chat-app-inky-phi-82.vercel.app/',
    repo: 'https://github.com/sanket-thakkar-404/chat_app'
  },
  {
    id: '2',
    title: 'E-commerce Website',
    description: 'Full-stack e-commerce platform with product listing, cart, checkout flow, and admin product management.',
    image: '/assets/images/E-commerce.png',
    tags: ['React', 'Node.js', 'Tailwind', 'Redux', 'Express', "Python"],
    demo: '#',
    repo: "https://github.com/sanket-thakkar-404/e-commerce-website"
  },
  {
    id: '3',
    title: 'Productivity Dashboard',
    description: 'Task and time management dashboard with charts, filters, and real-time data visualization for daily productivity tracking.',
    image: '/assets/images/ProductivityDashboard.png',
    tags: ['React', 'Tailwind', 'Redux'],
    demo: 'https://productivity-dashboard-ruby.vercel.app/',
    repo: 'https://github.com/sanket-thakkar-404/poultry-farm-project'
  },
  {
    id: '4',
    title: 'Uber Clone',
    description: 'Ride-booking web app clone with location search, driver-rider matching, animations, and live trip status updates.',
    image: '/assets/images/uber-clone.png',
    tags: ['React', 'Node.js', 'Tailwind', 'Zustand', 'Express', "Cloudinary", "gsap"],
    demo: '#',
    repo: '#'
  },
  {
    id: '5',
    title: 'Poultry Farm Dashboard',
    description: 'Farm management system for tracking chicken weight, sales, stock, and billing integrated with Google Sheets backend.',
    image: '/assets/images/PoultryFarm.png',
    tags: ['React', 'Node.js', 'Tailwind', 'Redux', 'Express', "Cloudinary", "GoogleSheets"],
    demo: 'https://poultry-farm-project.vercel.app/',
    repo: 'https://github.com/sanket-thakkar-404/poultry-farm-project'
  },
  {
    id: '6',
    title: 'Portfolio Website',
    description: 'Personal developer portfolio showcasing projects, skills, and contact integration with smooth UI animations.',
    image: '/assets/images/Portfolio.png',
    tags: ['React', 'Node.js', 'Tailwind'],
    demo: '#',
    repo: '#'
  }
];

const initialSkills = [
    { id: '1', name: 'React', category: 'Frontend', icon: 'ph-atom' },
    { id: '2', name: 'Node.js', category: 'Backend', icon: 'ph-hexagon' },
    { id: '3', name: 'TypeScript', category: 'Language', icon: 'ph-file-ts' },
    { id: '4', name: 'MongoDB', category: 'Database', icon: 'ph-database' },
    { id: '5', name: 'PostgreSQL', category: 'Database', icon: 'ph-database' },
    { id: '6', name: 'Java', category: 'Language', icon: 'ph-code' },
    { id: '8', name: 'AWS', category: 'Cloud', icon: 'ph-cloud' },
    { id: '9', name: 'Next.js', category: 'Frontend', icon: 'ph-browsers' },
    { id: '10', name: 'Tailwind', category: 'Frontend', icon: 'ph-paint-brush' },
    { id: '11', name: 'Git', category: 'DevOps', icon: 'ph-git-branch' },
    { id: '12', name: 'GitHub', category: 'DevOps', icon: 'ph-git-branch' },
    { id: '13', name: 'Express.js', category: 'Backend', icon: 'ph-lightning' },
    { id: '14', name: 'JavaScript', category: 'Language', icon: 'ph-file-js' },
    { id: '15', name: 'REST API', category: 'Backend', icon: 'ph-plugs' },
    { id: '16', name: 'Redux / Zustand', category: 'Frontend', icon: 'ph-stack' },
    { id: '17', name: 'Vite', category: 'Frontend', icon: 'ph-rocket' },
];

const DataService = {
    init() {
        if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
            localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
        }
        if (!localStorage.getItem(STORAGE_KEYS.SKILLS)) {
            localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(initialSkills));
        }
    },

    getProjects() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS) || '[]');
    },

    saveProject(project) {
        const projects = this.getProjects();
        if (project.id) {
            const index = projects.findIndex(p => p.id === project.id);
            if (index !== -1) projects[index] = project;
        } else {
            project.id = Date.now().toString();
            projects.push(project);
        }
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    },

    deleteProject(id) {
        const projects = this.getProjects().filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    },

    getSkills() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.SKILLS) || '[]');
    },

    saveSkill(skill) {
        const skills = this.getSkills();
        if (skill.id) {
            const index = skills.findIndex(s => s.id === skill.id);
            if (index !== -1) skills[index] = skill;
        } else {
            skill.id = Date.now().toString();
            skills.push(skill);
        }
        localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
    },

    deleteSkill(id) {
        const skills = this.getSkills().filter(s => s.id !== id);
        localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
    },

    isAdmin() {
        return localStorage.getItem(STORAGE_KEYS.ADMIN) === 'true';
    },

    login(username, password) {
        // Simple hardcoded auth for demo purposes
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem(STORAGE_KEYS.ADMIN, 'true');
            return true;
        }
        return false;
    },

    logout() {
        localStorage.removeItem(STORAGE_KEYS.ADMIN);
    }
};

// Initialize on load
DataService.init();
