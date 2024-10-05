import Category from "../models/Category.js";
import Product from "../models/Product.js";

export const getNewArrival = async(req,res)=>{
    try {
        const newArrivedProducts = await Product.find({
            newArrival:true
        })
        const sorted = newArrivedProducts.sort((a,b)=>b.createdAt-a.createdAt);
        const formattedProducts = sorted.slice(0,4)
        res.status(200).json(formattedProducts);
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

export const getAllNewArrivals = async(req,res)=>{
    try {
        const {sort,maxPrice=500} = req.query;
        let sortOrder = 1;
        if(sort === "desc"){
            sortOrder = -1
        };
        let query = {newArrival:true};
        if(maxPrice){
            query.price = {$lte:maxPrice};
        }

        const allArrivals = await Product.find(query).sort({price:sortOrder});
        res.status(200).json(allArrivals);
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}


export const getProductWithID = async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);       
    } catch (error) {
        res.status(404).json({msg:`fff ${error.message} `})
    }
}

export const categoriesWithProducts = async(req,res)=>{
        try {
        const prodsss = await Product.find({}).populate({path: 'category', model:'Category'});
            res.status(200).json(prodsss);
        } catch (error) {
            res.status(400).json({msg:"errrrr"})
    }
}

export const getPhoneCatOnly = async(req,res)=>{
    try {
        const category = await Category.findOne({name:"shoes"});
        const products = await Product.find({category:category._id}).populate('category');
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({msg:"errrrr"})
    }
}

export const getOneCategory = async(req,res)=>{
    try {
        const {categoryName} = req.params;
        const category = await Category.findOne({name:categoryName});
        const products = await Product.find({category:category._id}).populate('category');
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({msg:"errrrr"})
    }
}


const createProdandID = async (catName, prodName, price, company, rating, desc, newArrival, images) => {
    try {
        let newCategory = await Category.findOne({name:catName});
        if(!newCategory){
            newCategory = new Category({
                name:catName,
                products:[]
            });
            await newCategory.save();
        };
        const newProduct = new Product({
            name: prodName,
            description: desc,
            rating: rating,
            newArrival: newArrival,
            price: price,
            company: company,
            images: images,
            category: newCategory._id,
        });
        await newProduct.save();
        newCategory.products.push(newProduct._id)
        await newCategory.save();
        
    } catch (error) {
        console.log(error.message);
    }
};

// createProdandID(
//     'shoes',
//     'Leather blue shoes',
//     1800,
//     'H&M',
//     3.5,
//     "Blue leather shoes offer a stylish and versatile addition to any wardrobe. The rich blue color adds a pop of personality to outfits, while the leather material provides durability and a touch of luxury. These shoes are perfect for both casual and formal occasions, offering a chic and polished look. The soft leather construction ensures comfort, making them ideal for all-day wear. Whether paired with jeans for a casual outing or a suit for a more formal event, blue leather shoes are a timeless and fashionable choice.",
//     true,
//     ['https://images.pexels.com/photos/292998/pexels-photo-292998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
// );
    