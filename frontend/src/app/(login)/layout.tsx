import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login',
}

const LoginLayout = ({ children }: { readonly children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {children}
    </div>
  )
}
export default LoginLayout
