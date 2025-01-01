import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Navigate } from 'react-router-dom'
import { useScrollToTop } from './hooks/use-scroll-to-top'
import ThemeProvider from './theme'
import DashboardLayout from './layouts/dashboard'

const Main = () => {
  const data = localStorage.getItem("userInfo") 
  useScrollToTop()
  return (data === null ?
    <Navigate to="/login" replace={true} /> : 
    <HelmetProvider>
      <Suspense>
        <ThemeProvider>
          <DashboardLayout >
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </ThemeProvider>
      </Suspense>
    </HelmetProvider>
  )
}

export default Main
