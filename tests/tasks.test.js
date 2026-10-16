const request = require('supertest');
const app = require('../server');

// Initialize global mock state arrays
global.mockTasks = [];
global.mockCategories = [];
global.mockReminders = [];

// Mock User Model
jest.mock('../models/User', () => {
  return {
    findById: jest.fn().mockImplementation((id) => {
      return {
        select: jest.fn().mockResolvedValue({
          _id: id,
          username: 'Amar Student',
          email: 'amar_test@tracker.com',
          role: 'student',
          preferences: { theme: 'dark', notifications: { email: true, browser: true } },
        }),
      };
    }),
  };
});

// Mock AuditLog Model
jest.mock('../models/AuditLog', () => ({
  create: jest.fn().mockResolvedValue(true)
}));

// Mock Category Model
jest.mock('../models/Category', () => {
  return {
    create: jest.fn().mockImplementation((catData) => {
      const newCat = { _id: 'cat_id_101', name: catData.name, color: catData.color, user: catData.user };
      global.mockCategories.push(newCat);
      return Promise.resolve(newCat);
    }),
    findOne: jest.fn().mockImplementation((query) => {
      const match = global.mockCategories.find(c => c._id === query._id);
      return Promise.resolve(match || null);
    }),
    find: jest.fn().mockImplementation(() => Promise.resolve(global.mockCategories)),
    deleteMany: jest.fn().mockImplementation(() => {
      global.mockCategories.length = 0;
      return Promise.resolve();
    }),
  };
});

// Mock Task Model
jest.mock('../models/Task', () => {
  return {
    create: jest.fn().mockImplementation((taskData) => {
      const newTask = {
        _id: `task_id_${Date.now()}_${Math.random()}`,
        title: taskData.title,
        description: taskData.description || '',
        category: taskData.category,
        dueDate: new Date(taskData.dueDate),
        priority: taskData.priority || 'medium',
        status: 'pending',
        isCompleted: false,
        user: taskData.user,
        remindMe: taskData.remindMe || false,
        reminderStatus: 'none',
        populate: jest.fn().mockReturnThis(),
        save: jest.fn().mockImplementation(function() {
          newTask.isCompleted = newTask.status === 'completed';
          return Promise.resolve(this);
        }),
      };
      global.mockTasks.push(newTask);
      return Promise.resolve(newTask);
    }),
    find: jest.fn().mockImplementation((query) => {
      return {
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockImplementation((num) => {
          return Promise.resolve([...global.mockTasks]);
        }),
      };
    }),
    findOne: jest.fn().mockImplementation((query) => {
      const match = global.mockTasks.find(t => t._id === query._id);
      if (match) {
        match.populate = jest.fn().mockReturnThis();
        match.save = jest.fn().mockImplementation(function() {
          match.isCompleted = match.status === 'completed';
          return Promise.resolve(this);
        });
      }
      return Promise.resolve(match || null);
    }),
    findById: jest.fn().mockImplementation((id) => {
      const match = global.mockTasks.find(t => t._id === id);
      return Promise.resolve(match || null);
    }),
    findByIdAndDelete: jest.fn().mockImplementation((id) => {
      const idx = global.mockTasks.findIndex(t => t._id === id);
      if (idx !== -1) global.mockTasks.splice(idx, 1);
      return Promise.resolve({ success: true });
    }),
    updateOne: jest.fn().mockImplementation((query, update) => {
      const match = global.mockTasks.find(t => t._id === query._id);
      if (match) {
        Object.assign(match, update);
      }
      return Promise.resolve({ nModified: 1 });
    }),
    updateMany: jest.fn().mockImplementation((query, update) => {
      global.mockTasks.forEach(t => {
        if (query._id && query._id.$in && query._id.$in.includes(t._id)) {
          Object.assign(t, update);
        }
      });
      return Promise.resolve({ nModified: global.mockTasks.length });
    }),
    countDocuments: jest.fn().mockResolvedValue(0),
    deleteMany: jest.fn().mockImplementation(() => {
      global.mockTasks.length = 0;
      return Promise.resolve({ deletedCount: 0 });
    }),
  };
});

// Mock Reminder Model
jest.mock('../models/Reminder', () => {
  return {
    create: jest.fn().mockImplementation((remData) => {
      const newRem = { _id: 'rem_101', task: remData.task, user: remData.user, scheduledAt: remData.scheduledAt, status: 'pending' };
      global.mockReminders.push(newRem);
      return Promise.resolve(newRem);
    }),
    deleteMany: jest.fn().mockImplementation(() => {
      global.mockReminders.length = 0;
      return Promise.resolve();
    }),
  };
});

describe('Task Repository API Tests', () => {
  let token;
  let user = { _id: 'user_id_999', role: 'student' };
  let category = { _id: 'cat_id_101', name: 'MATH 101' };

  beforeAll(async () => {
    const jwt = require('jsonwebtoken');
    token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'student_tracker_secure_access_token_secret_key_2026');
    
    const Category = require('../models/Category');
    await Category.create({ name: 'MATH 101', color: '#ef4444', user: user._id });
  });

  beforeEach(async () => {
    const Task = require('../models/Task');
    const Reminder = require('../models/Reminder');
    await Task.deleteMany({});
    await Reminder.deleteMany({});
  });

  test('POST /api/tasks - Create task with reminder scheduled', async () => {
    const taskData = {
      title: 'Study for Midterm',
      category: category._id,
      dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      priority: 'high',
      remindMe: true,
      description: 'Review Chapter 1 to 4',
    };

    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send(taskData);

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toEqual(taskData.title);
  });

  test('GET /api/tasks - Retrieve task repository list', async () => {
    const Task = require('../models/Task');
    await Task.create({ title: 'Read Book A', category: category._id, dueDate: new Date(), priority: 'low', user: user._id });

    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test('PATCH /api/tasks/:id/complete - Toggle task complete status', async () => {
    const Task = require('../models/Task');
    const task = await Task.create({
      title: 'Unfinished Task',
      category: category._id,
      dueDate: new Date(),
      user: user._id,
    });

    const res = await request(app)
      .patch(`/api/tasks/${task._id}/complete`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.status).toEqual('completed');
    expect(res.body.data.isCompleted).toBe(true);
  });
});
