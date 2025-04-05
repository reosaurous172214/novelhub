import './styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { AuthProvider } from '@/context/AuthContext'
export const metadata = {
  title: 'NovelHub',
  description: 'Your Ultimate Novel Reading Spot',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        
        <main className="flex-grow container mx-auto p-4 bg-black">
        <AuthProvider>
                    {children}
                </AuthProvider>
          
          </main>
        
      </body>
    </html>
  )
}
