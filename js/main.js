/**
 * Main Frontend Logic
 */

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('-translate-y-[150%]');
});

// Close mobile menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('-translate-y-[150%]');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('py-2', 'bg-brand-dark/95');
        navbar.classList.remove('py-4', 'bg-brand-dark/90');
    } else {
        navbar.classList.add('py-4', 'bg-brand-dark/90');
        navbar.classList.remove('py-2', 'bg-brand-dark/95');
    }
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0', 'translate-x-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10', 'translate-x-10', 'translate-x-[-10px]');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Function to animate elements
function animateElements() {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700', 'ease-out');
        observer.observe(el);
    });
}

// Render Stats Section
function renderStats() {
    return `
    <section id="about" class="py-20 container mx-auto px-6">
        <h2 class="text-3xl md:text-5xl font-bold mb-12 animate-on-scroll">
            <span class="text-brand-accent text-sm block mb-2 font-sans tracking-widest uppercase">My Experience</span>
            My Experience And Expertise with  MERN Stack  </br>
            Technologies Used <span class="text-brand-text-muted">Throughout My Development Journey</span>
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="p-6 bg-brand-gray/20 rounded-xl border border-brand-gray animate-on-scroll">
                <h3 class="text-4xl font-bold mb-2">85<span class="text-brand-accent text-xl">%</span></h3>
                <p class="text-brand-text-muted text-sm">MongoDB</p>
                <div class="w-full h-1 bg-brand-gray mt-4 rounded-full overflow-hidden">
                    <div class="h-full bg-brand-accent w-[85%]"></div>
                </div>
            </div>
            <div class="p-6 bg-brand-gray/20 rounded-xl border border-brand-gray animate-on-scroll" style="transition-delay: 100ms">
                <h3 class="text-4xl font-bold mb-2">90<span class="text-brand-accent text-xl">%</span></h3>
                <p class="text-brand-text-muted text-sm">Express.js</p>
                <div class="w-full h-1 bg-brand-gray mt-4 rounded-full overflow-hidden">
                    <div class="h-full bg-brand-accent  w-[85%]"></div>
                </div>
            </div>
            <div class="p-6 bg-brand-gray/20 rounded-xl border border-brand-gray animate-on-scroll" style="transition-delay: 200ms">
                <h3 class="text-4xl font-bold mb-2">80<span class="text-brand-accent text-xl">%</span></h3>
                <p class="text-brand-text-muted text-sm">React.js</p>
                <div class="w-full h-1 bg-brand-gray mt-4 rounded-full overflow-hidden">
                    <div class="h-full bg-brand-accent w-[80%]"></div>
                </div>
            </div>
            <div class="p-6 bg-brand-gray/20 rounded-xl border border-brand-gray animate-on-scroll" style="transition-delay: 300ms">
                <h3 class="text-4xl font-bold mb-2">85<span class="text-brand-accent text-xl">%</span></h3>
                <p class="text-brand-text-muted text-sm">Node.js</p>
                <div class="w-full h-1 bg-brand-gray mt-4 rounded-full overflow-hidden">
                    <div class="h-full bg-brand-accent w-[85%]"></div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// Render Skills Section (Tabs + Cards)
let currentFilter = 'All';

function renderSkills() {
    const skills = DataService.getSkills();
    const categories = ['All', ...new Set(skills.map(s => s.category || 'Other'))];

    // Filter Logic
    const filteredSkills = currentFilter === 'All'
        ? skills
        : skills.filter(s => s.category === currentFilter);

    // Tabs HTML
    const tabsHTML = categories.map(cat => `
        <button onclick="filterSkills('${cat}')" 
            class="px-6 py-2 rounded-full border border-brand-gray text-sm font-medium transition-all duration-300 md:text-base ${currentFilter === cat ? 'bg-brand-accent text-white border-brand-accent' : 'bg-brand-gray/20 text-brand-text-muted hover:text-white hover:bg-brand-gray/40'}">
            ${cat}
        </button>
    `).join('');

    // Cards HTML
    const cardsHTML = filteredSkills.map((skill, index) => `
        <div class="group p-8 bg-brand-gray/10 border border-brand-gray/50 rounded-xl hover:bg-brand-gray/20 hover:border-brand-accent hover:shadow-[0_0_30px_rgba(255,77,0,0.15)] transition-all duration-300 animate-on-scroll flex flex-col items-center justify-center gap-4 text-center h-48 md:h-56">
            <i class="ph ${skill.icon || 'ph-code'} text-5xl md:text-6xl text-brand-text-muted group-hover:text-brand-accent group-hover:scale-110 transition-all duration-300"></i>
            <div>
                <h3 class="text-lg md:text-xl font-bold text-white group-hover:text-brand-accent transition-colors">${skill.name}</h3>
                <p class="text-xs text-brand-text-muted mt-1 uppercase tracking-wider">${skill.category || 'Tech'}</p>
            </div>
        </div>
    `).join('');

    return `
    <section id="skills" class="py-24 container mx-auto px-6">
        <div class="text-center mb-12 animate-on-scroll">
             <span class="text-brand-accent text-sm block mb-2 font-sans tracking-widest uppercase">Tech Stack</span>
             <h2 class="text-3xl md:text-5xl font-bold mb-4">Technologies I Work With</h2>
             <p class="text-brand-text-muted max-w-xl mx-auto">I stay up-to-date with the latest technologies and frameworks to deliver cutting-edge solutions.</p>
        </div>

        <!-- Tabs -->
        <div class="flex flex-wrap justify-center gap-3 mb-16 animate-on-scroll">
            ${tabsHTML}
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6" id="skills-grid">
            ${cardsHTML}
        </div>
    </section>
    `;
}

// Global Filter Function
window.filterSkills = (category) => {
    currentFilter = category;
    const section = document.querySelector('#skills');
    if (section) {
        // Re-render just the inner HTML of the skills section would be ideal, 
        // but for simplicity we will just call loadDynamicContent or replace the section.
        // Better approach: Find the container and update it.
        const dynamicContainer = document.getElementById('dynamic-content');

        // We need to preserve the scroll position or just update the HTML
        // Let's re-render all for simplicity in this artifact, but normally we'd target specific DOM
        loadDynamicContent();

        // Re-init animations
        setTimeout(() => {
            document.querySelectorAll('#skills .animate-on-scroll').forEach(el => {
                el.classList.add('opacity-100', 'translate-y-0');
                el.classList.remove('opacity-0', 'translate-y-10');
            });
        }, 50);
    }
};

// Render Projects Section
function renderProjects(limit = null) {
    const allProjects = DataService.getProjects();
    const projects = limit ? allProjects.slice(0, limit) : allProjects;

    const projectsHTML = projects.map((project, index) => `
        <div class="group relative overflow-hidden rounded-2xl bg-brand-gray/10 border border-brand-gray hover:border-brand-accent/50 transition-colors duration-500 animate-on-scroll" style="transition-delay: ${index * 100}ms">
            <div class="aspect-video overflow-hidden">
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700">
            </div>
            <div class="p-8 relative z-10 bg-brand-dark/80 backdrop-blur-sm -mt-20 group-hover:-mt-0 transition-all duration-500 border-t border-brand-gray/50">
                <div class="flex justify-between items-start mb-4">
                    <div>
                         <h3 class="text-2xl font-bold text-white mb-1 group-hover:text-brand-accent transition-colors">${project.title}</h3>
                         <p class="text-sm text-brand-text-muted">${project.tags.join(' • ')}</p>
                    </div>
                </div>
                <p class="text-brand-text-muted mb-6 font-serif opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">${project.description}</p>
                <div class="flex gap-3">
                     <a href="${project.demo}" class="w-full block text-center py-3 bg-brand-accent text-white font-medium rounded-lg hover:bg-orange-600 transition-colors">
                    View Project
                </a>
                 <a href="${project.repo}" class="w-full border border-white block text-center py-3  text-white font-medium rounded-lg hover:bg-white hover:text-black transition-colors">
                    GitHub
                </a>
                </div>
            </div>
        </div>
    `).join('');

    if (limit) {
        // Home Page View
        return `
        <section id="projects" class="py-20 bg-brand-gray/5">
            <div class="container mx-auto px-6">
                <div class="flex justify-between items-end mb-12 animate-on-scroll">
                    <div>
                        <span class="text-brand-accent text-sm block mb-2 font-sans tracking-widest uppercase">Portfolio</span>
                        <h2 class="text-3xl md:text-5xl font-bold">My Recent Project<br>That I Done.</h2>
                    </div>
                    <a href="projects.html" class="hidden md:inline-flex items-center gap-2 text-brand-text-muted hover:text-white transition-colors">
                        See All Projects <i class="ph ph-arrow-right"></i>
                    </a>
                </div>
                
                <div class="grid md:grid-cols-2 gap-8">
                    ${projectsHTML}
                </div>

                <div class="mt-8 text-center md:hidden">
                    <a href="projects.html" class="inline-flex items-center gap-2 text-brand-text-muted hover:text-white transition-colors">
                        See All Projects <i class="ph ph-arrow-right"></i>
                    </a>
                </div>
            </div>
        </section>
        `;
    } else {
        // Full Page View Grid
        return `
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${projectsHTML}
        </div>
        `;
    }
}

// Render Pricing Section
function renderPricing() {
    return `
    <section id="pricing" class="py-20 container mx-auto px-6">
         <div class="max-w-4xl mx-auto text-center mb-16 animate-on-scroll">
            <span class="text-brand-accent text-sm block mb-2 font-sans tracking-widest uppercase">Pricing</span>
            <h2 class="text-3xl md:text-5xl font-bold mb-6">My Pricing Plan<br>For You.</h2>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
            <!-- Basic -->
            <div class="p-8 border border-brand-gray rounded-2xl hover:border-brand-accent transition-colors duration-300 animate-on-scroll">
                <i class="ph ph-lightning text-4xl text-brand-accent mb-6"></i>
                <h3 class="text-2xl font-bold mb-2">Hourly</h3>
                <p class="text-brand-text-muted text-sm mb-6">Perfect for quick fixes and consultation.</p>
                <p class="text-4xl font-bold mb-6">$50<span class="text-lg text-brand-text-muted font-normal">/hr</span></p>
                <ul class="space-y-4 text-sm text-brand-text-muted mb-8">
                    <li class="flex items-center gap-2"><i class="ph-fill ph-check-circle text-white"></i> 1 Hour Consultation</li>
                    <li class="flex items-center gap-2"><i class="ph-fill ph-check-circle text-white"></i> Code Review</li>
                    <li class="flex items-center gap-2"><i class="ph-fill ph-check-circle text-white"></i> Quick Fixes</li>
                </ul>
                <a href="#" class="block w-full py-3 border border-brand-gray rounded-lg text-center font-medium hover:bg-white hover:text-black transition-all">Get Started</a>
            </div>

            <!-- Standard -->
            <div class="p-8 bg-brand-accent rounded-2xl shadow-lg shadow-orange-500/20 transform scale-105 animate-on-scroll" style="transition-delay: 100ms">
                <div class="flex justify-between items-start mb-6">
                     <i class="ph-fill ph-rocket text-4xl text-white"></i>
                     <span class="bg-white/20 text-white text-xs px-2 py-1 rounded">Popular</span>
                </div>
                <h3 class="text-2xl font-bold mb-2">Project Base</h3>
                <p class="text-white/80 text-sm mb-6">For complete website or app development.</p>
                <p class="text-4xl font-bold mb-6">$1500<span class="text-lg text-white/80 font-normal">/start</span></p>
                <ul class="space-y-4 text-sm text-white/90 mb-8">
                    <li class="flex items-center gap-2"><i class="ph-fill ph-check-circle"></i> UI/UX Design</li>
                    <li class="flex items-center gap-2"><i class="ph-fill ph-check-circle"></i> Frontend Development</li>
                    <li class="flex items-center gap-2"><i class="ph-fill ph-check-circle"></i> Responsive & Fast</li>
                    <li class="flex items-center gap-2"><i class="ph-fill ph-check-circle"></i> 5 Pages</li>
                </ul>
                <a href="#" class="block w-full py-3 bg-white text-brand-accent rounded-lg text-center font-bold hover:bg-gray-100 transition-all">Get Started</a>
            </div>

            <!-- Premium -->
             <div class="p-8 border border-brand-gray rounded-2xl hover:border-brand-accent transition-colors duration-300 animate-on-scroll" style="transition-delay: 200ms">
                <i class="ph ph-crown text-4xl text-brand-accent mb-6"></i>
                <h3 class="text-2xl font-bold mb-2">Monthly</h3>
                <p class="text-brand-text-muted text-sm mb-6">Dedicated developer for your team.</p>
                <p class="text-4xl font-bold mb-6">$3500<span class="text-lg text-brand-text-muted font-normal">/mo</span></p>
                <ul class="space-y-4 text-sm text-brand-text-muted mb-8">
                    <li class="flex items-center gap-2"><i class="ph-fill ph-check-circle text-white"></i> Full Time Support</li>
                    <li class="flex items-center gap-2"><i class="ph-fill ph-check-circle text-white"></i> Ongoing Maintenance</li>
                    <li class="flex items-center gap-2"><i class="ph-fill ph-check-circle text-white"></i> Priority Support</li>
                </ul>
                <a href="#" class="block w-full py-3 border border-brand-gray rounded-lg text-center font-medium hover:bg-white hover:text-black transition-all">Get Started</a>
            </div>
        </div>
    </section>
    `;
}

// Render Contact Section
function renderContact() {
    return `
    <section id="contact" class="py-20 container mx-auto px-6">
        <div class="max-w-4xl mx-auto">
            <div class="text-center mb-16 animate-on-scroll">
                <span class="text-brand-accent text-sm block mb-2 font-sans tracking-widest uppercase">Contact</span>
                <h2 class="text-3xl md:text-5xl font-bold mb-6">Let's Work Together</h2>
                <p class="text-brand-text-muted">Fill out the form below to discuss your project.</p>
            </div>

            <div class="bg-brand-gray/10 rounded-2xl p-8 md:p-12 border border-brand-gray animate-on-scroll">
                <form id="contact-form" class="space-y-6" onsubmit="event.preventDefault(); alert('Message Sent! (Demo Only)'); this.reset();">
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm text-brand-text-muted mb-2">Your Name</label>
                            <input type="text" class="w-full bg-brand-dark border border-brand-gray rounded-lg p-4 focus:border-brand-accent outline-none text-white transition-colors" placeholder="John Doe" required>
                        </div>
                        <div>
                            <label class="block text-sm text-brand-text-muted mb-2">Your Email</label>
                            <input type="email" class="w-full bg-brand-dark border border-brand-gray rounded-lg p-4 focus:border-brand-accent outline-none text-white transition-colors" placeholder="john@example.com" required>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm text-brand-text-muted mb-2">Phone Number</label>
                        <input type="tel" class="w-full bg-brand-dark border border-brand-gray rounded-lg p-4 focus:border-brand-accent outline-none text-white transition-colors" placeholder="+91 000-0000">
                    </div>

                    <div>
                        <label class="block text-sm text-brand-text-muted mb-2">Project Description</label>
                        <textarea class="w-full bg-brand-dark border border-brand-gray rounded-lg p-4 focus:border-brand-accent outline-none text-white transition-colors h-32 resize-none" placeholder="Tell me about your project..." required></textarea>
                    </div>

                    <button type="submit" class="w-full py-4 bg-brand-accent text-white font-bold rounded-lg hover:bg-orange-600 transition-all hover:scale-[1.02] shadow-xl shadow-orange-500/20">
                        Send Message
                    </button>
                </form>

                <div class="mt-12 pt-8 border-t border-brand-gray text-center text-brand-text-muted text-sm">
                   I usually reply within 24 hours.
                </div>
            </div>
        </div>
    </section>
    `;
}

// Render Footer Section
function renderFooter() {
    return `
    <footer class="bg-brand-gray/10 border-t border-brand-gray pt-20 pb-10">
        <div class="container mx-auto px-6">
            <div class="grid md:grid-cols-4 gap-12 mb-16">
                <!-- Brand & Social -->
                <div class="md:col-span-2 space-y-6">
                    <a href="#" class="text-2xl font-bold flex items-center gap-2">
                        Portfolio<span class="text-brand-accent">.</span>
                    </a>
                    <p class="text-brand-text-muted leading-relaxed max-w-sm">
                        Full-stack developer passionate about creating exceptional digital experiences. Let's build something amazing together.
                    </p>
                    <div class="flex gap-6 text-xl text-brand-text-muted">
                        <a href="https://github.com" target="_blank" class="hover:text-white transition-colors"><i class="ph ph-github-logo"></i></a>
                        <a href="https://linkedin.com" target="_blank" class="hover:text-white transition-colors"><i class="ph ph-linkedin-logo"></i></a>
                        <a href="#" class="hover:text-white transition-colors"><i class="ph ph-globe"></i></a>
                        <a href="#" class="hover:text-white transition-colors"><i class="ph ph-instagram-logo"></i></a>
                    </div>
                </div>

                <!-- Quick Links -->
                <div>
                    <h4 class="text-lg font-bold mb-6">Quick Links</h4>
                    <ul class="space-y-4 text-brand-text-muted">
                        <li><a href="index.html#home" class="hover:text-brand-accent transition-colors">Home</a></li>
                        <li><a href="index.html#about" class="hover:text-brand-accent transition-colors">About</a></li>
                        <li><a href="projects.html" class="hover:text-brand-accent transition-colors">Projects</a></li>
                        <li><a href="index.html#contact" class="hover:text-brand-accent transition-colors">Contact</a></li>
                    </ul>
                </div>

                <!-- Contact Info -->
                <div>
                    <h4 class="text-lg font-bold mb-6">Contact</h4>
                    <ul class="space-y-4 text-brand-text-muted">
                        <li class="flex items-center gap-3">
                            <i class="ph-fill ph-map-pin text-brand-accent mt-1"></i>
                            <span>Raipur, Chhattisgarh</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <i class="ph-fill ph-envelope text-brand-accent mt-1"></i>
                            <a href="#" class="hover:text-white transition-colors">sanketthakkar500@gmail.om</a>
                        </li>
                        <li class="flex items-center gap-3">
                            <i class="ph-fill ph-phone text-brand-accent mt-1"></i>
                            <span>+91 8109921203</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-brand-gray pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-text-muted">
                <p>&copy; 2026 Portfolio. All rights reserved.</p>
                <div class="flex gap-8">
                    <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
    `;
}

// Initial Call
document.addEventListener('DOMContentLoaded', () => {
    loadDynamicContent();
});

function loadDynamicContent() {
    const dynamicContainer = document.getElementById('dynamic-content');
    const allProjectsContainer = document.getElementById('all-projects-container');
    const allSkillsContainer = document.getElementById('all-skills-container');
    const footerContainer = document.getElementById('footer-container');

    if (dynamicContainer) {
        // We are on the Home Page
        dynamicContainer.innerHTML = `
            ${renderStats()}
            ${renderProjects(4)} <!-- Show only first 4 projects -->
            ${renderSkills()}
            ${renderContact()}
            ${renderFooter()}
        `;
    } else if (allProjectsContainer) {
        // We are on the All Projects Page
        allProjectsContainer.innerHTML = renderProjects(); // Show all
    } else if (allSkillsContainer) {
        // We are on the All Skills Page
        allSkillsContainer.innerHTML = renderSkills();
    }

    // Always render footer if container exists (for About, Projects, and Skills pages)
    if (footerContainer) {
        footerContainer.innerHTML = renderFooter();
    }

    // Re-initialize animations for new content
    animateElements();
}
