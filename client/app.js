// ----------------------------------------------------
// STUDENT TRACKER - CLIENT CONTROLLER & STORE (VISILY DESIGN)
// ----------------------------------------------------

// Default Visily Seed Dataset for offline/serverless resilience
const DEFAULT_VISILY_TASKS = [
  {
    _id: 'task-1',
    title: 'Finish Calculus III Problem Set #4',
    course: 'MATH 301',
    description: 'Complete problem sets from sections 14.1 through 14.4. Detail integration bounds and show partial fraction decompositions.',
    category: { _id: 'cat-assignments', name: 'Assignments', color: '#0284c7' },
    dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    status: 'pending',
    remindMe: true,
    subtasks: [
      { id: 'st-1-1', text: 'Section 14.1 Multivariable functions & domain', completed: true },
      { id: 'st-1-2', text: 'Section 14.2 Limits and continuity proofs', completed: true },
      { id: 'st-1-3', text: 'Section 14.3 Partial derivatives computation', completed: false },
      { id: 'st-1-4', text: 'Section 14.4 Tangent planes and linear approximations', completed: false }
    ],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'task-2',
    title: 'Review Biology Lecture Notes - Cellular Respiration',
    course: 'BIO 102',
    description: 'Review slide decks on mitochondria Krebs cycle, ATP synthesis, and electron transport chain mechanics.',
    category: { _id: 'cat-assignments', name: 'Assignments', color: '#0284c7' },
    dueDate: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
    status: 'pending',
    remindMe: false,
    subtasks: [
      { id: 'st-2-1', text: 'Glycolysis pathways and net ATP balance', completed: true },
      { id: 'st-2-2', text: 'Citric Acid Cycle (Krebs) intermediate steps', completed: false },
      { id: 'st-2-3', text: 'Oxidative Phosphorylation & ATP Synthase diagram', completed: false }
    ],
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'task-3',
    title: 'Group Meeting: History Term Project',
    course: 'HIST 205',
    description: 'Sync with group at library to review draft presentation and assign final slides for the Industrial Revolution report.',
    category: { _id: 'cat-projects', name: 'Projects', color: '#7c3aed' },
    dueDate: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    status: 'pending',
    remindMe: true,
    subtasks: [
      { id: 'st-3-1', text: 'Compile primary source interview excerpts', completed: true },
      { id: 'st-3-2', text: 'Review slide structure with teammates in library', completed: true },
      { id: 'st-3-3', text: 'Assign speaking segments for presentation', completed: false }
    ],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'task-4',
    title: 'Submit Physics Lab Report (Draft)',
    course: 'PHYS 201',
    description: 'Analysis of wave interference patterns. Graphs must be exported from MatLab and attached as appendix.',
    category: { _id: 'cat-assignments', name: 'Assignments', color: '#0284c7' },
    dueDate: new Date(Date.now() + 15 * 60 * 60 * 1000).toISOString(),
    priority: 'low',
    status: 'pending',
    remindMe: false,
    subtasks: [
      { id: 'st-4-1', text: 'Export MatLab wave interference graphs', completed: true },
      { id: 'st-4-2', text: 'Write experimental error analysis section', completed: false }
    ],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'task-5',
    title: 'Purchase Art History Textbook',
    course: 'ART 110',
    description: 'Find digital copy or rent hard copy from campus bookstore for Renaissance and Baroque survey.',
    category: { _id: 'cat-personal', name: 'Personal', color: '#16a34a' },
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    priority: 'low',
    status: 'completed',
    remindMe: false,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'task-6',
    title: 'Calculus III Midterm Exam',
    course: 'MATH 301',
    description: 'Chapters 11 through 13. Exam hall B12. Bring scientific calculator and student ID card.',
    category: { _id: 'cat-exams', name: 'Exams', color: '#dc2626' },
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    status: 'pending',
    remindMe: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'task-7',
    title: 'History Term Paper: Phase 1 Submission',
    course: 'HIST 205',
    description: 'Submit initial bibliography with at least 10 primary sources and thesis statement on British Industrial urbanization.',
    category: { _id: 'cat-assignments', name: 'Assignments', color: '#0284c7' },
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    status: 'pending',
    remindMe: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'task-8',
    title: 'Physics Lab Final Presentation',
    course: 'PHYS 201',
    description: 'Final deck submission for semester group lab findings. Prepare 10-minute slide walkthrough on harmonic motion.',
    category: { _id: 'cat-projects', name: 'Projects', color: '#7c3aed' },
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
    status: 'pending',
    remindMe: true,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'task-9',
    title: 'Art History Weekly Quiz',
    course: 'ART 110',
    description: 'Short 15-question quiz covering High Renaissance frescoes and perspective methods.',
    category: { _id: 'cat-exams', name: 'Exams', color: '#dc2626' },
    dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'low',
    status: 'pending',
    remindMe: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'task-10',
    title: 'Advanced Macroeconomics Term Paper',
    course: 'ECON 302',
    description: 'Must include literature review of at least 15 sources and focus on post-2008 fiscal policies and inflation targets.',
    category: { _id: 'cat-assignments', name: 'Assignments', color: '#0284c7' },
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // OVERDUE
    priority: 'high',
    status: 'pending',
    remindMe: true,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'task-11',
    title: 'CS302 Final Project: React Dashboard',
    course: 'CS 302',
    description: 'Implement full CRUD functionality and integrate with a mock API. Focus on responsive design and accessible semantic elements.',
    category: { _id: 'cat-projects', name: 'Projects', color: '#7c3aed' },
    dueDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    status: 'pending',
    remindMe: true,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'task-12',
    title: 'Midterm: Modern European History',
    course: 'HIST 205',
    description: 'Review chapters 5 through 12. Focus on the Industrial Revolution impact, Franco-Prussian War, and diplomatic treaties.',
    category: { _id: 'cat-exams', name: 'Exams', color: '#dc2626' },
    dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
    status: 'pending',
    remindMe: false,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'task-13',
    title: 'Register for Spring Semester',
    course: 'Personal',
    description: 'Check prerequisites for Advanced Algorithms and UI Design courses. Clear advising holds on university portal.',
    category: { _id: 'cat-personal', name: 'Personal', color: '#16a34a' },
    dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'low',
    status: 'pending',
    remindMe: false,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'task-14',
    title: 'CS301: Final Project Research & Architecture Proposal',
    course: 'CS301 Systems',
    description: 'Conduct a comprehensive review of distributed systems architectures suitable for high-availability cloud applications. The proposal must include a 5-page PDF detailing:\n\n1. Comparative analysis of microservices vs monolithic.\n2. Proposed technology stack (Node.js, PostgreSQL, Redis).\n3. Security protocols (JWT, OAuth2).\n4. Scalability strategy.\n\nEnsure all references are in APA format.',
    category: { _id: 'cat-projects', name: 'Projects', color: '#7c3aed' },
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    status: 'pending',
    remindMe: true,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'task-15',
    title: 'Advanced Thermodynamics Research Paper',
    course: 'MECH 210',
    description: 'Write a 15-page research paper on the application of the second law of thermodynamics in industrial cooling systems. Must include at least 10 peer-reviewed sources and 3 case studies.',
    category: { _id: 'cat-assignments', name: 'Assignments', color: '#0284c7' },
    dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    status: 'pending',
    remindMe: true,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'task-16',
    title: 'Mobile App Dev Prototype',
    course: 'CS 405',
    description: 'Build initial clickable React Native prototype with bottom tab navigation, dark/light theme, and mock task list.',
    category: { _id: 'cat-projects', name: 'Projects', color: '#7c3aed' },
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    status: 'pending',
    remindMe: true,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'task-17',
    title: 'Psychology Weekly Quiz',
    course: 'PSYC 101',
    description: 'Online quiz on cognitive biases, heuristics, and behavioral psychology experiments.',
    category: { _id: 'cat-exams', name: 'Exams', color: '#dc2626' },
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
    status: 'pending',
    remindMe: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'task-18',
    title: 'Gym Membership Renewal',
    course: 'Personal',
    description: 'Renew university recreation center fitness pass for the upcoming winter semester.',
    category: { _id: 'cat-personal', name: 'Personal', color: '#16a34a' },
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'low',
    status: 'pending',
    remindMe: false,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const DEFAULT_CATEGORIES = [
  { _id: 'cat-assignments', name: 'Assignments', color: '#0284c7' },
  { _id: 'cat-exams', name: 'Exams', color: '#dc2626' },
  { _id: 'cat-projects', name: 'Projects', color: '#7c3aed' },
  { _id: 'cat-personal', name: 'Personal', color: '#16a34a' },
];

// Initialize local storage backup
if (!localStorage.getItem('visily_mock_tasks')) {
  localStorage.setItem('visily_mock_tasks', JSON.stringify(DEFAULT_VISILY_TASKS));
}

// ----------------------------------------------------
// STATE MANAGER (Publisher/Subscriber)
// ----------------------------------------------------
const appState = {
  user: { username: 'Amar', email: 'amar@tracker.com', role: 'student' },
  accessToken: localStorage.getItem('accessToken') || 'mock-jwt-token-amar',
  theme: localStorage.getItem('theme') || 'light',
  categories: DEFAULT_CATEGORIES,
  notifications: [
    { id: '1', message: 'Welcome back, Amar! 5 tasks are due today.', sentAt: new Date().toISOString() },
    { id: '2', message: 'Reminder: Calculus III Problem Set is due in 2 hours', sentAt: new Date().toISOString() }
  ],
  activeView: 'dashboard',
  selectedTaskId: null,
  selectedTaskIds: [],
  listeners: [],
  filters: {
    search: '',
    category: '',
    priority: '',
    status: '',
    sortBy: 'dueDate:asc',
    page: 1,
    limit: 5
  },

  subscribe(listener) {
    this.listeners.push(listener);
  },

  notify() {
    this.listeners.forEach(fn => fn(this));
  },

  setState(changes) {
    Object.assign(this, changes);
    this.notify();
  }
};

// ----------------------------------------------------
// TOAST NOTIFICATIONS
// ----------------------------------------------------
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.style.cssText = `
    display: flex; align-items: center; gap: 10px;
    background: #ffffff; color: #0f172a; border-left: 4px solid ${type === 'error' ? '#dc2626' : '#06b6d4'};
    box-shadow: 0 4px 14px rgba(0,0,0,0.12); padding: 12px 18px; border-radius: 8px;
    margin-bottom: 8px; font-size: 13.5px; font-weight: 500; z-index: 9999;
  `;
  
  const iconName = type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info';
  const iconColor = type === 'error' ? '#dc2626' : '#06b6d4';

  toast.innerHTML = `
    <span class="material-symbols-rounded" style="color: ${iconColor}; font-size: 20px;">${iconName}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ----------------------------------------------------
// RESILIENT API WRAPPER (Falls back to Visily store)
// ----------------------------------------------------
async function apiFetch(url, options = {}) {
  options.headers = options.headers || {};
  if (appState.accessToken) {
    options.headers['Authorization'] = `Bearer ${appState.accessToken}`;
  }
  options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';

  try {
    const res = await fetch(url, options);
    if (res.ok) {
      return await res.json();
    }
    throw new Error('API server unavailable, using local client store');
  } catch (err) {
    // Client-side fallback handler
    return handleClientFallback(url, options);
  }
}

// Local in-browser mock router for offline / Vercel standalone preview
function handleClientFallback(url, options) {
  let tasks = JSON.parse(localStorage.getItem('visily_mock_tasks') || '[]');
  const method = options.method || 'GET';

  // 1. Tasks endpoints
  if (url.startsWith('/api/tasks')) {
    if (method === 'GET' && !url.includes('/api/tasks/')) {
      const u = new URL(url, 'http://localhost');
      const search = (u.searchParams.get('search') || '').toLowerCase();
      const category = u.searchParams.get('category') || '';
      const priority = u.searchParams.get('priority') || '';
      const status = u.searchParams.get('status') || '';
      const page = parseInt(u.searchParams.get('page') || '1');
      const limit = parseInt(u.searchParams.get('limit') || '5');

      let filtered = tasks.filter(t => {
        if (search && !t.title.toLowerCase().includes(search) && !(t.description || '').toLowerCase().includes(search)) return false;
        if (category && (t.category?._id !== category && t.category?.name !== category)) return false;
        if (priority && t.priority !== priority) return false;
        if (status && t.status !== status) return false;
        return true;
      });

      // Sorting
      const sortBy = u.searchParams.get('sortBy') || 'dueDate:asc';
      if (sortBy === 'dueDate:asc') filtered.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate));
      if (sortBy === 'dueDate:desc') filtered.sort((a,b) => new Date(b.dueDate) - new Date(a.dueDate));
      if (sortBy === 'priority:desc') {
        const pOrder = { high: 3, medium: 2, low: 1 };
        filtered.sort((a,b) => (pOrder[b.priority] || 0) - (pOrder[a.priority] || 0));
      }

      const total = filtered.length;
      const start = (page - 1) * limit;
      const paginated = filtered.slice(start, start + limit);

      return {
        success: true,
        count: paginated.length,
        pagination: { total, page, limit, pages: Math.ceil(total / limit) || 1 },
        data: paginated
      };
    }

    // GET single task
    if (method === 'GET' && url.includes('/api/tasks/')) {
      const id = url.split('/').pop();
      const task = tasks.find(t => t._id === id);
      return { success: true, data: task || tasks[0] };
    }

    // POST create task
    if (method === 'POST') {
      const body = JSON.parse(options.body || '{}');
      const catObj = DEFAULT_CATEGORIES.find(c => c._id === body.category || c.name === body.category) || DEFAULT_CATEGORIES[0];
      const newTask = {
        _id: 'task-' + Date.now(),
        title: body.title,
        course: body.course || 'Course',
        description: body.description || '',
        category: catObj,
        dueDate: body.dueDate,
        priority: body.priority || 'medium',
        status: 'pending',
        remindMe: body.remindMe || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      tasks.unshift(newTask);
      localStorage.setItem('visily_mock_tasks', JSON.stringify(tasks));
      return { success: true, data: newTask };
    }

    // PUT update task
    if (method === 'PUT') {
      const id = url.split('/').pop();
      const body = JSON.parse(options.body || '{}');
      const idx = tasks.findIndex(t => t._id === id);
      if (idx !== -1) {
        if (body.category) {
          body.category = DEFAULT_CATEGORIES.find(c => c._id === body.category || c.name === body.category) || tasks[idx].category;
        }
        tasks[idx] = { ...tasks[idx], ...body, updatedAt: new Date().toISOString() };
        localStorage.setItem('visily_mock_tasks', JSON.stringify(tasks));
        return { success: true, data: tasks[idx] };
      }
    }

    // DELETE task
    if (method === 'DELETE') {
      const id = url.split('/').pop();
      tasks = tasks.filter(t => t._id !== id);
      localStorage.setItem('visily_mock_tasks', JSON.stringify(tasks));
      return { success: true, message: 'Deleted' };
    }
  }

  // 2. Analytics stats
  if (url.includes('/api/analytics/dashboard-stats')) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const overdue = tasks.filter(t => t.status !== 'completed' && new Date(t.dueDate) < new Date()).length;
    const pending = total - completed;

    return {
      success: true,
      data: {
        summary: { total, pending, completed, overdue, completionRate: Math.round((completed/total)*100) || 0 },
        upcomingDeadlines: tasks.filter(t => t.status !== 'completed').slice(0, 4),
        recentTasks: tasks.slice(0, 5),
        weeklySnapshot: { completedLastWeek: 18, dueNextWeek: 6 }
      }
    };
  }

  // Categories
  if (url.includes('/api/categories')) {
    return { success: true, data: DEFAULT_CATEGORIES };
  }

  return { success: true, data: [] };
}

// ----------------------------------------------------
// APP VIEWS GENERATOR (VISILY DESIGNS)
// ----------------------------------------------------
const appViews = {
  // 1. AUTH VIEWS
  login: () => `
    <form id="login-form">
      <div class="form-group" style="text-align: left; margin-bottom: 14px;">
        <label for="login-email">Email Address</label>
        <input type="email" id="login-email" required value="student@tracker.com" placeholder="name@domain.com">
      </div>
      <div class="form-group" style="text-align: left; margin-bottom: 18px;">
        <label for="login-password">Password</label>
        <input type="password" id="login-password" required value="studentpassword" placeholder="••••••••">
      </div>
      <button type="submit" class="btn btn-primary" style="width: 100%; padding: 10px;">Sign In</button>
      <div class="auth-footer-text">
        Don't have an account? <a href="#register">Create Account</a>
      </div>
    </form>
  `,

  register: () => `
    <form id="register-form">
      <div class="form-group" style="text-align: left; margin-bottom: 14px;">
        <label for="reg-name">Full Username</label>
        <input type="text" id="reg-name" required placeholder="e.g. Amar Tracker" value="Amar">
      </div>
      <div class="form-group" style="text-align: left; margin-bottom: 14px;">
        <label for="reg-email">Email Address</label>
        <input type="email" id="reg-email" required placeholder="amar@tracker.com" value="amar@tracker.com">
      </div>
      <div class="form-group" style="text-align: left; margin-bottom: 18px;">
        <label for="reg-password">Password</label>
        <input type="password" id="reg-password" required placeholder="Min 6 characters" value="password123">
      </div>
      <button type="submit" class="btn btn-primary" style="width: 100%; padding: 10px;">Register</button>
      <div class="auth-footer-text">
        Already have an account? <a href="#login">Sign In</a>
      </div>
    </form>
  `,

  // 2. DASHBOARD VIEW (Desktop & Mobile per Visily screens)
  dashboard: () => `
    <div class="dashboard-visily-grid">
      <!-- Desktop Greeting Header -->
      <div class="dashboard-greeting-header desktop-only">
        <div class="greeting-text">
          <h1 id="desktop-greeting-name">Welcome back, Amar!</h1>
          <p id="desktop-greeting-sub">You have 5 tasks to complete today.</p>
        </div>
        <div class="greeting-actions">
          <button class="btn btn-secondary" onclick="window.location.hash='#timetable'">
            <span class="material-symbols-rounded">table_chart</span>
            <span>Class Timetable</span>
          </button>
          <button class="btn btn-secondary" onclick="window.location.hash='#calendar'">
            <span class="material-symbols-rounded">calendar_today</span>
            <span>Schedule</span>
          </button>
          <button class="btn btn-primary" onclick="openTaskModal()">
            <span class="material-symbols-rounded">add</span>
            <span>New Task</span>
          </button>
        </div>
      </div>

      <!-- Next Up Anti-Procrastination Hero Card (Limekana/StudyDesk & DDL Killer) -->
      <div id="next-up-hero-container">
        <!-- Injected dynamically by initDashboardView() -->
      </div>

      <!-- Mobile Today's Pulse Section -->
      <div class="todays-pulse-section mobile-only">
        <div class="pulse-header-row">
          <h2>Today's Pulse</h2>
          <span class="date-pill-badge" id="mobile-date-badge">Oct 23, 2024</span>
        </div>
        <div class="pulse-tiles-grid">
          <div class="pulse-stat-tile">
            <div class="pulse-icon-box cyan">
              <span class="material-symbols-rounded">check</span>
            </div>
            <span class="pulse-tile-label">COMPLETED</span>
            <div class="pulse-tile-val">
              <span id="mob-stat-pct">85%</span>
              <span class="pulse-sub-pill">+12%</span>
            </div>
          </div>
          <div class="pulse-stat-tile">
            <div class="pulse-icon-box purple">
              <span class="material-symbols-rounded">schedule</span>
            </div>
            <span class="pulse-tile-label">ON DECK</span>
            <div class="pulse-tile-val" id="mob-stat-ondeck">12</div>
          </div>
        </div>
        <!-- Quick Filters Dropdown -->
        <div class="mobile-quick-filters-wrap" style="margin-top: 10px;">
          <select id="mobile-quick-filter-select" class="custom-select" style="width: 100%; border-radius: 10px; padding: 10px 14px;">
            <option value="">Quick Filters</option>
            <option value="today">Today's Tasks</option>
            <option value="overdue">Overdue Only</option>
            <option value="high">High Priority</option>
          </select>
        </div>
      </div>

      <!-- Desktop Workload 2-Column Grid -->
      <div class="dashboard-workload-grid desktop-only">
        <!-- Left Column: Today's Tasks -->
        <div class="dashboard-panel">
          <div class="panel-header-clean">
            <h3 id="todays-date-header">Wednesday, Oct 23rd</h3>
            <button class="btn-text" id="btn-mark-all-done" onclick="markAllTodayDone()">Mark all as done</button>
          </div>
          <div class="todays-tasks-list" id="todays-tasks-container">
            <div class="empty-state" style="padding: 20px 0;">Loading today's tasks...</div>
          </div>
        </div>

        <!-- Right Column: Deadlines & Progress -->
        <div class="dashboard-right-col">
          <!-- Exam Radar Card (Hoot & Study-Buddy Inspired) -->
          <div class="dashboard-panel" style="margin-bottom: 16px;">
            <div class="panel-header-clean">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span class="material-symbols-rounded" style="color: #dc2626; font-size: 18px;">crisis_alert</span>
                <h3 style="font-size: 15px;">Exam Countdown Radar</h3>
              </div>
              <span class="panel-tag" style="background: rgba(220,38,38,0.1); color: #dc2626;">MIDTERMS &amp; FINALS</span>
            </div>
            <div class="exam-radar-container" id="dashboard-exam-radar-container">
              <!-- Dynamically populated -->
            </div>
          </div>

          <div class="dashboard-panel">
            <div class="panel-header-clean">
              <h3>Upcoming Deadlines</h3>
              <span class="panel-tag">NEXT 7 DAYS</span>
            </div>
            <div class="deadlines-card-list" id="upcoming-deadlines-container">
              <!-- Dynamically populated -->
            </div>
            <a href="#calendar" class="view-calendar-link">View full calendar &gt;</a>
          </div>

          <div class="dashboard-panel weekly-progress-card">
            <div class="progress-header-row">
              <span style="font-weight: 700; font-size: 11px; letter-spacing: 0.06em; color: var(--text-muted);">WEEKLY PROGRESS</span>
              <span style="font-weight: 700; font-size: 13px;" id="weekly-progress-ratio">18 / 24</span>
            </div>
            <div class="progress-track-visily">
              <div class="progress-fill-visily" id="weekly-progress-bar" style="width: 75%;"></div>
            </div>
            <p class="progress-encouragement-note">You're 15% more productive this week than last. Keep it up!</p>
          </div>
        </div>
      </div>

      <!-- Mobile Focus Tasks Section -->
      <div class="focus-tasks-card mobile-only">
        <div class="panel-header-clean">
          <h3>Focus Tasks</h3>
          <a href="#tasks" class="btn-text">View All</a>
        </div>
        <div id="mobile-focus-tasks-container"></div>
      </div>

      <!-- Mobile Hard Deadlines Section -->
      <div class="hard-deadlines-section mobile-only">
        <div class="panel-header-clean">
          <h3>Hard Deadlines</h3>
          <span class="material-symbols-rounded text-muted">calendar_month</span>
        </div>
        <div id="mobile-hard-deadlines-container"></div>
      </div>

      <!-- Bottom Section: System Snapshot (Desktop) -->
      <div class="system-snapshot-section desktop-only">
        <div class="snapshot-controls-row">
          <h3 style="font-size: 18px;">System Snapshot</h3>
          <div class="courses-filter-pills" id="snapshot-course-pills">
            <span style="font-size: 12px; font-weight: 700; color: var(--text-muted); margin-right: 4px;">COURSES:</span>
            <button class="filter-pill active" data-cat="">All</button>
            <button class="filter-pill" data-cat="Assignments">Assignments</button>
            <button class="filter-pill" data-cat="Exams">Exams</button>
            <button class="filter-pill" data-cat="Projects">Projects</button>
            <button class="filter-pill" data-cat="Personal">Personal</button>
          </div>
        </div>

        <div class="snapshot-metrics-grid">
          <!-- 1. Pending Tasks -->
          <div class="metric-card-visily">
            <div class="metric-card-top">
              <div class="metric-icon-circle cyan">
                <span class="material-symbols-rounded">schedule</span>
              </div>
              <span class="trend-badge positive">
                <span class="material-symbols-rounded" style="font-size: 14px;">trending_up</span>
                <span>+2 since yesterday</span>
              </span>
            </div>
            <div class="metric-val-large" id="snapshot-pending-count">12</div>
            <div class="metric-lbl-bottom">Pending Tasks</div>
          </div>

          <!-- 2. Completed (Weekly) -->
          <div class="metric-card-visily">
            <div class="metric-card-top">
              <div class="metric-icon-circle green">
                <span class="material-symbols-rounded">check_circle</span>
              </div>
              <span class="trend-badge positive">
                <span class="material-symbols-rounded" style="font-size: 14px;">trending_up</span>
                <span>15% improvement</span>
              </span>
            </div>
            <div class="metric-val-large" id="snapshot-completed-count">34</div>
            <div class="metric-lbl-bottom">Completed (Weekly)</div>
          </div>

          <!-- 3. Overdue Items -->
          <div class="metric-card-visily">
            <div class="metric-card-top">
              <div class="metric-icon-circle red">
                <span class="material-symbols-rounded">error_outline</span>
              </div>
            </div>
            <div class="metric-val-large" id="snapshot-overdue-count" style="color: var(--cat-exams);">2</div>
            <div class="metric-lbl-bottom">Overdue Items</div>
          </div>
        </div>
      </div>
    </div>
  `,

  // 3. TASK REPOSITORY VIEW (visily-tasks-list-desktop.png)
  tasks: () => `
    <div class="task-repo-view">
      <div class="repo-breadcrumb desktop-only">
        <span>Workspace</span> / <strong style="color: var(--text-primary);">All Tasks</strong>
      </div>

      <div class="repo-header-row">
        <div class="repo-title-wrap">
          <h1>Task Repository</h1>
        </div>
        <div class="repo-counter-export desktop-only" style="display: flex; align-items: center; gap: 12px;">
          <!-- View switcher pills -->
          <div class="view-switcher-wrap" id="repo-view-switcher">
            <button class="view-switch-btn active" data-mode="table" title="Table View">
              <span class="material-symbols-rounded" style="font-size: 16px;">view_list</span>
              <span>Table</span>
            </button>
            <button class="view-switch-btn" data-mode="kanban" title="Kanban Board">
              <span class="material-symbols-rounded" style="font-size: 16px;">view_kanban</span>
              <span>Kanban</span>
            </button>
            <button class="view-switch-btn" data-mode="matrix" title="Eisenhower Matrix">
              <span class="material-symbols-rounded" style="font-size: 16px;">grid_view</span>
              <span>Matrix</span>
            </button>
          </div>

          <span id="repo-showing-counter">Showing 24 of 156 tasks</span>
          <button class="btn btn-secondary" onclick="openImportModal()" title="Bulk import tasks from syllabus or LMS">
            <span class="material-symbols-rounded" style="font-size: 17px;">upload_file</span>
            <span>Import</span>
          </button>
          <button class="btn btn-secondary" id="btn-export-tasks" title="Export as CSV spreadsheet">
            <span class="material-symbols-rounded" style="font-size: 17px;">file_download</span>
            <span>CSV</span>
          </button>
          <button class="btn btn-secondary" onclick="exportToICalendar()" title="Sync with Google or Apple Calendar">
            <span class="material-symbols-rounded" style="font-size: 17px;">calendar_month</span>
            <span>iCal Sync</span>
          </button>
        </div>
      </div>

      <!-- Controls Card -->
      <div class="repo-controls-card">
        <div class="repo-filters-left">
          <!-- Category Pills -->
          <div class="repo-category-pills" id="repo-category-pills">
            <button class="filter-pill active" data-id="">All</button>
            <button class="filter-pill" data-id="cat-assignments">Assignments</button>
            <button class="filter-pill" data-id="cat-exams">Exams</button>
            <button class="filter-pill" data-id="cat-projects">Projects</button>
            <button class="filter-pill" data-id="cat-personal">Personal</button>
          </div>

          <!-- Status Segmented Control -->
          <div class="status-segmented-control" id="repo-status-segments">
            <button class="status-segment-btn active" data-status="">All</button>
            <button class="status-segment-btn" data-status="pending">Pending</button>
            <button class="status-segment-btn" data-status="completed">Completed</button>
          </div>
        </div>

        <div class="repo-actions-right">
          <select id="repo-sort-select" class="custom-select">
            <option value="dueDate:asc">Sort: Due Date (Soonest)</option>
            <option value="dueDate:desc">Sort: Due Date (Latest)</option>
            <option value="priority:desc">Sort: Priority (High to Low)</option>
            <option value="createdAt:desc">Sort: Date Added</option>
          </select>

          <select id="repo-bulk-select" class="custom-select">
            <option value="">Bulk Actions</option>
            <option value="complete">Mark Selected Complete</option>
            <option value="delete">Delete Selected</option>
          </select>
        </div>
      </div>

      <!-- Table View Container -->
      <div class="tasks-table-card" id="tasks-table-card">
        <div class="table-responsive" style="overflow-x: auto;">
          <table class="tasks-table">
            <thead>
              <tr>
                <th class="col-chk">
                  <input type="checkbox" id="master-select-chk" class="visily-checkbox" title="Select all">
                </th>
                <th>TASK TITLE &amp; DESCRIPTION</th>
                <th class="col-cat">CATEGORY</th>
                <th class="col-date">DEADLINE</th>
              </tr>
            </thead>
            <tbody id="tasks-table-tbody">
              <!-- Injected Table Rows -->
            </tbody>
          </table>
        </div>

        <!-- End of list banner -->
        <div class="end-of-list-banner">
          <div class="end-list-icon">
            <span class="material-symbols-rounded">check</span>
          </div>
          <div class="end-list-title">You've reached the end of the list</div>
          <div class="end-list-sub">Load more to see older or completed tasks</div>
        </div>

        <!-- Table Pagination Row -->
        <div class="repo-pagination-row">
          <span id="pagination-showing-info">Showing 1-5 of 156</span>
          <div class="pagination-buttons" id="pagination-controls-wrap"></div>
        </div>
      </div>
    </div>
  `,

  // 4. ONBOARDING / EMPTY STATE (visily-empty-state-desktop.png)
  emptyState: () => `
    <div class="empty-state-visily-wrapper">
      <div class="empty-state-hero-card">
        <img src="https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&auto=format&fit=crop&q=80" alt="Workspace Notebook" class="empty-state-hero-img">
        <div class="sparkle-icon-overlay">
          <span class="material-symbols-rounded">auto_awesome</span>
        </div>
      </div>

      <h1>Your productive semester starts here</h1>
      <p class="empty-subtitle">Welcome to your new command center. Track assignments, exams, and personal goals all in one place.</p>

      <div class="empty-state-actions">
        <button class="btn btn-primary" onclick="openTaskModal()">
          <span class="material-symbols-rounded">add</span>
          <span>Add Your First Task</span>
        </button>
        <button class="btn btn-secondary" onclick="loadVisilyDemoTasks()">
          <span>View Demo Tasks</span>
          <span class="material-symbols-rounded">arrow_forward</span>
        </button>
      </div>

      <div class="empty-cards-title">WHAT CAN YOU TRACK?</div>

      <div class="empty-features-grid">
        <div class="empty-feature-box">
          <div class="empty-feature-icon">
            <span class="material-symbols-rounded">menu_book</span>
          </div>
          <h4>Course Assignments</h4>
          <p>Never miss a paper or lab report deadline again.</p>
        </div>

        <div class="empty-feature-box">
          <div class="empty-feature-icon">
            <span class="material-symbols-rounded">crisis_alert</span>
          </div>
          <h4>Exam Schedule</h4>
          <p>Countdown to your midterms and finals with ease.</p>
        </div>

        <div class="empty-feature-box">
          <div class="empty-feature-icon">
            <span class="material-symbols-rounded">event_available</span>
          </div>
          <h4>Personal Projects</h4>
          <p>Balance your clubs, hobbies, and personal growth.</p>
        </div>
      </div>

      <p class="empty-inspirational-quote">"The secret of getting ahead is getting started."</p>
    </div>
  `,

  // 5. CALENDAR VIEW
  calendar: () => `
    <div class="dashboard-panel">
      <div class="panel-header-clean">
        <div>
          <h2 id="calendar-month-year">October 2024</h2>
          <p style="font-size: 13px; color: var(--text-secondary); margin-top: 2px;">Sync academic deadlines and assignment dates with your personal calendar</p>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <button class="btn btn-secondary" onclick="exportToICalendar()" title="Download .ics for Apple / Google Calendar">
            <span class="material-symbols-rounded" style="font-size: 17px;">event_available</span>
            <span>Export to iCal (.ics)</span>
          </button>
          <div style="display: flex; gap: 4px; margin-left: 8px;">
            <button class="btn-icon" id="btn-cal-prev"><span class="material-symbols-rounded">chevron_left</span></button>
            <button class="btn btn-secondary" id="btn-cal-today">Today</button>
            <button class="btn-icon" id="btn-cal-next"><span class="material-symbols-rounded">chevron_right</span></button>
          </div>
        </div>
      </div>
      <div id="calendar-days-grid" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; margin-top: 16px;">
        <!-- Calendar days -->
      </div>
    </div>
  `,

  // 6. KANBAN BOARD VIEW
  kanban: () => `
    <div class="dashboard-panel">
      <div class="panel-header-clean" style="margin-bottom: 20px;">
        <div>
          <h1 style="font-size: 24px; font-weight: 800;">Academic Kanban Board</h1>
          <p style="color: var(--text-secondary); font-size: 13px; margin-top: 2px;">Organize homework, lab drafts, and semester milestones across interactive sprint stages</p>
        </div>
        <div style="display: flex; gap: 10px; align-items: center;">
          <button class="btn btn-secondary" onclick="exportToICalendar()">
            <span class="material-symbols-rounded" style="font-size: 17px;">calendar_month</span>
            <span>Export iCal</span>
          </button>
          <button class="btn btn-primary" onclick="openTaskModal()">
            <span class="material-symbols-rounded">add</span>
            <span>New Task</span>
          </button>
        </div>
      </div>

      <div class="kanban-board-container" id="kanban-board-container">
        <!-- Columns will be injected by initKanbanView() -->
      </div>
    </div>
  `,

  // 7. POMODORO FOCUS TIMER VIEW
  pomodoro: () => `
    <div class="pomodoro-suite-card">
      <div class="pomodoro-streak-badge">
        <span class="material-symbols-rounded" style="font-size: 16px;">local_fire_department</span>
        <span id="pomo-streak-text">4-Day Focus Streak • 3 Sessions Today</span>
      </div>

      <h1 style="font-size: 26px; font-weight: 800; margin-bottom: 6px;">Deep Study Timer</h1>
      <p style="color: var(--text-secondary); font-size: 13.5px; margin-bottom: 20px;">Eliminate distractions with interval focus sprints and built-in ambient soundscapes</p>

      <!-- Mode Selector Tabs -->
      <div class="pomodoro-mode-selector" id="pomo-mode-tabs">
        <button class="pomodoro-tab-btn active" data-mode="focus">Focus (25m)</button>
        <button class="pomodoro-tab-btn" data-mode="shortBreak">Short Break (5m)</button>
        <button class="pomodoro-tab-btn" data-mode="longBreak">Long Break (15m)</button>
      </div>

      <!-- Circular Timer -->
      <div class="pomodoro-timer-circle" id="pomo-circle">
        <div class="pomodoro-digits" id="pomo-timer-display">25:00</div>
        <div class="pomodoro-mode-label" id="pomo-mode-display">DEEP FOCUS</div>
      </div>

      <!-- Action Buttons -->
      <div class="pomodoro-actions-row">
        <button class="btn btn-primary btn-pomodoro-main" id="btn-pomo-toggle">
          <span class="material-symbols-rounded" id="pomo-toggle-icon">play_arrow</span>
          <span id="pomo-toggle-label">Start Focus</span>
        </button>
        <button class="btn btn-secondary" id="btn-pomo-reset" title="Reset Current Session">
          <span class="material-symbols-rounded">restart_alt</span>
          <span>Reset</span>
        </button>
        <button class="btn btn-secondary" id="btn-pomo-skip" title="Skip to Next Cycle">
          <span class="material-symbols-rounded">skip_next</span>
        </button>
      </div>

      <!-- Ambient Soundscapes Bar -->
      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid var(--border-color);">
        <span style="font-size: 11.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--text-muted); text-transform: uppercase;">
          Ambient Soundscapes (Web Audio)
        </span>
        <div class="ambient-sounds-bar" id="pomo-sound-controls">
          <button class="sound-toggle-pill active" data-sound="none">
            <span class="material-symbols-rounded" style="font-size: 15px;">volume_off</span>
            <span>Silent</span>
          </button>
          <button class="sound-toggle-pill" data-sound="rain">
            <span class="material-symbols-rounded" style="font-size: 15px;">water_drop</span>
            <span>Library Rain</span>
          </button>
          <button class="sound-toggle-pill" data-sound="whitenoise">
            <span class="material-symbols-rounded" style="font-size: 15px;">air</span>
            <span>White Noise</span>
          </button>
          <button class="sound-toggle-pill" data-sound="ocean">
            <span class="material-symbols-rounded" style="font-size: 15px;">waves</span>
            <span>Ocean Waves</span>
          </button>
        </div>
      </div>

      <!-- Task Binding -->
      <div class="pomodoro-task-binding-wrap">
        <span style="font-size: 11.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--text-muted); text-transform: uppercase;">
          Current Focus Task
        </span>
        <select id="pomo-task-selector" class="custom-select" style="width: 100%; margin-top: 8px;">
          <!-- Injected task options -->
        </select>
      </div>
    </div>
  `,

  // 8. COURSES & GPA PLANNER VIEW
  courses: () => `
    <div class="courses-gpa-container">
      <!-- GPA Summary Hero Card -->
      <div class="gpa-summary-card">
        <div class="gpa-card-left">
          <h2>Academic Standing: Dean's Honor List</h2>
          <p>Fall 2024 Semester • Top 5% Percentile • 20 Total Enrolled Credits</p>
          <div style="margin-top: 16px; display: flex; gap: 10px;">
            <button class="btn" onclick="openTaskModal()" style="background: rgba(255,255,255,0.2); color: #fff; border: 1px solid rgba(255,255,255,0.4); backdrop-filter: blur(4px);">
              <span class="material-symbols-rounded">add</span>
              <span>Add Course Task</span>
            </button>
            <button class="btn" onclick="exportToICalendar()" style="background: rgba(255,255,255,0.12); color: #fff; border: 1px solid rgba(255,255,255,0.25);">
              <span class="material-symbols-rounded">file_download</span>
              <span>Export Semester Schedule</span>
            </button>
          </div>
        </div>
        <div class="gpa-metric-cluster">
          <div style="text-align: right;">
            <div class="gpa-huge-num" id="display-cum-gpa">3.84</div>
            <div class="gpa-target-label">Cumulative GPA / 4.00 Max</div>
          </div>
        </div>
      </div>

      <!-- GPA Target Simulator -->
      <div class="dashboard-panel" style="padding: 20px 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <div>
            <h3 style="font-size: 16px; font-weight: 700;">Target GPA Simulator</h3>
            <p style="font-size: 13px; color: var(--text-secondary);">Estimate final semester outcomes based on projected grades</p>
          </div>
          <span class="badge" style="background: var(--accent-cyan-bg); color: var(--accent-cyan); font-weight: 700; padding: 4px 10px; border-radius: 6px;" id="simulated-gpa-badge">
            Predicted GPA: 3.84
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-top: 14px;" id="gpa-sim-sliders-container">
          <!-- Populated by initCoursesView() -->
        </div>
      </div>

      <!-- "What-If" Final Exam Grade Forecaster (GradePoint & Helium Inspired) -->
      <div class="what-if-calculator-card">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <div>
            <h3 style="font-size: 17px; font-weight: 800;">"What-If" Final Exam Grade Forecaster</h3>
            <p style="font-size: 13px; color: var(--text-secondary);">Calculate the exact score needed on your final exam to secure your target course grade</p>
          </div>
          <span class="badge" style="background: var(--accent-cyan-bg); color: var(--accent-cyan); font-weight: 700; padding: 4px 12px; border-radius: 999px;">
            Target Calculator
          </span>
        </div>

        <div class="what-if-grid">
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div>
              <label style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 4px;">SELECT COURSE</label>
              <select id="what-if-course-select" class="custom-select" style="width: 100%; padding: 8px 12px; font-size: 13px;" onchange="updateWhatIfCalc()">
                <option value="MATH 301">MATH 301 - Multivariable Calculus (Final: 30%)</option>
                <option value="BIO 102">BIO 102 - Molecular Biology (Final: 40%)</option>
                <option value="HIST 205">HIST 205 - Modern World History (Final: 30%)</option>
                <option value="PHYS 201">PHYS 201 - Classical Mechanics (Final: 40%)</option>
                <option value="CS 301">CS 301 - Systems Architecture (Final: 30%)</option>
                <option value="ART 110">ART 110 - Renaissance Art (Final: 30%)</option>
              </select>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div>
                <label style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 4px;">DESIRED GRADE</label>
                <select id="what-if-target-grade" class="custom-select" style="width: 100%; padding: 8px 12px; font-size: 13px;" onchange="updateWhatIfCalc()">
                  <option value="93">A (93%)</option>
                  <option value="90">A- (90%)</option>
                  <option value="87">B+ (87%)</option>
                  <option value="83">B (83%)</option>
                  <option value="80">B- (80%)</option>
                  <option value="75">C+ (75%)</option>
                </select>
              </div>
              <div>
                <label style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 4px;">CURRENT HOMEWORK (%)</label>
                <input type="number" id="what-if-hw-score" class="form-input" value="94" min="0" max="100" style="padding: 7px 10px; font-size: 13px;" oninput="updateWhatIfCalc()">
              </div>
            </div>

            <div>
              <label style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 4px;">MIDTERM EXAM SCORE (%)</label>
              <input type="number" id="what-if-midterm-score" class="form-input" value="89" min="0" max="100" style="padding: 7px 10px; font-size: 13px;" oninput="updateWhatIfCalc()">
            </div>
          </div>

          <div class="what-if-result-box">
            <span style="font-size: 11.5px; font-weight: 700; letter-spacing: 0.06em; opacity: 0.9; text-transform: uppercase;">REQUIRED FINAL EXAM SCORE</span>
            <div class="what-if-result-score" id="what-if-score-display">89.0%</div>
            <p id="what-if-feasibility-note" style="font-size: 12.5px; opacity: 0.95; margin-top: 4px;">Very achievable! Keep maintaining problem sets.</p>
          </div>
        </div>
      </div>

      <!-- Active Courses Grid -->
      <div class="panel-header-clean">
        <div>
          <h2 style="font-size: 20px; font-weight: 700;">Enrolled Courses &amp; Syllabi</h2>
          <p style="font-size: 13px; color: var(--text-secondary);">Course credits, current grades, and syllabus grade weight breakdowns</p>
        </div>
      </div>

      <div class="courses-cards-grid" id="courses-cards-grid">
        <!-- Rendered by initCoursesView() -->
      </div>
    </div>
  `,

  // 9. WEEKLY CLASS TIMETABLE VIEW (DDL Killer & Samwise Inspired)
  timetable: () => `
    <div class="timetable-wrapper">
      <div class="timetable-header-row">
        <div>
          <h1 style="font-size: 24px; font-weight: 800;">Weekly Class Timetable</h1>
          <p style="color: var(--text-secondary); font-size: 13px; margin-top: 2px;">
            Semester lecture schedule, room locations, and automated free-study focus windows
          </p>
        </div>
        <div style="display: flex; gap: 10px; align-items: center;">
          <div class="badge" style="background: #ecfdf5; color: #059669; border: 1px solid rgba(5,150,105,0.2); font-weight: 700; padding: 6px 14px; border-radius: 999px; font-size: 12.5px;">
            96% Attendance (32/34 Lectures)
          </div>
          <button class="btn btn-secondary" onclick="exportToICalendar()">
            <span class="material-symbols-rounded" style="font-size: 16px;">calendar_month</span>
            <span>Export Schedule</span>
          </button>
        </div>
      </div>

      <div class="timetable-grid-5day" id="timetable-grid-container">
        <!-- Rendered by initTimetableView() -->
      </div>
    </div>
  `,

  // 10. STUDY NOTES & FORMULA SHEETS VIEW (Hoot & Notion Student OS Inspired)
  notes: () => `
    <div class="dashboard-panel">
      <div class="panel-header-clean" style="margin-bottom: 20px;">
        <div>
          <h1 style="font-size: 24px; font-weight: 800;">Study Notes &amp; Formula Sheets</h1>
          <p style="color: var(--text-secondary); font-size: 13px; margin-top: 2px;">
            Quick reference concept summaries, exam cheat-sheets, and essential course formulas
          </p>
        </div>
        <div style="display: flex; gap: 10px; align-items: center;">
          <div class="search-container" style="max-width: 260px;">
            <span class="material-symbols-rounded search-icon">search</span>
            <input type="text" id="notes-search-input" placeholder="Search formulas &amp; topics...">
          </div>
        </div>
      </div>

      <!-- Notes Course Pills -->
      <div class="repo-category-pills" id="notes-filter-pills" style="margin-bottom: 20px;">
        <button class="filter-pill active" data-course="">All Courses</button>
        <button class="filter-pill" data-course="MATH 301">MATH 301</button>
        <button class="filter-pill" data-course="BIO 102">BIO 102</button>
        <button class="filter-pill" data-course="CS 301">CS 301</button>
        <button class="filter-pill" data-course="PHYS 201">PHYS 201</button>
        <button class="filter-pill" data-course="HIST 205">HIST 205</button>
        <button class="filter-pill" data-course="ART 110">ART 110</button>
      </div>

      <div class="notes-grid" id="notes-cards-container">
        <!-- Rendered by initNotesView() -->
      </div>
    </div>
  `,

  // 6. PROFILE & SETTINGS
  profile: () => `
    <div class="dashboard-panel" style="max-width: 600px; margin: 0 auto;">
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
        <div class="avatar-wrapper" style="width: 64px; height: 64px;">
          <img src="avatar.jpeg" alt="Amar" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover;" />
        </div>
        <div>
          <h2>Amar Student</h2>
          <p style="color: var(--text-secondary); font-size: 13.5px;">student@tracker.com • Computer Science & Economics</p>
        </div>
      </div>
      <div style="border-top: 1px solid var(--border-color); padding-top: 20px;">
        <h3 style="margin-bottom: 12px;">Academic Semester: Fall 2024</h3>
        <p style="color: var(--text-secondary); font-size: 13.5px;">Active courses: MATH 301, BIO 102, HIST 205, PHYS 201, CS 302, ART 110</p>
      </div>
    </div>
  `,

  settings: () => `
    <div class="dashboard-panel" style="max-width: 600px; margin: 0 auto;">
      <h3 style="margin-bottom: 20px;">Appearance & Preferences</h3>
      <div class="remind-me-container" style="margin-bottom: 14px;">
        <div>
          <strong>Light Mode (Visily Clean Theme)</strong>
          <p style="font-size: 12px; color: var(--text-muted);">Default bright aesthetic matching Visily specifications</p>
        </div>
        <label class="switch">
          <input type="checkbox" id="toggle-light-theme" checked>
          <span class="slider round"></span>
        </label>
      </div>
      <div class="remind-me-container">
        <div>
          <strong>Desktop Push Notifications</strong>
          <p style="font-size: 12px; color: var(--text-muted);">Receive alerts 1 hour before assignments are due</p>
        </div>
        <label class="switch">
          <input type="checkbox" checked>
          <span class="slider round"></span>
        </label>
      </div>
    </div>
  `
};

// ----------------------------------------------------
// ROUTER & VIEW CONTROLLER
// ----------------------------------------------------
async function mountView(viewName) {
  const appContainer = document.getElementById('app');
  const authScreen = document.getElementById('auth-screen');
  const appShell = document.getElementById('app-shell');

  const openViews = ['login', 'register'];
  const hasToken = !!appState.accessToken;

  let actualView = viewName.split('?')[0];

  if (!hasToken && !openViews.includes(actualView)) {
    window.location.hash = '#login';
    return;
  }

  if (hasToken && openViews.includes(actualView)) {
    window.location.hash = '#dashboard';
    return;
  }

  // Update navigation classes
  document.querySelectorAll('.nav-link, .mobile-nav-item').forEach(l => l.classList.remove('active'));
  const activeLink = document.getElementById(`nav-${actualView}`);
  if (activeLink) activeLink.classList.add('active');
  const activeMobLink = document.getElementById(`mob-nav-${actualView}`);
  if (activeMobLink) activeMobLink.classList.add('active');

  if (openViews.includes(actualView)) {
    appShell.classList.add('hidden');
    authScreen.classList.remove('hidden');
    const formContainer = document.getElementById('auth-form-container');
    if (actualView === 'login') {
      formContainer.innerHTML = appViews.login();
      setupLoginListeners();
    } else {
      formContainer.innerHTML = appViews.register();
      setupRegisterListeners();
    }
    return;
  }

  // Render main app view
  authScreen.classList.add('hidden');
  appShell.classList.remove('hidden');
  appState.activeView = actualView;
  if (window.triggerAppleHaptic) triggerAppleHaptic('click');

  if (actualView === 'dashboard') {
    appContainer.innerHTML = appViews.dashboard();
    await initDashboardView();
  } else if (actualView === 'tasks') {
    appContainer.innerHTML = appViews.tasks();
    await initTasksView();
  } else if (actualView === 'kanban') {
    appContainer.innerHTML = appViews.kanban();
    await initKanbanView();
  } else if (actualView === 'pomodoro') {
    appContainer.innerHTML = appViews.pomodoro();
    initPomodoroView();
  } else if (actualView === 'courses') {
    appContainer.innerHTML = appViews.courses();
    await initCoursesView();
  } else if (actualView === 'timetable') {
    appContainer.innerHTML = appViews.timetable();
    initTimetableView();
  } else if (actualView === 'notes') {
    appContainer.innerHTML = appViews.notes();
    initNotesView();
  } else if (actualView === 'calendar') {
    appContainer.innerHTML = appViews.calendar();
    initCalendarView();
  } else if (actualView === 'profile') {
    appContainer.innerHTML = appViews.profile();
  } else if (actualView === 'settings') {
    appContainer.innerHTML = appViews.settings();
    initSettingsView();
  } else {
    appContainer.innerHTML = appViews.dashboard();
    await initDashboardView();
  }
}

// ----------------------------------------------------
// DASHBOARD CONTROLLER (visily-dashboard-desktop.png)
// ----------------------------------------------------
async function initDashboardView() {
  const statsRes = await apiFetch('/api/analytics/dashboard-stats');
  const stats = statsRes.data || { summary: { pending: 12, completed: 34, overdue: 2 }, upcomingDeadlines: [] };

  const tasksRes = await apiFetch('/api/tasks?limit=25');
  const allTasks = tasksRes.data || [];

  // 0. Next Up Anti-Procrastination Engine (Limekana/StudyDesk & DDL Killer)
  const nextUpContainer = document.getElementById('next-up-hero-container');
  if (nextUpContainer) {
    const pendingTasks = allTasks.filter(t => t.status !== 'completed');
    if (pendingTasks.length > 0) {
      const pWeights = { high: 12, medium: 6, low: 2 };
      const scored = pendingTasks.map(t => {
        const hoursLeft = Math.max(0.5, (new Date(t.dueDate).getTime() - Date.now()) / (1000 * 60 * 60));
        const pScore = pWeights[t.priority] || 6;
        const isExam = (t.category?.name || '').includes('Exam');
        const score = (pScore * (isExam ? 2.5 : 1.5)) / Math.sqrt(hoursLeft);
        return { task: t, score, hoursLeft };
      });
      scored.sort((a,b) => b.score - a.score);
      const topTask = scored[0].task;
      const hours = Math.max(1, Math.round((new Date(topTask.dueDate) - Date.now()) / (1000 * 60 * 60)));

      nextUpContainer.innerHTML = `
        <div class="next-up-hero-card">
          <div style="flex: 1; min-width: 0;">
            <div class="next-up-badge-wrap">
              <span class="next-up-tag">⚡ Next Up: Focus Sprint</span>
              <span class="next-up-urgency-score">• Anti-Procrastination Engine</span>
            </div>
            <div class="next-up-title" onclick="openTaskDetails('${topTask._id}')" style="cursor: pointer;">${topTask.title}</div>
            <div class="next-up-meta">
              <span class="course-tag" style="font-weight: 700;">${topTask.course || 'Course'}</span>
              <span>Due in ${hours} hours</span>
              <span>•</span>
              <span class="priority-badge-visily ${topTask.priority}">${capitalize(topTask.priority)} Priority</span>
            </div>
          </div>
          <div>
            <button class="btn btn-launch-focus" onclick="launchFocusForTask('${topTask._id}')">
              <span class="material-symbols-rounded">timer</span>
              <span>1-Click Focus Sprint</span>
            </button>
          </div>
        </div>
      `;
    } else {
      nextUpContainer.innerHTML = '';
    }
  }

  // 1. Render Today's Tasks
  const todaysContainer = document.getElementById('todays-tasks-container');

  if (todaysContainer) {
    if (allTasks.length === 0) {
      todaysContainer.innerHTML = '<div class="empty-state" style="padding: 20px 0;">No tasks for today! Great job.</div>';
    } else {
      todaysContainer.innerHTML = allTasks.slice(0, 5).map(task => {
        const isComp = task.status === 'completed';
        const dueTime = new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const course = task.course || (task.category?.name === 'Assignments' ? 'MATH 301' : 'CS 302');

        return `
          <div class="today-task-row">
            <div class="today-task-left">
              <input type="checkbox" class="visily-checkbox" ${isComp ? 'checked' : ''} onchange="toggleTaskComplete('${task._id}', this.checked)">
              <span class="today-task-title ${isComp ? 'completed' : ''}" onclick="openTaskDetails('${task._id}')">${task.title}</span>
            </div>
            <div class="today-task-meta">
              <span class="course-tag">${course}</span>
              <span class="task-time-text">
                <span class="material-symbols-rounded" style="font-size: 15px;">schedule</span>
                <span>${dueTime}</span>
              </span>
              <span class="priority-badge-visily ${task.priority}">${capitalize(task.priority)}</span>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // 1.5 Exam Radar (Hoot & Study-Buddy Inspired)
  const examRadarEl = document.getElementById('dashboard-exam-radar-container');
  if (examRadarEl) {
    const examTasks = allTasks.filter(t => (t.category?.name === 'Exams' || /exam|midterm|quiz|final/i.test(t.title)) && t.status !== 'completed');
    if (examTasks.length === 0) {
      examRadarEl.innerHTML = '<p style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 10px 0;">No upcoming exams this week!</p>';
    } else {
      examRadarEl.innerHTML = examTasks.slice(0, 3).map(ex => {
        const diffMs = new Date(ex.dueDate) - Date.now();
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        const urgentClass = diffDays <= 2 ? 'exam-countdown-urgent' : 'exam-countdown-medium';
        const label = diffDays <= 0 ? 'Today' : diffDays === 1 ? 'Tomorrow' : `In ${diffDays} days`;

        return `
          <div class="exam-radar-row" onclick="openTaskDetails('${ex._id}')" style="cursor: pointer;">
            <div>
              <div style="font-size: 13px; font-weight: 700; color: var(--text-primary);">${ex.title}</div>
              <div style="font-size: 11.5px; color: var(--text-secondary); margin-top: 2px;">${ex.course || 'Academic'} • ${ex.category?.name || 'Exam'}</div>
            </div>
            <span class="exam-countdown-pill ${urgentClass}">${label}</span>
          </div>
        `;
      }).join('');
    }
  }

  // 2. Upcoming Deadlines (Next 7 Days)
  const deadlinesEl = document.getElementById('upcoming-deadlines-container');
  if (deadlinesEl) {
    deadlinesEl.innerHTML = (stats.upcomingDeadlines || allTasks.slice(0, 4)).map((t, idx) => {
      const isUrgent = idx === 0;
      const dueStr = new Date(t.dueDate).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
      return `
        <div class="deadline-row-item" onclick="openTaskDetails('${t._id}')">
          <div class="deadline-info-wrap">
            <span class="deadline-name">${t.title}</span>
            <span class="deadline-due-time">Due ${dueStr}</span>
          </div>
          ${isUrgent ? '<span class="urgent-alert-icon">!</span>' : ''}
        </div>
      `;
    }).join('');
  }

  // 3. System Snapshot Numbers
  const pendingEl = document.getElementById('snapshot-pending-count');
  const complEl = document.getElementById('snapshot-completed-count');
  const overdueEl = document.getElementById('snapshot-overdue-count');
  if (pendingEl) pendingEl.innerText = stats.summary?.pending ?? 12;
  if (complEl) complEl.innerText = stats.summary?.completed ?? 34;
  if (overdueEl) overdueEl.innerText = stats.summary?.overdue ?? 2;

  // 4. Mobile Focus Tasks
  const mobFocusEl = document.getElementById('mobile-focus-tasks-container');
  if (mobFocusEl) {
    mobFocusEl.innerHTML = allTasks.slice(0, 3).map(task => {
      const isComp = task.status === 'completed';
      const isOverdue = !isComp && new Date(task.dueDate) < new Date();
      const dueStr = new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const catClass = getCatClass(task.category?.name);

      return `
        <div class="focus-task-item ${isOverdue ? 'is-overdue' : ''}">
          <input type="checkbox" class="visily-checkbox" ${isComp ? 'checked' : ''} onchange="toggleTaskComplete('${task._id}', this.checked)">
          <div class="focus-task-center" onclick="openTaskDetails('${task._id}')">
            <div class="focus-task-badges">
              <span class="category-pill-badge ${catClass}">${task.category?.name || 'Course'}</span>
              ${isOverdue ? '<span class="badge-overdue">Overdue</span>' : ''}
            </div>
            <span class="focus-task-title ${isComp ? 'completed' : ''}">${task.title}</span>
            <span class="focus-task-due">
              <span class="material-symbols-rounded" style="font-size: 14px;">schedule</span>
              <span>${dueStr} Today</span>
            </span>
          </div>
          <button class="btn-icon" onclick="openTaskDetails('${task._id}')">
            <span class="material-symbols-rounded">more_vert</span>
          </button>
        </div>
      `;
    }).join('');
  }

  // 5. Mobile Hard Deadlines
  const mobDeadlinesEl = document.getElementById('mobile-hard-deadlines-container');
  if (mobDeadlinesEl) {
    mobDeadlinesEl.innerHTML = allTasks.slice(0, 3).map((t, idx) => {
      const borderClass = idx === 0 ? 'border-red' : idx === 1 ? 'border-gray' : 'border-cyan';
      const dueStr = new Date(t.dueDate).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
      return `
        <div class="hard-deadline-card ${borderClass}">
          <div>
            <div style="font-weight: 600; font-size: 14px;">${t.title}</div>
            <div style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">${dueStr}</div>
          </div>
          <button class="btn-details-pill" onclick="openTaskDetails('${t._id}')">Details</button>
        </div>
      `;
    }).join('');
  }

  // System Snapshot Course Pills
  const coursePills = document.querySelectorAll('#snapshot-course-pills .filter-pill');
  coursePills.forEach(p => {
    p.onclick = async () => {
      coursePills.forEach(x => x.classList.remove('active'));
      p.classList.add('active');
      const cat = p.getAttribute('data-cat');
      const res = await apiFetch(`/api/tasks?category=${cat}&limit=5`);
      if (todaysContainer && res.data) {
        todaysContainer.innerHTML = res.data.map(task => {
          const isComp = task.status === 'completed';
          const dueTime = new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return `
            <div class="today-task-row">
              <div class="today-task-left">
                <input type="checkbox" class="visily-checkbox" ${isComp ? 'checked' : ''} onchange="toggleTaskComplete('${task._id}', this.checked)">
                <span class="today-task-title ${isComp ? 'completed' : ''}" onclick="openTaskDetails('${task._id}')">${task.title}</span>
              </div>
              <div class="today-task-meta">
                <span class="course-tag">${task.course || 'CS 301'}</span>
                <span class="task-time-text"><span class="material-symbols-rounded" style="font-size: 15px;">schedule</span>${dueTime}</span>
                <span class="priority-badge-visily ${task.priority}">${capitalize(task.priority)}</span>
              </div>
            </div>
          `;
        }).join('');
      }
    };
  });
}

// ----------------------------------------------------
// TASK REPOSITORY CONTROLLER (visily-tasks-list-desktop.png)
// ----------------------------------------------------
async function initTasksView() {
  await fetchAndRenderTasksTable();

  // Category filter pills
  const catPills = document.querySelectorAll('#repo-category-pills .filter-pill');
  catPills.forEach(pill => {
    pill.onclick = () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      appState.filters.category = pill.getAttribute('data-id');
      appState.filters.page = 1;
      fetchAndRenderTasksTable();
    };
  });

  // Status segment buttons
  const statusBtns = document.querySelectorAll('#repo-status-segments .status-segment-btn');
  statusBtns.forEach(btn => {
    btn.onclick = () => {
      statusBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      appState.filters.status = btn.getAttribute('data-status');
      appState.filters.page = 1;
      fetchAndRenderTasksTable();
    };
  });

  // Sort selector
  const sortSel = document.getElementById('repo-sort-select');
  if (sortSel) {
    sortSel.onchange = (e) => {
      appState.filters.sortBy = e.target.value;
      fetchAndRenderTasksTable();
    };
  }

  // Bulk selector
  const bulkSel = document.getElementById('repo-bulk-select');
  if (bulkSel) {
    bulkSel.onchange = async (e) => {
      const act = e.target.value;
      if (!act || appState.selectedTaskIds.length === 0) {
        if (act) showToast('Please select tasks using checkboxes first', 'error');
        return;
      }
      if (act === 'complete') {
        for (const id of appState.selectedTaskIds) {
          await apiFetch(`/api/tasks/${id}`, { method: 'PUT', body: JSON.stringify({ status: 'completed' }) });
        }
        showToast(`Marked ${appState.selectedTaskIds.length} tasks completed`);
      } else if (act === 'delete') {
        for (const id of appState.selectedTaskIds) {
          await apiFetch(`/api/tasks/${id}`, { method: 'DELETE' });
        }
        showToast(`Deleted ${appState.selectedTaskIds.length} tasks`);
      }
      appState.selectedTaskIds = [];
      bulkSel.value = '';
      await fetchAndRenderTasksTable();
    };
  }

  // Export List Button
  const exportBtn = document.getElementById('btn-export-tasks');
  if (exportBtn) {
    exportBtn.onclick = () => {
      const tasks = JSON.parse(localStorage.getItem('visily_mock_tasks') || '[]');
      const csv = 'Title,Category,Course,Priority,Status,DueDate\n' + 
        tasks.map(t => `"${t.title}","${t.category?.name || ''}","${t.course || ''}","${t.priority}","${t.status}","${t.dueDate}"`).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'tasks-export.csv';
      a.click();
      showToast('Exported tasks list successfully');
    };
  }

  // View Switcher (Table vs Kanban vs Matrix)
  const viewBtns = document.querySelectorAll('#repo-view-switcher .view-switch-btn');
  viewBtns.forEach(btn => {
    btn.onclick = async () => {
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.getAttribute('data-mode');
      const tableCard = document.getElementById('tasks-table-card');
      if (!tableCard) return;

      if (mode === 'table') {
        tableCard.innerHTML = `
          <div class="table-responsive" style="overflow-x: auto;">
            <table class="tasks-table">
              <thead>
                <tr>
                  <th class="col-chk">
                    <input type="checkbox" id="master-select-chk" class="visily-checkbox" title="Select all">
                  </th>
                  <th>TASK TITLE &amp; DESCRIPTION</th>
                  <th class="col-cat">CATEGORY</th>
                  <th class="col-date">DEADLINE</th>
                </tr>
              </thead>
              <tbody id="tasks-table-tbody"></tbody>
            </table>
          </div>
          <div class="end-of-list-banner">
            <div class="end-list-icon">
              <span class="material-symbols-rounded">check</span>
            </div>
            <div class="end-list-title">You've reached the end of the list</div>
            <div class="end-list-sub">Load more to see older or completed tasks</div>
          </div>
          <div class="repo-pagination-row">
            <span id="pagination-showing-info">Showing 1-5 of 156</span>
            <div class="pagination-buttons" id="pagination-controls-wrap"></div>
          </div>
        `;
        document.getElementById('master-select-chk')?.addEventListener('change', (e) => {
          document.querySelectorAll('.row-select-chk').forEach(c => {
            c.checked = e.target.checked;
            handleRowSelect(c.getAttribute('data-id'), c);
          });
        });
        await fetchAndRenderTasksTable();
      } else if (mode === 'kanban') {
        const res = await apiFetch('/api/tasks?limit=100');
        renderKanbanBoard(tableCard, res.data || []);
      } else if (mode === 'matrix') {
        const res = await apiFetch('/api/tasks?limit=100');
        renderEisenhowerMatrix(tableCard, res.data || []);
      }
    };
  });
}

async function fetchAndRenderTasksTable() {
  const tbody = document.getElementById('tasks-table-tbody');
  if (!tbody) return;

  const f = appState.filters;
  const url = `/api/tasks?search=${encodeURIComponent(f.search)}&category=${f.category}&priority=${f.priority}&status=${f.status}&sortBy=${f.sortBy}&page=${f.page}&limit=${f.limit}`;

  const res = await apiFetch(url);
  const tasks = res.data || [];
  const total = res.pagination?.total ?? tasks.length;

  // Counter
  const counterEl = document.getElementById('repo-showing-counter');
  if (counterEl) counterEl.innerText = `Showing ${tasks.length} of ${total} tasks`;
  const infoEl = document.getElementById('pagination-showing-info');
  if (infoEl) infoEl.innerText = `Showing ${(f.page - 1) * f.limit + 1}-${Math.min(f.page * f.limit, total)} of ${total}`;

  if (tasks.length === 0) {
    const card = document.getElementById('tasks-table-card');
    if (card) {
      card.innerHTML = appViews.emptyState();
    }
    return;
  }

  tbody.innerHTML = tasks.map(task => {
    const isComp = task.status === 'completed';
    const isOverdue = !isComp && new Date(task.dueDate) < new Date();
    const dateStr = new Date(task.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    const catClass = getCatClass(task.category?.name);

    return `
      <tr class="${isOverdue ? 'row-overdue' : ''}">
        <td class="col-chk">
          <input type="checkbox" class="visily-checkbox row-select-chk" data-id="${task._id}" ${isComp ? 'checked' : ''} onchange="handleRowSelect('${task._id}', this)">
        </td>
        <td>
          <div class="task-title-desc-wrap" onclick="openTaskDetails('${task._id}')">
            <div class="task-row-title-line">
              <span class="task-main-title ${isComp ? 'completed' : ''}">${task.title}</span>
              ${isOverdue ? '<span class="badge-overdue">Overdue</span>' : ''}
            </div>
            <p class="task-main-desc">${task.description || 'No description provided.'}</p>
          </div>
        </td>
        <td class="col-cat">
          <span class="category-pill-badge ${catClass}">${task.category?.name || 'Assignments'}</span>
        </td>
        <td class="col-date">
          <div class="deadline-cell-content">
            <span class="material-symbols-rounded" style="font-size: 16px;">calendar_today</span>
            <span>${dateStr}</span>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Pagination Controls
  renderPaginationControls(res.pagination || { page: 1, pages: 1 });
}

function renderPaginationControls(pag) {
  const wrap = document.getElementById('pagination-controls-wrap');
  if (!wrap) return;
  let html = `<button class="page-btn" ${pag.page <= 1 ? 'disabled' : ''} onclick="changePage(${pag.page - 1})">Previous</button>`;
  for (let i = 1; i <= Math.min(pag.pages, 5); i++) {
    html += `<button class="page-btn ${pag.page === i ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
  }
  html += `<button class="page-btn" ${pag.page >= pag.pages ? 'disabled' : ''} onclick="changePage(${pag.page + 1})">Next</button>`;
  wrap.innerHTML = html;
}

window.changePage = function(p) {
  appState.filters.page = p;
  fetchAndRenderTasksTable();
};

window.handleRowSelect = function(id, chk) {
  if (chk.checked) {
    if (!appState.selectedTaskIds.includes(id)) appState.selectedTaskIds.push(id);
  } else {
    appState.selectedTaskIds = appState.selectedTaskIds.filter(x => x !== id);
  }
};

// ----------------------------------------------------
// TASK QUICK-VIEW DRAWER (visily-task-quick-view-desktop.png)
// ----------------------------------------------------
async function openTaskDetails(taskId) {
  const drawer = document.getElementById('detail-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const content = document.getElementById('drawer-content');

  content.innerHTML = '<p class="empty-state">Loading details...</p>';
  drawer.classList.add('open');
  overlay.classList.add('open');

  const res = await apiFetch(`/api/tasks/${taskId}`);
  const task = res.data;
  if (!task) return;

  const isCompleted = task.status === 'completed';
  const dueDateStr = new Date(task.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  const dueTimeStr = new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const catClass = getCatClass(task.category?.name);
  const createdDateStr = new Date(task.createdAt || Date.now()).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const updatedDateStr = new Date(task.updatedAt || Date.now()).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const subtasks = task.subtasks || [];
  const completedSubtasks = subtasks.filter(s => s.completed).length;
  const subtasksTotal = subtasks.length;
  const subtasksPct = subtasksTotal > 0 ? Math.round((completedSubtasks / subtasksTotal) * 100) : 0;

  content.innerHTML = `
    <!-- Top Title and Status -->
    <div>
      <div class="drawer-title-row">
        <input type="checkbox" class="visily-checkbox" style="width: 22px; height: 22px; margin-top: 3px;" ${isCompleted ? 'checked' : ''} onchange="toggleTaskComplete('${task._id}', this.checked); openTaskDetails('${task._id}');">
        <div>
          <h2 class="drawer-task-title ${isCompleted ? 'completed' : ''}">${task.title}</h2>
          <div class="drawer-badges-row">
            <span class="category-pill-badge ${catClass}">${task.category?.name || 'Project'}</span>
            <span class="category-pill-badge" style="background-color: var(--bg-tertiary); color: var(--text-secondary);">
              <span class="material-symbols-rounded" style="font-size: 13px; margin-right: 4px;">schedule</span>
              ${isCompleted ? 'Completed' : 'In Progress'}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 2x2 Metadata Grid (Visily specification) -->
    <div class="drawer-metadata-grid">
      <div class="meta-field-item">
        <span class="meta-field-label">DUE DATE</span>
        <div class="meta-field-value">
          <span class="material-symbols-rounded">calendar_today</span>
          <span>${dueDateStr}</span>
        </div>
      </div>

      <div class="meta-field-item">
        <span class="meta-field-label">TIME</span>
        <div class="meta-field-value">
          <span class="material-symbols-rounded">schedule</span>
          <span>${dueTimeStr}</span>
        </div>
      </div>

      <div class="meta-field-item">
        <span class="meta-field-label">PRIORITY</span>
        <div class="meta-field-value ${task.priority === 'high' ? 'priority-high-text' : ''}">
          <span class="material-symbols-rounded">flag</span>
          <span>${capitalize(task.priority)}</span>
        </div>
      </div>

      <div class="meta-field-item">
        <span class="meta-field-label">COURSE</span>
        <div class="meta-field-value">
          <span class="material-symbols-rounded">label</span>
          <span>${task.course || 'CS301 Systems'}</span>
        </div>
      </div>
    </div>

    <!-- Full Description Box -->
    <div class="drawer-desc-container">
      <span class="drawer-desc-label">FULL DESCRIPTION</span>
      <div class="drawer-desc-content">${task.description || 'No detailed instructions provided.'}</div>
    </div>

    <!-- Subtasks Checklist Section -->
    <div class="subtasks-section" style="margin-top: 18px; padding-top: 16px; border-top: 1px solid var(--border-color);">
      <div class="subtasks-header-row" style="display: flex; align-items: center; justify-content: space-between;">
        <span class="meta-field-label">SUBTASKS &amp; CHECKLIST (${completedSubtasks}/${subtasksTotal})</span>
        <span style="font-size: 12px; font-weight: 700; color: var(--accent-cyan);">${subtasksPct}%</span>
      </div>
      <div style="height: 6px; background: var(--bg-tertiary); border-radius: 999px; overflow: hidden; margin: 6px 0 12px 0;">
        <div style="height: 100%; width: ${subtasksPct}%; background: var(--accent-cyan); transition: width 0.3s ease;"></div>
      </div>
      <div class="subtasks-list" id="drawer-subtasks-list" style="display: flex; flex-direction: column; gap: 6px;">
        ${subtasks.map(st => `
          <div class="subtask-item ${st.completed ? 'checked' : ''}" style="display: flex; align-items: center; gap: 8px; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 6px; padding: 8px 12px;">
            <input type="checkbox" class="visily-checkbox" ${st.completed ? 'checked' : ''} onchange="toggleSubtaskItem('${task._id}', '${st.id}', this.checked)">
            <span style="flex: 1; font-size: 13px; ${st.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${st.text}</span>
            <button class="btn-icon-subtle" onclick="deleteSubtaskItem('${task._id}', '${st.id}')" title="Delete step" style="opacity: 0.5; border: none; background: transparent; cursor: pointer;">
              <span class="material-symbols-rounded" style="font-size: 16px;">close</span>
            </button>
          </div>
        `).join('')}
      </div>
      <div class="subtask-add-row" style="margin-top: 10px; display: flex; gap: 8px;">
        <input type="text" id="new-subtask-text" class="form-input" placeholder="Add checklist item..." style="flex: 1; padding: 7px 10px; font-size: 13px;" onkeydown="if(event.key==='Enter'){event.preventDefault(); addSubtaskItem('${task._id}');}">
        <button class="btn btn-secondary" onclick="addSubtaskItem('${task._id}')" style="padding: 6px 14px; font-size: 12.5px;">Add</button>
      </div>
    </div>

    <!-- Audit Trail -->
    <div class="drawer-audit-trail">
      <div class="audit-title">
        <span class="material-symbols-rounded" style="font-size: 15px;">history</span>
        <span>AUDIT TRAIL</span>
      </div>
      <div class="audit-row" style="margin-top: 6px;">
        <span>Created</span>
        <strong>${createdDateStr}</strong>
      </div>
      <div class="audit-row">
        <span>Last Edited</span>
        <strong>${updatedDateStr}</strong>
      </div>
    </div>

    <!-- Bottom Action Buttons -->
    <div class="drawer-sticky-footer">
      <button class="btn btn-primary" onclick="toggleTaskComplete('${task._id}', ${!isCompleted}); closeDrawer();" style="flex: 1.2; padding: 11px;">
        <span class="material-symbols-rounded">check</span>
        <span>${isCompleted ? 'Mark Incomplete' : 'Complete Task'}</span>
      </button>
      <button class="btn btn-secondary" onclick="openTaskModalForEdit('${task._id}')" style="flex: 1; padding: 11px;">
        <span class="material-symbols-rounded">edit</span>
        <span>Edit Task</span>
      </button>
    </div>
  `;

  // Quick edit and delete icons in header
  document.getElementById('btn-drawer-quick-edit').onclick = () => openTaskModalForEdit(task._id);
  document.getElementById('btn-drawer-quick-delete').onclick = () => deleteTaskPrompt(task._id);
}

function closeDrawer() {
  document.getElementById('detail-drawer').classList.remove('open');
  document.getElementById('drawer-overlay').classList.remove('open');
}

// ----------------------------------------------------
// ADD / EDIT TASK MODAL (visily-add-edit-task-modal.png)
// ----------------------------------------------------
function openTaskModal(task = null) {
  const modal = document.getElementById('task-modal');
  const title = document.getElementById('modal-title');
  const deleteBtn = document.getElementById('btn-delete-from-modal');
  const errorText = document.getElementById('title-error-msg');
  if (errorText) errorText.classList.add('hidden');

  document.getElementById('task-form').reset();
  document.getElementById('task-form-id').value = '';

  // Render Category Chips
  renderCategoryChips(task ? (task.category?._id || task.category?.name) : 'cat-assignments');

  if (task) {
    title.innerText = 'Edit Task';
    document.getElementById('task-form-id').value = task._id;
    document.getElementById('task-title').value = task.title;
    document.getElementById('task-course').value = task.course || '';
    document.getElementById('task-desc').value = task.description || '';
    document.getElementById('task-remind').checked = task.remindMe !== false;

    const taskDate = new Date(task.dueDate);
    document.getElementById('task-due-date').value = taskDate.toISOString().split('T')[0];
    const hrs = String(taskDate.getHours()).padStart(2, '0');
    const mins = String(taskDate.getMinutes()).padStart(2, '0');
    document.getElementById('task-due-time').value = `${hrs}:${mins}`;

    selectPriorityPill(task.priority || 'medium');
    deleteBtn.classList.remove('hidden');
    deleteBtn.onclick = () => deleteTaskPrompt(task._id);
  } else {
    title.innerText = 'Add New Task';
    document.getElementById('task-due-date').value = new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0];
    document.getElementById('task-due-time').value = '23:59';
    selectPriorityPill('medium');
    deleteBtn.classList.add('hidden');
  }

  modal.classList.add('open');
}

window.openTaskModalForEdit = async function(id) {
  closeDrawer();
  const res = await apiFetch(`/api/tasks/${id}`);
  if (res.data) openTaskModal(res.data);
};

function closeModal() {
  document.getElementById('task-modal').classList.remove('open');
}

function renderCategoryChips(activeId) {
  const container = document.getElementById('category-chips-container');
  const hiddenInput = document.getElementById('task-category-val');
  hiddenInput.value = activeId || 'cat-assignments';

  container.innerHTML = DEFAULT_CATEGORIES.map(c => `
    <button type="button" class="category-chip ${c._id === activeId || c.name === activeId ? 'active' : ''}" onclick="selectCategoryChip('${c._id}')">
      <span class="cat-dot" style="background-color: ${c.color};"></span>
      <span>${c.name}</span>
    </button>
  `).join('');
}

window.selectCategoryChip = function(catId) {
  document.getElementById('task-category-val').value = catId;
  renderCategoryChips(catId);
};

function selectPriorityPill(priority) {
  ['low', 'medium', 'high'].forEach(p => {
    const lbl = document.getElementById(`lbl-priority-${p}`);
    const input = document.getElementById(`priority-${p}`);
    if (lbl && input) {
      if (p === priority) {
        lbl.classList.add('active');
        input.checked = true;
      } else {
        lbl.classList.remove('active');
      }
    }
  });
}

// ----------------------------------------------------
// APPLE DESIGN AUDIO-HAPTIC FEEDBACK (WWDC Designing Audio-Haptic Experiences)
// ----------------------------------------------------
window.triggerAppleHaptic = function(type = 'click') {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    if (type === 'click') navigator.vibrate(6);
    else if (type === 'success') navigator.vibrate([10, 30, 15]);
  }
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!window._appleHapticCtx) {
      window._appleHapticCtx = new AudioContext();
    }
    const ctx = window._appleHapticCtx;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const now = ctx.currentTime;
    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(820, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.012);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);
      osc.start(now);
      osc.stop(now + 0.012);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    }
  } catch (e) {}
};

// ----------------------------------------------------
// ACTIONS & EVENT LISTENERS
// ----------------------------------------------------
window.toggleTaskComplete = async function(id, isCompleted) {
  if (window.triggerAppleHaptic) {
    triggerAppleHaptic(isCompleted ? 'success' : 'click');
  }
  await apiFetch(`/api/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status: isCompleted ? 'completed' : 'pending' })
  });
  showToast(isCompleted ? 'Task marked as completed' : 'Task marked as pending');
  if (appState.activeView === 'dashboard') await initDashboardView();
  if (appState.activeView === 'tasks') await fetchAndRenderTasksTable();
};

window.markAllTodayDone = async function() {
  const tasks = JSON.parse(localStorage.getItem('visily_mock_tasks') || '[]');
  tasks.forEach(t => t.status = 'completed');
  localStorage.setItem('visily_mock_tasks', JSON.stringify(tasks));
  showToast('All today tasks marked done!');
  await initDashboardView();
};

window.deleteTaskPrompt = function(id) {
  if (confirm('Are you sure you want to delete this task?')) {
    closeDrawer();
    closeModal();
    apiFetch(`/api/tasks/${id}`, { method: 'DELETE' }).then(() => {
      showToast('Task deleted successfully');
      if (appState.activeView === 'tasks') fetchAndRenderTasksTable();
      if (appState.activeView === 'dashboard') initDashboardView();
    });
  }
};

window.loadVisilyDemoTasks = function() {
  localStorage.setItem('visily_mock_tasks', JSON.stringify(DEFAULT_VISILY_TASKS));
  showToast('Visily demo tasks loaded successfully!');
  window.location.hash = '#tasks';
  fetchAndRenderTasksTable();
};

function setupLoginListeners() {
  const form = document.getElementById('login-form');
  if (!form) return;
  form.onsubmit = (e) => {
    e.preventDefault();
    appState.setState({ user: { username: 'Amar', email: 'amar@tracker.com' }, accessToken: 'mock-token' });
    showToast('Signed in successfully');
    window.location.hash = '#dashboard';
  };
}

function setupRegisterListeners() {
  const form = document.getElementById('register-form');
  if (!form) return;
  form.onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    appState.setState({ user: { username: name, email: 'amar@tracker.com' }, accessToken: 'mock-token' });
    showToast('Registration successful! Welcome to Student Tracker');
    window.location.hash = '#dashboard';
  };
}

function initCalendarView() {
  const grid = document.getElementById('calendar-days-grid');
  if (!grid) return;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let html = days.map(d => `<div style="font-weight: 700; font-size: 11px; color: var(--text-muted); text-align: center; padding: 6px;">${d}</div>`).join('');
  for (let i = 1; i <= 31; i++) {
    const hasDeadline = [23, 24, 25, 28, 29].includes(i);
    html += `
      <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; min-height: 80px; padding: 8px; font-size: 12px; font-weight: 600;">
        <span>${i}</span>
        ${hasDeadline ? '<div style="margin-top: 6px; padding: 2px 6px; border-radius: 4px; background: var(--cat-assignments-bg); color: var(--cat-assignments); font-size: 10px; font-weight: 700;">Task Due</div>' : ''}
      </div>
    `;
  }
  grid.innerHTML = html;
}

function initSettingsView() {
  const toggle = document.getElementById('toggle-light-theme');
  if (toggle) {
    toggle.onchange = (e) => {
      document.body.className = e.target.checked ? 'light-theme' : 'dark-theme';
      localStorage.setItem('theme', e.target.checked ? 'light' : 'dark');
      showToast(`Switched to ${e.target.checked ? 'Light' : 'Dark'} mode`);
    };
  }
}

// ----------------------------------------------------
// ACADEMIC SUITE: COURSES DATA & GPA ENGINE
// ----------------------------------------------------
const DEFAULT_COURSES = [
  {
    id: 'course-1',
    code: 'MATH 301',
    name: 'Multivariable Calculus & Differential Eq',
    credits: 4.0,
    professor: 'Dr. Elena Martinez',
    room: 'Hall B-12',
    schedule: 'Mon, Wed, Fri 10:00 AM',
    currentGrade: 'A',
    percentage: 94,
    color: '#0284c7',
    syllabus: [
      { label: 'Problem Sets', weight: 40, color: '#0284c7' },
      { label: 'Midterm Exam', weight: 30, color: '#dc2626' },
      { label: 'Final Exam', weight: 30, color: '#7c3aed' }
    ]
  },
  {
    id: 'course-2',
    code: 'BIO 102',
    name: 'Molecular & Cellular Biology',
    credits: 4.0,
    professor: 'Dr. Arthur Vance',
    room: 'Life Sci 304',
    schedule: 'Tue, Thu 09:30 AM',
    currentGrade: 'A-',
    percentage: 91,
    color: '#16a34a',
    syllabus: [
      { label: 'Lab Reports', weight: 35, color: '#16a34a' },
      { label: 'Weekly Quizzes', weight: 25, color: '#0284c7' },
      { label: 'Final Exam', weight: 40, color: '#dc2626' }
    ]
  },
  {
    id: 'course-3',
    code: 'HIST 205',
    name: 'Modern European & Global History',
    credits: 3.0,
    professor: 'Prof. Clara Adler',
    room: 'Humanities 110',
    schedule: 'Mon, Wed 02:00 PM',
    currentGrade: 'B+',
    percentage: 88,
    color: '#7c3aed',
    syllabus: [
      { label: 'Term Project', weight: 45, color: '#7c3aed' },
      { label: 'Midterm', weight: 25, color: '#dc2626' },
      { label: 'Participation', weight: 30, color: '#16a34a' }
    ]
  },
  {
    id: 'course-4',
    code: 'PHYS 201',
    name: 'Classical Mechanics & Wave Dynamics',
    credits: 4.0,
    professor: 'Dr. Marcus Chen',
    room: 'Physics Annex 201',
    schedule: 'Tue, Thu 01:00 PM',
    currentGrade: 'A',
    percentage: 95,
    color: '#0891b2',
    syllabus: [
      { label: 'Lab Presentations', weight: 30, color: '#0891b2' },
      { label: 'Weekly Sets', weight: 30, color: '#0284c7' },
      { label: 'Final Exam', weight: 40, color: '#dc2626' }
    ]
  },
  {
    id: 'course-5',
    code: 'CS 301',
    name: 'Systems Architecture & Algorithms',
    credits: 3.0,
    professor: 'Prof. Sarah Robinson',
    room: 'Turing Hall 402',
    schedule: 'Wed, Fri 11:30 AM',
    currentGrade: 'A',
    percentage: 98,
    color: '#2563eb',
    syllabus: [
      { label: 'Kernel Projects', weight: 50, color: '#2563eb' },
      { label: 'Lab Reports', weight: 20, color: '#0284c7' },
      { label: 'Final Exam', weight: 30, color: '#dc2626' }
    ]
  },
  {
    id: 'course-6',
    code: 'ART 110',
    name: 'Survey of Renaissance & Baroque Art',
    credits: 2.0,
    professor: 'Dr. Laurent Dubois',
    room: 'Fine Arts Studio 3',
    schedule: 'Fri 03:00 PM',
    currentGrade: 'A',
    percentage: 93,
    color: '#d97706',
    syllabus: [
      { label: 'Weekly Quizzes', weight: 40, color: '#d97706' },
      { label: 'Gallery Critique', weight: 30, color: '#7c3aed' },
      { label: 'Final Paper', weight: 30, color: '#0284c7' }
    ]
  }
];

const GRADE_POINTS = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D': 1.0, 'F': 0.0
};

// ----------------------------------------------------
// SUBTASKS CONTROLLER
// ----------------------------------------------------
window.toggleSubtaskItem = async function(taskId, subtaskId, isChecked) {
  const res = await apiFetch(`/api/tasks/${taskId}`);
  const task = res.data;
  if (!task) return;
  task.subtasks = task.subtasks || [];
  const st = task.subtasks.find(s => s.id === subtaskId);
  if (st) {
    st.completed = isChecked;
    await apiFetch(`/api/tasks/${taskId}`, { method: 'PUT', body: JSON.stringify({ subtasks: task.subtasks }) });
    openTaskDetails(taskId);
  }
};

window.addSubtaskItem = async function(taskId) {
  const input = document.getElementById('new-subtask-text');
  if (!input || !input.value.trim()) return;
  const text = input.value.trim();
  const res = await apiFetch(`/api/tasks/${taskId}`);
  const task = res.data;
  if (!task) return;
  task.subtasks = task.subtasks || [];
  task.subtasks.push({ id: 'st-' + Date.now(), text, completed: false });
  await apiFetch(`/api/tasks/${taskId}`, { method: 'PUT', body: JSON.stringify({ subtasks: task.subtasks }) });
  input.value = '';
  openTaskDetails(taskId);
};

window.deleteSubtaskItem = async function(taskId, subtaskId) {
  const res = await apiFetch(`/api/tasks/${taskId}`);
  const task = res.data;
  if (!task) return;
  task.subtasks = (task.subtasks || []).filter(s => s.id !== subtaskId);
  await apiFetch(`/api/tasks/${taskId}`, { method: 'PUT', body: JSON.stringify({ subtasks: task.subtasks }) });
  openTaskDetails(taskId);
};

// ----------------------------------------------------
// iCALENDAR (.ICS) EXPORT ENGINE
// ----------------------------------------------------
window.exportToICalendar = function() {
  const tasks = JSON.parse(localStorage.getItem('visily_mock_tasks') || '[]');
  if (!tasks.length) {
    showToast('No tasks available to export', 'error');
    return;
  }

  const formatIcsDate = (d) => {
    const date = new Date(d);
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  let ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Student Task Tracker//Academic Productivity Suite//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Academic Deadlines & Tasks'
  ];

  tasks.forEach(t => {
    const due = new Date(t.dueDate);
    const start = new Date(due.getTime() - 60 * 60 * 1000);
    const uid = `${t._id || 'task-' + Math.random().toString(36).substr(2, 9)}@studenttracker.app`;
    const summary = (t.course ? `[${t.course}] ` : '') + (t.title || 'Academic Task');
    const desc = (t.description || '').replace(/\n/g, '\\n');
    const cat = t.category?.name || 'Academic';

    ics.push('BEGIN:VEVENT');
    ics.push(`UID:${uid}`);
    ics.push(`DTSTAMP:${formatIcsDate(new Date())}`);
    ics.push(`DTSTART:${formatIcsDate(start)}`);
    ics.push(`DTEND:${formatIcsDate(due)}`);
    ics.push(`SUMMARY:${summary}`);
    ics.push(`DESCRIPTION:${desc}`);
    ics.push(`CATEGORIES:${cat}`);
    ics.push(`STATUS:${t.status === 'completed' ? 'COMPLETED' : 'CONFIRMED'}`);
    ics.push('END:VEVENT');
  });

  ics.push('END:VCALENDAR');

  const blob = new Blob([ics.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'academic_schedule.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Downloaded academic_schedule.ics for Google/Apple Calendar!');
};

// ----------------------------------------------------
// KANBAN BOARD ENGINE
// ----------------------------------------------------
async function initKanbanView() {
  const container = document.getElementById('kanban-board-container');
  if (!container) return;
  const res = await apiFetch('/api/tasks?limit=100');
  renderKanbanBoard(container, res.data || []);
}

function renderKanbanBoard(container, tasks) {
  if (!container) return;

  // 4 Lanes
  const lanes = {
    todo: { title: 'TO DO', color: '#64748b', items: [] },
    in_progress: { title: 'IN PROGRESS', color: '#0284c7', items: [] },
    review: { title: 'REVIEW / DRAFT', color: '#7c3aed', items: [] },
    completed: { title: 'COMPLETED', color: '#16a34a', items: [] }
  };

  tasks.forEach(t => {
    if (t.status === 'completed') {
      lanes.completed.items.push(t);
    } else if (t.status === 'review' || (t.title && /draft|phase 1|review|report/i.test(t.title))) {
      lanes.review.items.push(t);
    } else if (t.priority === 'high' || t.status === 'in_progress') {
      lanes.in_progress.items.push(t);
    } else {
      lanes.todo.items.push(t);
    }
  });

  const laneKeys = ['todo', 'in_progress', 'review', 'completed'];

  container.innerHTML = laneKeys.map((key, idx) => {
    const col = lanes[key];
    const prevKey = idx > 0 ? laneKeys[idx - 1] : null;
    const nextKey = idx < laneKeys.length - 1 ? laneKeys[idx + 1] : null;

    return `
      <div class="kanban-column" ondragover="event.preventDefault();" ondrop="handleKanbanDrop(event, '${key}')">
        <div class="kanban-col-header">
          <div class="kanban-col-title">
            <span class="cat-dot" style="background-color: ${col.color};"></span>
            <span>${col.title}</span>
          </div>
          <span class="kanban-count-badge">${col.items.length}</span>
        </div>

        <div class="kanban-cards-list">
          ${col.items.length === 0 ? '<p style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 24px 0;">No tasks in this lane</p>' : ''}
          ${col.items.map(task => {
            const dateStr = new Date(task.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' });
            const catClass = getCatClass(task.category?.name);
            return `
              <div class="kanban-task-card" draggable="true" ondragstart="event.dataTransfer.setData('text/plain', '${task._id}')" onclick="openTaskDetails('${task._id}')">
                <div class="kanban-card-top">
                  <span class="category-pill-badge ${catClass}" style="font-size: 10px; padding: 2px 7px;">${task.category?.name || 'Task'}</span>
                  ${task.priority === 'high' ? '<span class="badge" style="background: rgba(220,38,38,0.1); color: #dc2626; font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 4px;">High</span>' : ''}
                </div>
                <div class="kanban-card-title">${task.title}</div>
                <div class="kanban-card-footer">
                  <div style="display: flex; align-items: center; gap: 4px;">
                    <span class="material-symbols-rounded" style="font-size: 14px;">calendar_today</span>
                    <span>${dateStr}</span>
                  </div>
                  <div class="kanban-move-actions" onclick="event.stopPropagation();">
                    ${prevKey ? `<button class="btn-kanban-move" title="Move Left" onclick="moveKanbanTask('${task._id}', '${prevKey}')">‹</button>` : ''}
                    ${nextKey ? `<button class="btn-kanban-move" title="Move Right" onclick="moveKanbanTask('${task._id}', '${nextKey}')">›</button>` : ''}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

window.moveKanbanTask = async function(taskId, targetLane) {
  let status = 'pending';
  if (targetLane === 'completed') status = 'completed';
  if (targetLane === 'review') status = 'review';
  if (targetLane === 'in_progress') status = 'in_progress';
  if (targetLane === 'todo') status = 'pending';

  await apiFetch(`/api/tasks/${taskId}`, { method: 'PUT', body: JSON.stringify({ status }) });
  showToast(`Moved task to ${targetLane.replace('_', ' ').toUpperCase()}`);

  if (appState.activeView === 'kanban') {
    await initKanbanView();
  } else {
    const tableCard = document.getElementById('tasks-table-card');
    const res = await apiFetch('/api/tasks?limit=100');
    renderKanbanBoard(tableCard, res.data || []);
  }
};

window.handleKanbanDrop = function(e, targetLane) {
  e.preventDefault();
  const taskId = e.dataTransfer.getData('text/plain');
  if (taskId) {
    moveKanbanTask(taskId, targetLane);
  }
};

// ----------------------------------------------------
// EISENHOWER MATRIX ENGINE
// ----------------------------------------------------
function renderEisenhowerMatrix(container, tasks) {
  if (!container) return;

  const now = Date.now();
  const quadrants = {
    q1: { title: 'DO FIRST (Urgent & Important)', sub: 'Due in < 48h • High Priority / Exams', color: '#dc2626', class: 'q1-urgent-important', items: [] },
    q2: { title: 'SCHEDULE (Not Urgent & Important)', sub: 'Due in > 48h • Major Projects & Core Homework', color: '#06b6d4', class: 'q2-schedule', items: [] },
    q3: { title: 'DELEGATE / QUICK (Urgent & Not Important)', sub: 'Due in < 48h • Minor Errands & Low Weight', color: '#f59e0b', class: 'q3-delegate', items: [] },
    q4: { title: 'ELIMINATE / BACKLOG (Low Priority)', sub: 'Due in > 48h • Personal Goals & Backlog', color: '#64748b', class: 'q4-eliminate', items: [] }
  };

  tasks.forEach(t => {
    if (t.status === 'completed') return;
    const dueTime = new Date(t.dueDate).getTime();
    const isUrgent = (dueTime - now) <= (48 * 60 * 60 * 1000);
    const isImportant = t.priority === 'high' || (t.category?.name && /exam|project/i.test(t.category.name));

    if (isUrgent && isImportant) {
      quadrants.q1.items.push(t);
    } else if (!isUrgent && isImportant) {
      quadrants.q2.items.push(t);
    } else if (isUrgent && !isImportant) {
      quadrants.q3.items.push(t);
    } else {
      quadrants.q4.items.push(t);
    }
  });

  container.innerHTML = `
    <div class="matrix-grid-container" style="padding: 16px;">
      ${Object.keys(quadrants).map(key => {
        const q = quadrants[key];
        return `
          <div class="matrix-quadrant ${q.class}">
            <div class="quadrant-header">
              <div>
                <strong style="color: ${q.color}; font-size: 13.5px; letter-spacing: 0.04em;">${q.title}</strong>
                <p style="font-size: 11.5px; color: var(--text-muted); margin-top: 2px;">${q.sub}</p>
              </div>
              <span class="badge" style="background: var(--bg-tertiary); font-weight: 700; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${q.items.length}</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px; overflow-y: auto; max-height: 250px;">
              ${q.items.length === 0 ? '<p style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 18px 0;">No active tasks in this quadrant</p>' : ''}
              ${q.items.map(t => {
                const dateStr = new Date(t.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' });
                return `
                  <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 8px; padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; transition: transform 0.15s ease;" onclick="openTaskDetails('${t._id}')">
                    <div style="flex: 1; min-width: 0;">
                      <div style="font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text-primary);">${t.title}</div>
                      <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">${t.course || 'Course'} • Due ${dateStr}</div>
                    </div>
                    <button class="btn-icon-subtle" onclick="event.stopPropagation(); toggleTaskComplete('${t._id}', true);" title="Mark Done" style="border: none; background: transparent; cursor: pointer; color: var(--accent-cyan);">
                      <span class="material-symbols-rounded" style="font-size: 18px;">check_circle</span>
                    </button>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ----------------------------------------------------
// POMODORO FOCUS TIMER ENGINE WITH WEB AUDIO SOUNDS
// ----------------------------------------------------
const pomoState = {
  mode: 'focus',
  durations: { focus: 25 * 60, shortBreak: 5 * 60, longBreak: 15 * 60 },
  timeLeft: 25 * 60,
  isRunning: false,
  timerId: null,
  activeSound: 'none',
  completedSessions: parseInt(localStorage.getItem('pomo_completed') || '3'),
  selectedTaskId: null
};

let pomoAudioCtx = null;
let pomoNoiseNode = null;
let pomoGainNode = null;

function stopPomoAmbientSound() {
  if (pomoNoiseNode) {
    try {
      pomoNoiseNode.stop();
      pomoNoiseNode.disconnect();
    } catch(e){}
    pomoNoiseNode = null;
  }
}

function startPomoAmbientSound(type) {
  stopPomoAmbientSound();
  if (type === 'none') return;

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!pomoAudioCtx) {
      pomoAudioCtx = new AudioContext();
    }
    if (pomoAudioCtx.state === 'suspended') {
      pomoAudioCtx.resume();
    }

    const bufferSize = pomoAudioCtx.sampleRate * 2;
    const noiseBuffer = pomoAudioCtx.createBuffer(1, bufferSize, pomoAudioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = pomoAudioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = pomoAudioCtx.createBiquadFilter();
    pomoGainNode = pomoAudioCtx.createGain();

    if (type === 'rain') {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, pomoAudioCtx.currentTime);
      filter.Q.setValueAtTime(1.5, pomoAudioCtx.currentTime);
      pomoGainNode.gain.setValueAtTime(0.08, pomoAudioCtx.currentTime);
    } else if (type === 'ocean') {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, pomoAudioCtx.currentTime);
      filter.Q.setValueAtTime(1.2, pomoAudioCtx.currentTime);
      pomoGainNode.gain.setValueAtTime(0.04, pomoAudioCtx.currentTime);
      // Gentle ocean swell LFO
      const lfo = pomoAudioCtx.createOscillator();
      const lfoGain = pomoAudioCtx.createGain();
      lfo.frequency.setValueAtTime(0.12, pomoAudioCtx.currentTime);
      lfoGain.gain.setValueAtTime(0.035, pomoAudioCtx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(pomoGainNode.gain);
      lfo.start();
    } else {
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1000, pomoAudioCtx.currentTime);
      filter.Q.setValueAtTime(0.8, pomoAudioCtx.currentTime);
      pomoGainNode.gain.setValueAtTime(0.08, pomoAudioCtx.currentTime);
    }

    whiteNoise.connect(filter);
    filter.connect(pomoGainNode);
    pomoGainNode.connect(pomoAudioCtx.destination);

    whiteNoise.start();
    pomoNoiseNode = whiteNoise;
  } catch (err) {
    console.warn('Web Audio Ambient error:', err);
  }
}

function playPomoChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const chords = [523.25, 659.25, 783.99, 1046.50];
    chords.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
      gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 1.3);
    });
  } catch (e) {
    console.warn('Chime error:', e);
  }
}

function updateHeaderPomodoroWidget() {
  const pillText = document.getElementById('header-pomodoro-text');
  const pillDot = document.querySelector('#header-pomodoro-pill .pomodoro-pulse-dot');
  if (!pillText) return;

  const mins = Math.floor(pomoState.timeLeft / 60);
  const secs = pomoState.timeLeft % 60;
  const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const modeStr = pomoState.mode === 'focus' ? 'Focus' : 'Break';

  pillText.innerText = `${timeStr} ${modeStr}`;
  if (pillDot) {
    pillDot.style.backgroundColor = pomoState.isRunning ? (pomoState.mode === 'focus' ? '#22c55e' : '#06b6d4') : '#94a3b8';
    pillDot.style.animation = pomoState.isRunning ? 'pulseGlow 2s infinite' : 'none';
  }
}

function updatePomodoroDisplay() {
  const display = document.getElementById('pomo-timer-display');
  const modeLabel = document.getElementById('pomo-mode-display');
  const toggleIcon = document.getElementById('pomo-toggle-icon');
  const toggleLabel = document.getElementById('pomo-toggle-label');
  const circle = document.getElementById('pomo-circle');

  const mins = Math.floor(pomoState.timeLeft / 60);
  const secs = pomoState.timeLeft % 60;
  const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  if (display) display.innerText = timeStr;
  if (modeLabel) modeLabel.innerText = pomoState.mode === 'focus' ? 'DEEP FOCUS' : 'REST INTERVAL';
  if (toggleIcon) toggleIcon.innerText = pomoState.isRunning ? 'pause' : 'play_arrow';
  if (toggleLabel) toggleLabel.innerText = pomoState.isRunning ? 'Pause' : 'Start Focus';

  if (circle) {
    const fraction = pomoState.timeLeft / pomoState.durations[pomoState.mode];
    circle.style.borderColor = pomoState.mode === 'focus' ? 'var(--accent-cyan)' : '#22c55e';
  }

  updateHeaderPomodoroWidget();
}

function startPomoTimer() {
  if (pomoState.isRunning) return;
  pomoState.isRunning = true;
  if (pomoState.activeSound !== 'none') {
    startPomoAmbientSound(pomoState.activeSound);
  }
  pomoState.timerId = setInterval(() => {
    if (pomoState.timeLeft > 0) {
      pomoState.timeLeft--;
      updatePomodoroDisplay();
    } else {
      clearInterval(pomoState.timerId);
      pomoState.isRunning = false;
      stopPomoAmbientSound();
      playPomoChime();

      if (pomoState.mode === 'focus') {
        pomoState.completedSessions++;
        localStorage.setItem('pomo_completed', pomoState.completedSessions);
        showToast('Focus session complete! Time for a short break.');
        pomoState.mode = 'shortBreak';
      } else {
        showToast('Break finished! Ready for next focus sprint?');
        pomoState.mode = 'focus';
      }
      pomoState.timeLeft = pomoState.durations[pomoState.mode];
      updatePomodoroDisplay();
    }
  }, 1000);
  updatePomodoroDisplay();
}

function pausePomoTimer() {
  pomoState.isRunning = false;
  clearInterval(pomoState.timerId);
  stopPomoAmbientSound();
  updatePomodoroDisplay();
}

function resetPomoTimer() {
  pausePomoTimer();
  pomoState.timeLeft = pomoState.durations[pomoState.mode];
  updatePomodoroDisplay();
}

async function initPomodoroView() {
  updatePomodoroDisplay();

  // Mode tabs
  const tabs = document.querySelectorAll('#pomo-mode-tabs .pomodoro-tab-btn');
  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const mode = tab.getAttribute('data-mode');
      pomoState.mode = mode;
      resetPomoTimer();
    };
  });

  // Action buttons
  document.getElementById('btn-pomo-toggle')?.addEventListener('click', () => {
    if (pomoState.isRunning) pausePomoTimer();
    else startPomoTimer();
  });

  document.getElementById('btn-pomo-reset')?.addEventListener('click', resetPomoTimer);

  document.getElementById('btn-pomo-skip')?.addEventListener('click', () => {
    pausePomoTimer();
    pomoState.mode = pomoState.mode === 'focus' ? 'shortBreak' : 'focus';
    pomoState.timeLeft = pomoState.durations[pomoState.mode];
    tabs.forEach(t => {
      if (t.getAttribute('data-mode') === pomoState.mode) t.classList.add('active');
      else t.classList.remove('active');
    });
    updatePomodoroDisplay();
  });

  // Ambient sound pills
  const soundPills = document.querySelectorAll('#pomo-sound-controls .sound-toggle-pill');
  soundPills.forEach(pill => {
    pill.onclick = () => {
      soundPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const soundType = pill.getAttribute('data-sound');
      pomoState.activeSound = soundType;
      if (pomoState.isRunning) {
        startPomoAmbientSound(soundType);
      }
      showToast(`Ambient Sound: ${soundType === 'none' ? 'Muted' : soundType.toUpperCase()}`);
    };
  });

  // Populate task selector
  const taskSel = document.getElementById('pomo-task-selector');
  if (taskSel) {
    const res = await apiFetch('/api/tasks?limit=20');
    const tasks = (res.data || []).filter(t => t.status !== 'completed');
    taskSel.innerHTML = `
      <option value="">-- Select a task to focus on --</option>
      ${tasks.map(t => `<option value="${t._id}">${t.course ? `[${t.course}] ` : ''}${t.title}</option>`).join('')}
    `;
    taskSel.onchange = (e) => {
      pomoState.selectedTaskId = e.target.value;
      if (e.target.value) {
        const found = tasks.find(t => t._id === e.target.value);
        if (found) showToast(`Bound Focus Timer to: ${found.title}`);
      }
    };
  }
}

// ----------------------------------------------------
// COURSES & GPA PLANNER ENGINE
// ----------------------------------------------------
async function initCoursesView() {
  const grid = document.getElementById('courses-cards-grid');
  const gpaHuge = document.getElementById('display-cum-gpa');
  const simContainer = document.getElementById('gpa-sim-sliders-container');

  const res = await apiFetch('/api/tasks?limit=100');
  const tasks = res.data || [];

  // Calculate cumulative GPA
  let totalQualityPoints = 0;
  let totalCredits = 0;

  DEFAULT_COURSES.forEach(c => {
    const pts = GRADE_POINTS[c.currentGrade] || 3.0;
    totalQualityPoints += pts * c.credits;
    totalCredits += c.credits;
  });

  const calculatedGPA = (totalQualityPoints / totalCredits).toFixed(2);
  if (gpaHuge) gpaHuge.innerText = calculatedGPA;

  // Render Courses Cards
  if (grid) {
    grid.innerHTML = DEFAULT_COURSES.map(course => {
      const courseTasks = tasks.filter(t => (t.course || '').includes(course.code));
      const pendingCount = courseTasks.filter(t => t.status !== 'completed').length;

      return `
        <div class="course-planner-card">
          <div class="course-card-top">
            <span class="course-code-pill">${course.code}</span>
            <span class="course-grade-badge">${course.currentGrade} (${course.percentage}%)</span>
          </div>
          <div class="course-title-sub">${course.name}</div>
          <div class="course-meta-row">
            <span>${course.professor}</span>
            <span>${course.credits} Credits</span>
          </div>
          <div style="font-size: 11.5px; color: var(--text-muted);">
            <span>${course.room} • ${course.schedule}</span>
          </div>

          <!-- Syllabus Weighting Bar -->
          <div style="margin-top: 8px;">
            <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 600; color: var(--text-secondary); margin-bottom: 4px;">
              <span>Syllabus Breakdown</span>
              <span>100%</span>
            </div>
            <div class="syllabus-breakdown-bar">
              ${course.syllabus.map(s => `<div class="syllabus-slice" style="width: ${s.weight}%; background-color: ${s.color};" title="${s.label} (${s.weight}%)"></div>`).join('')}
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px;">
              ${course.syllabus.map(s => `
                <div style="display: flex; align-items: center; gap: 4px; font-size: 10px; color: var(--text-muted);">
                  <span style="width: 6px; height: 6px; border-radius: 50%; background: ${s.color};"></span>
                  <span>${s.label}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="border-top: 1px solid var(--border-color); padding-top: 10px; margin-top: 4px; display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 12px; font-weight: 600; color: ${pendingCount > 0 ? '#0284c7' : '#16a34a'};">
              ${pendingCount > 0 ? `${pendingCount} Tasks Due` : 'All Caught Up!'}
            </span>
            <button class="btn btn-secondary" style="padding: 4px 10px; font-size: 11.5px;" onclick="window.location.hash='#tasks?search=${course.code}'">
              View Tasks
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Target GPA Simulator Sliders
  if (simContainer) {
    simContainer.innerHTML = DEFAULT_COURSES.map(course => `
      <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px;">
        <div style="display: flex; justify-content: space-between; font-size: 12.5px; font-weight: 700; margin-bottom: 6px;">
          <span>${course.code}</span>
          <span id="slider-grade-val-${course.id}">${course.currentGrade}</span>
        </div>
        <select class="custom-select" style="width: 100%; padding: 4px 8px; font-size: 12px;" onchange="updateSimulatedGpa('${course.id}', this.value)">
          ${Object.keys(GRADE_POINTS).map(g => `<option value="${g}" ${g === course.currentGrade ? 'selected' : ''}>${g} (${GRADE_POINTS[g].toFixed(1)})</option>`).join('')}
        </select>
      </div>
    `).join('');
  }
}

window.simCourseGrades = {};
window.updateSimulatedGpa = function(courseId, newGrade) {
  window.simCourseGrades[courseId] = newGrade;
  const label = document.getElementById(`slider-grade-val-${courseId}`);
  if (label) label.innerText = newGrade;

  let totalQP = 0;
  let totalCreds = 0;

  DEFAULT_COURSES.forEach(c => {
    const grade = window.simCourseGrades[c.id] || c.currentGrade;
    const pts = GRADE_POINTS[grade] || 3.0;
    totalQP += pts * c.credits;
    totalCreds += c.credits;
  });

  const simGpa = (totalQP / totalCreds).toFixed(2);
  const badge = document.getElementById('simulated-gpa-badge');
  if (badge) badge.innerText = `Predicted GPA: ${simGpa}`;
};

// ----------------------------------------------------
// ANTI-PROCRASTINATION FOCUS LAUNCHER
// ----------------------------------------------------
window.launchFocusForTask = function(taskId) {
  pomoState.selectedTaskId = taskId;
  pomoState.mode = 'focus';
  pomoState.timeLeft = pomoState.durations.focus;
  window.location.hash = '#pomodoro';
  setTimeout(() => {
    startPomoTimer();
    showToast('Focus session started for top priority task!');
  }, 100);
};

// ----------------------------------------------------
// "WHAT-IF" FINAL EXAM GRADE FORECASTER
// ----------------------------------------------------
window.updateWhatIfCalc = function() {
  const courseCode = document.getElementById('what-if-course-select')?.value || 'MATH 301';
  const targetGrade = parseFloat(document.getElementById('what-if-target-grade')?.value || '93');
  const hwScore = parseFloat(document.getElementById('what-if-hw-score')?.value || '94');
  const midScore = parseFloat(document.getElementById('what-if-midterm-score')?.value || '89');

  const scoreDisplay = document.getElementById('what-if-score-display');
  const noteDisplay = document.getElementById('what-if-feasibility-note');
  if (!scoreDisplay) return;

  const weights = {
    'MATH 301': { hw: 0.40, mid: 0.30, final: 0.30 },
    'BIO 102': { hw: 0.35, mid: 0.25, final: 0.40 },
    'HIST 205': { hw: 0.45, mid: 0.25, final: 0.30 },
    'PHYS 201': { hw: 0.30, mid: 0.30, final: 0.40 },
    'CS 301': { hw: 0.50, mid: 0.20, final: 0.30 },
    'ART 110': { hw: 0.40, mid: 0.30, final: 0.30 }
  };

  const w = weights[courseCode] || { hw: 0.40, mid: 0.30, final: 0.30 };
  const currentEarned = (w.hw * hwScore) + (w.mid * midScore);
  const neededScore = (targetGrade - currentEarned) / w.final;
  const rounded = Math.round(neededScore * 10) / 10;

  scoreDisplay.innerText = `${rounded}%`;

  if (rounded <= 70) {
    noteDisplay.innerText = 'Easily within reach! Standard review is sufficient.';
  } else if (rounded <= 90) {
    noteDisplay.innerText = 'Very achievable! Maintain problem set cadence.';
  } else if (rounded <= 100) {
    noteDisplay.innerText = 'Intense focus required! Review formula sheets & past midterms.';
  } else {
    noteDisplay.innerText = 'Extra credit required to reach this threshold score.';
  }
};

// ----------------------------------------------------
// CLASS TIMETABLE ENGINE (DDL Killer & Samwise Inspired)
// ----------------------------------------------------
const DEFAULT_TIMETABLE_DAYS = [
  {
    name: 'Monday',
    short: 'Mon',
    sessions: [
      { code: 'MATH 301', title: 'Multivariable Calculus', time: '10:00 - 11:30 AM', room: 'Hall B-12', prof: 'Dr. Martinez', color: '#0284c7' },
      { isFree: true, title: 'Free Study Window (2.5h)', time: '11:30 AM - 02:00 PM', tip: 'Ideal for Math Problem Set 4' },
      { code: 'HIST 205', title: 'Modern World History', time: '02:00 - 03:30 PM', room: 'Humanities 110', prof: 'Prof. Adler', color: '#7c3aed' }
    ]
  },
  {
    name: 'Tuesday',
    short: 'Tue',
    sessions: [
      { code: 'BIO 102', title: 'Molecular Biology', time: '09:30 - 11:00 AM', room: 'Life Sci 304', prof: 'Dr. Vance', color: '#16a34a' },
      { isFree: true, title: 'Free Study Window (2.0h)', time: '11:00 AM - 01:00 PM', tip: 'Review cellular respiration notes' },
      { code: 'PHYS 201', title: 'Classical Mechanics', time: '01:00 - 02:30 PM', room: 'Physics Annex 201', prof: 'Dr. Chen', color: '#0891b2' }
    ]
  },
  {
    name: 'Wednesday',
    short: 'Wed',
    sessions: [
      { code: 'MATH 301', title: 'Multivariable Calculus', time: '10:00 - 11:30 AM', room: 'Hall B-12', prof: 'Dr. Martinez', color: '#0284c7' },
      { code: 'CS 301', title: 'Systems Architecture', time: '11:30 AM - 01:00 PM', room: 'Turing Hall 402', prof: 'Prof. Robinson', color: '#2563eb' },
      { code: 'HIST 205', title: 'Modern World History', time: '02:00 - 03:30 PM', room: 'Humanities 110', prof: 'Prof. Adler', color: '#7c3aed' }
    ]
  },
  {
    name: 'Thursday',
    short: 'Thu',
    sessions: [
      { code: 'BIO 102', title: 'Molecular Biology', time: '09:30 - 11:00 AM', room: 'Life Sci 304', prof: 'Dr. Vance', color: '#16a34a' },
      { isFree: true, title: 'Free Study Window (2.0h)', time: '11:00 AM - 01:00 PM', tip: 'Finish Physics wave interference draft' },
      { code: 'PHYS 201', title: 'Classical Mechanics', time: '01:00 - 02:30 PM', room: 'Physics Annex 201', prof: 'Dr. Chen', color: '#0891b2' }
    ]
  },
  {
    name: 'Friday',
    short: 'Fri',
    sessions: [
      { code: 'MATH 301', title: 'Multivariable Calculus', time: '10:00 - 11:30 AM', room: 'Hall B-12', prof: 'Dr. Martinez', color: '#0284c7' },
      { code: 'CS 301', title: 'Systems Architecture', time: '11:30 AM - 01:00 PM', room: 'Turing Hall 402', prof: 'Prof. Robinson', color: '#2563eb' },
      { isFree: true, title: 'Free Study Window (2.0h)', time: '01:00 - 03:00 PM', tip: 'Exam prep & problem set review' },
      { code: 'ART 110', title: 'Renaissance & Baroque Art', time: '03:00 - 05:00 PM', room: 'Fine Arts Studio 3', prof: 'Dr. Dubois', color: '#d97706' }
    ]
  }
];

function initTimetableView() {
  const container = document.getElementById('timetable-grid-container');
  if (!container) return;

  const timeHours = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'];

  let html = `
    <div style="display: flex; flex-direction: column; gap: 24px; padding-top: 40px;">
      ${timeHours.map(h => `<div class="timetable-time-slot">${h}</div>`).join('')}
    </div>
  `;

  DEFAULT_TIMETABLE_DAYS.forEach(day => {
    html += `
      <div class="timetable-day-column">
        <div class="timetable-day-header">${day.name}</div>
        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
          ${day.sessions.map(s => {
            if (s.isFree) {
              return `
                <div class="free-study-window-card" onclick="window.location.hash='#pomodoro'" title="Start Focus Session">
                  <div class="free-window-title">
                    <span class="material-symbols-rounded" style="font-size: 15px;">bolt</span>
                    <span>${s.title}</span>
                  </div>
                  <div class="free-window-sub">${s.time}</div>
                  <div style="font-size: 10px; color: #0d9488; font-weight: 600; margin-top: 2px;">⚡ ${s.tip}</div>
                </div>
              `;
            }
            return `
              <div class="class-session-card" style="border-left-color: ${s.color};">
                <div class="class-card-code">${s.code}</div>
                <div class="class-card-name">${s.title}</div>
                <div class="class-card-time-loc">
                  <span class="material-symbols-rounded" style="font-size: 13px;">schedule</span>
                  <span>${s.time}</span>
                </div>
                <div class="class-card-time-loc">
                  <span class="material-symbols-rounded" style="font-size: 13px;">location_on</span>
                  <span>${s.room} • ${s.prof}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ----------------------------------------------------
// STUDY NOTES & FORMULA SHEETS ENGINE (Hoot & Notion OS)
// ----------------------------------------------------
const DEFAULT_STUDY_NOTES = [
  {
    id: 'note-1',
    course: 'MATH 301',
    title: "Stokes' Theorem & Surface Integrals",
    formula: '∬_S (∇ × F) · dS = ∮_C F · dr',
    tags: ['Vector Calculus', 'Finals', 'Exam Prep'],
    content: 'Relates surface integral of curl over open surface S to line integral over oriented closed boundary curve C. Crucial for electromagnetic flux and fluid circulation.'
  },
  {
    id: 'note-2',
    course: 'MATH 301',
    title: "Green's Theorem in the Plane",
    formula: '∮_C (L dx + M dy) = ∬_D (∂M/∂x - ∂L/∂y) dA',
    tags: ['Double Integrals', 'Midterm 2'],
    content: 'Fundamental theorem of multivariable calculus in 2D. Connects counterclockwise circulation around curve C to 2D curl over enclosed region D.'
  },
  {
    id: 'note-3',
    course: 'CS 301',
    title: 'Raft Distributed Consensus Quorum',
    formula: 'Quorum = ⌊N / 2⌋ + 1',
    tags: ['Distributed Systems', 'Fault Tolerance'],
    content: 'A candidate node in Raft must receive positive votes from a majority quorum of servers to assume leadership. Heartbeats prevent split-brain states.'
  },
  {
    id: 'note-4',
    course: 'CS 301',
    title: "Amdahl's Law Speedup Boundary",
    formula: 'S_latency(s) = 1 / ((1 - p) + (p / s))',
    tags: ['Parallel Computing', 'Architecture'],
    content: 'Shows theoretical limit on execution speedup for parallel programs with serial fraction (1 - p). Even with infinite cores (s → ∞), speedup is capped at 1 / (1 - p).'
  },
  {
    id: 'note-5',
    course: 'BIO 102',
    title: 'Cellular Respiration Net ATP Yield',
    formula: 'C6H12O6 + 6O2 → 6CO2 + 6H2O + ~30-32 ATP',
    tags: ['Metabolism', 'Krebs Cycle'],
    content: 'Glycolysis yields 2 ATP + 2 NADH; Pyruvate decarboxylation yields 2 NADH; Krebs cycle yields 2 ATP + 6 NADH + 2 FADH2; Oxidative phosphorylation yields ~26 ATP.'
  },
  {
    id: 'note-6',
    course: 'PHYS 201',
    title: 'Harmonic Motion & Frequency Relations',
    formula: 'ω = √(k / m),   T = 2π / ω = 2π√(m / k)',
    tags: ['Oscillations', 'Spring Systems'],
    content: 'Position function is x(t) = A cos(ωt + φ). Restoring force F = -kx. Velocity is out of phase by π/2, acceleration is out of phase by π.'
  },
  {
    id: 'note-7',
    course: 'PHYS 201',
    title: 'Two-Slit Interference Constructive Fringe',
    formula: 'd sin(θ) = mλ,   y_m ≈ (mλL) / d',
    tags: ['Wave Optics', 'Young Experiment'],
    content: 'Path difference between rays equals integer multiple of wavelength for constructive maxima. For small angles, fringe spacing Δy = λL / d.'
  },
  {
    id: 'note-8',
    course: 'HIST 205',
    title: 'Industrial Revolution Urbanization Driver',
    formula: 'Enclosure Acts + Coal/Steam Power = Urban Migration',
    tags: ['Industrialization', 'Demographics'],
    content: 'Transition from agrarian guild system to mechanized factory cities like Manchester and Leeds. Shift fueled by Watt engine patents and railway expansion.'
  }
];

function initNotesView() {
  const container = document.getElementById('notes-cards-container');
  const searchInput = document.getElementById('notes-search-input');
  const filterPills = document.querySelectorAll('#notes-filter-pills .filter-pill');
  if (!container) return;

  let activeCourse = '';
  let searchQuery = '';

  const render = () => {
    let filtered = DEFAULT_STUDY_NOTES.filter(n => {
      if (activeCourse && n.course !== activeCourse) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return n.title.toLowerCase().includes(q) || n.formula.toLowerCase().includes(q) || n.content.toLowerCase().includes(q) || n.tags.some(t => t.toLowerCase().includes(q));
      }
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px 0;">No notes matching your search filter</p>';
      return;
    }

    container.innerHTML = filtered.map(note => `
      <div class="note-formula-card">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span class="course-code-pill" style="font-size: 13px;">${note.course}</span>
          <div style="display: flex; gap: 4px;">
            ${note.tags.map(t => `<span class="badge" style="background: var(--bg-tertiary); font-size: 10px; padding: 2px 6px; border-radius: 4px;">${t}</span>`).join('')}
          </div>
        </div>

        <h3 style="font-size: 15px; font-weight: 700; margin: 4px 0 2px 0;">${note.title}</h3>

        <div class="formula-block">
          <span>${note.formula}</span>
          <button class="btn-icon-subtle" onclick="copyFormulaToClipboard('${note.formula.replace(/'/g, "\\'")}')" title="Copy formula" style="border: none; background: transparent; cursor: pointer; color: var(--accent-cyan);">
            <span class="material-symbols-rounded" style="font-size: 16px;">content_copy</span>
          </button>
        </div>

        <p style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.5; margin: 0;">${note.content}</p>
      </div>
    `).join('');
  };

  render();

  searchInput?.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    render();
  });

  filterPills.forEach(pill => {
    pill.onclick = () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCourse = pill.getAttribute('data-course');
      render();
    };
  });
}

window.copyFormulaToClipboard = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied formula: ${text}`);
  }).catch(() => {
    showToast('Copied to clipboard');
  });
};

// ----------------------------------------------------
// BULK SYLLABUS & TASK IMPORTER (planit & DDL Killer)
// ----------------------------------------------------
window.openImportModal = function() {
  document.getElementById('import-modal')?.classList.add('open');
};

window.closeImportModal = function() {
  document.getElementById('import-modal')?.classList.remove('open');
};

window.submitBulkImport = async function() {
  const textarea = document.getElementById('import-tasks-textarea');
  if (!textarea || !textarea.value.trim()) {
    showToast('Please enter at least one assignment line', 'error');
    return;
  }

  const lines = textarea.value.trim().split('\n');
  const importedTasks = [];

  lines.forEach((line, idx) => {
    const parts = line.split('|').map(s => s.trim());
    if (parts[0]) {
      const title = parts[0];
      const course = parts[1] || 'General';
      const dueStr = parts[2] || new Date(Date.now() + (idx + 2) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const priorityRaw = (parts[3] || 'medium').toLowerCase();
      const priority = priorityRaw.includes('high') ? 'high' : priorityRaw.includes('low') ? 'low' : 'medium';

      const catName = /exam|quiz|midterm/i.test(title) ? 'Exams' : /project/i.test(title) ? 'Projects' : 'Assignments';
      const catObj = DEFAULT_CATEGORIES.find(c => c.name === catName) || DEFAULT_CATEGORIES[0];

      importedTasks.push({
        _id: 'task-import-' + Date.now() + '-' + idx,
        title,
        course,
        category: catObj,
        dueDate: new Date(`${dueStr}T23:59:00`).toISOString(),
        priority,
        status: 'pending',
        remindMe: true,
        description: `Imported from syllabus schedule for ${course}.`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
  });

  if (importedTasks.length === 0) {
    showToast('No valid lines parsed', 'error');
    return;
  }

  let tasks = JSON.parse(localStorage.getItem('visily_mock_tasks') || '[]');
  tasks = [...importedTasks, ...tasks];
  localStorage.setItem('visily_mock_tasks', JSON.stringify(tasks));

  showToast(`Successfully imported ${importedTasks.length} tasks from syllabus!`);
  closeImportModal();
  textarea.value = '';

  if (appState.activeView === 'tasks') await fetchAndRenderTasksTable();
  if (appState.activeView === 'dashboard') await initDashboardView();
  if (appState.activeView === 'kanban') await initKanbanView();
};

// Helpers
function capitalize(s) {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function getCatClass(name) {
  if (!name) return 'cat-assignments';
  const l = name.toLowerCase();
  if (l.includes('assign')) return 'cat-assignments';
  if (l.includes('exam')) return 'cat-exams';
  if (l.includes('project')) return 'cat-projects';
  if (l.includes('person')) return 'cat-personal';
  return 'cat-assignments';
}

// Global Event Attachments
document.addEventListener('DOMContentLoaded', () => {
  // Theme initialization
  document.body.className = `${appState.theme}-theme`;

  // Drawer & Modal close triggers
  document.getElementById('btn-close-drawer')?.addEventListener('click', closeDrawer);
  document.getElementById('drawer-overlay')?.addEventListener('click', closeDrawer);
  document.getElementById('btn-close-modal')?.addEventListener('click', closeModal);
  document.getElementById('btn-cancel-modal')?.addEventListener('click', closeModal);
  document.getElementById('btn-close-import-modal')?.addEventListener('click', closeImportModal);
  document.getElementById('btn-cancel-import')?.addEventListener('click', closeImportModal);

  // Quick Add Button
  document.getElementById('btn-quick-add')?.addEventListener('click', () => openTaskModal());
  document.getElementById('mobile-fab-add')?.addEventListener('click', () => openTaskModal());

  // Sidebar toggle
  document.getElementById('sidebar-toggle-open')?.addEventListener('click', () => {
    document.getElementById('sidebar')?.classList.add('open');
  });
  document.getElementById('sidebar-toggle-close')?.addEventListener('click', () => {
    document.getElementById('sidebar')?.classList.remove('open');
  });

  // Task form submission
  document.getElementById('task-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('task-form-id').value;
    const title = document.getElementById('task-title').value.trim();
    const category = document.getElementById('task-category-val').value;
    const course = document.getElementById('task-course').value.trim();
    const dueDate = document.getElementById('task-due-date').value;
    const dueTime = document.getElementById('task-due-time').value;
    const priority = document.querySelector('input[name="priority"]:checked')?.value || 'medium';
    const remindMe = document.getElementById('task-remind')?.checked ?? true;
    const description = document.getElementById('task-desc').value.trim();

    if (!title) {
      document.getElementById('title-error-msg')?.classList.remove('hidden');
      return;
    }

    const combinedDue = new Date(`${dueDate}T${dueTime}`).toISOString();
    const payload = { title, category, course, dueDate: combinedDue, priority, remindMe, description };

    if (id) {
      await apiFetch(`/api/tasks/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
      showToast('Task updated successfully');
    } else {
      await apiFetch('/api/tasks', { method: 'POST', body: JSON.stringify(payload) });
      showToast('Task created successfully');
    }

    closeModal();
    if (appState.activeView === 'tasks') await fetchAndRenderTasksTable();
    if (appState.activeView === 'dashboard') await initDashboardView();
  });

  // Validation demo trigger
  document.getElementById('btn-trigger-validation-demo')?.addEventListener('click', () => {
    const errorText = document.getElementById('title-error-msg');
    const titleInput = document.getElementById('task-title');
    titleInput.value = '';
    titleInput.focus();
    errorText?.classList.remove('hidden');
  });

  // Priority buttons clicks
  ['low', 'medium', 'high'].forEach(p => {
    document.getElementById(`lbl-priority-${p}`)?.addEventListener('click', () => selectPriorityPill(p));
  });

  // Logout
  document.getElementById('btn-logout')?.addEventListener('click', () => {
    appState.setState({ user: null, accessToken: null });
    localStorage.removeItem('accessToken');
    window.location.hash = '#login';
  });

  // Global Search
  const searchInput = document.getElementById('global-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      appState.filters.search = e.target.value;
      if (appState.activeView !== 'tasks') {
        window.location.hash = '#tasks';
      } else {
        fetchAndRenderTasksTable();
      }
    });
  }

  // Hash route listener
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1) || 'dashboard';
    mountView(hash);
  });

  // Initial load
  const initialHash = window.location.hash.slice(1) || 'dashboard';
  mountView(initialHash);
});
