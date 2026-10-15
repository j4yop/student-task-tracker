const AuditLog = require('../models/AuditLog');

const auditLog = async (userId, action, details, req) => {
  try {
    const ipAddress = req ? req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress : 'system';
    const userAgent = req ? req.headers['user-agent'] : 'system';
    
    await AuditLog.create({
      user: userId || null,
      action,
      details,
      ipAddress,
      userAgent,
    });
  } catch (err) {
    console.error(`Audit log creation failed: ${err.message}`);
  }
};

const auditLoggerMiddleware = (req, res, next) => {
  // Capture response finish to inspect status code
  res.on('finish', () => {
    const isWrite = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method);
    const isAuthPath = req.originalUrl.includes('/api/auth');

    // Automatically audit successful non-auth resource updates
    if (isWrite && !isAuthPath && res.statusCode >= 200 && res.statusCode < 300) {
      const actionMap = {
        POST: 'CREATE',
        PUT: 'UPDATE',
        PATCH: 'UPDATE',
        DELETE: 'DELETE',
      };
      
      const parts = req.originalUrl.split('?')[0].split('/');
      const resource = parts[2] ? parts[2].toUpperCase().slice(0, -1) : 'OBJECT'; // e.g. /api/tasks -> TASK
      const action = `${actionMap[req.method]}_${resource}`;
      
      const details = {
        url: req.originalUrl,
        params: req.params,
        body: { ...req.body },
      };
      
      // Prevent logging sensitive parameters
      if (details.body.password) delete details.body.password;
      if (details.body.token) delete details.body.token;

      auditLog(req.user?._id, action, details, req);
    }
  });

  next();
};

module.exports = {
  auditLoggerMiddleware,
  auditLog,
};
