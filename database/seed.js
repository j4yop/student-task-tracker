const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Category = require('../models/Category');
const Task = require('../models/Task');
const AuditLog = require('../models/AuditLog');
const Notification = require('../models/Notification');
const Reminder = require('../models/Reminder');

dotenv.config();

const seedDatabase = async () => {
  try {
    const connString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/student_tracker';
    console.log(`Connecting to MongoDB at ${connString} for seeding...`);
    await mongoose.connect(connString);

    // 1. Wipe current collections
    console.log('Clearing database collections...');
    await User.deleteMany({});
    await Category.deleteMany({});
    await Task.deleteMany({});
    await AuditLog.deleteMany({});
    await Notification.deleteMany({});
    await Reminder.deleteMany({});

    // 2. Seed Default Global Categories
    console.log('Seeding default categories...');
    const categories = await Category.insertMany([
      { name: 'Assignments', color: '#06b6d4', user: null },
      { name: 'Exams', color: '#ef4444', user: null },
      { name: 'Projects', color: '#8b5cf6', user: null },
      { name: 'Personal', color: '#10b981', user: null },
    ]);

    const catMap = {};
    categories.forEach(c => {
      catMap[c.name] = c._id;
    });

    // 3. Seed Users (Admin + Student)
    console.log('Seeding user profiles...');
    
    // Admin
    const admin = new User({
      username: 'Amar Admin',
      email: 'admin@tracker.com',
      password: 'adminpassword',
      role: 'admin',
      preferences: { theme: 'dark', notifications: { email: true, browser: true } },
    });
    await admin.save();

    // Student
    const student = new User({
      username: 'Amar Student',
      email: 'student@tracker.com',
      password: 'studentpassword',
      role: 'student',
      preferences: { theme: 'dark', notifications: { email: true, browser: true } },
    });
    await student.save();

    console.log(`Users seeded: Admin (${admin.email}), Student (${student.email})`);

    // 4. Seed Tasks for Student
    console.log('Seeding tasks...');
    const now = new Date();
    
    const tasksData = [
      {
        title: 'Finish Calculus III Problem Set #4',
        course: 'MATH 301',
        description: 'Complete problem sets from sections 14.1 through 14.4. Detail integration bounds.',
        category: catMap['Assignments'],
        dueDate: new Date(now.getTime() + 2 * 60 * 60 * 1000), // Today 10:00 AM
        priority: 'high',
        status: 'pending',
        remindMe: true,
        user: student._id,
      },
      {
        title: 'Review Biology Lecture Notes - Cellular Respiration',
        course: 'BIO 102',
        description: 'Review slide decks on mitochondria Krebs cycle and electron transport chain.',
        category: catMap['Assignments'],
        dueDate: new Date(now.getTime() + 5 * 60 * 60 * 1000), // Today 1:30 PM
        priority: 'medium',
        status: 'pending',
        remindMe: false,
        user: student._id,
      },
      {
        title: 'Group Meeting: History Term Project',
        course: 'HIST 205',
        description: 'Sync with group at library to review draft presentation and assign final slides.',
        category: catMap['Projects'],
        dueDate: new Date(now.getTime() + 8 * 60 * 60 * 1000), // Today 4:00 PM
        priority: 'high',
        status: 'pending',
        remindMe: true,
        user: student._id,
      },
      {
        title: 'Submit Physics Lab Report (Draft)',
        course: 'PHYS 201',
        description: 'Analysis of wave interference patterns. Graphs must be exported from MatLab.',
        category: catMap['Assignments'],
        dueDate: new Date(now.getTime() + 15 * 60 * 60 * 1000), // Tonight 11:59 PM
        priority: 'low',
        status: 'pending',
        remindMe: false,
        user: student._id,
      },
      {
        title: 'Purchase Art History Textbook',
        course: 'ART 110',
        description: 'Find digital copy or rent hard copy from campus bookstore.',
        category: catMap['Personal'],
        dueDate: new Date(now.getTime() + 24 * 60 * 60 * 1000),
        priority: 'low',
        status: 'completed',
        remindMe: false,
        user: student._id,
      },
      {
        title: 'Calculus III Midterm Exam',
        course: 'MATH 301',
        description: 'Chapters 11 through 13. Exam hall B12. Bring calculator and student ID card.',
        category: catMap['Exams'],
        dueDate: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Due Tomorrow 9:00 AM
        priority: 'high',
        status: 'pending',
        remindMe: true,
        user: student._id,
      },
      {
        title: 'History Term Paper: Phase 1 Submission',
        course: 'HIST 205',
        description: 'Submit initial bibliography and thesis statement draft on Industrial Revolution impacts.',
        category: catMap['Assignments'],
        dueDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // Due Friday
        priority: 'high',
        status: 'pending',
        remindMe: true,
        user: student._id,
      },
      {
        title: 'Physics Lab Final Presentation',
        course: 'PHYS 201',
        description: 'Final deck submission for semester group lab findings. Prepare 10-minute slide walkthrough.',
        category: catMap['Projects'],
        dueDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000), // Due Monday
        priority: 'medium',
        status: 'pending',
        remindMe: true,
        user: student._id,
      },
      {
        title: 'Art History Weekly Quiz',
        course: 'ART 110',
        description: 'Short 15-question quiz covering Renaissance sculpture and fresco techniques.',
        category: catMap['Exams'],
        dueDate: new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000), // Due Tuesday
        priority: 'low',
        status: 'pending',
        remindMe: false,
        user: student._id,
      },
      {
        title: 'Advanced Macroeconomics Term Paper',
        course: 'ECON 302',
        description: 'Must include literature review of at least 15 sources and focus on post-2008 fiscal policies.',
        category: catMap['Assignments'],
        dueDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // Overdue
        priority: 'high',
        status: 'pending',
        remindMe: true,
        user: student._id,
      },
      {
        title: 'CS302 Final Project: React Dashboard',
        course: 'CS 302',
        description: 'Implement full CRUD functionality and integrate with a mock API. Focus on responsive design.',
        category: catMap['Projects'],
        dueDate: new Date(now.getTime() + 18 * 24 * 60 * 60 * 1000),
        priority: 'high',
        status: 'pending',
        remindMe: true,
        user: student._id,
      },
      {
        title: 'Midterm: Modern European History',
        course: 'HIST 205',
        description: 'Review chapters 5 through 12. Focus on the Industrial Revolution impact.',
        category: catMap['Exams'],
        dueDate: new Date(now.getTime() + 12 * 24 * 60 * 60 * 1000),
        priority: 'medium',
        status: 'pending',
        remindMe: false,
        user: student._id,
      },
      {
        title: 'Register for Spring Semester',
        course: 'Personal',
        description: 'Check prerequisites for Advanced Algorithms and UI Design courses.',
        category: catMap['Personal'],
        dueDate: new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000),
        priority: 'low',
        status: 'pending',
        remindMe: false,
        user: student._id,
      },
      {
        title: 'CS301: Final Project Research & Architecture Proposal',
        course: 'CS301 Systems',
        description: 'Conduct a comprehensive review of distributed systems architectures suitable for high-availability cloud applications. The proposal must include a 5-page PDF detailing:\n\n1. Comparative analysis of microservices vs monolithic.\n2. Proposed technology stack (Node.js, PostgreSQL, Redis).\n3. Security protocols (JWT, OAuth2).\n4. Scalability strategy.\n\nEnsure all references are in APA format.',
        category: catMap['Projects'],
        dueDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
        priority: 'high',
        status: 'pending',
        remindMe: true,
        user: student._id,
      },
      {
        title: 'Advanced Thermodynamics Research Paper',
        course: 'MECH 210',
        description: 'Write a 15-page research paper on the application of the second law of thermodynamics in industrial cooling systems. Must include at least 10 peer-reviewed sources and 3 case studies.',
        category: catMap['Assignments'],
        dueDate: new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000),
        priority: 'high',
        status: 'pending',
        remindMe: true,
        user: student._id,
      },
      {
        title: 'Mobile App Dev Prototype',
        course: 'CS 405',
        description: 'Build initial clickable React Native or Flutter prototype with navigation tabs and mock authentication.',
        category: catMap['Projects'],
        dueDate: new Date(now.getTime() + 24 * 60 * 60 * 1000),
        priority: 'high',
        status: 'pending',
        remindMe: true,
        user: student._id,
      },
      {
        title: 'Psychology Weekly Quiz',
        course: 'PSYC 101',
        description: 'Online quiz on cognitive biases and behavioral psychology. 20-minute limit.',
        category: catMap['Exams'],
        dueDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
        priority: 'medium',
        status: 'pending',
        remindMe: false,
        user: student._id,
      },
      {
        title: 'Gym Membership Renewal',
        course: 'Personal',
        description: 'Renew university recreation center fitness pass for the winter semester.',
        category: catMap['Personal'],
        dueDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
        priority: 'low',
        status: 'pending',
        remindMe: false,
        user: student._id,
      },
    ];

    const seededTasks = await Task.insertMany(tasksData);
    console.log(`Successfully seeded ${seededTasks.length} tasks.`);

    // 5. Seed Reminders for scheduled tasks
    console.log('Seeding reminders...');
    for (const t of seededTasks) {
      if (t.remindMe && t.status === 'pending') {
        const triggerTime = new Date(t.dueDate.getTime() - 60 * 60 * 1000);
        await Reminder.create({
          task: t._id,
          user: student._id,
          scheduledAt: triggerTime > now ? triggerTime : new Date(now.getTime() + 10 * 1000),
          status: 'pending',
        });
      }
    }

    // 6. Seed Notification History
    console.log('Seeding notification logs...');
    await Notification.insertMany([
      {
        user: student._id,
        message: 'Welcome to Student Task Tracker! Explore the dashboard to manage your courses.',
        type: 'browser',
        status: 'read',
        sentAt: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      },
      {
        user: student._id,
        message: 'Task Reminder: "Purchase Art History Textbook" has been completed.',
        type: 'browser',
        status: 'read',
        sentAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      },
    ]);

    // 7. Seed Audit Logs
    console.log('Seeding audit logs...');
    await AuditLog.insertMany([
      {
        user: student._id,
        action: 'USER_REGISTER',
        details: { email: student.email },
        ipAddress: '127.0.0.1',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      },
      {
        user: student._id,
        action: 'LOGIN_SUCCESS',
        details: { email: student.email },
        ipAddress: '127.0.0.1',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        createdAt: new Date(now.getTime() - 12 * 60 * 60 * 1000),
      },
      {
        user: admin._id,
        action: 'LOGIN_SUCCESS',
        details: { email: admin.email },
        ipAddress: '127.0.0.1',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        createdAt: new Date(now.getTime() - 11 * 60 * 60 * 1000),
      },
    ]);

    console.log('Database seeding successfully finished!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`Database seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
