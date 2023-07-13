import { Router } from "express";
import { CartManager } from "../dao/cartManager.js";
import { ProductManager } from "../dao/productManager.js";

const cartService = new CartManager("carts.json");
const productService = new ProductManager("products.json")

const router = Router();

router.post("/",async(req,res)=>{
    try {
        const cartCreated = await cartService.save()
        res.json({status:"succes",data:cartCreated})
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
})
router.get("/:cid",(req,res)=>{})
router.post("/:cid/product/:pid",async(req,res)=>{
    try {
        const cartID = req.params.cid;
        const productID = req.params.pid;
        const cart = await cartService.getByID(cartID)
        const product = await productService.getByID(productID)

        /* const products = cart.products; */
        //verificar si el producto ya existe en el carrito
        //condicion
        //si existe el producto, a ese producto se le suma uno en cantidad
        // Si no existe, agregar el producto

            // const newProduct={
            //     product:productID,
            //     quantify:1
            // }
            // cartID.products.push(newProduct)
        await cartService.update(cartID,cart)
        res.json({status:"succes",data:cartCreated})
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

export { router as cartsRouter} 