import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { MessengerProvider } from './contexts/MessengerContext'
import { Toaster } from './components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MSN Reimagined - Modern Messenger Experience',
  description: 'A beautiful, modern take on the classic MSN Messenger with glassmorphism design and smooth interactions.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <MessengerProvider>
              {children}
              <Toaster />
            </MessengerProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}