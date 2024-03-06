
import { ThemeProvider } from "../components/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";


import "../styles/globals.css";
import ReactQueryClientProvider from "../components/custom/ReactQueryClientProvider";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "../components/custom/header";

export const metadata = {
  title: "AI PROMPT",
  description: "Discove AI prompt",
};




const RootLayout = ({ children }: { children: React.ReactNode }) => {


  return (
    <ReactQueryClientProvider>
     <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
      
        <body>

          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
           
              <main className="app px-6">
                
                <Header></Header>
                
                {children}
                <ToastContainer autoClose={1000} closeOnClick theme="colored" />
              </main>
           
          </ThemeProvider>
         

        </body>
        
      </html>
    </ClerkProvider>
     
    </ReactQueryClientProvider>
    
  );
};

export default RootLayout;
