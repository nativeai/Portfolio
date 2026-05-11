import type { Metadata } from 'next'
import { ThemeProvider } from "next-themes"
import Navbar from "../components/Navbar"
import FloatingChat from "../components/FloatingChat"
import "../styles/globals.css"
import { SceneProvider } from '../components/SceneProvider'

export const metadata: Metadata = {
  title: {
    default: 'Shandon Hicks — Director of Operations',
    template: '%s | Shandon Hicks',
  },
  description: 'Director of Operations specializing in RevOps, customer support, logistics, and operational systems for scaling companies.',
  keywords: ['Operations', 'RevOps', 'Director of Operations', 'Customer Experience', 'Logistics', 'Portfolio'],
  authors: [{ name: 'Shandon Hicks' }],
  creator: 'Shandon Hicks',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Shandon Hicks',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"/>
      </head>
      <body className="bg-hero text-primary-100 font-sans min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SceneProvider />
          <Navbar />
          <main>{children}</main>
          {/* <FloatingChat /> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
