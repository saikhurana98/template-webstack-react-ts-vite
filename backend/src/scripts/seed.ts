import 'reflect-metadata';
import { AppDataSource } from '../config/database.js';
import { Item } from '../entities/Item.js';

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...');

    // Initialize the database
    await AppDataSource.initialize();
    console.log('✅ Database connected');

    const itemRepository = AppDataSource.getRepository(Item);

    // Clear existing data
    await itemRepository.clear();
    console.log('🗑️  Cleared existing data');

    // Sample data
    const sampleItems = [
      {
        name: 'Welcome to the Template!',
        description:
          'This is a sample item from the database. You can create, read, update, and delete items using the REST API.',
      },
      {
        name: 'Full-Stack TypeScript',
        description:
          'This template uses TypeScript on both frontend and backend for type safety and better developer experience.',
      },
      {
        name: 'Modern Tech Stack',
        description:
          'Built with React, Vite, Node.js, Express, TypeORM, and SQLite. All the tools you need to build a modern web application.',
      },
      {
        name: 'CI/CD Ready',
        description:
          'Includes GitHub Actions workflows for automated testing, linting, and deployment to GitHub Pages.',
      },
      {
        name: 'Developer Friendly',
        description:
          'Pre-configured with ESLint, Prettier, and Husky for consistent code quality and formatting.',
      },
    ];

    // Insert sample data
    for (const itemData of sampleItems) {
      const item = itemRepository.create(itemData);
      await itemRepository.save(item);
      console.log(`✅ Created item: ${item.name}`);
    }

    console.log('');
    console.log('🎉 Database seeded successfully!');
    console.log(`📊 Created ${sampleItems.length} items`);

    await AppDataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
