require('dotenv').config();
const mongoose = require('mongoose');
const Template = require('./models/Template');

const templates = [
  {
    name: 'Flora Landing Page',
    description: 'A fresh landing page for plants and lifestyle brands.',
    thumbnail_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
    category: 'Landing Page',
  },
  {
    name: 'Portfolio Pro',
    description: 'A modern portfolio for developers and designers.',
    thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    category: 'Portfolio',
  },
  {
    name: 'ShopSphere',
    description: 'A clean storefront template for online shops.',
    thumbnail_url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc',
    category: 'E-commerce',
  },
  {
    name: 'DashFlow',
    description: 'A dashboard layout for SaaS products and analytics.',
    thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    category: 'Dashboard',
  },
  {
    name: 'Foodie Blog',
    description: 'A stylish blog template for recipes and food stories.',
    thumbnail_url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
    category: 'Blog',
  },
];

async function seedTemplates() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    for (const template of templates) {
      await Template.updateOne(
        { name: template.name },
        { $setOnInsert: template },
        { upsert: true }
      );
    }

    console.log('Five sample templates are ready.');
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedTemplates();
