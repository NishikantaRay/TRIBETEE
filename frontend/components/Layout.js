import React from 'react'
import { UserProvider } from '../utils/authContext';
function Layout({ user, loading = false, children }) {
  return (
    <UserProvider value={{ user, loading }}>
        {children}
        </UserProvider>
  )
}

export default Layout