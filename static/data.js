/* ===== EDIT YOUR CONTENT HERE. No need to touch HTML/CSS/JS. ===== */
const DATA = {
  name: "Sorforaj Ahmed Soikot",
  role: "Full-Stack Developer & R&D Specialist",
  typed: ["Building scalable digital products", "Designing REST APIs with Django & Flask", "Solving problems through R&D"],
  tagline: "Full-stack developer with 3 years of experience at NextWeb.bd, building web products, REST APIs and automation, backed by hands-on research and experimentation.",
  bio: ["I'm a full-stack developer and R&D specialist. For 3 years at NextWeb.bd I built responsive frontends with HTML, CSS, JavaScript and Tailwind CSS, and backends with Django and Flask.",
        "I also do web scraping with BeautifulSoup, build REST APIs, and run R&D experiments to test ideas before they go into real projects. I'm currently completing my Diploma in Computer Science & Technology at Magura Polytechnic Institute."],
  photo: "/static/assets/profile.jpg",
  resume: "/static/assets/resume.pdf",
  email: "sasoikot36@gmail.com",
  github: "https://github.com/yourname",      // TODO: put your real GitHub link
  linkedin: "https://linkedin.com/in/yourname", // TODO: put your real LinkedIn link
  formEndpoint: "/contact/",
  stats: [["3+", "Years of experience"], ["10", "Projects completed"], ["15+", "Technologies"], ["17", "R&D experiments"]],
  expertise: [
    { icon: "📱", title: "Frontend Development", text: "Clean, responsive interfaces built with modern HTML, CSS and JavaScript.", items: ["HTML5 & CSS3", "JavaScript", "Tailwind CSS", "Responsive design", "REST API integration"] },
    { icon: "⚙️", title: "Backend Development", text: "Python backends, REST APIs and data extraction.", items: ["Django", "Flask", "REST API development", "Web scraping with BeautifulSoup", "Python automation"] },
    { icon: "🧠", title: "R&D / Research", text: "Experiments and proofs of concept to find what works before building.", items: ["Technical research", "Proofs of concept", "Technology evaluation", "Automation experiments", "Data extraction research"] }
  ],
  stack: {
    Languages: ["Python", "JavaScript", "HTML", "CSS"],
    Frontend: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
    Backend: ["Django", "Flask", "BeautifulSoup", "REST API"],
    Tools: ["Git", "GitHub"]
  },
  /* TODO: replace these 4 sample projects with your real ones (you have 10). Leave "live"/"repo" empty if you have no link. */
  projects: [
    { name: "Django Web Application", type: "Full-Stack", img: "", desc: "Full-stack web application built with Django and Tailwind CSS.",
      problem: "Describe the problem this project solved.", solution: "Describe your solution.",
      tech: ["Django", "Python", "Tailwind CSS", "JavaScript"], features: ["Responsive UI", "Admin panel", "REST API"],
      results: [], live: "", repo: "", study: null },
    { name: "Responsive Frontend Website", type: "Frontend", img: "", desc: "Responsive website built with HTML, CSS, JavaScript and Tailwind CSS.",
      problem: "Describe the problem this project solved.", solution: "Describe your solution.",
      tech: ["HTML", "CSS", "JavaScript", "Tailwind CSS"], features: ["Mobile-first layout", "API integration"],
      results: [], live: "", repo: "", study: null },
    { name: "Flask REST API", type: "Backend", img: "", desc: "REST API service built with Flask.",
      problem: "Describe the problem this project solved.", solution: "Describe your solution.",
      tech: ["Flask", "Python", "REST API"], features: ["JSON endpoints", "Request validation"],
      results: [], live: "", repo: "", study: null },
    { name: "Web Scraping Tool", type: "R&D", img: "", desc: "Data extraction tool built with Python and BeautifulSoup.",
      problem: "Describe the problem this project solved.", solution: "Describe your solution.",
      tech: ["Python", "BeautifulSoup"], features: ["Automated data collection", "Structured output"],
      results: [], live: "", repo: "", study: null }
  ],
  /* TODO: replace with your real experiments (you have 17). Keep the same fields. */
  lab: [
    { title: "Web scraping with BeautifulSoup", status: "Completed", objective: "Collect structured data from web pages automatically.", problem: "Manual data collection is slow and error-prone.", hypothesis: "A Python scraper can replace manual collection reliably.", approach: "Parse HTML with BeautifulSoup and export clean data.", technology: "Python, BeautifulSoup", experiment: "Ran the scraper on several page layouts.", results: "Add your measured result here.", findings: "Add what you learned here.", future: "Add next steps here." },
    { title: "Django vs Flask for REST APIs", status: "Completed", objective: "Choose the right framework for different API sizes.", problem: "Picking the wrong framework slows development.", hypothesis: "Flask suits small APIs, Django suits larger apps.", approach: "Build the same API in both frameworks.", technology: "Django, Flask, Python", experiment: "Compared setup time and performance.", results: "Add your measured result here.", findings: "Add what you learned here.", future: "Add next steps here." },
    { title: "Tailwind CSS workflow", status: "Completed", objective: "Speed up frontend delivery.", problem: "Writing custom CSS for every page takes time.", hypothesis: "Utility-first CSS speeds up UI work.", approach: "Rebuild an existing page with Tailwind CSS.", technology: "Tailwind CSS, HTML", experiment: "Compared build time with plain CSS.", results: "Add your measured result here.", findings: "Add what you learned here.", future: "Add next steps here." }
  ],
  experience: [
    { company: "NextWeb.bd", position: "Developer & R&D", duration: "3 Years", tech: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Django", "Flask", "BeautifulSoup"],
      duties: ["Built frontends with HTML, CSS, JavaScript and Tailwind CSS", "Developed backends and REST APIs with Django and Flask", "Built web scraping tools with BeautifulSoup", "Ran R&D experiments and proofs of concept"], impact: [] }
  ],
  services: [["</>", "Full-Stack Web Development", "Complete web products from database to interface."], ["▤", "Frontend Development", "Responsive UIs with HTML, CSS, JavaScript and Tailwind CSS."], ["{ }", "Backend Development", "Django and Flask backends."], ["⇄", "REST API Development", "Clean REST APIs and integrations."], ["🕷", "Web Scraping", "Data extraction with Python and BeautifulSoup."], ["⚙", "Automation", "Remove repetitive manual work with Python."], ["∑", "Technical R&D", "Feasibility studies and experiments."]],
  resumeData: { summary: "Full-stack developer and R&D specialist with 3 years of experience at NextWeb.bd, building web products, REST APIs and automation tools.", skills: "HTML, CSS, JavaScript, Tailwind CSS, Python, Django, Flask, BeautifulSoup, REST API, Git", education: "Diploma in Computer Science & Technology, Magura Polytechnic Institute | Magura, Bangladesh, Session: 2022 – 2023" }
};