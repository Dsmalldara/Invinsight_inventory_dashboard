import { LucideIcon } from 'lucide-react';
import React from 'react'

type StatDetail ={
    title:string;
    amount:string
    changePercentage:number;
    IconComponent:LucideIcon;
}
type StatCardProps = {
    title: string;
    primaryIcon: JSX.Element;
    details:StatDetail[]
    dateRange :string
};

function StatCard({data}:{data:StatCardProps}) {
    const formatPercentage = data.details.map(detail => detail.changePercentage > 0)
    const changeColor=(value:number)=>{
        if(value >0){
            return "text-green-500"
        }
        else{
            return "text-red-500"
        }
    }
  return (
    <div className=' bg-white shadow-md rounded-2xl flex flex-col justify-between '>
        <div className='flex justify-between items-center mb-2 px-5 pt-4 '>
            <h2 className='font-semibold text-lg text-gray-700'>{data.title}</h2>
            <p className='text-xs text-gray-400'>{data.dateRange}</p>
        </div>
        <hr/>
        <div className='flex mb-6 items-center justify-arounf gap-4 px-5 '>
            <div className="rounded-full p-5 bg-blue-50 border border-sky-300 ">
                {data.primaryIcon}
            </div>
            <div className="flex-1 ">
            {
                data.details.map((detail, index) => (
                    <div key={index} className='flex my-4 items-center gap-2'>
                        <p className='text-sm text-gray-900'>{detail.title}</p>
                        <p className={`text-lg font-bold ${changeColor(detail.changePercentage)}`}>{detail.amount}</p>
                        <p className='text-xs text-gray-400 w-4 h-4 '><detail.IconComponent /></p>
                    </div>
                ))
            }
            </div>
        </div>
    </div>
  )
}

export default StatCard