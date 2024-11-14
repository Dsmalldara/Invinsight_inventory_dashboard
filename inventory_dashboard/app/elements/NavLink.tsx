'use client'
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link"
import { setIsSidebarcollapsed } from "../state";
import { useAppSelector, useAppDispatch } from "../store/reduxStore";
interface SidebarLinkProps {
    href: string;
    icon: LucideIcon,
    label:string,
    isCollapsed: boolean
}
 const SidebarLink = ({
    href,
    icon:Icon,
    label,
    isCollapsed
}:SidebarLinkProps)=>{
    const isSidebarCollapsed  = useAppSelector((state: any) => state.global.isSidebarCollapsed)
const dispatch = useAppDispatch();
const pathname = usePathname();
const toggleSidebarCollapse = () => {
    dispatch(setIsSidebarcollapsed(!isSidebarCollapsed));
  };
const isActive = pathname === href || (pathname.startsWith('/dashboard') && href === '/dashboard')
return (
    <Link href={href} onClick={toggleSidebarCollapse}>
        <div className={` cursor-pointer flex items-center ${isCollapsed ? 'justify-center py-4' : 'justify-start px-8 py-4'} hover:text-violet-500 hover:bg-violet-500 transition-colors  gap-3 ${isActive ? 'bg-violet-500 text-white' : '' }`}>
             <Icon className="w-6 h-6 !text-gray-800"/>
            <span className={`${ isCollapsed ? "hidden" : "block"} font-medium text-gray-700`}>
            {label}
        </span>
        </div>
    </Link>
)
}

export default SidebarLink;