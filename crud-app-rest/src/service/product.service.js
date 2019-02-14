const Prodcut = require('../model/Product.model');



async function createNewProduct(req){
try{

    const productInfo = {
        title: req.body.title || "No product title", 
        description: req.body.description,
        price: req.body.price,
        company:req.body.company
    };
    let item = new Prodcut(productInfo);
    let data = item.save();
   return data;
}catch(error){
   console.log(error);
}
}

async function getProductById(id){
    try{
     let data = await Prodcut.findById(id);
     return data;
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    createNewProduct:createNewProduct,
    getProductById:getProductById
}
