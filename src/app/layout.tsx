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
          <div className="grid grid-cols-12 gap-6 px-5 my-14 lg:mb-0 md:mb-16 sm:px-20 md:px-32 lg:px-36 xl:px-48">
            <div className="hover:scale-100 h-full md:max-h-screen col-span-12 p-4 text-base text-center bg-white/90 dark:bg-dark-500/90 lg:col-span-3 rounded-md shadow-custom-light dark:shadow-custom-dark backdrop-blur-sm">
              <Sidebar />
            </div>
            <div className="flex flex-col col-span-12 overflow-hidden bg-white/90 shadow-custom-light dark:shadow-custom-dark rounded-md lg:col-span-9 dark:bg-dark-500/90 backdrop-blur-sm">
              <Navbar />
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}