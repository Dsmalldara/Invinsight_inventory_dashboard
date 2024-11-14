'use client'
import React, { useEffect, useReducer } from 'react'
import Navbar from '../elements/Navbar'
import Sidebar from '../elements/Sidebar'
import StoreProvider, { useAppSelector } from '../store/reduxStore'

function DashboardLayout({children}:{children:React.ReactNode}) {
    
    const isSidebarCollapsed = useAppSelector((state)=>state.global.isSidebarCollapsed)
   const isDarkmode = useAppSelector((state)=> state.global.isDarkMode)
   useEffect(()=>{
    if(isDarkmode){
        document.documentElement.classList.add('dark')
    }
    else{
        document.documentElement.classList.add('light')
    }
   })
  return (
    <div className={`${isDarkmode ? 'dark' : 'light'} flex  bg-gray-100 text-gray-900 w-full min-h-screen`}>
      <Sidebar/>
      <main  className={`flex flex-col py-5 px-9 bg-gray-50/25 w-full h-full ${isSidebarCollapsed ? 'md:pl-24' : 'md:pl-72' }` }>
      <Navbar/>
      {children}
      </main>
    </div>
  )
}


function DashboardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </StoreProvider>
  );
}

export default DashboardWrapper;
