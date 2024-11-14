'use client'
import { Button } from '@/components/ui/button'
import { Archive, CircleDollarSign, Clipboard, Home, Layout, Menu, SlidersHorizontal, User, X } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../store/reduxStore'
import { setIsSidebarcollapsed } from '../state'
import SidebarLink from "@/app/elements/NavLink"
import Image from 'next/image'
import Logo from "@/public/logo.png"
function Sidebar() {
  const navItems = [
    {
      href:"/dashboard",
      icon:Layout,
      label:"Dashboard",
    },
    {
      href:"/inventory",
      icon:Archive,
      label:"Inventory",
    },
    {
      href:"/products",
      icon:Clipboard,
      label:"Products",
    },
    {
      href:"/users",
      icon:User,
      label:"Users",
    },
    {
      href:"/settings",
      icon:SlidersHorizontal,
      label:"Settings",
    },
    {
      href:"/expenses",
      icon:CircleDollarSign,
      label:"Expenses",
    }
  ]
  const dispatch = useDispatch()
  const isSidebarCollapsed  = useAppSelector((state: any) => state.global.isSidebarCollapsed)
  const toggleSidebar =()=>{
    dispatch(setIsSidebarcollapsed(!isSidebarCollapsed))
  }
  const sidebarClassName =  `fixed flex flex-col ${isSidebarCollapsed ? 'w-0 md:w-16' : 'w-72 md:w-64'} bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40 blur-0  backdrop-filter-none`
  return (
    <div className={sidebarClassName}>
           <div className='flex md:justify-start justify-between gap-3 mt-6 pl-3 items-center'>
           <Image src={Logo} alt='logo' className='h-6 w-6'/>
            <h1 className={`font-bold text-2xl antialiased  ${isSidebarCollapsed ? 'hidden' : 'false'}`}>
            InvInsight
            </h1>
            
            <div className='md:hidden p-3'>
           <Button onClick={toggleSidebar} className=' bg-transparent shadow-none rounded-full hover:bg-none '>
          {
            isSidebarCollapsed ?  <Menu className='h-6 w-6'/> : <X className='h-8 w-8'/>
          }
           </Button>
            </div>
            </div>
       {/* Links */}
        <div className='mt-8 flex-grow'>
          {
            navItems.map((item,index)=>{
              return (
                <SidebarLink href={item.href} label={item.label} icon={item.icon} isCollapsed={isSidebarCollapsed} key={index}/>
              )
              })
          }
        
        </div>
        {/* Footer */}
        <div>
        <p className={`${isSidebarCollapsed ? 'hidden' : 'block'} mb-10 text-start pl-4  text-xs text-gray-800 `}>
            &copy; 2024 InvInsight
        </p>
        
        </div>
    </div>
  )
}

export default Sidebar