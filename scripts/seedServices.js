import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://kmuhammed:Muhammed9656@cluster0.pc5tkcr.mongodb.net/portfolio_cms';

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;

  const defaultCards = [
    {
      number: '01',
      theme: 'theme-violet',
      category: 'Interface & Systems',
      title: 'UI/UX Design',
      tags: ['Figma Systems', 'User Research', 'Interactive Prototypes', 'Design Handoff'],
      linkText: 'EXPLORE DESIGN WORKS',
      linkUrl: '/works'
    },
    {
      number: '02',
      theme: 'theme-blue',
      category: 'Visual & Responsive',
      title: 'Web Design',
      tags: ['Responsive Layouts', 'Micro-Animations', 'Design Tokens', 'Brand Direction'],
      linkText: 'EXPLORE WEB PROJECTS',
      linkUrl: '/works'
    },
    {
      number: '03',
      theme: 'theme-emerald',
      category: 'Code & 3D Engineering',
      title: 'Frontend Development',
      tags: ['React.js Apps', 'Three.js / WebGL', 'Modern CSS3', 'Performance & SEO'],
      linkText: 'START A PROJECT',
      linkUrl: '/contact'
    }
  ];

  const res = await db.collection('portfoliocontents').updateOne(
    { key: 'portfolio_main' },
    { 
      $set: { 
        'homeContent.servicesSection.cards': defaultCards,
        'homeContent.servicesSection.headline': 'Crafting Intuitive Products Across Every Dimension.'
      } 
    }
  );

  console.log('Update result matched:', res.matchedCount, 'modified:', res.modifiedCount);
  await mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
