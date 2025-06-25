'use client'
import React, { useState } from 'react'
import { getUsers } from '../api/UserApi'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { PaginationComp } from '../pagination/pagination'
interface userType  {
    avatar?:any,
    userId: number,
    name: string,
    email: string,
  
}
function page() {
    // Array of SVG gaming avatars
const gameAvatars = [
    // Robot avatar
    <svg key="1" viewBox="0 0 36 36" className="w-8 h-8">
      <circle cx="18" cy="18" r="18" fill="#2563eb"/>
      <circle cx="18" cy="15" r="8" fill="#1d4ed8"/>
      <rect x="12" y="18" width="12" height="8" rx="4" fill="#1e40af"/>
      <circle cx="14" cy="13" r="2" fill="#white"/>
      <circle cx="22" cy="13" r="2" fill="white"/>
    </svg>,
    
    // Crypto coin avatar
    <svg key="2" viewBox="0 0 36 36" className="w-8 h-8">
      <circle cx="18" cy="18" r="18" fill="#15803d"/>
      <path d="M18 8 L23 12 L23 24 L18 28 L13 24 L13 12 Z" fill="#16a34a"/>
      <text x="18" y="21" fontSize="12" fill="white" textAnchor="middle">₮</text>
    </svg>,
    
    // Diamond avatar
    <svg key="3" viewBox="0 0 36 36" className="w-8 h-8">
      <circle cx="18" cy="18" r="18" fill="#7c3aed"/>
      <path d="M18 8 L26 16 L18 28 L10 16 Z" fill="#8b5cf6"/>
      <path d="M18 8 L26 16 L18 20 L10 16 Z" fill="#a78bfa"/>
    </svg>,
    
    // Star avatar
    <svg key="4" viewBox="0 0 36 36" className="w-8 h-8">
      <circle cx="18" cy="18" r="18" fill="#b91c1c"/>
      <path d="M18 8 L21 15 L28 15 L22 20 L24 27 L18 23 L12 27 L14 20 L8 15 L15 15 Z" fill="#dc2626"/>
    </svg>,
    
    // Shield avatar
    <svg key="5" viewBox="0 0 36 36" className="w-8 h-8">
      <circle cx="18" cy="18" r="18" fill="#0f766e"/>
      <path d="M18 8 L25 11 V19 C25 23 18 28 18 28 C18 28 11 23 11 19 V11 L18 8Z" fill="#14b8a6"/>
    </svg>
  ];
 
    const [page, setPage] = useState(1)
 
    const { users, isLoading, error, totalPage}  = getUsers(15,page)
    const getRandomAvatar = () => {
        const randomIndex = Math.floor(Math.random() * gameAvatars.length);
        return gameAvatars[randomIndex];
      };
      
      // Map users to random avatars
      const usersWithAvatars = users?.map((user: userType) => ({
        ...user,
        avatar: getRandomAvatar()
      }));
    const handlePageChange = (page: number) => {
        console.log("Changing to page:", page);  // Debug log
        setPage(page);
      }
      if (error) return <div className='text-red-500'>Error loading products</div>
      if (isLoading) {
    
        return (
          <div className="bg-white shadow-md rounded-lg overflow-hidden text-sm md:text-base">
            <div className="flex justify-center items-center h-full py-8">
              <h1>
                All Users on Our Platform
              </h1>
            </div>
            <Table className="md:px-3 px-0">
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Avatar</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {[...Array(15)].map((_, index) => (
        <TableRow key={`Loading${index}`}>
          <TableCell className="py-3">
            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
          </TableCell>
          <TableCell className="py-3">
            <div className="flex flex-col space-y-2">
              <div className="h-10 w-[80%] bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
            </div>
          </TableCell>
          <TableCell className="py-3">
            <div className="h-10 w-[80%] bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
          </div>
        )
    } 
    return (
        <div>
              <div className="flex justify-center items-center h-full py-8">
              <h1>
                All Users on Our Platform
              </h1>
            </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden text-sm md:text-base ">
          <Table className='md:px-5 px-0'>
          <TableHeader>
                <TableRow>
                  <TableHead>User Avatar</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
            <TableBody>
              {usersWithAvatars?.map((user:userType) => (
                <TableRow key={user.userId}>
                  <TableCell className=''>{user.avatar}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4">
          <PaginationComp   totalpage={ totalPage || 1}
              currentpage={page}
              onPageChange={handlePageChange}/>
          </div>
        </div>
      )
}

export default page