import {Request,Response} from "express"
import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getUsers = async (req: Request, res: Response):Promise<void>=>{
 try{
    const limit = parseInt(req.query.limit as string) || 20
    const page = parseInt(req.query.page as string) || 1 

    const users = await prisma.users.findMany(
        {
            take:limit,
            skip: (page -1) * limit
        }
    )
    const totalUsers = await prisma.users.count()
    const totalPage = Math.ceil(totalUsers / limit)
    res.json({users,totalUsers,limit,totalPage})

 }    
 catch(error){
    res.status(500).json({message:"Error retrieving users"})
 }
}
