export const projectsData = [
  {
    id: "restaurant-website",
    slug: "restaurant-website",
    title: "Ronaraiksa",
    subtitle: "Authentic Saudi Culinary Restaurant Website",
    category: "Web Development",
    secondaryCategories: ["Web Design", "UI/UX Design"],
    thumbnail: "/assets/images/project-ronaraiksa-restaurant.jpg",
    desktopMockup: "/assets/images/project-ronaraiksa-restaurant.jpg",
    tabletMockup: "/assets/images/project-ronaraiksa-restaurant.jpg",
    phoneMockup: "/assets/images/project-mobile-app-mahora.png",
    client: "Ronaraiksa Authentic Restaurant",
    period: "2026",
    role: "UI/UX Designer & Front-End Developer",
    tools: ["Figma", "HTML5", "CSS3", "JavaScript", "Bootstrap Grid", "Responsive Design"],
    isConcept: false,
    featured: true,
    summary: "Designed the complete user experience in Figma and developed a pixel-perfect, responsive website for an authentic Saudi Arabian dining brand.",
    background: "Ronaraiksa is a restaurant brand celebrating authentic Saudi grills, traditional recipes, and warm hospitality. The objective was to create a digital home that translates their culinary atmosphere into a contemporary, mouth-watering website with interactive menus and mobile-first ordering accessibility.",
    problemStatement: "The dining brand previously lacked a cohesive digital presence that reflected their culinary excellence. Visitors needed a clear, frictionless way to explore dishes, review ingredients, discover special grilling techniques, and easily access contact and reservation details across all smartphone and desktop screens.",
    objectives: [
      "Design an engaging, appetite-inducing visual interface centered on culinary imagery and warm brand accents.",
      "Convert high-fidelity Figma artboards into a responsive, semantic codebase with zero layout shift.",
      "Ensure fast load times and clean mobile-first navigation for on-the-go patrons."
    ],
    targetAudience: "Food enthusiasts, families, and professionals seeking authentic Saudi culinary experiences and grill specialties in the region.",
    designProcess: [
      { step: "01. Research", desc: "Studied competitors in the GCC dining sector to understand menu hierarchy and high-converting reservation layouts." },
      { step: "02. Wireframing", desc: "Structured low-fidelity wireframes in Figma prioritizing prominent menu discovery and location finders." },
      { step: "03. Visual Design", desc: "Built appetizing dark & warm accents with clean typography and generous whitespace around photography." },
      { step: "04. Front-End Build", desc: "Implemented semantic HTML5, custom CSS3, JavaScript interactions, and responsive grid layouts." }
    ],
    keyFeatures: [
      "Interactive dish showcase highlighting fresh ingredients and traditional marinades.",
      "Mobile-optimized menu navigation with quick category jumping.",
      "Direct reservation and contact inquiry integration.",
      "Cross-browser tested responsive layout adapting to screens from 320px to 4K."
    ],
    challengesAndSolutions: [
      {
        challenge: "Balancing high-resolution food photography without sacrificing mobile performance and page speed.",
        solution: "Employed modern compressed image assets, responsive aspect ratios, and asynchronous loading techniques."
      },
      {
        challenge: "Maintaining strict pixel parity between Figma wireframes and the final HTML/CSS layout.",
        solution: "Established consistent CSS tokens for typography, container spacing, and grid constraints matching the Figma design system."
      }
    ],
    outcomes: "Delivered a fully responsive, pixel-perfect website that provides seamless menu browsing and brand credibility, maintaining total consistency between the Figma design and live frontend.",
    prevSlug: "event-website",
    nextSlug: "erp-dashboard"
  },
  {
    id: "erp-dashboard",
    slug: "erp-dashboard",
    title: "BizDot Dashboard Redesign",
    subtitle: "Enterprise ERP System Modernization",
    category: "Dashboard",
    secondaryCategories: ["UI/UX Design"],
    thumbnail: "/assets/images/project-erp-bizdot.jpg",
    desktopMockup: "/assets/images/project-erp-bizdot.jpg",
    tabletMockup: "/assets/images/project-erp-bizdot.jpg",
    phoneMockup: "/assets/images/project-mobile-app-mahora.png",
    client: "BizDot Enterprise Software",
    period: "2026",
    role: "UI/UX Redesign & Frontend Enhancement",
    tools: ["Figma", "Dashboard Design", "Design Systems", "Data Visualization", "Auto Layout"],
    isConcept: false,
    featured: true,
    summary: "Comprehensive UX/UI overhaul of an existing enterprise ERP dashboard, reorganizing complex workflows into intuitive KPI cards, clean data tables, and structured navigation.",
    background: "BizDot's legacy enterprise resource planning software suffered from cluttered data presentations, redundant navigation menus, and poor readability on varying display monitors. Muhammed K led the user-centered redesign to streamline daily operations for management teams and inventory controllers.",
    problemStatement: "Users reported fatigue and high cognitive load when navigating stock lists, order statuses, and financial metrics. The dense visual arrangement lacked clear hierarchy and modular consistency.",
    objectives: [
      "Establish an atomic design system with reusable UI tokens for tables, badges, and filters.",
      "Design scannable KPI cards and financial overview components for quick decision-making.",
      "Ensure clean responsive behavior across desktop monitors and tablet views without breaking tabular data."
    ],
    targetAudience: "Operations managers, supply chain controllers, and executive stakeholders managing high-frequency transactions.",
    designProcess: [
      { step: "01. Stakeholder Audit", desc: "Analyzed existing workflows and pain points across inventory, orders, and customer management." },
      { step: "02. Information Architecture", desc: "Consolidated nested submenus into a streamlined sidebar and global search system." },
      { step: "03. Component System", desc: "Designed standardized status badges (In Stock, Low Stock, Pending), button styles, and card tokens in Figma." },
      { step: "04. Prototype & Validation", desc: "Tested high-fidelity clickable prototypes with users to verify speed of task completion." }
    ],
    keyFeatures: [
      "Executive KPI summary widgets displaying live revenue, stock velocity, and order queues.",
      "Modular product catalog table with inline status toggles, SKU tracking, and action menus.",
      "Unified design system with scalable typography and neutral background surfaces.",
      "Responsive container architecture preserving essential controls across varying screen sizes."
    ],
    challengesAndSolutions: [
      {
        challenge: "Dense tabular data required displaying many columns without horizontal clutter or loss of context.",
        solution: "Introduced clear visual row separation, subtle status pills, contextual action drawers, and sticky header controls."
      },
      {
        challenge: "Preserving familiar functionality for existing operators while fundamentally modernizing visual clarity.",
        solution: "Retained core logical workflows while dramatically enhancing contrast, typography hierarchy, and padding."
      }
    ],
    outcomes: "Significantly improved visual hierarchy, task clarity, and dashboard aesthetics, turning a complex enterprise tool into a delightful, professional workspace.",
    prevSlug: "restaurant-website",
    nextSlug: "event-website"
  },
  {
    id: "event-website",
    slug: "event-website",
    title: "Gemini Music Award",
    subtitle: "National Music Talent Hunt 2026 Malayalam",
    category: "Web Development",
    secondaryCategories: ["Web Design", "UI/UX Design"],
    thumbnail: "/assets/images/project-gemini-music.jpg",
    desktopMockup: "/assets/images/project-gemini-music.jpg",
    tabletMockup: "/assets/images/project-gemini-music.jpg",
    phoneMockup: "/assets/images/project-mobile-app-mahora.png",
    client: "Gemini Film & Music Production House",
    period: "2026",
    role: "UI/UX & Front-End Development",
    tools: ["Figma", "HTML5", "CSS3", "JavaScript", "cPanel Deployment"],
    isConcept: false,
    featured: true,
    summary: "End-to-end design and responsive development for a nationwide music competition, featuring participant age categories, audition guidelines, jury showcases, and media galleries.",
    background: "Gemini National Music Talent Hunt 2026 serves as the official gateway to the prestigious Gemini National Music Award Show. The production house needed a high-impact, celebratory website to manage audition registrations and build excitement across the Malayalam music community.",
    problemStatement: "The talent hunt required a streamlined digital registration platform capable of explaining competition criteria, multi-stage audition requirements, rules, and jury profiles clearly to applicants of all age groups.",
    objectives: [
      "Craft a grand, cinematic aesthetic with golden accents and rich contrast reflecting the prestige of musical awards.",
      "Build intuitive, mobile-accessible audition guidance for five age-based participant brackets.",
      "Deploy a rock-solid, production-ready website with sitemap-driven sections on cPanel hosting."
    ],
    targetAudience: "Aspiring vocalists, musicians, music students, and fans across Kerala and the global Malayalam diaspora.",
    designProcess: [
      { step: "01. Concept & Sitemap", desc: "Structured user flow for competition rules, jury bios, audition submissions, and reward showcases." },
      { step: "02. Visual Identity", desc: "Formulated a premium dark and gold color scheme with subtle radiant lighting and elegant serif typography." },
      { step: "03. Frontend Engineering", desc: "Developed responsive interactive sections with custom CSS, carousels, and registration CTAs." },
      { step: "04. Testing & Deployment", desc: "Conducted cross-browser audits, mobile viewport checks, and deployed live to cPanel." }
    ],
    keyFeatures: [
      "Hero section with dynamic lighting accents and prominent registration call-to-actions.",
      "Categorized age bracket guidelines with transparent rule breakdowns.",
      "Distinguished jury and mentor showcase celebrating recognized industry maestros.",
      "Event highlights, rewards structure, sponsors grid, and interactive image carousel."
    ],
    challengesAndSolutions: [
      {
        challenge: "Organizing an extensive volume of competition rules and category criteria without overwhelming first-time applicants.",
        solution: "Implemented modular accordion cards and tabbed category navigators that unfold details on demand."
      },
      {
        challenge: "Delivering a luxurious, media-rich visual presentation while keeping asset weights light for mobile connections.",
        solution: "Crafted vector SVG motifs and lightweight CSS gradient glows instead of heavy full-bleed video backgrounds."
      }
    ],
    outcomes: "Successfully launched the official talent hunt portal, facilitating seamless online discovery and registration for aspiring artists nationwide.",
    prevSlug: "erp-dashboard",
    nextSlug: "logistics-website"
  },
  {
    id: "logistics-website",
    slug: "logistics-website",
    title: "GreenTrack",
    subtitle: "International Cargo & Freight Service Platform",
    category: "Web Design",
    secondaryCategories: ["Web Development", "UI/UX Design"],
    thumbnail: "/assets/images/project-greentrack-logistics.png",
    desktopMockup: "/assets/images/project-greentrack-logistics.png",
    tabletMockup: "/assets/images/project-greentrack-logistics.png",
    phoneMockup: "/assets/images/project-mobile-app-mahora.png",
    client: "Green Track International Cargo Service",
    period: "2026",
    role: "UI/UX Designer",
    tools: ["Figma", "Wireframing", "Responsive Layout", "Information Architecture"],
    isConcept: false,
    featured: false,
    summary: "Strategic UI/UX design for a global logistics and freight forwarder, emphasizing transparent cost calculations, shipment tracking discovery, and commercial supply chain solutions.",
    background: "GreenTrack provides worldwide multimodal transportation solutions across rail, ocean, and air freight. The platform required a confident, modern digital presence to communicate reliability, competitive shipping rates, and seamless logistics coordination.",
    problemStatement: "Prospective cargo shippers often struggle to find clear service differentiators, quote forms, and tracking access on traditional, cluttered logistics websites.",
    objectives: [
      "Design an authoritative, clean user interface centered around commercial freight capabilities.",
      "Highlight shipping cost-efficiency and international cargo corridors prominently.",
      "Create clear calls to action for rate quotes, service overviews, and client login access."
    ],
    targetAudience: "Importers, exporters, corporate procurement officers, and individual cargo senders requiring international logistics.",
    designProcess: [
      { step: "01. Discovery", desc: "Identified high-priority user actions: service discovery, quotation requests, and shipment status." },
      { step: "02. Layout Structure", desc: "Developed a clean hero composition pairing real industrial freight photography with a crisp navigation bar." },
      { step: "03. Service Architecture", desc: "Segmented multimodal logistics (rail, sea, air, road) into clear comparative cards." }
    ],
    keyFeatures: [
      "Hero banner featuring authentic freight corridor visuals and clear value proposition.",
      "Direct portal access for client account authentication and shipment tracking.",
      "Service discovery modules detailing package size, weight, and delivery speed parameters.",
      "Responsive typography and navigation scaling gracefully across devices."
    ],
    challengesAndSolutions: [
      {
        challenge: "Logistics websites often feel impersonal and overly technical.",
        solution: "Blended clean typography, generous whitespace, and human-centric messaging highlighting affordability and trust."
      }
    ],
    outcomes: "Created a modern, trustworthy interface that elevates GreenTrack's international standing in commercial freight forwarding.",
    prevSlug: "event-website",
    nextSlug: "ecommerce-website"
  },
  {
    id: "ecommerce-website",
    slug: "ecommerce-website",
    title: "Styleora",
    subtitle: "Timeless Essentials Fashion E-Commerce",
    category: "Web Design",
    secondaryCategories: ["Web Development", "UI/UX Design"],
    thumbnail: "/assets/images/project-ecommerce-styleora.jpg",
    desktopMockup: "/assets/images/project-ecommerce-styleora.jpg",
    tabletMockup: "/assets/images/project-ecommerce-styleora.jpg",
    phoneMockup: "/assets/images/project-mobile-app-mahora.png",
    client: "Styleora Apparel",
    period: "2026",
    role: "UI/UX Designer & Frontend Developer",
    tools: ["Figma", "HTML5", "CSS3", "JavaScript", "Responsive Design"],
    isConcept: false,
    featured: false,
    summary: "Curated fashion e-commerce storefront featuring minimalist editorial aesthetics, intuitive category browsing, and frictionless product exploration.",
    background: "Styleora is a contemporary menswear and essentials brand dedicated to premium craftsmanship, understated luxury, and sustainable tailoring. The website needed an editorial, lookbook-inspired experience that lets the garments take center stage.",
    problemStatement: "Many fashion websites suffer from visual clutter, aggressive promotional banners, and convoluted filter menus that detract from garment craftsmanship.",
    objectives: [
      "Create an elevated editorial layout with refined typography and spacious art direction.",
      "Streamline browsing paths from lookbook inspiration to product details and cart checkout.",
      "Ensure ultra-smooth micro-interactions on hover and mobile touch screens."
    ],
    targetAudience: "Discerning shoppers seeking curated, minimalist essentials with attention to tailoring and material quality.",
    designProcess: [
      { step: "01. Editorial Direction", desc: "Curated moodboards focusing on muted neutrals, bespoke serif accents, and lifestyle photography." },
      { step: "02. Grid System", desc: "Crafted an asymmetric editorial grid allowing hero collections to alternate with product catalog tiles." },
      { step: "03. Interactive Prototype", desc: "Tested quick-view modals, cart flyouts, and seamless mobile filter drawers in Figma." }
    ],
    keyFeatures: [
      "Full-bleed hero banner featuring seasonal collections with subtle typography overlays.",
      "Clean navigation header with integrated search, wishlists, and bag counters.",
      "Responsive product grids with fluid image aspect ratios and instant hover previews.",
      "Frictionless checkout path designed with accessibility and minimal form fields."
    ],
    challengesAndSolutions: [
      {
        challenge: "Combining high-fashion editorial imagery with conversion-focused e-commerce UI patterns.",
        solution: "Kept navigational controls minimal and translucent, placing focus on garment texture and styling stories."
      }
    ],
    outcomes: "Delivered a sophisticated, premium web experience that elevated brand perception and streamlined product discovery.",
    prevSlug: "logistics-website",
    nextSlug: "travel-website"
  },
  {
    id: "travel-website",
    slug: "travel-website",
    title: "Nādvora",
    subtitle: "Bespoke World Expeditions & Sacred Havens",
    category: "Web Design",
    secondaryCategories: ["UI/UX Design"],
    thumbnail: "/assets/images/project-nadvora-travel.png",
    desktopMockup: "/assets/images/project-nadvora-travel.png",
    tabletMockup: "/assets/images/project-nadvora-travel.png",
    phoneMockup: "/assets/images/project-mobile-app-mahora.png",
    client: "Nādvora Bespoke Travel Co.",
    period: "2026",
    role: "Lead UI/UX Designer",
    tools: ["Figma", "Editorial Layout", "Design System", "Prototyping"],
    isConcept: false,
    featured: false,
    summary: "Immersive luxury travel portal curating unlisted private residences, remote wilderness retreats, and mindful expeditions across the globe.",
    background: "Nādvora caters to high-net-worth travelers seeking tranquility, restorative natural environments, and bespoke itineraries away from mainstream tourist crowds. The digital presence needed to evoke stillness, wonder, and uncompromising refinement.",
    problemStatement: "Standard booking engines feel transactional and crowded. Nādvora required an evocative, story-driven digital journey that feels like opening a luxury coffee-table publication.",
    objectives: [
      "Evoke an emotional response through breathtaking nature vistas and poetic typography.",
      "Design an unlisted preference selector allowing discerning travelers to unlock private retreats.",
      "Develop responsive layouts that retain majesty across desktop displays and mobile viewports."
    ],
    targetAudience: "Discerning luxury travelers, wellness seekers, and honeymooners desiring private, uncrowded cultural expeditions.",
    designProcess: [
      { step: "01. Narrative Discovery", desc: "Crafted key brand pillars: stillness, architectural beauty, and cultural reverence." },
      { step: "02. Editorial Typography", desc: "Paired elegant serif headlines with clean, legible sans-serif body copy." },
      { step: "03. Interactive Expedition Cards", desc: "Designed subtle glass floating badges and custom preference curation selectors." }
    ],
    keyFeatures: [
      "Lush, full-screen scenic hero with floating sanctuary discovery call-to-actions.",
      "Tailored expeditions filter for curated preferences (Kyoto, Amalfi, Swiss Alps).",
      "Seamless inquiry workflow linking travelers directly with dedicated private expedition curators.",
      "Responsive card layouts optimized for pristine color fidelity and depth."
    ],
    challengesAndSolutions: [
      {
        challenge: "Conveying the feeling of rare tranquility while maintaining clear navigation to booking actions.",
        solution: "Used soft glassmorphism overlays and restrained CTA buttons with subtle micro-interactions."
      }
    ],
    outcomes: "Created an awe-inspiring, tranquil travel portal that positioned Nādvora as an ultra-luxury expedition curator.",
    prevSlug: "ecommerce-website",
    nextSlug: "mobile-app"
  },
  {
    id: "mobile-app",
    slug: "mobile-app",
    title: "Mahora Travel App",
    subtitle: "Mobile Sanctuary & Expedition Companion",
    category: "Mobile App",
    secondaryCategories: ["UI/UX Design"],
    thumbnail: "/assets/images/project-mobile-app-mahora.png",
    desktopMockup: "/assets/images/project-nadvora-travel.png",
    tabletMockup: "/assets/images/project-nadvora-travel.png",
    phoneMockup: "/assets/images/project-mobile-app-mahora.png",
    client: "Mahora Responsible Travel",
    period: "2026",
    role: "Mobile UI/UX Designer",
    tools: ["Figma", "Auto Layout", "iOS Human Interface Guidelines", "Micro-interactions"],
    isConcept: false,
    featured: false,
    summary: "Thoughtfully crafted native mobile interface designed for mindful travelers to discover protected natural destinations and sustainable cultural journeys.",
    background: "Mahora is a mobile companion focused on responsible travel for a better tomorrow. Designed specifically for smartphones, the app provides curated destination guides, offline sanctuary itineraries, and ethical tourism recommendations in one thumb-accessible interface.",
    problemStatement: "Mobile travel apps frequently overwhelm travelers with aggressive push notifications, cramped flight tables, and cluttered ads while on the move in remote regions.",
    objectives: [
      "Implement a calm, distraction-free mobile UI adhering strictly to thumb-zone ergonomic guidelines.",
      "Create high-contrast, readable cards that function effortlessly in bright outdoor sunlight.",
      "Design accessible bottom sheets, smooth swipe gestures, and tactile feedback states."
    ],
    targetAudience: "Mindful globetrotters, backpackers, eco-tourists, and cultural explorers using mobile devices during transit.",
    designProcess: [
      { step: "01. Ergonomic Mapping", desc: "Mapped primary interactive targets to the natural bottom third of smartphone displays." },
      { step: "02. High-Fidelity UI", desc: "Designed rounded cards with generous touch margins (48x48px min) and organic border radii." },
      { step: "03. Motion Prototyping", desc: "Simulated realistic card transitions, spring-damping drags, and tab switching in Figma." }
    ],
    keyFeatures: [
      "Floating action buttons and gesture-driven card carousels for easy single-handed navigation.",
      "Curated destination pills highlighting carbon-neutral and community-backed stays.",
      "Integrated emergency, weather, and trail offline guides with crisp typography.",
      "Adaptive dark/light theme designed for optimal battery life and readability."
    ],
    challengesAndSolutions: [
      {
        challenge: "Fitting rich destination storytelling into limited vertical smartphone screen space.",
        solution: "Employed expandable bottom sheets and progressive disclosure cards that reveal details upon tap."
      }
    ],
    outcomes: "Engineered an elegant, ergonomic mobile application interface praised for its calm aesthetic and effortless usability on the move.",
    prevSlug: "travel-website",
    nextSlug: "saas-platform"
  },
  {
    id: "saas-platform",
    slug: "saas-platform",
    title: "Nova Cloud Store",
    subtitle: "Unified Commerce & Inventory SaaS Platform",
    category: "UI/UX Design",
    secondaryCategories: ["Dashboard", "Web Design"],
    thumbnail: "/assets/images/project-saas-nova.jpg",
    desktopMockup: "/assets/images/project-saas-nova.jpg",
    tabletMockup: "/assets/images/project-erp-bizdot.jpg",
    phoneMockup: "/assets/images/project-mobile-app-mahora.png",
    client: "Nova Platform (Conceptual Case Study)",
    period: "2026",
    role: "Product Designer & UI Architect",
    tools: ["Figma", "SaaS Architecture", "Component Library", "Design Tokens"],
    isConcept: true,
    featured: false,
    summary: "A clearly labelled conceptual SaaS platform streamlining multi-channel retail inventory, automated stock reorders, and centralized product listings for modern commerce merchants.",
    background: "Nova is a conceptual enterprise SaaS platform designed to explore how modern cloud merchants can manage omnichannel catalogs, multi-storefront inventories, and customer deliveries from a single harmonious dashboard.",
    problemStatement: "Modern sellers juggle disconnected storefronts, leading to overselling, stockout errors, and fragmented customer data. The concept explores a unified single-pane-of-glass architecture.",
    objectives: [
      "Architect a scalable modular component system supporting thousands of SKU variations.",
      "Design intelligent automated alert cards for low stock and seasonal demand spikes.",
      "Deliver a modern, minimalist interface combining retail front-end warmth with enterprise efficiency."
    ],
    targetAudience: "Direct-to-consumer brand founders, inventory coordinators, and e-commerce operation teams.",
    designProcess: [
      { step: "01. Concept Definition", desc: "Defined core workflows: automated catalog synchronization, warehouse alerts, and unified order logs." },
      { step: "02. Design System Setup", desc: "Crafted neutral surface tokens, violet-accented primary actions, and clear status feedback badges." },
      { step: "03. Interactive Modules", desc: "Designed quick-action drawers for adding products, bulk updating prices, and tracking inventory velocity." }
    ],
    keyFeatures: [
      "Omnichannel product catalog with live stock indicators and instant price edit modals.",
      "Intelligent demand forecasting widgets highlighting upcoming reorder thresholds.",
      "Multi-storefront switcher allowing instant toggling between retail channels.",
      "Customizable table column configurations and export capabilities."
    ],
    challengesAndSolutions: [
      {
        challenge: "Designing for both high-density enterprise operations and modern, friendly consumer-grade usability.",
        solution: "Used generous line spacing, high-contrast typography, and restrained accent colors that emphasize actionable data."
      }
    ],
    outcomes: "Created an inspiring, comprehensive SaaS platform concept showcasing advanced product architecture and design system expertise.",
    prevSlug: "mobile-app",
    nextSlug: "restaurant-website"
  }
];
