# Next.js Best Practices & Standards

A comprehensive guide to building production-ready Next.js applications following industry best practices and standards.

## Project Structure

### App Router Structure (Next.js 13+)
```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   └── (routes)/
│       ├── dashboard/
│       │   ├── page.tsx
│       │   ├── layout.tsx
│       │   └── loading.tsx
│       └── api/
│           └── users/
│               └── route.ts
├── components/
│   ├── ui/
│   ├── forms/
│   └── layout/
├── lib/
│   ├── utils.ts
│   ├── validations.ts
│   └── db.ts
├── hooks/
├── types/
└── styles/
```

### Legacy Pages Router Structure
```
src/
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx
│   └── api/
├── components/
├── lib/
├── hooks/
├── types/
└── styles/
```

## Performance Optimization

### Image Optimization
```tsx
import Image from 'next/image'

// Always specify dimensions
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={800}
  height={600}
  priority // For above-the-fold images
  placeholder="blur" // Optional blur placeholder
  blurDataURL="data:image/jpeg;base64,..." // Low-quality placeholder
/>

// For responsive images
<Image
  src="/hero.jpg"
  alt="Hero image"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  style={{ objectFit: 'cover' }}
/>
```

### Font Optimization
```tsx
// app/layout.tsx or pages/_app.tsx
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.className} ${robotoMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

### Code Splitting & Dynamic Imports
```tsx
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamic component loading
const DynamicComponent = dynamic(() => import('../components/Heavy'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Disable SSR if needed
})

// Dynamic import with named export
const DynamicComponent = dynamic(
  () => import('../components/Heavy').then((mod) => mod.HeavyComponent),
  { ssr: false }
)

// Using Suspense with dynamic imports
function MyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicComponent />
    </Suspense>
  )
}
```

## Data Fetching Best Practices

### App Router Data Fetching
```tsx
// Server Components (default in app router)
async function ServerComponent() {
  // Direct database calls or API calls
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }, // ISR - revalidate every hour
  })
  
  if (!data.ok) {
    throw new Error('Failed to fetch data')
  }
  
  const posts = await data.json()
  
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}

// Client Components for interactivity
'use client'

import { useState, useEffect } from 'react'

function ClientComponent() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then(setData)
  }, [])
  
  return <div>{/* Interactive UI */}</div>
}
```

### SWR for Client-Side Data Fetching
```tsx
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function Profile() {
  const { data, error, isLoading, mutate } = useSWR('/api/profile', fetcher, {
    refreshInterval: 1000, // Refresh every second
    revalidateOnFocus: false,
  })

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h1>{data.name}</h1>
      <button onClick={() => mutate()}>Refresh</button>
    </div>
  )
}
```

## API Routes Best Practices

### App Router API Routes
```tsx
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page') || '1'
    
    // Fetch users logic
    const users = await fetchUsers(parseInt(page))
    
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createUserSchema.parse(body)
    
    // Create user logic
    const user = await createUser(validatedData)
    
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
```

### Error Handling & Validation
```tsx
// lib/api-handler.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export function withErrorHandling<T>(
  handler: (req: NextRequest) => Promise<NextResponse<T>>
) {
  return async (req: NextRequest) => {
    try {
      return await handler(req)
    } catch (error) {
      console.error('API Error:', error)
      
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Validation failed', details: error.errors },
          { status: 400 }
        )
      }
      
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      )
    }
  }
}

// Usage
export const POST = withErrorHandling(async (request) => {
  // Your handler logic
  return NextResponse.json({ success: true })
})
```

## Component Best Practices

### Server vs Client Components
```tsx
// Server Component (default in app router)
async function ServerComponent() {
  const data = await fetchData()
  
  return (
    <div>
      <h1>{data.title}</h1>
      <ClientComponent initialData={data} />
    </div>
  )
}

// Client Component
'use client'

import { useState } from 'react'

interface Props {
  initialData: any
}

function ClientComponent({ initialData }: Props) {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  )
}
```

### Component Organization
```tsx
// components/ui/Button.tsx
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          {
            'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
            'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
            'bg-red-600 text-white hover:bg-red-700': variant === 'destructive',
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, type ButtonProps }
```

## TypeScript Best Practices

### Type Definitions
```tsx
// types/index.ts
export interface User {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface Post {
  id: string
  title: string
  content: string
  authorId: string
  author: User
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
```

### Utility Types
```tsx
// lib/types.ts
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = 
  Pick<T, Exclude<keyof T, Keys>> & 
  { [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>> }[Keys]

// Page Props Types
export interface PageProps {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export interface LayoutProps {
  children: React.ReactNode
  params: { [key: string]: string }
}
```

## State Management

### Zustand Store
```tsx
// lib/store.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        login: (user) => set({ user, isAuthenticated: true }),
        logout: () => set({ user: null, isAuthenticated: false }),
      }),
      {
        name: 'auth-storage',
      }
    )
  )
)
```

### React Query/TanStack Query
```tsx
// lib/queries.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useUsers = (page = 1) => {
  return useQuery({
    queryKey: ['users', page],
    queryFn: () => fetchUsers(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
```

## Security Best Practices

### Environment Variables
```bash
# .env.local
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://...
API_KEY=your-api-key
```

```tsx
// lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(1),
  API_KEY: z.string().min(1),
})

export const env = envSchema.parse(process.env)
```

### Authentication with NextAuth.js
```tsx
// lib/auth.ts
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
}
```

### CSRF Protection
```tsx
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add security headers
  const response = NextResponse.next()
  
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

## Testing Best Practices

### Jest Configuration
```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

### Component Testing
```tsx
// __tests__/components/Button.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### API Route Testing
```tsx
// __tests__/api/users.test.ts
import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/users'

describe('/api/users', () => {
  it('returns users for GET request', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        users: expect.any(Array),
      })
    )
  })
})
```

## SEO & Metadata

### App Router Metadata
```tsx
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'My App',
    template: '%s | My App',
  },
  description: 'My awesome Next.js application',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  metadataBase: new URL('https://myapp.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://myapp.com',
    siteName: 'My App',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@yourusername',
  },
  robots: {
    index: true,
    follow: true,
  },
}

// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug)

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}
```

### Structured Data
```tsx
// components/StructuredData.tsx
interface StructuredDataProps {
  data: object
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}

// Usage
<StructuredData
  data={{
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    datePublished: post.publishedAt,
  }}
/>
```

## Deployment & Configuration

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  images: {
    domains: ['example.com', 'cdn.example.com'],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:ci": "jest --ci --coverage --watchAll=false"
  }
}
```

## Performance Monitoring

### Web Vitals
```tsx
// pages/_app.tsx or app/layout.tsx
export function reportWebVitals(metric) {
  console.log(metric)
  
  // Send to analytics
  switch (metric.name) {
    case 'CLS':
    case 'FID':
    case 'FCP':
    case 'LCP':
    case 'TTFB':
      // Send metric to your analytics service
      break
    default:
      break
  }
}
```

## Key Principles

1. **Use Server Components by Default**: Leverage server-side rendering for better performance
2. **Minimize Client-Side JavaScript**: Only use 'use client' when necessary for interactivity
3. **Optimize Images**: Always use Next.js Image component with proper sizing
4. **Type Everything**: Use TypeScript for better developer experience and fewer bugs
5. **Handle Errors Gracefully**: Implement proper error boundaries and API error handling
6. **Follow the Principle of Least Privilege**: Only expose necessary data and functionality
7. **Measure Performance**: Use Next.js built-in analytics and monitoring tools
8. **Test Thoroughly**: Write tests for components, pages, and API routes
9. **Secure by Default**: Implement proper authentication, authorization, and security headers
10. **Document Your Code**: Write clear, maintainable code with proper TypeScript types

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)
- [Vercel Deployment Guides](https://vercel.com/guides)