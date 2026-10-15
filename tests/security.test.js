const request = require('supertest');
const app = require('../server');
const { sanitizeXSS } = require('../middleware/securityMiddleware');

// Mock User database lookup
jest.mock('../models/User', () => {
  return {
    findOne: jest.fn().mockResolvedValue(null)
  };
});

// Mock AuditLog Model
jest.mock('../models/AuditLog', () => ({
  create: jest.fn().mockResolvedValue(true)
}));

describe('Security Configuration and Sanitization Tests', () => {
  test('Helmet Security Headers - Verifying helmet headers present on root response', async () => {
    const res = await request(app).get('/');
    
    // Check for some common Helmet security headers
    expect(res.headers['x-dns-prefetch-control']).toBeDefined();
    expect(res.headers['x-frame-options']).toBeDefined();
    expect(res.headers['x-content-type-options']).toBeDefined();
  });

  test('CORS Headers - Should allow credentials for requests', async () => {
    const res = await request(app)
      .get('/')
      .set('Origin', 'http://localhost:3000');

    expect(res.headers['access-control-allow-credentials']).toEqual('true');
  });

  test('Custom XSS Sanitizer - Should filter malicious tags and escape quotes', () => {
    const maliciousInput = '<script>alert("hack")</script>';
    const cleanOutput = sanitizeXSS(maliciousInput);
    expect(cleanOutput).not.toContain('<script>');
    expect(cleanOutput).toEqual('&lt;script&gt;alert(&quot;hack&quot;)&lt;&#x2F;script&gt;');

    // Test deep object sanitization
    const nestedInput = {
      nested: {
        text: 'hello <img src=x onerror=alert(1)>',
      },
      list: ['safe', '<iframe src="malicious.html"></iframe>']
    };

    const cleanNested = sanitizeXSS(nestedInput);
    expect(cleanNested.nested.text).toEqual('hello &lt;img src=x onerror=alert(1)&gt;');
    expect(cleanNested.list[1]).toEqual('&lt;iframe src=&quot;malicious.html&quot;&gt;&lt;&#x2F;iframe&gt;');
  });

  test('Mongo Injection protection - express-mongo-sanitize middleware', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: { $gt: '' },
        password: 'password'
      });

    // Should return 401 Unauthorized or 400 bad request, not crash
    expect(res.statusCode).not.toEqual(500);
  });
});
