var express = require('express');
var router = express.Router();
var Result = require('../shared/result');
let bodyParser = require('body-parser').json();
var roleService = require('../service/role.service');


router.post('/createNewRole',bodyParser, async (req, res, next)=>{
  try{
  await roleService.create(req);
  let result = new Result();
  result.setSuccessMessage("Sucessfully created new role");
  res.status(200).json(result);
  }catch(error){
    console.log(error);
    next(error);
  }
});

router.get('/getAll',async (req,res,next)=>{
    
});


module.exports = router;