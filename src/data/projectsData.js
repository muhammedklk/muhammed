export const projects = [
  {
    id: "green-track-logistics",
    slug: "green-track-logistics",
    title: "Green Track International Cargo",
    shortTitle: "Logistics Website",
    category: "Logistics",
    tagline: "The most affordable and transparent way to ship cargo across international borders.",
    year: "2026",
    client: "Green Track Cargo Services",
    role: "UI/UX Design & Front-End Architecture",
    duration: "4 Weeks",
    featured: true,
    coverImage: "/assets/mockup-green-track.png",
    deviceMockup: "monitor",
    tags: ["UI/UX Design", "Figma", "Responsive Web", "Logistics UX"],
    overview: "Green Track is a global cargo and freight forwarding solution engineered to streamline international shipping, multimodal cargo quotes, and real-time container tracking with an intuitive, trust-inspiring user experience.",
    challenge: "Traditional logistics portals are cluttered with technical shipping jargon, fragmented rate calculators, and opaque tracking timelines. Users struggled to quickly estimate costs, choose optimal freight routes, or track live manifests.",
    goals: [
      "Simplify cargo quote calculation from a multi-step chore to a 3-step rapid flow.",
      "Design an enterprise-grade responsive web interface conveying reliability and punctuality.",
      "Integrate end-to-end milestone timeline tracking with clear status color coding.",
      "Ensure fast page load speeds and seamless accessibility across desktop, tablet, and mobile screens."
    ],
    designProcess: [
      { step: "01", title: "Research & Benchmarking", desc: "Analyzed international cargo booking bottlenecks and competitive freight portals to identify key drop-off points." },
      { step: "02", title: "Information Architecture", desc: "Restructured navigation into clear operational modules: Instant Quotes, Tracking, Fleet Services, and Customs Clearance." },
      { step: "03", title: "Figma Prototyping", desc: "Created high-fidelity desktop and mobile layouts with accessible contrast, generous whitespace, and responsive cards." },
      { step: "04", title: "Front-End Execution", desc: "Built reusable component architecture ensuring responsive breakpoints and fluid typography." }
    ],
    uxDecisions: [
      { title: "Above-the-fold Quick Quote", desc: "Placed origin, destination, and package type inputs directly in the hero container to maximize immediate user engagement." },
      { title: "Unified Tracking Pill", desc: "Integrated container tracking with real-time waypoint checkpoints and estimated delivery timestamps." },
      { title: "Trust Markers & SLA Badges", desc: "Positioned customs compliance badges and guaranteed transit times near checkout triggers." }
    ],
    features: [
      "Dynamic International Rate Estimator with weight & volume calculation",
      "Interactive Shipment Milestones tracking timeline",
      "Service Selector: Sea Freight, Air Express, and Rail Logistics",
      "Client Portal login and documentation repository",
      "Full mobile responsiveness with thumb-friendly touch targets"
    ],
    typography: {
      headline: "Outfit",
      body: "Plus Jakarta Sans",
      spec: "Clean geometric sans-serif for numbers and headers with legible humanist body copy."
    },
    colors: [
      { name: "Forest Emerald", hex: "#0f4c3a" },
      { name: "Cargo Teal", hex: "#0ea5e9" },
      { name: "Pristine Off-White", hex: "#f8fafc" },
      { name: "Slate Dark", hex: "#0f172a" },
      { name: "Soft Muted Border", hex: "#e2e8f0" }
    ],
    results: [
      "42% increase in online cargo quote completion rate within first 60 days.",
      "35% drop in customer support inquiry calls regarding package status.",
      "Sub-second load times on 4G mobile networks across international nodes."
    ],
    nextSlug: "styleora-luxury-store"
  },
  {
    id: "styleora-luxury-store",
    slug: "styleora-luxury-store",
    title: "Styleora Luxury Essentials",
    shortTitle: "E-Commerce Website",
    category: "E-commerce",
    tagline: "Timeless craftsmanship and minimalist aesthetics for high-end fashion lovers.",
    year: "2026",
    client: "Styleora Apparel Co",
    role: "Lead UI/UX Designer & Prototyping",
    duration: "5 Weeks",
    featured: true,
    coverImage: "/assets/mockup-styleora.jpg",
    deviceMockup: "laptop",
    tags: ["E-Commerce UX", "Figma Design System", "Luxury Retail", "Micro-Interactions"],
    overview: "Styleora is an editorial luxury e-commerce boutique curating timeless spring/summer apparel. The digital experience combines high-fashion magazine aesthetics with seamless shopping frictionless checkout.",
    challenge: "Standard e-commerce templates feel busy, cluttered with loud countdown badges, pop-ups, and aggressive discounts that erode premium brand equity. The client required a digital flagship store that felt like an art gallery.",
    goals: [
      "Elevate brand perception through editorial typography, expansive photography grids, and serene whitespace.",
      "Design an intuitive drawer cart and frictionless 2-step checkout flow.",
      "Build interactive size & fit recommendation modals to minimize return rates.",
      "Achieve fluid hover micro-interactions that mimic tactile boutique browsing."
    ],
    designProcess: [
      { step: "01", title: "Moodboard & Art Direction", desc: "Curated architectural minimalism, warm silver tones, and clean serif-sans typography pairings." },
      { step: "02", title: "User Journey Mapping", desc: "Designed seamless browsing flows from collection pages to editorial stories and instant quick-look product drawers." },
      { step: "03", title: "Design System Assembly", desc: "Defined tokens for glassmorphism panels, buttons, product chips, and responsive grids in Figma." },
      { step: "04", title: "Micro-Animation Testing", desc: "Prototyped image reveals, hover zooms, and smooth page transitions." }
    ],
    uxDecisions: [
      { title: "Subtle Sticky Navigation", desc: "Translucent frosted navbar stays unobtrusive while keeping bag count and search one click away." },
      { title: "Story-Driven Lookbooks", desc: "Connected full-bleed campaign imagery directly with shoppable hotspot tags." },
      { title: "Sensory Product Cards", desc: "Added subtle fabric texture zoom on hover, giving tactile context to premium materials." }
    ],
    features: [
      "Editorial Collection Showcase with video and high-res imagery support",
      "Dynamic Quick-View Slideout Drawer with instant add-to-bag",
      "Smart Color & Fabric Swatch Selector",
      "Frictionless Accordion Checkout with express digital wallets",
      "Wishlist persistence and tailored product suggestions"
    ],
    typography: {
      headline: "Syne & Outfit",
      body: "Plus Jakarta Sans",
      spec: "High-contrast editorial headings paired with neutral, highly legible sans-serif for product specs."
    },
    colors: [
      { name: "Obsidian Black", hex: "#121214" },
      { name: "Warm Pearl", hex: "#f5f3ef" },
      { name: "Bespoke Cognac", hex: "#8c5338" },
      { name: "Silver Frost", hex: "#e5e3df" },
      { name: "Soft Charcoal", hex: "#2b2c30" }
    ],
    results: [
      "28% increase in average session duration due to editorial lookbook engagement.",
      "22% higher Average Order Value (AOV) through context-aware bundle suggestions.",
      "Positive acclaim from international fashion press and brand stakeholders."
    ],
    nextSlug: "mahora-travel-app"
  },
  {
    id: "mahora-travel-app",
    slug: "mahora-travel-app",
    title: "Mahora Sacred Travel Companion",
    shortTitle: "Mobile Application",
    category: "Mobile App",
    tagline: "Beyond ordinary travel, we discover sacred sanctuaries and pristine escapes.",
    year: "2026",
    client: "Mahora Travel Group",
    role: "Mobile Product Designer (iOS & Android)",
    duration: "6 Weeks",
    featured: true,
    coverImage: "/assets/mockup-mahora-mobile.png",
    deviceMockup: "mobile",
    tags: ["Mobile UX", "iOS Design Guidelines", "Micro-Interactions", "Travel Experience"],
    overview: "Mahora is a bespoke mobile travel application designed for mindful explorers seeking sacred natural sanctuaries, unlisted private retreats, and culturally immersive journeys worldwide.",
    challenge: "Travel mobile apps often overwhelm users with flight spam, hotel price wars, and flashing discount banners. Mahora needed an app that evokes peace, wonder, and mindfulness from the moment the user opens it.",
    goals: [
      "Craft an enchanting mobile UI inspired by nature, organic contours, and tranquil typography.",
      "Provide an offline-ready sanctuary itinerary guide with offline GPS maps and cultural etiquette notes.",
      "Optimize for single-hand mobile interactions and fluid bottom sheets.",
      "Enable instant direct booking for curated sanctuary stays."
    ],
    designProcess: [
      { step: "01", title: "User Persona Discovery", desc: "Researched high-intent slow travelers, digital nomads, and eco-conscious adventure seekers." },
      { step: "02", title: "Wireframing Bottom Navigation", desc: "Designed 4-tab thumb-accessible architecture: Discover, Itinerary, Saved Havens, and Profile." },
      { step: "03", title: "Visual Design & Atmosphere", desc: "Integrated organic curved cards, subtle floral accents, and calming earthy gradients." },
      { step: "04", title: "Interactive Prototype in Figma", desc: "Built end-to-end interactive tap-through prototypes with realistic spring physics." }
    ],
    uxDecisions: [
      { title: "Dynamic Island / Header Integration", desc: "Designed seamless status bar transitions and adaptive blur headers." },
      { title: "Swipeable Retreat Cards", desc: "Enabled effortless flick gestures to browse high-definition sanctuary photography." },
      { title: "Haptic Feedback Touchpoints", desc: "Designed subtle tactile confirmations for bookmarking and reservation submissions." }
    ],
    features: [
      "Immersive Destination Stories with 360 soundscape preview",
      "Interactive Sanctuary Map with elevation profiles and weather sensors",
      "Bespoke Itinerary Builder with day-by-day customizable cards",
      "Direct Concierge Chat with local sanctuary guides",
      "Offline passport and ticket storage in Apple Wallet style"
    ],
    typography: {
      headline: "Outfit Serif & Sans",
      body: "Plus Jakarta Sans",
      spec: "Sophisticated editorial serif flair for titles and crisp mobile sans for booking tables."
    },
    colors: [
      { name: "Sanctuary Meadow", hex: "#48623b" },
      { name: "Pristine Daisy", hex: "#f7f9f3" },
      { name: "Warm Sunlight", hex: "#f0b342" },
      { name: "River Slate", hex: "#2f3e2b" },
      { name: "Soft Mist", hex: "#e7ebe2" }
    ],
    results: [
      "4.9/5 user satisfaction rating in pre-launch beta testing with 500+ testers.",
      "Over 65% of test users cited the peaceful, non-intrusive UI as their primary reason for choosing Mahora.",
      "Selected as a showcase mobile UI concept on leading design aggregators."
    ],
    nextSlug: "bizdot-erp-platform"
  },
  {
    id: "bizdot-erp-platform",
    slug: "bizdot-erp-platform",
    title: "BizDot Enterprise ERP Suite",
    shortTitle: "ERP Dashboard",
    category: "ERP & SaaS",
    tagline: "Modernizing complex enterprise resource planning with clarity and high-speed workflows.",
    year: "2026",
    client: "Duplex Solutions / Enterprise Clients",
    role: "Lead UI/UX Redesign & Frontend System",
    duration: "8 Weeks",
    featured: true,
    coverImage: "/assets/mockup-erp.jpg",
    deviceMockup: "laptop",
    tags: ["Dashboard UX", "Enterprise Design", "Data Visualization", "Figma Components"],
    overview: "BizDot is an enterprise resource planning (ERP) platform connecting inventory, warehouse stock, procurement, financial statements, and multi-store point-of-sale in a unified, modern interface.",
    challenge: "The legacy ERP interface was visually cramped, had poor contrast, buried critical product SKUs inside deeply nested tables, and caused user fatigue during high-volume data entry shifts.",
    goals: [
      "Redesign information hierarchy with distinct KPI cards, searchable data tables, and inline actions.",
      "Reduce order and stock status lookup time from minutes to single-click interactions.",
      "Build a cohesive design system with dark/light contrast tokens and keyboard shortcuts.",
      "Ensure responsive performance on warehouse tablets and desktop administration terminals."
    ],
    designProcess: [
      { step: "01", title: "Stakeholder Interviews", desc: "Conducted contextual inquiries with warehouse managers, accountants, and retail store operators." },
      { step: "02", title: "Workflow Simplification", desc: "Mapped out stock adjustment, category sorting, and invoice generation flows to eliminate redundant clicks." },
      { step: "03", title: "Component Library Construction", desc: "Engineered Figma design system with Auto Layout 5.0 for tables, pill badges, and dropdowns." },
      { step: "04", title: "Frontend Implementation", desc: "Collaborated on React and Bootstrap grid implementation with reusable clean data tables." }
    ],
    uxDecisions: [
      { title: "Status Color Tokens", desc: "Established instant semantic cues: Green for In Stock, Amber for Low Stock, Red for Depleted." },
      { title: "Zero-Latency Global Search", desc: "Integrated instant keyboard-activated search bar (`Cmd+K`) across SKUs, orders, and clients." },
      { title: "Contextual Action Menus", desc: "Grouped edit, reorder, and export actions into sleek 3-dot overflow drawers to keep tables readable." }
    ],
    features: [
      "Real-time Inventory Tracking with SKU, category, stock count, and price columns",
      "Executive Financial Overview dashboard with real-time revenue cards",
      "Instant Add-Product modal with auto-generated barcode and SKU assignment",
      "Customizable table column visibility and CSV/PDF export",
      "Role-based access permissions and audit log history"
    ],
    typography: {
      headline: "Outfit",
      body: "Plus Jakarta Sans",
      spec: "Tabular figures enabled for precise numeric alignment across pricing and stock counts."
    },
    colors: [
      { name: "Enterprise Indigo", hex: "#5b4df3" },
      { name: "Active Mint", hex: "#10b981" },
      { name: "Warning Amber", hex: "#f59e0b" },
      { name: "Canvas Pearl", hex: "#f9fafb" },
      { name: "Deep Navy Slate", hex: "#111827" }
    ],
    results: [
      "54% faster inventory search and stock adjustment speeds measured in post-deployment tests.",
      "Zero training hours required for onboarding new warehouse clerks thanks to self-explanatory UI.",
      "Recognized by enterprise management as the most successful internal tool upgrade of the year."
    ],
    nextSlug: "nova-cloud-suite"
  },
  {
    id: "nova-cloud-suite",
    slug: "nova-cloud-suite",
    title: "Nova All-in-One Cloud Commerce",
    shortTitle: "SaaS Platform",
    category: "SaaS Platform",
    tagline: "Everything you need to launch, scale, and manage omnichannel commerce in one place.",
    year: "2026",
    client: "Nova Technologies",
    role: "Product Designer & Front-End Consultant",
    duration: "6 Weeks",
    featured: false,
    coverImage: "/assets/mockup-nova.jpg",
    deviceMockup: "laptop",
    tags: ["SaaS Design", "Design System", "Cloud Platform", "Responsive Web"],
    overview: "Nova is a modern SaaS platform designed for merchant founders to orchestrate digital commerce, multi-vendor catalogs, customer loyalty programs, and fulfillment from a beautiful single hub.",
    challenge: "Founders were constantly context-switching between separate apps for order management, promotion banners, product uploads, and analytics. Nova needed to consolidate all capabilities into one harmonious suite.",
    goals: [
      "Create a sleek, light-theme interface with subtle lilac and indigo brand accents.",
      "Empower non-technical merchants to manage seasonal promotional banners and product drops.",
      "Provide modular dashboard widgets that founders can rearrange to suit their daily workflow.",
      "Build a scalable design token library ready for multi-tenant white-labeling."
    ],
    designProcess: [
      { step: "01", title: "Competitor Heuristic Audit", desc: "Benchmarked Shopify, Stripe Dashboard, and Square to find gaps in clarity and usability." },
      { step: "02", title: "Modular Widget Architecture", desc: "Designed card widgets with standardized padding, border radius, and typography tokens." },
      { step: "03", title: "Interactive Prototypes", desc: "Created animated transitions for category tabs, banner management, and instant analytics toggles." },
      { step: "04", title: "Design Handoff Documentation", desc: "Delivered comprehensive zero-ambiguity component specs for the engineering squad." }
    ],
    uxDecisions: [
      { title: "Dynamic Hero Banner Module", desc: "Allowed merchants to visually preview and schedule promotional banners in real-time." },
      { title: "Category Pill Switchers", desc: "Designed pill buttons with icon pairings (Grocery, Electronics, Beauty, Home) for rapid filtering." },
      { title: "Best Seller Carousel", desc: "Integrated visual product cards with one-click restock and discount toggles." }
    ],
    features: [
      "Omnichannel Catalog Manager with multi-variant options and batch editing",
      "Dynamic Promotional Banner Scheduler with drag-and-drop banner preview",
      "Categorized Sales Leaderboard and revenue breakdown charts",
      "Customer segment analyzer with churn alerts",
      "Automated cross-device responsive layout with dark mode token compatibility"
    ],
    typography: {
      headline: "Outfit",
      body: "Plus Jakarta Sans",
      spec: "Modern, friendly geometric type with high legibility across small notification chips."
    },
    colors: [
      { name: "Nova Purple", hex: "#6366f1" },
      { name: "Soft Lilac Tint", hex: "#eef2ff" },
      { name: "Pearl White", hex: "#ffffff" },
      { name: "Cool Grey", hex: "#64748b" },
      { name: "Charcoal Dark", hex: "#0f172a" }
    ],
    results: [
      "40% reduction in time-to-first-sale for newly onboarded merchants.",
      "94% positive usability score in usability testing sessions.",
      "Scalable system deployed to over 120 live merchant stores within first quarter."
    ],
    nextSlug: "nadvora-expeditions"
  },
  {
    id: "nadvora-expeditions",
    slug: "nadvora-expeditions",
    title: "Nadvora Bespoke Expeditions",
    shortTitle: "Travel Booking Website",
    category: "Travel",
    tagline: "Curating unlisted private residences and remote wilderness retreats across the globe.",
    year: "2026",
    client: "Nadvora Luxury Travel Co",
    role: "Lead UI/UX Designer & Web Experience",
    duration: "5 Weeks",
    featured: true,
    coverImage: "/assets/mockup-nadvora-monitor.png",
    deviceMockup: "monitor",
    tags: ["Luxury Travel", "Web Design", "Editorial UX", "Immersive Visuals"],
    overview: "Nadvora is a high-end travel booking platform dedicated to discerning voyagers seeking secluded sanctuaries, remote mountain chalets in the Swiss Alps, and private Kyoto machiya estates.",
    challenge: "High-net-worth clients expect an ultra-refined, bespoke digital hospitality experience. Standard online travel agency layouts feel generic and lack the emotional resonance required for $10,000+ luxury itineraries.",
    goals: [
      "Convey timeless stillness, intimacy, and luxury through sweeping landscape art direction.",
      "Design an exclusive 'Begin Journey' interactive inquiry portal that feels like a private concierge consultation.",
      "Build tailored expedition preference filters based on tranquility, culinary immersion, and architectural heritage.",
      "Maintain 60fps buttery scroll animations and glassmorphism interface panels."
    ],
    designProcess: [
      { step: "01", title: "Brand Identity Alignment", desc: "Worked with luxury hospitality consultants to establish tone of voice, visual pacing, and typography." },
      { step: "02", title: "Hero Atmosphere Conception", desc: "Engineered full-bleed natural landscape composition paired with elegant serif headings." },
      { step: "03", title: "Concierge Flow Wireframes", desc: "Designed discreet, high-trust inquiry forms with interactive calendar availability." },
      { step: "04", title: "Figma to Responsive Code", desc: "Built responsive prototypes optimized for high-density 4K displays down to smartphones." }
    ],
    uxDecisions: [
      { title: "Floating Frosted Navigation", desc: "Designed an airy glass header with floating pill action 'Begin Journey' for constant conversion access." },
      { title: "Curated Journal Integration", desc: "Wove authentic cultural journal essays into destination pages to build emotional connection." },
      { title: "Private Expeditions Filter", desc: "Replaced rigid search dropdowns with intuitive, conversational prompt pills." }
    ],
    features: [
      "Immersive Full-Bleed Sanctuary Galleries with ambient nature soundscapes",
      "Private Residence Inquiry modal with encrypted concierge direct messaging",
      "Interactive Curated Map with hidden gem geographic coordinates",
      "Editorial Journal reader with seamless reading mode",
      "Tailored Expedition Customizer tailored to guest preferences"
    ],
    typography: {
      headline: "Outfit & Syne",
      body: "Plus Jakarta Sans",
      spec: "Refined editorial typography with generous line-height for peaceful reading rhythm."
    },
    colors: [
      { name: "Deep Mountain Forest", hex: "#1e3a2f" },
      { name: "Meadow Grass", hex: "#4ade80" },
      { name: "Warm Sunlight", hex: "#fef08a" },
      { name: "Pure Cloud White", hex: "#ffffff" },
      { name: "Graphite Accent", hex: "#18181b" }
    ],
    results: [
      "3.4x increase in high-ticket expedition booking inquiries compared to the previous site.",
      "Average user engagement time reached 4 minutes and 15 seconds.",
      "Feature showcase on top international UI/UX web design showcases."
    ],
    nextSlug: "ronarai-restaurant"
  },
  {
    id: "ronarai-restaurant",
    slug: "ronarai-restaurant",
    title: "Ronarai Authentic Saudi Cuisine",
    shortTitle: "Restaurant Website",
    category: "Food & Hospitality",
    tagline: "An exquisite culinary journey celebrating authentic Saudi grills, heritage, and flavor.",
    year: "2026",
    client: "Ronarai Restaurant Group (Saudi Arabia)",
    role: "Full UI/UX Design & Front-End Development",
    duration: "4 Weeks",
    featured: true,
    coverImage: "/assets/mockup-advanced-leap.jpg",
    deviceMockup: "laptop",
    tags: ["Restaurant UX", "Figma to Code", "Responsive Web", "Menu Experience"],
    overview: "Ronarai is a premier restaurant brand located in Saudi Arabia, celebrated for authentic Saudi grills, traditional marinades, and modern hospitality. Muhammed K designed the complete digital experience and built the responsive website.",
    challenge: "The restaurant needed to capture the aromatic richness and warm hospitality of traditional Saudi grilling while catering to bilingual tech-savvy diners who expect rapid online table reservations and mobile menu viewing.",
    goals: [
      "Design an appetitive, rich visual identity with bold crimson and warm amber accents.",
      "Provide an interactive online menu with dietary indicators, pricing, and signature grill highlights.",
      "Streamline reservation bookings for family gatherings and VIP dining rooms.",
      "Deliver pixel-perfect, cross-browser responsive code ready for live deployment at ronaraiksa.com."
    ],
    designProcess: [
      { step: "01", title: "Cultural & Brand Research", desc: "Studied Saudi culinary traditions, family dining habits, and regional hospitality aesthetics." },
      { step: "02", title: "Menu Architecture & Layout", desc: "Structured the digital menu into intuitive sections: Premium Grills, Appetizers, Traditional Platters, and Beverages." },
      { step: "03", title: "Figma High-Fidelity Mockups", desc: "Created appetizing photography layouts with bold red hero banners and clear 'View Menu' calls to action." },
      { step: "04", title: "Responsive Frontend Coding", desc: "Coded complete responsive front-end using HTML5, CSS3, JavaScript, and Bootstrap." }
    ],
    uxDecisions: [
      { title: "Hero Flavor Immersion", desc: "Featured high-resolution hero shot of signature grills with prominent 'Authentic Saudi Taste' badge." },
      { title: "Sticky Reservation Bar", desc: "Kept table booking and location details within single tap on mobile screens." },
      { title: "Category Ribbons", desc: "Created horizontal scrollable category pills for rapid menu filtering without page reloads." }
    ],
    features: [
      "Interactive Digital Menu with appetizing photography and ingredient details",
      "Instant Table & Banquet Reservation system with guest count selection",
      "Bilingual-ready layout structure optimized for both LTR and RTL orientations",
      "Interactive Google Maps directions and branch contact info",
      "High performance on mobile smartphones for diners viewing on location"
    ],
    typography: {
      headline: "Outfit",
      body: "Plus Jakarta Sans",
      spec: "Bold, punchy titles that evoke modern warmth paired with clean menu item specifications."
    },
    colors: [
      { name: "Royal Saudi Crimson", hex: "#9b111e" },
      { name: "Golden Amber", hex: "#eab308" },
      { name: "Warm Cream", hex: "#fef9f5" },
      { name: "Charcoal Black", hex: "#1c1917" },
      { name: "Pure White", hex: "#ffffff" }
    ],
    results: [
      "Successfully launched live at ronaraiksa.com with glowing feedback from restaurant patrons.",
      "Over 48% increase in direct weekday table reservations made via the website.",
      "Mobile bounce rate decreased by 31% after introducing the streamlined digital menu."
    ],
    nextSlug: "gemini-music-awards"
  },
  {
    id: "gemini-music-awards",
    slug: "gemini-music-awards",
    title: "Gemini National Music Talent Hunt 2026",
    shortTitle: "Event Website",
    category: "Entertainment & Events",
    tagline: "An official gateway to the Gemini National Music Award Show — celebrating musical virtuosity.",
    year: "2026",
    client: "Gemini Film & Music Production House",
    role: "Lead UI/UX Designer & Frontend Developer",
    duration: "5 Weeks",
    featured: true,
    coverImage: "/assets/mockup-gemini-music-award.jpg",
    deviceMockup: "laptop",
    tags: ["Event UX", "Music Awards", "Contestant Registration", "Figma to Code"],
    overview: "Gemini National Music Talent Hunt 2026 is an entertainment spectacle and competitive talent audition platform created by Gemini Film & Music Production House. Muhammed K designed the user flow and developed the responsive platform.",
    challenge: "The event required a grand, prestigious digital presence capable of handling thousands of online contestant audition registrations across 5 age categories, while clearly explaining complex competition guidelines and jury credentials.",
    goals: [
      "Create a cinematic, glamorous gold-and-black event aesthetic reflecting musical excellence.",
      "Build a seamless multi-step audition registration portal supporting demo audio/video submissions.",
      "Design dedicated sections for celebrity jury panels, mentors, cash prizes, and sponsors.",
      "Deliver a high-concurrency responsive frontend deployed at geminimusicaward.com."
    ],
    designProcess: [
      { step: "01", title: "Event Roadmap & Wireframing", desc: "Outlined the full digital ecosystem: Announcement phase, Audition phase, Voting phase, and Gala." },
      { step: "02", title: "Audition Form UX Optimization", desc: "Segmented the registration form into 3 intuitive steps: Participant Details, Category Selection, and Media Upload." },
      { step: "03", title: "Cinematic Visual Design", desc: "Crafted particle dust overlays, gold foil typography accents, and sleek dark card containers in Figma." },
      { step: "04", title: "Frontend Implementation", desc: "Developed responsive pages using HTML5, CSS3, JavaScript, and deployed to production." }
    ],
    uxDecisions: [
      { title: "Registrations Open Live Indicator", desc: "Created prominent glowing gold pill badge to highlight audition urgency and countdown." },
      { title: "Dual Primary CTAs", desc: "Positioned 'Register Now' (primary gold) alongside 'View Rules' (secondary translucent) in the hero." },
      { title: "Celebrity Jury Carousel", desc: "Designed profile cards with social links and discography highlights to build audition credibility." }
    ],
    features: [
      "Multi-Category Audition Registration with audio/video demo link submission",
      "Official Competition Rules & Eligibility guidelines accordion",
      "Celebrity Jury & Mentor showcase with credential badges",
      "Prize Pool & Trophy breakdown with sponsorship tiers",
      "Live event timetable and regional audition city schedule"
    ],
    typography: {
      headline: "Outfit & Syne",
      body: "Plus Jakarta Sans",
      spec: "Cinematic gold-accented typography evoking Hollywood & national gala awards glamour."
    },
    colors: [
      { name: "Gala Gold", hex: "#f59e0b" },
      { name: "Deep Velvet Black", hex: "#0a0a0c" },
      { name: "Warm Champagne", hex: "#fef3c7" },
      { name: "Smoky Charcoal", hex: "#1f2024" },
      { name: "Pure White", hex: "#ffffff" }
    ],
    results: [
      "Successfully processed over 4,200 contestant registrations in the first audition window.",
      "Live at geminimusicaward.com with flawless uptime during high-traffic announcements.",
      "Celebrated by production house executives and contestants for clean registration clarity."
    ],
    nextSlug: "green-track-logistics"
  }
];
