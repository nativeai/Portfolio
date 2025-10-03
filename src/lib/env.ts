/**
 * Environment variable validation and type-safe access
 *
 * This file validates environment variables at build/runtime
 * and provides type-safe access throughout the application
 */

// Define environment variable schema
const envSchema = {
  // Node environment
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Add your environment variables here with validation
  // Example:
  // API_KEY: process.env.API_KEY,
  // DATABASE_URL: process.env.DATABASE_URL,
}

// Validate environment variables
function validateEnv() {
  const errors: string[] = []

  // Add validation rules here
  // Example:
  // if (!envSchema.API_KEY) {
  //   errors.push('API_KEY is required')
  // }

  if (errors.length > 0) {
    console.error('Environment validation failed:')
    errors.forEach((error) => console.error(`  - ${error}`))

    if (process.env.NODE_ENV === 'production') {
      throw new Error('Invalid environment configuration')
    }
  }
}

// Run validation
validateEnv()

// Export validated environment variables
export const env = {
  NODE_ENV: envSchema.NODE_ENV as 'development' | 'production' | 'test',
  isDevelopment: envSchema.NODE_ENV === 'development',
  isProduction: envSchema.NODE_ENV === 'production',
  isTest: envSchema.NODE_ENV === 'test',

  // Add your environment variables here
  // Example:
  // apiKey: envSchema.API_KEY as string,
  // databaseUrl: envSchema.DATABASE_URL as string,
} as const

// Prevent accidental modification
Object.freeze(env)
