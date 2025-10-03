/**
 * API Handler Utilities
 *
 * Provides error handling, validation, and security utilities for API routes
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

/**
 * Error response helper
 */
export function errorResponse(
  message: string,
  status: number = 500,
  details?: unknown
) {
  const response: { error: string; details?: unknown } = { error: message }

  // Only include details in development
  if (process.env.NODE_ENV === 'development' && details) {
    response.details = details
  }

  return NextResponse.json(response, { status })
}

/**
 * Success response helper
 */
export function successResponse<T>(data: T, status: number = 200, headers?: HeadersInit) {
  return NextResponse.json(data, { status, headers })
}

/**
 * Higher-order function for API route error handling
 */
export function withErrorHandling<T>(
  handler: (req: NextRequest) => Promise<NextResponse<T>>
) {
  return async (req: NextRequest) => {
    try {
      return await handler(req)
    } catch (error) {
      console.error('API Error:', error)

      // Handle Zod validation errors
      if (error instanceof z.ZodError) {
        return errorResponse('Validation failed', 400, error.issues)
      }

      // Handle known error types
      if (error instanceof Error) {
        // Don't expose internal error messages in production
        if (process.env.NODE_ENV === 'production') {
          return errorResponse('Internal Server Error', 500)
        }
        return errorResponse(error.message, 500)
      }

      return errorResponse('Internal Server Error', 500)
    }
  }
}

/**
 * Validate request body against a Zod schema
 */
export async function validateBody<T extends z.ZodType>(
  request: NextRequest,
  schema: T
): Promise<z.infer<T>> {
  const body = await request.json()
  return schema.parse(body)
}

/**
 * Validate query parameters against a Zod schema
 */
export function validateQuery<T extends z.ZodType>(
  request: NextRequest,
  schema: T
): z.infer<T> {
  const searchParams = Object.fromEntries(request.nextUrl.searchParams)
  return schema.parse(searchParams)
}

/**
 * CORS headers helper for API routes
 */
export function corsHeaders(allowedOrigins: string[] = ['*']) {
  return {
    'Access-Control-Allow-Origin': allowedOrigins.join(', '),
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}

/**
 * Method not allowed response
 */
export function methodNotAllowed(allowed: string[]) {
  return NextResponse.json(
    { error: 'Method not allowed' },
    {
      status: 405,
      headers: { Allow: allowed.join(', ') }
    }
  )
}
