// Auto-seed on server startup
import { seedDatabase } from './seedData';

export async function autoSeed() {
  try {
    await seedDatabase();
  } catch (error) {
    console.error('Auto-seed failed:', error);
  }
}

// Export for use in other modules
export { seedDatabase };
