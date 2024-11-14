'use client'
import React, { useState } from 'react'
import { AlignJustify, BellRing, Moon, PersonStandingIcon, Settings, Sun } from "lucide-react" 
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDispatch } from 'react-redux'
import { setIsDarkMode, setIsSidebarcollapsed } from '../state'
import { useAppSelector } from '../store/reduxStore'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
function Navbar() {
  const dispatch = useDispatch()
  const isSidebarCollapsed  = useAppSelector((state=>state.global.isSidebarCollapsed))
  const [isRotating, setIsRotating] = useState(false);
   const isDarkmode = useAppSelector((state)=> state.global.isDarkMode)
  const toggleSidebar =()=>{
    dispatch(setIsSidebarcollapsed(!isSidebarCollapsed))
  }
  const toggleMode =()=>{
    dispatch(setIsDarkMode(!isDarkmode))    
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 300);
  }

  return (
    <div className='flex justify-between items-center  '>
        <div className='flex justify-between gap-5  '>
        <div>
        <Button variant="secondary" className='p-1 w-fit  rounded-md  '  onClick={toggleSidebar}>
        <AlignJustify className='w-10 h-10'/>
        </Button>
        </div>
        <div className='relative   hidden'>
  <Input 
    placeholder='Search for a product' 
    className='border border-slate-200 rounded-md pl-14 py-4' // Add padding-left to make space for the icon
  />
  <BellRing 
    className='absolute top-1/2 left-2 transform -translate-y-1/2 text-black w-4 h-4 pointer-events-none ' // Center the icon vertically
  />
</div>
        </div>
        <div className=' justify-between items-center gap-10 flex'>
          <div className=' gap-4 flex '>
          <Button 
      variant="ghost" 
      onClick={toggleMode}
      className={`
        relative 
        p-2
        hover:bg-transparent
        ${isRotating ? 'ring-2 ring-slate-400 rotate-45' : ''}
        transition-all
        duration-300
      `}
    >
      <div className={`
        transform
        ${isRotating ? 'rotate-45 border p-1 rounded-md animate-pulse' : 'rotate-0 '}
        transition-transform
        duration-300
      `}>
        {isDarkmode ? (
          <Sun className="w-6 h-6 text-slate-400" />
        ) : (
          <Moon className="w-6 h-6 text-slate-400" />
        )}
      </div>
    </Button>
          <div className='relative cursor-pointer'>
          <BellRing className='  h-6 w-6'/>
        <span className=' absolute -top-3 -right-2 inline-flex items-center justify-center px-[0.5rem] py-1 text-sm font-semibold leading-none bg-red-500 rounded-full text-white'>
            2
        </span>
          </div>
          </div>
         <div className='flex gap-1'>
         <hr className='w-0 h-7 border border-solid  border-1 border-gray-400 mx-3'/>
         <span className='flex gap-3 '>
            {/* <PersonStandingIcon className=' text-slate-400 '/>   */}
            <Avatar>
      <AvatarImage src="https://avatars.githubusercontent.com/u/100885837?v=4" alt="@shadcn" />
      <AvatarFallback>DD</AvatarFallback>
    </Avatar>
           <Link href="/settings">
           <Settings className=' text-slate-400 cursor-pointer'/></Link>
            </span>
         </div>
        </div>
    </div>
  )
}

export default Navbar