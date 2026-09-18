// Everything the chat assistant is allowed to know about Rayane. Server-side
// only (it is part of the system prompt, never shipped to the browser).
// Sources: the public CV (public/cv/rayane-yazid-cv.pdf) and the project
// descriptions of the portfolio. The phone number is deliberately left out.
// Keep this compact: it is sent with every request and counts against the
// Groq tokens-per-minute / per-day budget.
export const KNOWLEDGE = `
IDENTITY
- Rayane YAZID, electronics & embedded-software engineering student. Lives in Créteil (94000), France.
- Focus: embedded systems, electronics, robotics. C/C++, Python, ESP32, STM32, FPGA.
- Languages: French (native), English B2, Arabic B2. Driving licence B.
- Looking for: an apprenticeship (contrat d'apprentissage) or an internship in embedded systems, electronics or robotics.
- Profile title on the previous version of the site: "Développeur · Futur Ingénieur" / "Apprentice Engineer". Available for an internship (stage), an apprenticeship (alternance) or a permanent job (CDI).
- Contact: rayane.yazid.pro@gmail.com — website ryazid.fr — GitHub: github.com/RYZ-up — LinkedIn: linkedin.com/in/rayane-yazid. The CV (PDF, French) opens from the "CV" button in the Socials card of the site.

EDUCATION
- 2026-2028: Master 1 Électronique, Énergie Électrique et Automatique (E3A), Université Paris-Saclay.
- 2023-2026: Licence Sciences pour l'Ingénieur (SPI), UPEC (Créteil), electronics/computing track, ranked 6th of 76.
- 2020-2023: Baccalauréat général, Lycée Léon Blum (Créteil), specialities Maths and Physics-Chemistry.

EXPERIENCE
- Since 2024, freelance connected-object designer: a connected desk assistant with an OLED screen, a web server/API and a 3D-printed case.
- 2024, software developer at Phone Addict (Créteil): Python tools, notably an admin dashboard and workflow-automation systems.
- 2023-2026, freelance web developer: designed and built 6 websites with HTML, CSS, JavaScript and Python.

SKILLS
- Electronics / embedded: C, C++, VHDL (FPGA), ESP32, STM32, Basys, Arduino, KiCad, LTspice, Proteus, I2C, SPI, UART, CAN, MQTT.
- Software / CAD: Python, SQL, Scilab/Simulink, Vivado, SolidWorks, Fusion 360, Blender 3D, GitHub, GitLab, web (HTML/CSS/JS), TypeScript, React, Firebase, Cloudflare, FastAPI.

ENGINEERING PROJECTS
- Bee (May 2026, at Phone Addict): diagnostic board around an ESP32 with an ADS1115 ADC and ACS712 current sensors, to diagnose faulty electronic devices automatically. Python/FastAPI backend, fault-classification chain plus locally hosted LLMs (Qwen2.5-7B, Gemma 3 4B); the LLMs run locally, not in the cloud, and the ESP32 board is only the measurement/sensor link. Scilab study of ADC quantisation errors. Internship report graded 16.5/20. On the site, "Bee" is also presented as a 100% local AI assistant (Gemma 4B quantised Q4_K_M, four persistent memories, live ESP32 sensor link, real-time voltage/current diagnostic reports); ongoing, still makes mistakes but improves.
- Robotic arm controlled by gestures (2024-2025, UPEC): 6-servo arm and an instrumented control glove around an ESP32; C++ firmware; wireless real-time teleoperation over UDP/WiFi. The site's version mentions gyroscope gloves, kinematics, 3D printing and a PC control interface (3 degrees of freedom).
- Bionic butterfly (Dec 2025, personal project): biomimetic flapping-wing mechanism reproducing insect flight kinematics; control law to optimise energy use while keeping flapping performance. Presented on the site as a "Bio-drone butterfly" RC prototype, ongoing (aerodynamic design, 3D printing).
- IoT companion robot (2024): ESP32 robot with custom 3D printing, WiFi, clock and local weather, animated eyes, simulated temperature.
- Articulated mobile chassis (2026): rolling platform with an integrated 3-DOF robotic arm; motor power control with an L298 driver, Arduino Uno, C++.
- ESP32 RC car v2 (2024): miniature radio-controlled car on a breadboard, ESP32-C3 Super, L298N driver, DC motors, 3D-printed parts.

SOFTWARE & OTHER PROJECTS
- SaaS management platform (2026): customers subscribe and get a custom space linked to their account. TypeScript, Firebase, Cloudflare security. Lead developer.
- Applications manager (2026): collaborative tool to track internship/master applications, used by 15 people; central database, UX optimisation. Lead developer.
- Repair-workshop website (2025): showcase site with real-time device tracking, reCAPTCHA and a custom API. TypeScript, React, Node.js.
- Shop management software (2023): desktop app for repair shops, Python/Tkinter, SQLite, PDF invoices, automatic e-mail reminders (SMTP), calendar.
- Tic-Tac-Toe AI (2024): Scikit-learn model plus LLM integration (Python, machine learning).
- Medical image analysis (2026): skin-lesion detection with machine learning, 2000 microscopy images, Random Forest.
- Blender 3D animations (2023, ongoing): personal 3D scenes and animations, modelling, rigging, Cycles rendering.

PROJECT QUICK FACTS (year · status · role · stack, as shown on the site)
- IoT assistant robot: 2024 · done · design & development · ESP32, C++, 3D printing, IoT.
- Gyroscopic robotic arm: 2024-2025 · done · robotics engineer · Arduino/ESP32, C++, kinematics; controlled by gyroscope data gloves and a PC interface.
- Butterfly bio-drone: ongoing (started Dec 2025) · innovation lead · aerodynamics, mechanical design, Arduino, 3D printing; commercial RC objective.
- Repair-workshop website: 2025 · done · full-stack developer · TypeScript, React, Node.js, custom API, reCAPTCHA, real-time device tracking.
- Applications manager: 2026 · done · lead developer · web app, central database, UX, used by 15 people.
- Tic-Tac-Toe AI: 2024 · done · AI researcher · Python, Scikit-learn, LLM.
- Shop management software: 2023 · done · software engineer · Python, Tkinter, SQLite, SMTP.
- Articulated mobile chassis: 2026 · done · embedded systems · C++, motor control, L298 driver, Arduino Uno.
- Medical image analysis: 2026 · done · data scientist · Python, computer vision, Random Forest, health.
- ESP32 RC car v2: 2024 · done · electronics · ESP32-C3, L298N, 3D printing.
- Blender 3D animations: since 2023 · ongoing · 3D creator.
- SaaS management platform: 2026 · done · lead developer · TypeScript, Firebase, Cloudflare.
- Bee (local AI assistant / diagnostic board): 2026 · ongoing · AI engineer · Python, FastAPI, LLM, ESP32.

TOOLS RAYANE USES
- Hardware: ESP32, STM32, Arduino, Basys (FPGA), a PC (RTX 4060 Ti 8 GB, 32 GB RAM), MacBook Pro, AirPods.
- Software: Python, KiCad, LTspice, Proteus, GitHub, GitLab.

ABOUT THIS PORTFOLIO
- Built with React and Vite, deployed on Netlify, in French and English (FR / EN switch), with a dark and a light theme. Cards: status, map of Créteil, stacked project photos, API status, weather, activity rings, project folder, projects (development and engineering), socials (GitHub, LinkedIn, CV), tools and this AI assistant, plus a visit counter. This assistant is a serverless function calling an open model on Groq.
`.trim();
