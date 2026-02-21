<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

# [WithCare] 🎯

## Basic Details

### Team Name: [CodeVita]

### Team Members
- Member 1: [Theja B Nair] - [LBS Institute of Technology for Women]
- Member 2: [Paarvathy VS] - [LBS Institute of Technology for Women]

### Hosted Project Link
[mention your project hosted link here]

### Project Description
WithCare is a smart care monitoring platform that connects families and caretakers through real-time task tracking, AI-powered photo and CCTV analysis, and automated alerts — ensuring every patient receives safe, transparent, and accountable care.
### The Problem statement
[Millions of elderly, disabled, and vulnerable individuals rely on caretakers for their daily needs, yet families often have no reliable way to verify the quality of care being provided. Traditional care monitoring lacks transparency, leaving families anxious and patients vulnerable to neglect or abuse. There is no accountable system that connects families and caretakers, tracks task completion, or flags concerning behaviour in real time. WithCare addresses this gap by providing a smart, AI-powered monitoring platform that ensures every patient receives safe, consistent, and dignified care — giving families peace of mind and caretakers a transparent framework to demonstrate their reliability.]

### The Solution
[WithCare tackles the problem through a combination of smart technology and structured accountability:
Real-Time Task Monitoring — Caretakers log daily care tasks such as medication, meals, and therapy sessions, with automated alerts triggered when tasks are missed beyond a 5-minute grace period, keeping families instantly informed.
Photo Proof of Care — Caretakers upload photos as visual evidence of completed tasks, which families can view directly from their dashboard, replacing assumptions with verified proof.
AI Photo Analyser — Using Claude's vision AI, uploaded patient photos are analysed for wellbeing indicators, activity, environment safety, and alert level — giving families an intelligent second opinion on their loved one's condition.
CCTV Analyser — Live or recorded footage is processed by AI to detect signs of neglect, abuse, or unusual behaviour, acting as a passive safety net that monitors care quality around the clock.
Caretaker Reliability Scoring — A dynamic scoring system tracks missed tasks and performance over time, creating accountability and helping families make informed decisions about their caretaker.
Family & Caretaker Dashboards — Two separate role-based portals ensure caretakers stay organised and families stay informed, with a shared alert feed that keeps both sides transparently connected.]

---

## Technical Details

### Technologies/Components Used

**For Software:**
- Languages used: [JavaScript, HTML, CSS]
- Frameworks used: [NILL]
- Libraries used: [NILL]
- Tools used: [VS Code, Claude, ChatGPT]

**For Hardware:**
- Main components: [List main components]
- Specifications: [Technical specifications]
- Tools required: [List tools needed]

---

## Features

List the key features of your project:
- Feature 1: [ Transparency & Accountability

Real-time task tracking with photo proof, a shared alert feed, and a reliability scoring system ensure every care activity is transparent and accountable.]
- Feature 2: [AI-Powered Safety

AI-powered photo and CCTV analysers detect patient wellbeing, neglect, and abuse in real time, while smart missed-task detection sends automated alerts to families when care schedules are not followed.]
- Feature 3: [White Label & SaaS Ready

A fully brandable, SaaS-ready platform with modular architecture that allows care agencies, nursing homes, and healthcare providers to deploy WithCare under their own brand and scale across multiple clients.]
- Feature 4: [ Business Credibility

Reliability scoring, audit-ready care logs, and enterprise-grade role management give care agencies a competitive edge, legal protection, and the scalability to serve organisations of any size.]

---

## Implementation

### For Software:

#### Installation
```bash
[Installation commands - e.g., npm install, pip install -r requirements.txt]
```

#### Run
```bash
[Run commands - e.g., npm start, python app.py]
```

### For Hardware:

#### Components Required
[List all components needed with specifications]

#### Circuit Setup
[Explain how to set up the circuit]

---

## Project Documentation

### For Software:

#### Screenshots (Add at least 3)

![<img width="1888" height="854" alt="Screenshot 2026-02-21 080239" src="https://github.com/user-attachments/assets/0b0781a3-a7c5-40a4-b9c2-d8dff9f56c3b" />
]
*The WithCare landing page features a clean two-panel layout where the left side displays the branding and core feature highlights, while the right side contains a tabbed Login and Register form — with role selection that routes users to either the Family or Caretaker dashboard upon authentication.*

![<img width="1897" height="1057" alt="Screenshot 2026-02-21 075833" src="https://github.com/user-attachments/assets/77cda9e6-e5be-4a7e-996c-50d41348d6f1" />
]
*The Family Dashboard gives families a real-time overview of their loved one's care, displaying task status, missed alerts, caretaker rating, photo proof, and a live care alert feed showing completed and missed tasks with timestamps.*

![<img width="1901" height="1051" alt="Screenshot 2026-02-21 092320" src="https://github.com/user-attachments/assets/8dffd90e-3369-4fd6-bd66-b8c068ca0688" />
](Add screenshot 3 here with proper name)
*The Caretaker Dashboard provides caretakers with a daily task checklist to mark care activities as completed, a photo upload section for proof of care, and real-time stats showing tasks done, progress percentage, photos uploaded, and active alerts.*

#### Diagrams

**Application Workflow:**


![![WhatsApp Image 2026-02-21 at 9 25 12 AM](https://github.com/user-attachments/assets/3dc6131f-e9ec-4fc8-84fc-7d0d6f409842)
](docs/architecture.png)

*Workflow Caption:
Users register and select a role — Family or Caretaker — and are routed to their respective dashboards. The caretaker logs daily tasks, marks completions, and uploads photo proof, while the smart alert engine runs in the background every 60 seconds detecting missed tasks and instantly pushing alerts to the shared feed. The family dashboard auto-refreshes every 10 seconds to display live task status, missed alerts, caretaker reliability score, and photo proof uploaded by the caretaker. When a photo is analysed, it is sent through a Cloudflare Worker to the Claude Vision API, which returns a structured wellbeing report visible on the dashboard. Repeated missed tasks trigger compliance warnings and automatically update the caretaker's reliability score, which remains visible to both the family and the agency — creating a fully transparent, accountable, and AI-powered care monitoring loop.*

---









### For Mobile Apps:

#### App Flow Diagram

![App Flow](docs/app-flow.png)
*Explain the user flow through your application*

#### Installation Guide

**For Android (APK):**
1.Download or clone the project from the GitHub repository
2.Make sure all files are in the same folder:

index.html, style.css, script.js, auth.js
caretaker.html, caretaker.css, caretaker.js
family.html, family.css, family.js
smart-alerts.js, ai-analyzer.js


3.Open index.html in any modern browser (Chrome recommended)
4.Register an account and select your role — Family or Caretaker
5.You will be automatically redirected to your dashboard

**For iOS (IPA) - TestFlight:**
1. Open Safari on your iPhone or iPad
2. Go to your GitHub Pages link:
https://your-username.github.io/CodeVita
3. Tap the Share button at the bottom of Safari (the box with an arrow)
4. Scroll down and tap "Add to Home Screen"
5.Give it a name — WithCare — and tap Add
6.The app will now appear on your home screen like a native app
7.Tap it to open and register your account







## Project Demo

### Video
[Add your demo video link here - YouTube, Google Drive, etc.]

*Explain what the video demonstrates - key features, user flow, technical highlights*

### Additional Demos
[Add any extra demo materials/links - Live site, APK download, online demo, etc.]

---

## AI Tools Used (Optional - For Transparency Bonus)

If you used AI tools during development, document them here for transparency:

**Tool Used:** [e.g., GitHub Copilot, v0.dev, Cursor, ChatGPT, Claude]

**Purpose:** [What you used it for]
- Example: "Generated boilerplate React components"
- Example: "Debugging assistance for async functions"
- Example: "Code review and optimization suggestions"

**Key Prompts Used:**
- "Create a REST API endpoint for user authentication"
- "Debug this async function that's causing race conditions"
- "Optimize this database query for better performance"

**Percentage of AI-generated code:** [Approximately X%]

**Human Contributions:**
- Architecture design and planning
- Custom business logic implementation
- Integration and testing
- UI/UX design decisions

*Note: Proper documentation of AI usage demonstrates transparency and earns bonus points in evaluation!*

---

## Team Contributions

- [Name 1]: [Specific contributions - e.g., Frontend development, API integration, etc.]
- [Name 2]: [Specific contributions - e.g., Backend development, Database design, etc.]
- [Name 3]: [Specific contributions - e.g., UI/UX design, Testing, Documentation, etc.]

---

## License

This project is licensed under the [LICENSE_NAME] License - see the [LICENSE](LICENSE) file for details.

**Common License Options:**
- MIT License (Permissive, widely used)
- Apache 2.0 (Permissive with patent grant)
- GPL v3 (Copyleft, requires derivative works to be open source)

---

Made with ❤️ at TinkerHub
