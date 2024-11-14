import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { dot } from 'node:test/reporters'
import dashboardRoutes from "./routes/dashboardRoutes"
import UserRoutes from "../src/routes/usersRoutes"
import productsRoutes from "./routes/productRoutes"
import ExpensesRoutes from "./routes/expenseRoute"
// config
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(cors({
    origin: process.env.FrontendPort || "http://localhost:3000",
    credentials:true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


// Routes
app.use("/dashboard",dashboardRoutes)
app.use("/products",productsRoutes)
app.use("/users", UserRoutes)
app.use("/expenses", ExpensesRoutes)
// server
const port = Number(process.env.PORT) || 5000
app.listen(port,"0.0.0.0",()=>{
    console.log(`Server running on port ${port}`)
})