export const portfolio = {
  name: 'HARSHA',
  fullName: 'Harshavardhan Simha Sai Ganesh Prabandhakavi',
  role: 'CSE Student',
  title: 'CSE Student | MERN Stack Developer',
  tagline: 'Turning ideas into modern digital experiences.',
  intro:
    'I build thoughtful, performance-focused digital experiences that blend engineering depth with creative problem solving.',
  nav: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com', ariaLabel: 'GitHub Profile' },
    { label: 'LinkedIn', href: 'https://linkedin.com', ariaLabel: 'LinkedIn Profile' },
    { label: 'Email', href: 'mailto:hello@example.com', ariaLabel: 'Send email' },
  ],
  resume: {
    url: '/resume/Harsha-Resume.pdf',
    file: '/resume/Harsha-Resume.pdf',
    filename: 'Harsha-Resume.pdf',
  },
  about: {
    statement:
      'I am a problem-driven developer who enjoys building software that is clean, reliable, and useful in real life.',
    supporting:
      'From frontend interfaces to backend logic, I like turning ideas into products that feel polished and perform well under pressure.',
    keywords: ['React', 'JavaScript', 'Node.js', 'UI/UX', 'Problem Solving', 'Full Stack'],
  },
  education: [
    {
      type: 'B.Tech',
      period: '2022 — 2026',
      branch: 'Computer Science & Engineering',
      institution: 'University of Technology',
      status: 'Pursuing',
      note: 'Focused on software engineering, data structures, and system design.',
    },
    {
      type: 'Diploma',
      period: '2019 — 2022',
      branch: 'Computer Science',
      institution: 'Technical Institute',
      status: 'Completed',
      note: 'Built strong foundations in programming and practical application.',
    },
    {
      type: 'Schooling',
      period: '2007 — 2019',
      branch: 'Secondary Education',
      institution: 'Academic School',
      status: 'Completed',
      note: 'Developed curiosity, discipline, and a love for learning.',
    },
  ],
  experience: [
    {
      role: 'Software Development Intern',
      company: 'Product Studio',
      location: 'Remote',
      duration: '2025',
      description:
        'Worked on user-facing features, performance improvements, and product workflows with a focus on speed and clarity.',
      highlights: [
        'Improved interface responsiveness and accessibility across key user flows.',
        'Built reusable UI patterns and reduced implementation overhead for the team.',
        'Collaborated closely with designers and developers to deliver cleaner product experiences.',
      ],
      projects: ['Web App UX', 'Dashboard Revamp', 'Frontend Systems'],
    },
    {
      role: 'Frontend Contributor',
      company: 'Open Community Projects',
      location: 'Hybrid',
      duration: '2024',
      description:
        'Contributed to UI-heavy features and polished the end-user experience for community-driven tools.',
      highlights: [
        'Implemented modular, responsive components with reusable logic.',
        'Improved visual consistency and layout behavior on multiple screens.',
        'Helped streamline delivery for user-facing product updates.',
      ],
      projects: ['Landing Pages', 'Feature Prototypes', 'Responsive UI'],
    },
  ],
  skills: {
    categories: [
      {
        label: 'Frontend',
        items: ['React', 'JavaScript', 'HTML', 'CSS', 'Vite', 'Responsive Design'],
      },
      {
        label: 'Backend',
        items: ['Node.js', 'Express', 'REST APIs', 'Authentication', 'Database Design'],
      },
      {
        label: 'Tools',
        items: ['Git', 'GitHub', 'Figma', 'Postman', 'VS Code', 'Cloud Basics'],
      },
    ],
  },
  projects: [
    {
      number: 1,
      title: 'NEXUS',
      shortDescription: 'A premium portfolio experience crafted for storytelling and product clarity.',
      description:
        'Built a high-contrast personal portfolio with layered storytelling, motion-led reveals, and a clean conversion-focused structure.',
      features: [
        'Cinematic dark theme and responsive layout',
        'Smooth scroll and motion-driven UI transitions',
        'Reusable component architecture for maintainability',
      ],
      technologies: ['React', 'Vite', 'GSAP', 'Three.js', 'CSS'],
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      number: 2,
      title: 'SpendWise',
      shortDescription: 'A productivity dashboard for managing work, priorities, and progress visually.',
      description:
        'Designed and built a dashboard experience to help users monitor project status, tasks, and activity in a clutter-free UI.',
      features: [
        'Task and workflow tracking layout',
        'Clean analytics cards and status summaries',
        'Responsive dashboard for desktop and tablet use',
      ],
      technologies: ['React', 'Charting', 'API Integration', 'CSS'],
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      number: 3,
      title: 'Learning Hub',
      shortDescription: 'A content-focused platform for browsing learning paths and course modules.',
      description:
        'Developed a learning-oriented interface that makes educational content easy to explore, filter, and navigate.',
      features: [
        'Course discovery and category organization',
        'Modular card-based learning experience',
        'User-first layout for clarity and engagement',
      ],
      technologies: ['React', 'JavaScript', 'UI Systems', 'Responsive CSS'],
      github: 'https://github.com',
      live: 'https://example.com',
    },
  ],
  achievements: [
    {
      type: 'Certification',
      title: 'Web Development Fundamentals',
      subtitle: 'Practical foundation in frontend and UI engineering.',
      period: '2024',
    },
    {
      type: 'Award',
      title: 'Project Excellence',
      subtitle: 'Recognized for thoughtful product thinking and execution.',
      period: '2025',
    },
    {
      type: 'Recognition',
      title: 'Problem Solving Sprint',
      subtitle: 'Strong performance in logic-driven challenge scenarios.',
      period: '2024',
    },
  ],
  contact: {
    email: 'hello@harsha.dev',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  footer: {
    text: 'Building meaningful software with curiosity and consistency.',
  },
};
