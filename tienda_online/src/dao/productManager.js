import { __dirname } from "../utils.js"
import path from "path";
import fs from "fs";

export class ProductManager{
    constructor(fileName){
        this.path=path.join(__dirname,`/files/${fileName}`)
    };
    
    fileExist(){
        return fs.existsSync(this.path);
    }
    
    async get(){
        try {
            if(this.fileExist()){
              const content = await fs.promises.readFile(this.path,"utf-8");
              const products = JSON.parse(content);
              return products
            }else{
                throw new Error("No se pueden obtener los productos")
            }    
        } catch (error) {
            throw error;
        }
    };

    async getByID(id){
        // Devuelve el producto que cumple con el id recibido
    }

    async save(product){
        try {
            if(this.fileExist()){
              const content = await fs.promises.readFile(this.path,"utf-8");
              const products = JSON.parse(content);
              let newID=1;
              if(products.length>0){
                newID=products[products.length-1].id+1;
              }
              const newProduct={
                id:newID,
                ...product
              };
              products.push(newProduct);
              await fs.promises.writeFile(this.path,JSON.stringify(products,null,'\t'));
              return newProduct;
            }else{
                throw new Error("Accion no posible")
            }    
        } catch (error) {
            throw error;
        }
    }
}