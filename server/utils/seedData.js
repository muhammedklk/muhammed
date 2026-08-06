const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });
if (!process.env.MONGODB_URI) {
  dotenv.config({ path: path.join(__dirname, '../../.env') });
}

const Project = require('../models/Project');
const Hero = require('../models/Hero');
const About = require('../models/About');
const Experience = require('../models/Experience');
const Education = require('../models/Education');
const Service = require('../models/Service');
const Skill = require('../models/Skill');
const Testimonial = require('../models/Testimonial');
const Faq = require('../models/Faq');
const Seo = require('../models/Seo');
const SiteSettings = require('../models/SiteSettings');
const User = require('../models/User');

const seedData = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('[Seed Error] MONGODB_URI is missing');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('[Seed] Connected to MongoDB Atlas...');

    // 1. Initial Admin User
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.create({
        name: 'MUHAMMED',
        email: 'admin@portfolio.com',
        password: 'adminpassword123',
        role: 'superadmin'
      });
      console.log('[Seed] Created default Admin user: admin@portfolio.com / adminpassword123');
    }

    // 2. Initial Site Settings
    const settingsCount = await SiteSettings.countDocuments();
    if (settingsCount === 0) {
      await SiteSettings.create({
        siteTitle: 'MUHAMMED | Portfolio CMS',
        logoText: 'MUHAMMED',
        contactEmail: 'muhammed@portfolio.dev',
        contactPhone: '+91 9656 000 000',
        location: 'Kochi, Kerala / Remote',
        footerText: '© 2026 MUHAMMED. All rights reserved.',
        maintenanceMode: false,
        previewToken: 'preview-secret-token-12345'
      });
      console.log('[Seed] Created default Site Settings');
    }

    // 3. Initial Hero Section
    const heroCount = await Hero.countDocuments();
    if (heroCount === 0) {
      await Hero.create({
        badge: 'Available for Select Projects',
        titlePrefix: 'Creating Digital',
        highlightText: 'Experiences',
        titleSuffix: 'That Inspire.',
        subtitle: 'Multidisciplinary UI/UX Designer & Front-End Developer crafting high-performance, pixel-perfect web products.',
        primaryBtnText: 'Explore Selected Works',
        primaryBtnLink: '/works',
        secondaryBtnText: 'Get In Touch',
        secondaryBtnLink: '/contact'
      });
      console.log('[Seed] Created default Hero Section');
    }

    // 4. Initial About Section
    const aboutCount = await About.countDocuments();
    if (aboutCount === 0) {
      await About.create({
        title: 'Designing Digital Products & Pixel-Perfect Web Interfaces',
        subtitle: 'Creating intuitive user interfaces, design systems, and responsive web applications for modern digital products.',
        bioParagraphs: [
          "I am a UI/UX Designer & Front-End Developer specialized in intuitive user experiences, design systems, and modern web applications.",
          "My methodology blends aesthetic minimalism with smooth interactive design, delivering ultra-fast user experiences tuned for conversion and engagement."
        ],
        experienceYears: 4,
        completedProjects: 25,
        satisfiedClients: 20,
        avatarUrl: '/assets/profile_photo.jpg',
        resumeUrl: '#'
      });
      console.log('[Seed] Created default About Section');
    }

    // 5. Initial Experiences Data
    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
      await Experience.insertMany([
        {
          title: 'UI/UX Designer & Lead Front-End Developer',
          company: 'Nexus Digital Tech',
          period: '2023 - PRESENT',
          location: 'Kochi, India',
          description: 'Designing intuitive web interfaces, mobile product mockups, and high-conversion client web apps.',
          order: 1
        },
        {
          title: 'UI/UX & Frontend Specialist',
          company: 'Apex Digital Solutions',
          period: '2021 - 2023',
          location: 'Remote',
          description: 'Designed component libraries, GSAP animation pipelines, and Vite React applications.',
          order: 2
        }
      ]);
      console.log('[Seed] Created default Experiences');
    }

    // 6. Initial Education Data
    const eduCount = await Education.countDocuments();
    if (eduCount === 0) {
      await Education.insertMany([
        {
          degree: 'Bachelor of Technology in Computer Science & Engineering',
          institution: 'APJ Abdul Kalam Technological University',
          period: '2017 - 2021',
          location: 'Kerala, India',
          description: 'Specialized in Software Engineering, Algorithms, and Cloud Systems Architecture.',
          order: 1
        }
      ]);
      console.log('[Seed] Created default Education');
    }

    // 7. Initial Services Data
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany([
        {
          title: 'Full Stack Web Engineering',
          shortDesc: 'Custom React & Node.js web applications, APIs, database architecture, and cloud deployment.',
          description: 'Custom React & Node.js web applications, APIs, database architecture, and cloud deployment.',
          tags: ['React', 'Node.js', 'MongoDB'],
          order: 1
        },
        {
          title: 'UI/UX & Design Systems',
          shortDesc: 'Pixel-perfect digital products, interactive Figma prototypes, and responsive design systems.',
          description: 'Pixel-perfect digital products, interactive Figma prototypes, and responsive design systems.',
          tags: ['Figma', 'UI/UX', 'SCSS'],
          order: 2
        },
        {
          title: 'Mobile App Design',
          shortDesc: 'High performance native & hybrid mobile application design for iOS and Android.',
          description: 'High performance native & hybrid mobile application design for iOS and Android.',
          tags: ['iOS UI', 'Android', 'Prototyping'],
          order: 3
        }
      ]);
      console.log('[Seed] Created default Services');
    }

    // 8. Initial Projects Data
    const projectCount = await Project.countDocuments();
    if (projectCount < 8) {
      const initialProjects = [
        {
          title: "Voyagera",
          slug: "voyagera",
          category: "Travel & Hospitality",
          heroImg: "/assets/portfolio/gyogrea.png",
          showcaseImg: "/assets/portfolio/gyogrea.png",
          mobileImg1: "/assets/portfolio/3-greentrack.jpg",
          mobileImg2: "/assets/portfolio/2-elve.jpg",
          technologies: ["Figma", "React", "SCSS", "Motion", "Vercel"],
          client: "Voyagera Group",
          services: "UI/UX & Web Development",
          year: "2026",
          liveUrl: "https://voyageratravel.vercel.app/",
          featured: true,
          order: 1,
          caseStudy: {
            tagline: "World Expeditions & Luxury Havens Travel Platform",
            overview: "Voyagera is a next-generation luxury travel expedition platform engineered to connect global explorers with handpicked luxury retreats.",
            description: [
              "Voyagera is a next-generation luxury travel expedition platform engineered to connect discerning global explorers with handpicked luxury retreats and sacred sanctuaries around the globe.",
              "Built with a strong focus on immersive visual storytelling, fluid interactive destination filtering, and frictionless reservation workflows, the application balances rich photography with crisp typography and modern component architecture.",
              "Every breakpoint and asset pipeline was tuned to ensure sub-second rendering, micro-animations, and fluid touch interactions across all mobile and desktop browsers."
            ],
            outcome: "Delivered a 99+ PageSpeed performance rating with 45% increase in user session duration and seamless booking conversion across mobile and desktop.",
            metrics: [
              { label: "PageSpeed Score", value: "99+" },
              { label: "Session Time", value: "+45%" },
              { label: "Direct Bookings", value: "2.4x" },
              { label: "Load Time", value: "< 0.4s" }
            ]
          }
        },
        {
          title: "Styleora",
          slug: "styleora-fashion-e-commerce",
          category: "E-Commerce & Fashion",
          heroImg: "/assets/portfolio/1-styleora.jpg",
          showcaseImg: "/assets/portfolio/1-styleora.jpg",
          mobileImg1: "/assets/portfolio/1-styleora.jpg",
          mobileImg2: "/assets/portfolio/2-elve.jpg",
          technologies: ["Figma", "React", "SCSS", "Motion", "Vercel"],
          client: "StyleOra Studio",
          services: "UI/UX & Frontend Development",
          year: "2026",
          liveUrl: "https://styleorashop.vercel.app/",
          featured: true,
          order: 2,
          caseStudy: {
            tagline: "Modern Luxury E-Commerce & Retail Flagship",
            overview: "Styleora is an ultra-minimalist e-commerce digital flagship tailored for luxury apparel, haute couture, and premium fashion accessories.",
            outcome: "Engineered a high-conversion digital boutique layout with refined typography, responsive product drawers, and ultra-fast page transitions."
          }
        },
        {
          title: "Elve",
          slug: "elve-creative-agency-portfolio",
          category: "Rental & Mobility",
          heroImg: "/assets/portfolio/2-elve.jpg",
          showcaseImg: "/assets/portfolio/2-elve.jpg",
          mobileImg1: "/assets/portfolio/2-elve.jpg",
          mobileImg2: "/assets/portfolio/1-styleora.jpg",
          technologies: ["React", "GSAP", "Lenis", "SCSS"],
          client: "Elve Mobility",
          services: "UI/UX Design & Development",
          year: "2025",
          liveUrl: "https://elve.vercel.app/",
          featured: true,
          order: 3,
          caseStudy: {
            tagline: "Next-Gen Vehicle & Asset Rental Platform",
            overview: "Elve is a sleek, modern asset and luxury car rental platform built for fast digital reservations and effortless fleet management.",
            outcome: "Redefined mobility booking experience with a futuristic UI design and rapid client conversion."
          }
        },
        {
          title: "Green Track",
          slug: "greentrack-sustainability-dashboard",
          category: "Logistics",
          heroImg: "/assets/portfolio/3-greentrack.jpg",
          showcaseImg: "/assets/portfolio/3-greentrack.jpg",
          mobileImg1: "/assets/portfolio/3-greentrack.jpg",
          mobileImg2: "/assets/portfolio/gyogrea.png",
          technologies: ["React", "Chart.js", "SCSS", "Node.js"],
          client: "GreenTrack Eco",
          services: "UI/UX, Dashboards, Web App",
          year: "2025",
          liveUrl: "https://greentrack-ten.vercel.app/",
          featured: true,
          order: 4,
          caseStudy: {
            tagline: "ESG Analytics & Enterprise Carbon Accounting Platform",
            overview: "Green Track is an enterprise-grade sustainability intelligence platform enabling corporations to track Scope 1, 2, and 3 emissions in real-time.",
            outcome: "Streamlined ESG compliance reporting for international clients with intuitive visual analytics."
          }
        },
        {
          title: "Travel Gallery",
          slug: "travelgallery-curated-destinations",
          category: "Travel & Photography",
          heroImg: "/assets/portfolio/4-travellgallery.jpg",
          showcaseImg: "/assets/portfolio/4-travellgallery.jpg",
          mobileImg1: "/assets/portfolio/4-travellgallery.jpg",
          mobileImg2: "/assets/portfolio/5-icone-hotel-booking.jpg",
          technologies: ["HTML5", "SCSS", "JavaScript", "Masonry"],
          client: "Travel Gallery Co",
          services: "UI/UX & Web Development",
          year: "2025",
          liveUrl: "",
          featured: false,
          order: 5,
          caseStudy: {
            tagline: "Curated Global Destination & Visual Experience Hub",
            overview: "Travel Gallery showcases world-class destination photography and curated itinerary guides in a sleek responsive layout.",
            outcome: "Increased user engagement through immersive full-bleed imagery and intuitive destination discovery."
          }
        },
        {
          title: "Icone Hotel Booking",
          slug: "icone-luxury-hotel-booking",
          category: "Hospitality & Mobile",
          heroImg: "/assets/portfolio/5-icone-hotel-booking.jpg",
          showcaseImg: "/assets/portfolio/5-icone-hotel-booking.jpg",
          mobileImg1: "/assets/portfolio/5-icone-hotel-booking.jpg",
          mobileImg2: "/assets/portfolio/6-chrona.jpg",
          technologies: ["Figma", "React Native", "Tailwind", "Vercel"],
          client: "Icone Hotels",
          services: "UI/UX & App Prototyping",
          year: "2025",
          liveUrl: "",
          featured: false,
          order: 6,
          caseStudy: {
            tagline: "Boutique Hospitality & Suite Reservation Experience",
            overview: "Icone Hotel Booking is a luxury boutique hotel booking interface designed for seamless suite selection.",
            outcome: "Achieved highest direct booking conversion for luxury boutique stays."
          }
        },
        {
          title: "Chrona",
          slug: "chrona-ai-time-management-app",
          category: "Productivity & AI",
          heroImg: "/assets/portfolio/6-chrona.jpg",
          showcaseImg: "/assets/portfolio/6-chrona.jpg",
          mobileImg1: "/assets/portfolio/6-chrona.jpg",
          mobileImg2: "/assets/portfolio/7-modernbrand.jpg",
          technologies: ["React", "AI APIs", "Node", "SCSS"],
          client: "Chrona Labs",
          services: "Interface & Product Design",
          year: "2025",
          liveUrl: "",
          featured: false,
          order: 7,
          caseStudy: {
            tagline: "Intelligent Productivity & Task Scheduling System",
            overview: "Chrona harnesses AI algorithms to automate daily calendar scheduling, focus blocks, and team workload distribution.",
            outcome: "Boosted user daily productivity ratings while reducing calendar fragmentation."
          }
        },
        {
          title: "Modern Brand",
          slug: "modernbrand-identity-system",
          category: "Branding & Systems",
          heroImg: "/assets/portfolio/7-modernbrand.jpg",
          showcaseImg: "/assets/portfolio/7-modernbrand.jpg",
          mobileImg1: "/assets/portfolio/7-modernbrand.jpg",
          mobileImg2: "/assets/portfolio/gyogrea.png",
          technologies: ["Figma", "Illustrator", "SCSS", "Vercel"],
          client: "Modern Brand Corp",
          services: "Brand Strategy & UI/UX",
          year: "2025",
          liveUrl: "",
          featured: false,
          order: 8,
          caseStudy: {
            tagline: "Cohesive Visual Identity & Design Guidelines",
            overview: "Modern Brand Identity System defines design token guidelines, typography rules, component libraries, and visual design assets.",
            outcome: "Established a unified visual language adopted by cross-functional product and marketing teams."
          }
        }
      ];

      for (const proj of initialProjects) {
        const existing = await Project.findOne({ slug: proj.slug });
        if (!existing) {
          await Project.create(proj);
        }
      }
      console.log(`[Seed] Inserted initial projects up to ${initialProjects.length}`);
    }

    // 9. Initial Skills Data
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      const initialSkills = [
        // Design
        { name: 'Figma', category: 'Design', percentage: 95, order: 1 },
        { name: 'Adobe Photoshop', category: 'Design', percentage: 90, order: 2 },
        { name: 'Wireframing & Prototyping', category: 'Design', percentage: 95, order: 3 },
        { name: 'Design Systems', category: 'Design', percentage: 92, order: 4 },
        { name: 'Mobile & Web Interface Design', category: 'Design', percentage: 94, order: 5 },
        { name: 'UI Animation & Interaction', category: 'Design', percentage: 88, order: 6 },
        // Frontend Development
        { name: 'HTML5', category: 'Frontend Development', percentage: 98, order: 7 },
        { name: 'CSS3', category: 'Frontend Development', percentage: 95, order: 8 },
        { name: 'JavaScript', category: 'Frontend Development', percentage: 92, order: 9 },
        { name: 'Bootstrap', category: 'Frontend Development', percentage: 90, order: 10 },
        { name: 'GSAP', category: 'Frontend Development', percentage: 85, order: 11 },
        { name: 'Responsive Design', category: 'Frontend Development', percentage: 96, order: 12 },
        { name: 'GitHub', category: 'Frontend Development', percentage: 88, order: 13 },
        // Soft Skills
        { name: 'Creative Thinking', category: 'Soft Skills', percentage: 95, order: 14 },
        { name: 'Communication', category: 'Soft Skills', percentage: 90, order: 15 },
        { name: 'Problem Solving', category: 'Soft Skills', percentage: 94, order: 16 },
        { name: 'Collaboration', category: 'Soft Skills', percentage: 92, order: 17 }
      ];
      await Skill.insertMany(initialSkills);
      console.log(`[Seed] Inserted ${initialSkills.length} initial skills`);
    }

    console.log('[Seed] Database seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error(`[Seed Error] ${error.message}`);
    process.exit(1);
  }
};

if (require.main === module) {
  seedData();
}

module.exports = seedData;
