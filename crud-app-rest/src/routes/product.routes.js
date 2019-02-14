var express = require('express');
var router = express.Router();
var Result = require('../shared/result');
let bodyParser = require('body-parser').json();
var productService = require('../service/product.service');
var authorize = require('../middleware/authorize');

router.post('/createNewProduct',authorize,bodyParser, async (req, res, next)=>{
  try{
  let data = await productService.createNewProduct(req);
  let result = new Result();
  result.setData(data);
  res.status(200).json(result);
  }catch(error){
    console.log(error);
    next(error);
  }  
}
);


module.exports = router;