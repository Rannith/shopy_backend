import express, { json } from 'express';
import pkg from 'mongoose';
const { connect } = pkg;
import userRouter from './routes/user-routes'
import productRouter from './routes/product-routes'
import cartRouter from './routes/cart-routes'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()
const app = express()
app.use(cookieParser())
app.use(json());
app.use(cors())

app.use("/users", userRouter)
app.use("/product", productRouter)
app.use("/cart", cartRouter)


connect("mongodb://localhost:27017/shopy")
    .then(() => console.log("Connected to Database"))
    .then(() => {
        app.listen(process.env.PORT);
    })
    .catch(err => console.log(err))