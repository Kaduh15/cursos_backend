import { db } from '.'

async function resetDB() {
  try {
    console.log('Starting database reset...')
    await db.execute(`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`)
    console.log('Database reset completed successfully.')
    process.exit(0)
  } catch (error) {
    console.error('Error resetting database:', error)
    process.exit(1)
  }
}

resetDB()
