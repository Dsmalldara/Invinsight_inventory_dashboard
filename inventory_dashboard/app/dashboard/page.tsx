'use client'
import React from 'react'
import { useDashboardMetrics } from '../apis/DashboardMetrics'
import Insights from './Insights'
import TrendData from "./TrendData"
import RatingData from './RatingGraph'
import CardPopularProducs from './CardPopularProducs'
import CardSalesSummary from './CardPurchaseSummary'
import PurchaseSummaryChart from './CardPurchaseSummary'
import SalesSummaryChart from './CardSalesSummary'
import StatCard from './StatCard'
import { AlertTriangle, ArrowDownRight, DollarSign, Globe, Package, ShoppingCart, TrendingUp } from 'lucide-react'
import Loader from '@/lib/Loader'
function page() {
  const {data,error} = useDashboardMetrics()
  let trendInfo = data?.data.trendData
  let popularProducts = data?.data.popularProducts
  let purchaseSummary = data?.data.purchaseSummary
  let salesData = data?.data.salesSummary
  trendInfo = [trendInfo]
  console.log(data)
  console.log(trendInfo)


  if (error) {
    return <div>Error: {error.message}</div>
  }

  // For full screen
if (!data) {
  return <Loader />;
}

// For inline/smaller container
if (!data) {
  return <Loader fullScreen={false} />;
}
  const RatingInfo = data?.data.popularProducts.map((item: { rating: number; stockQuantity: number,name:string })=>{
    return{
      name:item.name,
      rating:item.rating.toFixed(1),
      stockQuantity:item.stockQuantity
    }
  })
  console.log(RatingInfo)
  return (
    <div>
      <Insights/>
      <div className='flex flex-col space-x-6 space-y-6 md:flex-row items-center  justify-center'>
      <TrendData trendInfo={trendInfo}/>
      <RatingData data={RatingInfo}/>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 custom-grid-rows'>
          <CardPopularProducs data={popularProducts}/>
          <PurchaseSummaryChart  data={purchaseSummary}/>
          <SalesSummaryChart data={salesData}/>
      </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 mt-[1rem]'>
      <StatCard 
  data={{
    title: "Revenue & Orders",
    primaryIcon: <DollarSign className='text-blue-600 w-6 h-6' />,
    dateRange: "1-3 November 2024",
    details: [
      {
        title: "Total Revenue",
        amount: "$24,583.00",
        changePercentage: 8.5,
        IconComponent: TrendingUp
      },
      {
        title: "Orders",
        amount: "1,240",
        changePercentage: -3.2,
        IconComponent: ShoppingCart
      }
    ]
  }}
/>
<StatCard 
  data={{
    title: "Website Analytics",
    primaryIcon: <Globe className='text-blue-600 w-6 h-6' />,
    dateRange: "1-3 November 2024",
    details: [
      {
        title: "Page Views",
        amount: "45.2K",
        changePercentage: 12.3,
        IconComponent: TrendingUp
      },
      {
        title: "Bounce Rate",
        amount: "24.8%",
        changePercentage: -5.7,
        IconComponent: ArrowDownRight
      }
    ]
  }}
/>
<StatCard 
  data={{
    title: "Inventory Status",
    primaryIcon: <Package className='text-blue-600 w-6 h-6' />,
    dateRange: "1-3 November 2024",
    details: [
      {
        title: "Stock Value",
        amount: "$157.3K",
        changePercentage: 15.8,
        IconComponent: TrendingUp
      },
      {
        title: "Low Stock Items",
        amount: "28",
        changePercentage: -12.4,
        IconComponent: AlertTriangle
      }
    ]
  }}
/>
      </div>
    </div>
  )
}

export default page