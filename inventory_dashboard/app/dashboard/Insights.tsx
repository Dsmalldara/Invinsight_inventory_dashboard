import { Card } from '@/components/ui/card'
import React from 'react'

function Insights() {
    const list = [
        {
            name: "Net Sales",
            price:"$100,000",
            trend:+15
        },
        {
            name: "Cost of Goods Sold",
            price:"$56,000",
            trend:+20
        },{
            name: "Gross Profit",
            price:"$19,000",
            trend:-25
        }
        ,{
            name: "Quantity",
            price:"2200",
            trend:+5
        },
        {
            name: "Stock On Hand",
            price:"$25,319,124",
        }
    ]
  return (
    <Card className='border border-md border-gray-300  px-3 py-4  shadow-md flex justify-start gap-8 lg:gap-[5.5rem] md:gap-[4.5rem] w-full mt-[2rem] pl-[1rem] flex-wrap'>
        {list.map((item, index) => (
            <div key={index} className='flex flex-col justify-between items-center gap-2 text-sm '>
                <p className='text-gray-400'>{item.name}</p>
                <div className='flex gap-2'>
                    <p className='text-gray-900 font-bold'>{item.price}</p>
                  <div className='inline-flex'>
                  <p> {item.trend && item.trend > 0 && '+'}</p>
                  {
                    item.trend && 
                    <p className={`text-[0.65rem] font-bold ${item.trend && item.trend > 0 ? "text-blue-800" : "text-red-600"}`}>{item.trend}%</p>
                  }
                  </div>
                </div>
            </div>
        ))}
    </Card>
  )
}

export default Insights