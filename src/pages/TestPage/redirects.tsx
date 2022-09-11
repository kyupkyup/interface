import { Navigate, useLocation } from 'react-router-dom'

// Redirects to swap but only replace the pathname
export function RedirectPathToTestOnly() {
  const location = useLocation()
  return <Navigate to={{ ...location, pathname: '/app' }} replace />
}
