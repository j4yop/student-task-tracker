const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const docx = require('docx');

const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle } = docx;

// Ensure output directory exists
const docsDir = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

// ----------------------------------------------------
// PDF REPORT BUILDER
// ----------------------------------------------------
function buildPdfReport() {
  const pdfPath = path.join(docsDir, 'project_report.pdf');
  console.log(`Compiling Project Report PDF -> ${pdfPath}`);
  
  const doc = new PDFDocument({ margin: 50 });
  const stream = fs.createWriteStream(pdfPath);
  doc.pipe(stream);

  // Helper styles
  const drawLine = () => {
    doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor('#cbd5e1').lineWidth(1).stroke().moveDown(1);
  };

  const drawHeader = (title) => {
    doc.font('Helvetica-Bold').fontSize(18).fillColor('#0f172a').text(title).moveDown(0.5);
    drawLine();
  };

  // 1. Cover Page
  doc.rect(0, 0, 612, 792).fill('#0f172a');
  
  doc.fillColor('#06b6d4').font('Helvetica-Bold').fontSize(32).text('Student Task &\nAssignment Tracker', 50, 220, { align: 'left' });
  doc.fillColor('#94a3b8').font('Helvetica-Bold').fontSize(16).text('Professional Software Engineering Project Report', 50, 310);
  
  doc.rect(50, 340, 120, 4).fill('#8b5cf6');
  
  doc.fillColor('#f8fafc').font('Helvetica').fontSize(11).text('Author: Antigravity AI Architect', 50, 550);
  doc.text('Date: June 30, 2026', 50, 570);
  doc.text('Version: 1.0.0 (Production-Ready)', 50, 590);
  doc.text('Architecture: MVC Layered + Vanilla SPA', 50, 610);
  
  doc.addPage();

  // 2. Abstract
  drawHeader('1. Abstract');
  doc.font('Helvetica').fontSize(11).fillColor('#334155').text(
    'This report presents the system architecture, design specifications, and implementation guidelines for the Student Task & Assignment Tracker. The application is designed to address the scheduling, prioritizing, and reminder management challenges faced by students in managing multi-course workloads. Built using a modern, lightweight tech stack—HTML5, CSS3, Vanilla ES6 JavaScript on the frontend, and Node.js with Express and MongoDB on the backend—this project implements 100% functional modules without third-party frameworks. Key architectural highlights include client-side hash routing, reactive state manager, secure JWT + cookie-based session rotations, schema-validated MongoDB aggregates, background reminder scheduler timers, and deep-level input sanitizations preventing NoSQL injection and Cross-Site Scripting (XSS).',
    { align: 'justify', paragraphGap: 10 }
  ).moveDown(1.5);

  // 3. Problem Statement & Objectives
  drawHeader('2. Objectives & Scope');
  doc.font('Helvetica-Bold').fontSize(13).text('2.1 Problem Statement').moveDown(0.3);
  doc.font('Helvetica').fontSize(11).text(
    'Modern academic workloads demand concurrent tracking of assignments, quizzes, group projects, and personal deadlines. Relying on paper logs or generic calendars leads to fragmented priorities and missed deadlines. Existing options are often overly complex or require expensive subscriptions. This project creates a free, responsive, student-centric tracker that automates urgencies and triggers reminders before deadlines.',
    { align: 'justify', paragraphGap: 10 }
  ).moveDown(1);

  doc.font('Helvetica-Bold').fontSize(13).text('2.2 Goals & Key Accomplishments').moveDown(0.3);
  doc.font('Helvetica').fontSize(11).text(
    '- Task Urgency Priority Matrix: Color-coded low, medium, and high categorization.\n' +
    '- Automated Background Reminder Scheduler: 30-second interval checking of scheduled alerts.\n' +
    '- Comprehensive Audit Trail: Capturing security actions and database modification events automatically.\n' +
    '- User Administration Portal: Grid viewing of system accounts, role toggles, and system-wide audits.\n' +
    '- Dynamic Calendar View: Monthly calendar grid mapping tasks to cell items with quick-add capabilities.',
    { paragraphGap: 6 }
  ).moveDown(1.5);

  // 4. Technology Stack
  drawHeader('3. Technology Stack');
  doc.font('Helvetica').fontSize(11).text(
    'The project strictly follows the requested tech boundaries, avoiding bulky SPA frameworks:\n\n' +
    '- Frontend: Pure HTML5, Vanilla CSS3 (Slate theme tokens), Vanilla JS (Hash Router, Publisher State).\n' +
    '- Backend: Node.js (v20+ Runtime Engine), Express.js MVC routes mapping.\n' +
    '- Database: MongoDB Community Server, Mongoose ODM (Schemas, custom validators, composite indexes).\n' +
    '- Security: Helmet HTTP wrappers, CORS controls, Rate Limiting, Mongo Sanitize, XSS sanitizers.',
    { paragraphGap: 6 }
  ).moveDown(1.5);

  // 5. System Architecture
  drawHeader('4. System Architecture');
  doc.font('Helvetica').fontSize(11).text(
    'The application utilizes a classic Model-View-Controller (MVC) architecture on the backend, integrated with a reactive Single-Page Application (SPA) on the frontend. The system is split into three layers:\n\n' +
    '1. Presentation Layer (Client): Handles interface layouts, UI event actions, form checks, and dynamic HTML injection container.\n' +
    '2. Logical Application Layer (Express Controllers): Validates queries, runs user authorization checking, translates database schema results.\n' +
    '3. Data Layer (MongoDB/Mongoose): Persists schemas (User, Task, Category, Notification, Reminder, AuditLog) and executes high-performance aggregation pipelines for dashboard metrics.',
    { align: 'justify', paragraphGap: 8 }
  ).moveDown(1.5);

  // 6. Test execution details
  drawHeader('5. Testing Methodology & Verification');
  doc.font('Helvetica').fontSize(11).text(
    'Verification was performed inside the codebase using Jest and Supertest. All tests execute on a dedicated test database (student_tracker_test) to avoid polluting active data. The test suite covers:\n\n' +
    '- Authentication testing: Register validations, JWT login checks, expired login tokens block, security roles check.\n' +
    '- Tasks testing: Create tasks, sync background reminders, filter queries, toggle statuses, bulk complete.\n' +
    '- Security testing: Helmet header sniff, custom XSS nested HTML script escapes, Mongo query sanitization checks.',
    { paragraphGap: 6 }
  ).moveDown(1.5);

  // 7. Conclusion
  drawHeader('6. Challenges & Conclusion');
  doc.font('Helvetica').fontSize(11).text(
    'The Student Task & Assignment Tracker demonstrates that a highly premium, secure, and production-ready application can be engineered efficiently using vanilla technologies. Bypassing massive frontend frameworks significantly reduced load times and simplified routing, while custom middleware modules successfully established robust security protocols (XSS/injection protection) comparable to framework defaults. This system provides a stable foundation for student performance tracking.',
    { align: 'justify', paragraphGap: 10 }
  );

  doc.end();
  console.log('PDF Project Report compiled successfully.');
}

// ----------------------------------------------------
// WORD (DOCX) REPORT BUILDER
// ----------------------------------------------------
function buildDocxReport() {
  const docxPath = path.join(docsDir, 'project_report.docx');
  console.log(`Compiling Project Report DOCX -> ${docxPath}`);

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title Page
          new Paragraph({
            text: 'Student Task & Assignment Tracker',
            heading: HeadingLevel.TITLE,
            spacing: { before: 1000, after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Software Engineering Project Report - 100% Production Ready',
                bold: true,
                color: '64748b',
                size: 26,
              })
            ],
            spacing: { after: 1200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Author: Antigravity AI Architect\n', size: 22 }),
              new TextRun({ text: 'Date: June 30, 2026\n', size: 22 }),
              new TextRun({ text: 'Version: 1.0.0\n', size: 22 }),
              new TextRun({ text: 'Architecture: Layered MVC + Vanilla SPA', size: 22 }),
            ],
            spacing: { before: 2000 },
          }),

          // Page Break
          new Paragraph({ text: '', pageBreakBefore: true }),

          // Section 1
          new Paragraph({ text: '1. Abstract', heading: HeadingLevel.HEADING_1, spacing: { before: 200, after: 120 } }),
          new Paragraph({
            text: 'This report presents the system architecture, design specifications, and implementation guidelines for the Student Task & Assignment Tracker. The application is designed to address the scheduling, prioritizing, and reminder management challenges faced by students in managing multi-course workloads. Built using a modern, lightweight tech stack—HTML5, CSS3, Vanilla ES6 JavaScript on the frontend, and Node.js with Express and MongoDB on the backend—this project implements 100% functional modules without third-party frameworks. Key architectural highlights include client-side hash routing, reactive state manager, secure JWT + cookie-based session rotations, schema-validated MongoDB aggregates, background reminder scheduler timers, and deep-level input sanitizations preventing NoSQL injection and Cross-Site Scripting (XSS).',
            spacing: { after: 200 },
          }),

          // Section 2
          new Paragraph({ text: '2. Objectives & Scope', heading: HeadingLevel.HEADING_1, spacing: { before: 200, after: 120 } }),
          new Paragraph({ text: '2.1 Problem Statement', heading: HeadingLevel.HEADING_2, spacing: { before: 120, after: 80 } }),
          new Paragraph({
            text: 'Modern academic workloads demand concurrent tracking of assignments, quizzes, group projects, and personal deadlines. Relying on paper logs or generic calendars leads to fragmented priorities and missed deadlines. Existing options are often overly complex or require expensive subscriptions. This project creates a free, responsive, student-centric tracker that automates urgencies and triggers reminders before deadlines.',
            spacing: { after: 120 },
          }),
          new Paragraph({ text: '2.2 System Features & Scope', heading: HeadingLevel.HEADING_2, spacing: { before: 120, after: 80 } }),
          new Paragraph({
            text: 'The tracker implements a rich set of features: customizable course categories with color-coded DOT pills, due date alerts with background timer checks, bulk updates (category transfer, delete, mark completed), monthly calendar grid mapping, profile security changes, and student role administration panels.',
            spacing: { after: 200 },
          }),

          // Section 3
          new Paragraph({ text: '3. Technology Stack', heading: HeadingLevel.HEADING_1, spacing: { before: 200, after: 120 } }),
          new Paragraph({
            text: 'Bypassing bulky frontend libraries, the system utilizes standard Web APIs:\n\n' +
            '• Core Frontend: HTML5, Vanilla CSS3 (Slate theme tokens), Vanilla JS (Hash Router, State Manager).\n' +
            '• Core Backend: Node.js, Express.js MVC controllers.\n' +
            '• Database Store: MongoDB Community Server, Mongoose ODM (validators, compound indexes, pipeline aggregates).\n' +
            '• Security Middleware: Helmet HTTP configurations, CORS parameters, express-rate-limit, express-mongo-sanitize, recursive custom XSS clean parser.',
            spacing: { after: 200 },
          }),

          // Section 4
          new Paragraph({ text: '4. System Architecture', heading: HeadingLevel.HEADING_1, spacing: { before: 200, after: 120 } }),
          new Paragraph({
            text: 'The application employs a Model-View-Controller (MVC) server layout mapping to a Single-Page Application (SPA) state flow. The presentation, application logic, and database persistence layer are cleanly decoupled to allow seamless database swapping (Phase 1 mock localStorage to Phase 2 live Mongoose endpoints) without requiring structural frontend layout adjustments.',
            spacing: { after: 200 },
          }),

          // Section 5
          new Paragraph({ text: '5. Testing & Verification', heading: HeadingLevel.HEADING_1, spacing: { before: 200, after: 120 } }),
          new Paragraph({
            text: 'Testing is coordinated using Jest and Supertest. Test coverages encompass user registers, invalid signups block, JWT credential checks, role protections (student restricted from admin views), task due date changes, bulk task operations, auto-reminders triggering, Helmet headers verification, and custom recursive tag escaping checks.',
            spacing: { after: 200 },
          }),

          // Section 6
          new Paragraph({ text: '6. Conclusion', heading: HeadingLevel.HEADING_1, spacing: { before: 200, after: 120 } }),
          new Paragraph({
            text: 'In conclusion, the project successfully implements the entire system requirements specified in the architecture. Bypassing frameworks demonstrated that high-performance, responsive, and secure dashboards can be engineered utilizing standard native APIs, providing students with a fast and reliable academic tracking client.',
            spacing: { after: 200 },
          }),
        ],
      },
    ],
  });

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(docxPath, buffer);
    console.log('DOCX Project Report compiled successfully.');
  });
}

// Execute builders
buildPdfReport();
buildDocxReport();
