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
  user: { username: 'Alex', email: 'alex@tracker.com', role: 'student' },
  accessToken: localStorage.getItem('accessToken') || 'mock-jwt-token-alex',
  theme: localStorage.getItem('theme') || 'light',
  categories: DEFAULT_CATEGORIES,
  notifications: [
    { id: '1', message: 'Welcome back, Alex! 5 tasks are due today.', sentAt: new Date().toISOString() },
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
        <input type="text" id="reg-name" required placeholder="e.g. Alex Tracker" value="Alex">
      </div>
      <div class="form-group" style="text-align: left; margin-bottom: 14px;">
        <label for="reg-email">Email Address</label>
        <input type="email" id="reg-email" required placeholder="alex@tracker.com" value="alex@tracker.com">
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
          <h1 id="desktop-greeting-name">Welcome back, Alex!</h1>
          <p id="desktop-greeting-sub">You have 5 tasks to complete today.</p>
        </div>
        <div class="greeting-actions">
          <button class="btn btn-secondary" onclick="window.location.hash='#calendar'">
            <span class="material-symbols-rounded">calendar_today</span>
            <span>Schedule View</span>
          </button>
          <button class="btn btn-primary" onclick="openTaskModal()">
            <span class="material-symbols-rounded">add</span>
            <span>New Task</span>
          </button>
        </div>
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
        <div class="repo-counter-export desktop-only">
          <span id="repo-showing-counter">Showing 24 of 156 tasks</span>
          <button class="btn btn-secondary" id="btn-export-tasks">
            <span class="material-symbols-rounded" style="font-size: 17px;">file_download</span>
            <span>Export List</span>
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
        <h2 id="calendar-month-year">October 2024</h2>
        <div style="display: flex; gap: 8px;">
          <button class="btn-icon" id="btn-cal-prev"><span class="material-symbols-rounded">chevron_left</span></button>
          <button class="btn btn-secondary" id="btn-cal-today">Today</button>
          <button class="btn-icon" id="btn-cal-next"><span class="material-symbols-rounded">chevron_right</span></button>
        </div>
      </div>
      <div id="calendar-days-grid" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; margin-top: 16px;">
        <!-- Calendar days -->
      </div>
    </div>
  `,

  // 6. PROFILE & SETTINGS
  profile: () => `
    <div class="dashboard-panel" style="max-width: 600px; margin: 0 auto;">
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
        <div class="avatar-wrapper" style="width: 64px; height: 64px;">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces&q=80" alt="Alex" style="width: 64px; height: 64px; border-radius: 50%;" />
        </div>
        <div>
          <h2>Alex Student</h2>
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

  if (actualView === 'dashboard') {
    appContainer.innerHTML = appViews.dashboard();
    await initDashboardView();
  } else if (actualView === 'tasks') {
    appContainer.innerHTML = appViews.tasks();
    await initTasksView();
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

  // 1. Render Today's Tasks
  const todaysContainer = document.getElementById('todays-tasks-container');
  const tasksRes = await apiFetch('/api/tasks?limit=6');
  const allTasks = tasksRes.data || [];

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
// ACTIONS & EVENT LISTENERS
// ----------------------------------------------------
window.toggleTaskComplete = async function(id, isCompleted) {
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
    appState.setState({ user: { username: 'Alex', email: 'alex@tracker.com' }, accessToken: 'mock-token' });
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
    appState.setState({ user: { username: name, email: 'alex@tracker.com' }, accessToken: 'mock-token' });
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
