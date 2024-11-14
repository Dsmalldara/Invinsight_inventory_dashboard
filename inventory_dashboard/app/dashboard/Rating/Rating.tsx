import { Star } from 'lucide-react'
import React from 'react'

function Rating({rating}:{rating:number}) {
  return [1,2,3,4,5].map((index)=>
    <Star color={index <= rating ? "#ffc107" : "#e4e5e9" } className='w-4 h-4'/>
)
}

export default Rating