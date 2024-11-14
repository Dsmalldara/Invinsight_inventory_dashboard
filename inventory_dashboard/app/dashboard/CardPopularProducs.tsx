import React from 'react'
import { useDashboardMetrics } from '../apis/DashboardMetrics'
import { ProductType } from './types'
import { Button } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'
import Rating from './Rating/Rating'

function CardPopularProducs({data}:{data:ProductType[]}) {
  return (
    <div className="row-span-3 xl:row-span-6 mt-6  shadow-md rounded-2xl pb-16 h-[400px] ">
        <h3 className='text-lg font-semib pxo7 pt-5 pb-2 text-center '>
            Popular Products 
        </h3>
        <hr/>
        <div className='overflow-auto h-full'>
     {/* Add your popular products here */} 
        {
           data.map((product: ProductType) => {
            return (
                <div key={product.productId} className='flex items-center justify-between gap-3 px-5 py-4 border-b'>
                   <div className="flex items-center gap-3">
                   <div>
                        img
                    </div>
                    <div className='flex flex-col justify-between gap-1'>
                    <div className='font-bold text-gray-700 '>
                        {product.name}
                    </div>
                    <div className='flex tet-sm items-center'>
                        <span className="font-bold text-blue-500 text-xs">
                          ${product.price}     
                        </span>
                        <span className='mx-2'>|</span>
                        <Rating rating={product.rating}/>
                    </div>
                    </div>
                    </div>  
                    <div className="text-xs flex items-center">
                        <Button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                            <ShoppingBag className="w-4 h-4"/>
                        </Button>
                        {Math.round(product.stockQuantity)/1000}k sold
                    </div>
                </div>
            )
           })
        }
        </div>
    </div>
  )
}

export default CardPopularProducs