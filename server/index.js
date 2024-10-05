import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors";
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js";
import paymentRoutes from "./routes/payment.js"
import productRoutes from "./routes/product.js"
import CorsOptions from "./configs/CorsOption.js";
import Product from "./models/Product.js";
import { CategoryData, DataProduct } from "./data/productData.js";
import Category from "./models/Category.js";

// configss

const  __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json())
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors(CorsOptions))
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'public/assets')));

// file
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/assets");
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname);
    }
})
const upload = multer({storage});

// Routesss
app.use('/auth',authRoutes);
app.use('/user',userRoutes);
app.use('/products',productRoutes)
app.use('/pay',paymentRoutes)



// Mongo DB COnnection

const PORT = process.env.PORT || 6006
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    // Product.insertMany(DataProduct);
    app.listen(PORT,()=>console.log(`Server Port: ${PORT}`))
})
.catch((err)=>console.log(err))

