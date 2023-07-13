import { Router } from "express";
import { ProductManager } from "../dao/productManager.js";

const productService = new ProductManager('products.json')

const validateFields = (req,res,next)=>{
    const productInfo = req.body
    if(!productInfo.title || !productInfo.description || !productInfo.code || !productInfo.price || !productInfo.stock ||       !productInfo.category){
        return res.json({status:"error",message:"campos incompletos"})
     }else{
        next();
     };

}

const router = Router();

router.get("/",async(req,res)=>{
    try {
        const limit = req.query.limit;
        const products = await productService.get();
        if(limit){
            // Mostrar los productos de acuerdo al limite
        }else{
            
            res.json({status:"succes", data:products})
        }
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});


router.get("/:pid",(req,res)=>{});


router.post("/",validateFields,async(req,res)=>{
    
    try {
        const productInfo=req.body;
        const productCreated = await productService.save(productInfo);
        res.json({status:"succes", data:productCreated, message:"El producto ha sido creado"});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
    
});

router.put("/:pid",validateFields,(req,res)=>{
    const productInfo = req.body;

    //Actualizar producto

})

router.delete("/:pid",(req,res)=>{});


export { router as productsRouter} 