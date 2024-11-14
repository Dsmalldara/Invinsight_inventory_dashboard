import {Request,Response} from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


export const getDashboardMetrics = async(req: Request, res: Response): Promise<void>=>{
    try{
        const salesData = await prisma.sales.findMany({
            where: {
              timestamp: {
                gte: new Date("2023-04-16T18:59:38Z"),
                lte: new Date("2024-01-27T13:21:55Z")
              }
            },
            select: {
              timestamp: true,
              totalAmount: true
            }
          });
    const RevenuePerDay =  salesData.reduce((acc: { [key: string]: number }, item) => {
        const dateKey = item.timestamp.toISOString().split('T')[0]
        if(!acc[dateKey]){
            acc[dateKey] = 0
        }
        acc[dateKey] += item.totalAmount
        return acc
    }, {} as { [key: string]: number })   
    const trendData  = Object.entries(RevenuePerDay).map(([date,amount])=>({
        date,
        amount:amount.toString(),
    }))
    const popularProducts =await prisma.products.findMany({
        take:15,
        where:{
            stockQuantity:{
                gte:601208
            }
        }
    })
        const salesSummary = await prisma.salesSummary.findMany({
            take:5,
            orderBy:{
                date:"desc"
            }
        })
        const purchaseSummary = await prisma.purchaseSummary.findMany({
            take:5,
            orderBy:{
                date:"desc"
            }
        })
        const expenseSummary = await prisma.expenseSummary.findMany({
            take:5,
            orderBy:{
                date:"desc"
            }
        })
        const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
            take:5,
            orderBy:{
                date:"desc"
            }
        })
        const expenseByCategory = expenseByCategorySummaryRaw.map((item)=>({
            ...item,
            amount:item.amount.toString(),
        }))
        res.json({
            trendData,
            popularProducts,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseByCategory,
        })
    }
    catch(err){
        if (err instanceof Error) {
            res.status(500).json({message: err.message});
        } else {
            res.status(500).json({message: "An unknown error occurred"});
        }
    }
}