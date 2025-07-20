'use client'

import { useAuth } from './contexts/AuthContext'
import LoginScreen from './components/LoginScreen'
import MainMessenger from './components/MainMessenger'

export default function Home() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginScreen />
  }

  return <MainMessenger />
}