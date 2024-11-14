import {Request,Response} from "express"
import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const expenses = async(req:Request, res:Response)=>{
try{
    const expenseByCategoryRaw = await prisma.expenseByCategory.findMany({
        orderBy:{
            date:"desc",
        },
    })
    const expenseByCategorySummary =expenseByCategoryRaw.map((item)=> (
      {
        ...item,
        amount: item.amount.toString()
      }
    ))
    res.json(expenseByCategorySummary)
}
catch(err){
        res.status(500).json({message:"Error retrieving expense by category"})
}

}