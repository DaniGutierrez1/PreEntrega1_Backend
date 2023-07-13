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
            
            res.json({status:"succes",data:products.lenght==limit})
        }else{
            
            res.json({status:"succes", data:products})
        }
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});


router.get("/:pid",async (req,res)=>{
    try {
        const id = req.body;
        const productSearch = await productService.getByID(id);
        if(id){
            
            res.json({status:"succes",data:productSearch, message:"El producto ha sido encontrado"})
        }else{
            
            res.json({status:"error", message:"El id no existe"})
        }
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});


router.post("/",validateFields,async(req,res)=>{
    
    try {
        const productInfo=req.body;
        const productCreated = await productService.save(productInfo);
        res.json({status:"succes", data:productCreated, message:"El producto ha sido creado"});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
    
});

router.put("/:pid",validateFields,async(req,res)=>{
    
    
    //Actualizar producto
    
})

router.delete("/:pid",async(req,res)=>{
    try {
        const id = req.body
        const productEliminated = await productService.delete(id)
        res.json({status:"succes",message:"Producto eliminado"})
        
    } catch (error) {
        res.json({status:"error", message:error.message})
    }

});


export { router as productsRouter} 