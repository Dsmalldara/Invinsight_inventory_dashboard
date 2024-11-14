import {Request,Response} from "express"
import { Prisma, PrismaClient } from "@prisma/client"
import { v4 as uuidv4 } from 'uuid';
const prisma = new PrismaClient()
export const getProducts = async(req:Request, res:Response):Promise<void>=>{

    try{
        const search = req.query.search?.toString() || '';
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
    
        const whereCondition: Prisma.ProductsWhereInput = search 
          ? { 
              name: { contains: search, mode: 'insensitive' },
              
            }
          : {  };
    
        const products = await prisma.products.findMany({
            take: limit,
            skip: (page - 1) * limit,
            where: whereCondition
        });
        const totalProductsAvail = await prisma.products.count({where: whereCondition})
    
        const total = await prisma.products.count({ where: whereCondition });
        res.json({
            products,
            currentpage:page,
            totalpage:Math.ceil(total / limit),
            totalProductsAvail
        })
       
   }
   catch(err){
        res.status(500).json({message:"Error retrieving products"})
   }
}

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, price, rating, stockQuantity } = req.body;
        
        // Input validation
        if (!name || !price || stockQuantity === undefined) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        
        // Generate a unique UUID for the product
        const productId = uuidv4();
        
        const product = await prisma.products.create({
            data: {
                productId,  // UUID string
                name,
                price,
                rating: rating || 0, // Default rating if not provided
                stockQuantity
            }
        });
        
        res.status(201).json({
            message: `Successfully created product ${name}`,
            product
        });
    } catch (err) {
        console.error('Product creation error:', err);
        res.status(500).json({
            message: "Error creating product",
            error: err instanceof Error ? err.message : "Unknown error"
        });
    }
};

export const  deleteProduct = async(req:Request,res:Response)=>{
    try{
        const {productId} = req.params
         // First, delete related sales records
    await prisma.sales.deleteMany({
        where: { productId }
      });
      await prisma.purchases.deleteMany({
        where: { productId }
      });
        await prisma.products.delete({
            where:{
                productId
            }
        })
        res.status(200).json({message:`Product ${productId} deleted successfully`})
    }
    catch(err){
        res.status(500).json({message:"Error deleting product",err})
    }
}
export const updateProduct  =async(req:Request, res:Response) =>{
    try{
        const {productId,name, price, stockQuantity} = req.body;
        const updatedProduct = await prisma.products.upsert({
            where: {
                productId: productId,
            },
            update: {
                name: name,
                price: parseFloat(price),
                stockQuantity: parseInt(stockQuantity),
            },
            create: {
                productId: productId,
                name: name,
                price: parseFloat(price),
                stockQuantity: parseInt(stockQuantity),
            },
        });

        res.status(200).json({message: `Product ${name} updated successfully`,
            updatedProduct})
    }
    catch(err){
        res.status(500).json({message:"Error deleting product",err})
    }
}