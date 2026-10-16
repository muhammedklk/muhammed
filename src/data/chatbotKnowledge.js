/**
 * Comprehensive Knowledge Base & Response Engine for MK AI Assistant
 * Extracted directly from Muhammed K's CV and Portfolio Website.
 */

import { personalInfo } from './portfolioData';
import { projects } from './projectsData';
import { faqItems } from './faqData';

export const CHATBOT_CONTEXT = {
  name: "Muhammed K",
  title: "UI/UX Designer & Front-End Developer",
  location: "Malappuram, Kerala, India",
  email: "muhammedklkm@gmail.com",
  phone: "+91 9656216086",
  portfolio: "https://muhammedfolio.vercel.app",
  linkedin: "https://linkedin.com/in/kmuhammed",
  github: "https://github.com/muhammedklk",
  instagram: "https://instagram.com/muhammedklk",
  cvPath: "/assets/muhammedk-cv.pdf",

  summary: `Creative and detail-oriented UI/UX Designer and Front-End Developer with hands-on experience in designing and developing responsive websites from Figma designs. Skilled in Figma, wireframing, prototyping, HTML5, CSS3, JavaScript, jQuery, and Bootstrap, with a strong understanding of responsive web design, modern UI layouts, and user-focused interfaces. Experienced in converting high-fidelity Figma designs into pixel-perfect, cross-browser compatible websites and collaborating with stakeholders across India and GCC countries (Saudi Arabia, UAE, Qatar).`,

  education: [
    {
      degree: "Skill Diploma in UI/UX Designing",
      institution: "Techno Dot Academy",
      period: "06/2025 – 01/2026",
      details: "Comprehensive specialization in UX research, wireframing, prototyping, user flows, visual design, typography, design systems, heuristic evaluation, and responsive design."
    },
    {
      degree: "Bachelor of Arts in Arabic (BA Arabic)",
      institution: "Sree Narayana Guru Open University",
      period: "09/2022 – 03/2025",
      details: "Linguistic and cultural study enabling seamless cross-cultural communication and RTL (Right-to-Left) design execution for Middle Eastern clients."
    }
  ],

  experience: [
    {
      role: "UI/UX Designer & Frontend Developer",
      company: "Duplex Solutions Co",
      period: "02/2026 – 07/2026",
      location: "Manjeri, Kerala",
      highlights: [
        "Led user-centered design processes for ERP modernization (BizDot Suite), translating complex workflows into intuitive user flows and interactive prototypes.",
        "Used AI tools to support UX research, wireframe suggestions, and layout optimization.",
        "Designed and developed responsive websites for clients based in Saudi Arabia, UAE, and Qatar.",
        "Created business profiles, brand assets, and company presentation materials.",
        "Developed the official website for Gemini National Music Talent Hunt 2026 (geminimusicaward.com) with online audition registration."
      ]
    },
    {
      role: "UI/UX Design Intern",
      company: "Febno Technologies",
      period: "01/2026 – 02/2026",
      location: "Calicut, Kerala",
      highlights: [
        "Designed responsive web interfaces and converted high-fidelity Figma designs into responsive websites using HTML5, CSS3, JavaScript, and Bootstrap.",
        "Created wireframes, UI layouts, and reusable components to ensure design consistency.",
        "Implemented pixel-perfect, mobile-first, and cross-browser compatible layouts."
      ]
    },
    {
      role: "Independent Freelance Designer & Developer",
      company: "Self-Employed",
      period: "2024 – Present",
      location: "Remote / Malappuram",
      highlights: [
        "8+ successfully delivered commercial projects across logistics, e-commerce, hospitality, enterprise ERP, and travel.",
        "100% client satisfaction and on-time milestone delivery."
      ]
    }
  ],

  skills: {
    design: [
      "Figma (Auto Layout 5.0, Component Variants, Design Systems)",
      "Adobe Photoshop",
      "Wireframing & Prototyping",
      "User Flows & Information Architecture",
      "Visual Design & Typography",
      "Mobile App UI/UX (iOS & Android)",
      "Dashboard & ERP Design",
      "UI Animation & Micro-Interactions",
      "User Research & Heuristic Evaluation"
    ],
    frontend: [
      "HTML5 (Semantic & Accessible)",
      "CSS3 (Flexbox, Grid, Animations, Variables)",
      "JavaScript (ES6+) & DOM",
      "React.js & Component Architecture",
      "Bootstrap Grid",
      "jQuery",
      "Three.js & WebGL basics",
      "Responsive & Mobile-First Design",
      "Cross-Browser Compatibility"
    ],
    tools: ["Figma", "VS Code", "Git", "GitHub", "Vercel", "cPanel", "Chrome DevTools", "Notion"],
    softSkills: ["Communication", "Team Collaboration", "Attention to Detail", "Creative Thinking", "Problem Solving", "Time Management"],
    languages: ["English (Fluent / Professional)", "Malayalam (Native)", "Arabic (BA Degree / Professional)"]
  }
};

/**
 * Intelligent Query Matcher & Response Generator
 */
export function getChatbotResponse(query) {
  if (!query || typeof query !== 'string') {
    return "Hi! How can I help you? Ask me anything about Muhammed's skills, experience, projects, or contact details.";
  }

  const raw = query.trim();
  const q = raw.toLowerCase();

  // Helper matching functions
  const has = (...terms) => terms.some(t => q.includes(t.toLowerCase()));
  const hasAll = (...terms) => terms.every(t => q.includes(t.toLowerCase()));

  // 1. GREETINGS & CHIT-CHAT (English, Malayalam, Manglish)
  if (has('hi', 'hello', 'hey', 'hai', 'namaskaram', 'sugamano', 'halo', 'good morning', 'good afternoon', 'good evening', 'enthokke', 'enthund')) {
    if (has('sugamano', 'enthokke', 'enthund', 'sukhamano', 'engane und')) {
      return "സുഖം തന്നെ! നന്ദി ചോദിച്ചതിന്. ഞാൻ മുഹമ്മദിന്റെ AI അസിസ്റ്റന്റാണ്. മുഹമ്മദിന്റെ UI/UX ഡിസൈൻ, ഫ്രണ്ട്-എൻഡ് വർക്കുകൾ, പ്രോജക്ടുകൾ അല്ലെങ്കിൽ കോൺടാക്റ്റ് വിവരങ്ങളെക്കുറിച്ച് എന്തും ചോദിക്കാം!";
    }
    return `Hello! 👋 I'm Muhammed's AI Assistant. I can answer any questions about his UI/UX design background, front-end development skills, 8 featured case studies, CV, or availability. What would you like to know?`;
  }

  // 2. WHO IS MUHAMMED / SELF INTRODUCTION (English & Malayalam)
  if (has('who is muhammed', 'about muhammed', 'who are you', 'tell me about yourself', 'introduce', 'aarann', 'aaranu', 'aara', 'parayamo', 'enne kurich', 'biodata', 'profile')) {
    return `**Muhammed K** is a professional **UI/UX Designer & Front-End Developer** based in Malappuram, Kerala, India.\n\n` +
      `• **Role**: Bridges the gap between creative visual design (Figma) and production-ready code (HTML5, CSS3, JavaScript, React).\n` +
      `• **Experience**: 2+ years of hands-on experience, including roles at **Duplex Solutions Co** (Manjeri) and **Febno Technologies** (Calicut).\n` +
      `• **Projects**: Has delivered 8+ high-impact digital products for clients across India and the GCC (Saudi Arabia, UAE, Qatar).\n` +
      `• **Education**: Skill Diploma in UI/UX Designing (Techno Dot Academy) and BA in Arabic (Sree Narayana Guru Open University).\n\n` +
      `You can reach him directly at **muhammedklkm@gmail.com** or **+91 9656216086**.`;
  }

  // 3. CONTACT INFO / PHONE / EMAIL / SOCIALS (English, Malayalam, Manglish)
  if (has('contact', 'email', 'mail', 'phone', 'call', 'number', 'whatsapp', 'reach', 'touch', 'nambar', 'phn', 'vilikkan', 'bandhapadan', 'evide')) {
    return `You can get in touch with Muhammed directly through any of these channels:\n\n` +
      `• 📧 **Email**: [muhammedklkm@gmail.com](mailto:muhammedklkm@gmail.com)\n` +
      `• 📞 **Phone / WhatsApp**: [+91 9656216086](tel:+919656216086)\n` +
      `• 📍 **Location**: Malappuram, Kerala, India\n` +
      `• 💼 **LinkedIn**: [linkedin.com/in/kmuhammed](https://linkedin.com/in/kmuhammed)\n` +
      `• 🐙 **GitHub**: [github.com/muhammedklk](https://github.com/muhammedklk)\n` +
      `• 📸 **Instagram**: [@muhammedklk](https://instagram.com/muhammedklk)\n` +
      `• 🌐 **Portfolio**: [muhammedfolio.vercel.app](https://muhammedfolio.vercel.app)\n\n` +
      `He typically responds within a few hours!`;
  }

  // 4. CV / RESUME DOWNLOAD
  if (has('cv', 'resume', 'curriculum', 'biodata', 'download cv', 'pdf', 'certificate')) {
    return `📄 **Muhammed's Verified CV** is available for download:\n\n` +
      `• You can download the PDF directly here: [Download Muhammed K's CV](/assets/muhammedk-cv.pdf)\n` +
      `• You can also click the **"CV"** button in the top navigation header or the **"Download CV"** button in the About section.\n\n` +
      `It outlines his complete work experience at Duplex Solutions and Febno Technologies, education credentials, technical skills matrix, and key commercial project deliveries.`;
  }

  // 5. LOCATION / NATIVE PLACE (English & Malayalam)
  if (has('location', 'native', 'place', 'where are you from', 'where do you live', 'sthalam', 'stalam', 'naadu', 'nadu', 'evideya', 'malappuram', 'kerala')) {
    return `Muhammed K is based in **Malappuram, Kerala, India** 🌴.\n\n` +
      `He works remotely with clients worldwide (including clients across the GCC — Saudi Arabia, UAE, and Qatar), and is also available for on-site roles in Kerala / Bangalore or hybrid/relocation opportunities.`;
  }

  // 6. WORK EXPERIENCE & COMPANIES (Duplex Solutions, Febno, Freelance)
  if (has('experience', 'company', 'work', 'job', 'history', 'duplex', 'febno', 'joli', 'anubhavam', 'ethra varsham', 'years of experience')) {
    return `Muhammed has **2+ years of professional experience** in UI/UX Design and Front-End Web Development:\n\n` +
      `1. **UI/UX Designer & Frontend Developer — Duplex Solutions Co** (02/2026 – 07/2026 | Manjeri, Kerala)\n` +
      `   • Led ERP modernization (BizDot Suite), redesigning complex workflows into clean interactive prototypes.\n` +
      `   • Designed and developed responsive web solutions for international clients across Saudi Arabia, UAE, and Qatar.\n` +
      `   • Built the official website for Gemini National Music Talent Hunt (geminimusicaward.com) and Ronarai Restaurant (ronaraiksa.com).\n` +
      `   • Used AI-assisted tools for UX research, wireframing, and workflow optimization.\n\n` +
      `2. **UI/UX Design Intern — Febno Technologies** (01/2026 – 02/2026 | Calicut, Kerala)\n` +
      `   • Converted Figma designs into responsive websites with HTML5, CSS3, JavaScript, and Bootstrap.\n` +
      `   • Built reusable UI component libraries for design consistency.\n` +
      `   • Handled cross-browser testing, mobile-first design, and developer handoff.\n\n` +
      `3. **Independent Freelance Designer & Developer** (2024 – Present)\n` +
      `   • Delivered 8+ commercial projects across e-commerce, logistics, travel, SaaS, and hospitality.`;
  }

  // 7. EDUCATION & QUALIFICATIONS (Techno Dot, BA Arabic)
  if (has('education', 'qualification', 'degree', 'diploma', 'study', 'college', 'university', 'techno dot', 'technodot', 'arabic', 'paditham', 'padichath', 'padip')) {
    return `Muhammed holds the following educational credentials:\n\n` +
      `1. 🎓 **Skill Diploma in UI/UX Designing** — *Techno Dot Academy* (06/2025 – 01/2026)\n` +
      `   • Specialization: UX Research, Information Architecture, Wireframing, Figma Auto Layout, Design Systems, Heuristic Evaluation, and Usability Testing.\n\n` +
      `2. 🎓 **Bachelor of Arts in Arabic (BA Arabic)** — *Sree Narayana Guru Open University* (09/2022 – 03/2025)\n` +
      `   • Linguistic and cultural proficiency facilitating smooth collaboration with clients across the Middle East (Saudi Arabia, UAE, Qatar) and bilingual/RTL design systems.`;
  }

  // 8. SKILLS & TECH STACK (Figma, React, HTML, CSS, JS, etc.)
  if (has('skill', 'tech stack', 'stack', 'tool', 'figma', 'react', 'css', 'html', 'javascript', 'js', 'three.js', 'bootstrap', 'photoshop', 'kazhiv', 'enthokke ariyam', 'frontend')) {
    return `Here is Muhammed's core technical toolkit:\n\n` +
      `🎨 **UI/UX Design**:\n` +
      `• Figma (Advanced Auto Layout 5.0, Components & Variants, Variables, Tokens, Interactive Prototyping)\n` +
      `• Adobe Photoshop, Wireframing, User Personas, Journey Mapping\n` +
      `• Mobile App UI (iOS & Android guidelines), Dashboard & Enterprise ERP Design\n` +
      `• UI Micro-Interactions, Heuristic Evaluation, Accessibility (WCAG)\n\n` +
      `💻 **Front-End Development**:\n` +
      `• React.js (Component Architecture, Hooks, State Management)\n` +
      `• HTML5 (Semantic, SEO-friendly), Modern CSS3 (Flexbox, Grid, Custom Properties, Glassmorphism)\n` +
      `• JavaScript (ES6+), DOM Manipulation, jQuery, REST API Integration\n` +
      `• Bootstrap Grid, Three.js & WebGL (3D canvas integrations)\n` +
      `• Mobile-First Responsive Design, Cross-Browser Compatibility\n\n` +
      `🛠️ **Workflow & Dev Tools**:\n` +
      `• Git, GitHub, VS Code, Vercel, cPanel, Chrome DevTools, Notion`;
  }

  // 9. SPECIFIC PROJECT INQUIRIES
  // 9a. Ronarai Restaurant
  if (has('ronarai', 'restaurant', 'saudi', 'food', 'ronaraiksa')) {
    return `🍽️ **Ronarai Authentic Saudi Cuisine** (*ronaraiksa.com*):\n\n` +
      `• **Client**: Ronarai Restaurant Group (Saudi Arabia)\n` +
      `• **Role**: Full UI/UX Design & Front-End Development (Figma, HTML5, CSS3, JavaScript, Bootstrap)\n` +
      `• **Overview**: Premier restaurant platform showcasing authentic Saudi grills, traditional platters, and cultural dining.\n` +
      `• **Key Features**: Interactive digital menu with ingredient filters, bilingual-ready layout, table and banquet reservation flow, location mapping.\n` +
      `• **Impact**: 48% increase in direct online table reservations, mobile bounce rate reduced by 31%!\n` +
      `• **Live URL**: [ronaraiksa.com](https://ronaraiksa.com)`;
  }

  // 9b. Gemini Music Awards
  if (has('gemini', 'music', 'talent hunt', 'award', 'geminimusicaward')) {
    return `🎵 **Gemini National Music Talent Hunt 2026** (*geminimusicaward.com*):\n\n` +
      `• **Client**: Gemini Film & Music Production House\n` +
      `• **Role**: Lead UI/UX Designer & Frontend Developer (Figma, HTML5, CSS3, JavaScript, cPanel)\n` +
      `• **Overview**: High-concurrency national talent audition platform with glamorous gold & black cinematic aesthetic.\n` +
      `• **Key Features**: Multi-step online audition form supporting demo media submissions across 5 age categories, celebrity jury showcase, competition rules accordion, prize breakdown.\n` +
      `• **Impact**: Processed over 4,200 contestant audition registrations with zero downtime during viral announcements!\n` +
      `• **Live URL**: [geminimusicaward.com](https://geminimusicaward.com)`;
  }

  // 9c. BizDot ERP Dashboard
  if (has('bizdot', 'erp', 'dashboard', 'inventory', 'warehouse', 'saas erp')) {
    return `📊 **BizDot Enterprise ERP Suite**:\n\n` +
      `• **Client**: Duplex Solutions / Enterprise Clients\n` +
      `• **Role**: Lead UI/UX Redesign & Frontend Enhancement\n` +
      `• **Overview**: Complete modernization of an enterprise ERP connecting inventory, multi-store POS, procurement, and financial reporting.\n` +
      `• **Key Features**: Real-time KPI cards, searchable data tables with status color tokens (In Stock, Low, Depleted), zero-latency Cmd+K global search, contextual 3-dot overflow actions.\n` +
      `• **Impact**: 54% faster inventory search speeds, zero training hours required for onboarding new clerks!`;
  }

  // 9d. Styleora E-Commerce
  if (has('styleora', 'luxury', 'ecommerce', 'e-commerce', 'fashion', 'store', 'apparel')) {
    return `👗 **Styleora Luxury Essentials**:\n\n` +
      `• **Category**: High-End Luxury E-Commerce Website\n` +
      `• **Role**: Lead UI/UX Designer & Prototyping (Figma Design System)\n` +
      `• **Overview**: Editorial luxury boutique combining art gallery minimalism with frictionless shopping.\n` +
      `• **Key Features**: Story-driven lookbooks with shoppable hotspots, quick-view slideout drawer bag, interactive size & fit modals, fabric texture zoom on hover.\n` +
      `• **Impact**: 28% longer session duration and 22% higher Average Order Value (AOV).`;
  }

  // 9e. Green Track Logistics
  if (has('green track', 'greentrack', 'cargo', 'logistics', 'freight', 'shipping')) {
    return `🚢 **Green Track International Cargo**:\n\n` +
      `• **Category**: Global Logistics & Cargo Website\n` +
      `• **Role**: UI/UX Design & Front-End Architecture\n` +
      `• **Overview**: Cross-border freight forwarding solution engineered for transparency, instant cargo quotes, and container tracking.\n` +
      `• **Key Features**: Above-the-fold 3-step rapid quote estimator, unified real-time milestone tracking timeline, multimodal service selector (Sea, Air, Rail).\n` +
      `• **Impact**: 42% increase in online quote completions within 60 days!`;
  }

  // 9f. Mahora Travel Mobile App
  if (has('mahora', 'travel app', 'mobile app', 'sanctuary', 'ios', 'android')) {
    return `📱 **Mahora Sacred Travel Companion**:\n\n` +
      `• **Category**: Mindful Travel Mobile Application (iOS & Android)\n` +
      `• **Role**: Mobile Product Designer\n` +
      `• **Overview**: Mindful exploration app for discovering unlisted private retreats and sacred natural sanctuaries worldwide.\n` +
      `• **Key Features**: Thumb-accessible bottom navigation, swipeable retreat cards with spring physics, offline sanctuary itinerary with Apple Wallet style passport storage.\n` +
      `• **Impact**: 4.9/5 satisfaction rating during pre-launch testing with 500+ beta testers.`;
  }

  // 9g. Nadvora Bespoke Expeditions
  if (has('nadvora', 'expedition', 'chalet', 'retreat', 'high ticket')) {
    return `🏔️ **Nadvora Bespoke Expeditions**:\n\n` +
      `• **Category**: Luxury Hospitality & Private Chalet Booking\n` +
      `• **Role**: Lead UI/UX Designer & Web Experience\n` +
      `• **Overview**: Tailored platform curating private Swiss Alps chalets and Kyoto machiya estates for discerning voyagers.\n` +
      `• **Key Features**: Full-bleed architectural landscape galleries, private inquiry concierge consultation modal, tailored expedition filters.\n` +
      `• **Impact**: 3.4x surge in high-ticket expedition booking inquiries!`;
  }

  // 9h. Nova Cloud Commerce
  if (has('nova', 'cloud commerce', 'multivendor', 'multi-vendor')) {
    return `☁️ **Nova All-in-One Cloud Commerce**:\n\n` +
      `• **Category**: SaaS Commerce Platform\n` +
      `• **Role**: Product Designer & Front-End Consultant\n` +
      `• **Overview**: Merchant dashboard suite unifying product catalogs, promotional banner scheduling, customer analytics, and fulfillment.\n` +
      `• **Key Features**: Drag-and-drop banner preview, category pill filter switchers, multi-variant batch editing.\n` +
      `• **Impact**: Deployed to over 120 live merchant stores within first quarter.`;
  }

  // 10. ALL PROJECTS LIST (General)
  if (has('project', 'work', 'case study', 'portfolio', 'works', 'projects', 'entha cheytha', 'projectukal')) {
    return `Muhammed has designed and built **8 featured commercial case studies**:\n\n` +
      `1. 🍽️ **Ronarai Authentic Saudi Cuisine** — Full UI/UX & Responsive Web ([ronaraiksa.com](https://ronaraiksa.com))\n` +
      `2. 🎵 **Gemini National Music Talent Hunt 2026** — Audition platform with 4,200+ contestants ([geminimusicaward.com](https://geminimusicaward.com))\n` +
      `3. 📊 **BizDot Enterprise ERP Suite** — High-speed ERP dashboard with 54% faster inventory search\n` +
      `4. 🚢 **Green Track Cargo Logistics** — International freight portal with rapid quote calculator\n` +
      `5. 👗 **Styleora Luxury Essentials** — Minimalist high-fashion e-commerce boutique\n` +
      `6. 📱 **Mahora Sacred Travel Companion** — iOS & Android mobile product design (4.9/5 rating)\n` +
      `7. 🏔️ **Nadvora Bespoke Expeditions** — Ultra-luxury travel & private residence bookings\n` +
      `8. ☁️ **Nova Cloud Commerce** — Modular SaaS merchant management dashboard\n\n` +
      `Ask me about any specific project for in-depth insights, or visit the **Works** page to explore them!`;
  }

  // 11. HIRE / AVAILABILITY / FREELANCE (English & Malayalam)
  if (has('hire', 'available', 'freelance', 'contract', 'full time', 'full-time', 'remote', 'vacancy', 'joli kodukkamo', 'varumo', 'available aano', 'freelance cheyyumo')) {
    return `✅ **Yes! Muhammed is actively available for hire**:\n\n` +
      `• **Freelance & Contract**: UI/UX design sprints, website redesigns, Figma design systems, and frontend implementation.\n` +
      `• **Full-Time Opportunities**: Product Designer, UI/UX Designer, or Front-End Developer roles (Remote or on-site).\n` +
      `• **Turnaround**: Fast, milestone-driven delivery with daily Figma updates and transparent communication.\n\n` +
      `To discuss your project or schedule an introductory call, reach him at **muhammedklkm@gmail.com** or **+91 9656216086**!`;
  }

  // 12. PRICING, RATES, TIMELINES (English & Malayalam)
  if (has('price', 'pricing', 'rate', 'cost', 'charge', 'salary', 'fees', 'budget', 'timeline', 'how long', 'ethra samayam', 'sambalam', 'kaash', 'ethra')) {
    return `💰 **Pricing & Project Timelines**:\n\n` +
      `• **Timelines**:\n` +
      `  - Marketing Landing Page / Portfolio: **2 – 3 Weeks**\n` +
      `  - Full E-Commerce / Multi-page Web App: **4 – 6 Weeks**\n` +
      `  - Complex SaaS / ERP Dashboard / Mobile App: **6 – 8 Weeks**\n\n` +
      `• **Rates**: Muhammed offers competitive project-based fixed rates or monthly retainers depending on project scope, number of screens, and whether development is included.\n\n` +
      `Send your project requirements to **muhammedklkm@gmail.com** or WhatsApp **+91 9656216086** for a free, transparent estimate within 24 hours!`;
  }

  // 13. DESIGN PROCESS / WORKFLOW (How he works)
  if (has('process', 'workflow', 'how do you work', 'design process', 'how does he handle', 'design to code', 'methodology', 'engane aan')) {
    return `Muhammed follows a structured **4-Phase Human-Centered Process**:\n\n` +
      `1. **Discovery & Research**: Analyzing business objectives, target personas, and competitor benchmarks to define user problems.\n` +
      `2. **Wireframing & Architecture**: Creating low-fidelity user journeys and layout structures in Figma before visual styling.\n` +
      `3. **High-Fidelity Design System**: Building pixel-perfect components with Auto Layout 5.0, typography scales, spacing tokens, and micro-interactions.\n` +
      `4. **Pixel-Perfect Front-End Code**: Developing clean React.js or HTML5/CSS3 components with zero translation loss, cross-browser compatibility, and fast load speeds.`;
  }

  // 14. LANGUAGES SPOKEN / KNOWN
  if (has('language', 'arabic', 'english', 'malayalam', 'bhasha', 'samsarikkan', 'speak')) {
    return `Muhammed is proficient in 3 languages:\n\n` +
      `1. 🇬🇧 **English** — Professional & Fluent (used for international client meetings, documentation, and code)\n` +
      `2. 🌴 **Malayalam** — Native (mother tongue)\n` +
      `3. 🇸🇦 **Arabic** — Holds a **Bachelor of Arts (BA) in Arabic** from Sree Narayana Guru Open University. Skilled in Middle Eastern cultural communication and designing bilingual Right-to-Left (RTL) interfaces!`;
  }

  // 15. DESIGN PHILOSOPHY / CREATIVE BELIEFS
  if (has('philosophy', 'belief', 'motto', 'tagline', 'approach', 'vision')) {
    return `Muhammed's design philosophy is guided by 3 principles:\n\n` +
      `1. **Form Follows Emotion**: Great digital products don't just solve problems; they evoke calm, trust, and delight through intentional spacing and tactile micro-interactions.\n` +
      `2. **Systemic Scalability**: Design without tokens is chaos. Every margin, font size, and color follows mathematical rhythm for seamless engineering.\n` +
      `3. **The Code-Design Bridge**: Because he writes frontend code alongside Figma, every prototype is inherently realistic, performant, and feasible without developer headaches!`;
  }

  // 16. MALAYALAM GENERIC INQUIRIES
  if (has('enthokke cheyyum', 'enth cheyyum', 'sahayikkan', 'paranju tharumo', 'aaran', 'enthann')) {
    return `മുഹമ്മദ് ഒരു **UI/UX ഡിസൈനറും ഫ്രണ്ട്-എൻഡ് ഡെവലപ്പറുമാണ്**. \n\n` +
      `• Figma ഉപയോഗിച്ച് വെബ്‌സൈറ്റുകളും മൊബൈൽ ആപ്പുകളും ഡാഷ്‌ബോർഡുകളും ഡിസൈൻ ചെയ്യും.\n` +
      `• HTML5, CSS3, JavaScript, React എന്നിവ ഉപയോഗിച്ച് responsive ആയി കോഡിംഗ് ചെയ്യും.\n` +
      `• Saudi Arabia, UAE, Qatar തുടങ്ങിയ രാജ്യങ്ങളിലെ ക്ലയന്റുകൾക്ക് വേണ്ടിയും വർക്കുകൾ ചെയ്തിട്ടുണ്ട്.\n\n` +
      `കൂടുതൽ അറിയാൻ ഫോൺ: **+91 9656216086**, ഇമെയിൽ: **muhammedklkm@gmail.com**.`;
  }

  // 17. COMPLIMENTS & THANKS
  if (has('thank', 'thanks', 'nandi', 'super', 'adipoli', 'good', 'great', 'nice', 'awesome')) {
    return `You're very welcome! 😊 Feel free to ask if there's anything else you'd like to know about Muhammed K or his work. Have a wonderful day!`;
  }

  // 18. INTELLIGENT FALLBACK (Combines complete summary with direct contact)
  return `Thanks for asking! Here is a quick overview:\n\n` +
    `**Muhammed K** is a UI/UX Designer & Front-End Developer from Malappuram, Kerala, with 2+ years of experience across Figma, React, HTML5/CSS3, and modern responsive systems. He has delivered 8+ commercial projects (including Ronarai Restaurant KSA, Gemini Music Awards, and BizDot ERP).\n\n` +
    `• 📧 **Email**: [muhammedklkm@gmail.com](mailto:muhammedklkm@gmail.com)\n` +
    `• 📞 **Phone**: [+91 9656216086](tel:+919656216086)\n` +
    `• 📄 **Download CV**: [Click here](/assets/muhammedk-cv.pdf)\n\n` +
    `Feel free to ask about his specific projects, education, experience at Duplex Solutions/Febno, or availability!`;
}
