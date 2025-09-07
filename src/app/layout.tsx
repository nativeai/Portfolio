import type { Metadata } from 'next'
import { ThemeProvider } from "next-themes"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import "../styles/globals.css"
import { SceneProvider } from '../components/SceneProvider'

export const metadata: Metadata = {
  title: {
    default: 'Portfolio',
    template: '%s | Portfolio',
  },
  description: 'My awesome Next.js portfolio application',
  keywords: ['Next.js', 'React', 'TypeScript', 'Portfolio'],
  authors: [{ name: 'Shandon' }],
  creator: 'Shandon',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Portfolio',
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atelier-cave-dark.min.css"/>
      </head>
      <body className="bg-fixed bg-gradient-to-r from-beige-200 to-blue dark:from-dark-500 dark:to-dark-700 dark:text-white">
        <ThemeProvider attribute="class">
          <SceneProvider />
          <div className="container mx-auto max-w-7xl px-3 sm:px-5 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 h-screen lg:h-auto">
              {/* Sidebar - Full width on mobile, fixed width on desktop */}
              <div className="lg:col-span-4 xl:col-span-3 2xl:col-span-3">
                <div className="sticky top-6 h-fit max-h-[calc(100vh-3rem)] p-4 sm:p-6 text-base text-center bg-white/95 dark:bg-dark-500/95 rounded-xl shadow-lg dark:shadow-dark border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-md flex-shrink-0">
                  <Sidebar />
                </div>
              </div>
              
              {/* Main Content - Responsive width */}
              <div className="lg:col-span-8 xl:col-span-9 2xl:col-span-9">
                <div className="flex flex-col h-fit min-h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-3rem)] overflow-hidden bg-white/95 dark:bg-dark-500/95 shadow-lg dark:shadow-dark rounded-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-md">
                  <div className="flex-shrink-0">
                    <Navbar />
                  </div>
                  <div className="flex-grow overflow-auto p-4 sm:p-6 lg:p-8">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}