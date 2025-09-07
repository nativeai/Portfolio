'use client'

import { Component, ErrorInfo, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center p-8 text-center bg-error-50 dark:bg-error-900/10 border border-error-200 dark:border-error-800 rounded-lg"
        >
          <div className="w-16 h-16 mb-4 rounded-full bg-error-100 dark:bg-error-900/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-error-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          
          <h2 className="text-xl font-semibold text-error-800 dark:text-error-200 mb-2">
            Something went wrong
          </h2>
          
          <p className="text-error-600 dark:text-error-300 mb-6 max-w-md">
            We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors duration-standard focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Refresh Page
          </motion.button>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-6 p-4 bg-gray-100 dark:bg-dark-300 rounded-lg text-left w-full max-w-2xl">
              <summary className="cursor-pointer font-medium text-gray-700 dark:text-gray-300 mb-2">
                Error Details (Development)
              </summary>
              <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-auto">
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </motion.div>
      )
    }

    return this.props.children
  }
}