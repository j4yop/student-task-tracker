const request = require('supertest');
const app = require('../server');

// Mock User Model
const mockUsers = [];
jest.mock('../models/User', () => {
  return {
    create: jest.fn().mockImplementation((userData) => {
      if (!userData.username || !userData.email || !userData.password) {
        const error = new Error('ValidationError: Username, email, password required');
        error.name = 'ValidationError';
        return Promise.reject(error);
      }
      const newUser = {
        _id: 'mock_user_id_123',
        username: userData.username,
        email: userData.email,
        password: userData.password,
        role: userData.role || 'student',
        preferences: { theme: 'dark', notifications: { email: true, browser: true } },
        refreshTokens: [],
        save: jest.fn().mockResolvedValue(true),
      };
      mockUsers.push(newUser);
      return Promise.resolve(newUser);
    }),
    findOne: jest.fn().mockImplementation((query) => {
      const user = mockUsers.find(u => u.email === query.email || u.refreshTokens.includes(query.refreshToken));
      if (user) {
        user.matchPassword = jest.fn().mockImplementation(async (pwd) => {
          return pwd === 'securepassword123' || pwd === 'studentpassword';
        });
        user.save = jest.fn().mockResolvedValue(true);
      }
      return Promise.resolve(user || null);
    }),
    findById: jest.fn().mockImplementation((id) => {
      const user = mockUsers.find(u => u._id === id || u.id === id);
      const result = {
        select: jest.fn().mockResolvedValue(user || null),
        then: (resolve, reject) => Promise.resolve(user || null).then(resolve, reject),
        catch: (reject) => Promise.resolve(user || null).catch(reject),
      };
      return result;
    }),
    updateOne: jest.fn().mockResolvedValue({ nModified: 1 }),
    deleteMany: jest.fn().mockImplementation(() => {
      mockUsers.length = 0;
      return Promise.resolve();
    }),
  };
});

// Mock AuditLog Model
jest.mock('../models/AuditLog', () => {
  const logs = [];
  return {
    create: jest.fn().mockImplementation((logData) => {
      logs.push(logData);
      return Promise.resolve(logData);
    }),
    find: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockImplementation(() => Promise.resolve(logs)),
    countDocuments: jest.fn().mockResolvedValue(0),
    deleteMany: jest.fn().mockImplementation(() => {
      logs.length = 0;
      return Promise.resolve();
    }),
  };
});

describe('Authentication API Endpoint Tests', () => {
  beforeEach(async () => {
    const User = require('../models/User');
    const AuditLog = require('../models/AuditLog');
    await User.deleteMany({});
    await AuditLog.deleteMany({});
  });

  const testUser = {
    username: 'Test Student',
    email: 'student_test@tracker.com',
    password: 'securepassword123',
  };

  test('POST /api/auth/register - Should register a new user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body.user).toHaveProperty('email', testUser.email);
    expect(res.body.user).toHaveProperty('role', 'student');
  });

  test('POST /api/auth/register - Should fail due to validation errors (missing fields)', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'incomplete@tracker.com' });

    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
  });

  test('POST /api/auth/login - Should login registered user and return cookie tokens', async () => {
    await request(app).post('/api/auth/register').send(testUser);

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty('accessToken');
  });

  test('POST /api/auth/login - Should fail login with wrong password', async () => {
    await request(app).post('/api/auth/register').send(testUser);

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: 'wrongpassword',
      });

    expect(res.statusCode).toEqual(401);
    expect(res.body.success).toBe(false);
  });

  test('GET /api/auth/profile - Should block unauthenticated request', async () => {
    const res = await request(app).get('/api/auth/profile');
    expect(res.statusCode).toEqual(401);
  });

  test('GET /api/auth/profile - Should return profile details for authenticated user', async () => {
    const regRes = await request(app).post('/api/auth/register').send(testUser);
    const token = regRes.body.accessToken;

    const res = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toEqual(testUser.email);
  });
});
