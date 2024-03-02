import { ThemeProvider } from '../components/ThemeProvider';
import { ClerkProvider } from '@clerk/nextjs'

import '../styles/globals.css';

import Header from '../components/custom/header';
export const metadata = {
    title:"AI PROMPT",
    description:"Discove AI prompt"
}

const RootLayout = ({children}:{children:React.ReactNode}) => {
  return (
   <ClerkProvider>
  <html lang='en' suppressHydrationWarning>
    <body >

    <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
         <main className='app px-6'>
            <Header></Header>
            {children}
        </main>
          </ThemeProvider>

       
    </body>
   </html>

   </ClerkProvider>
  )
}

export default RootLayout
