var express = require('express');
var router = express.Router();
var Result = require('../shared/result');
let bodyParser = require('body-parser').json();
var permissionService = require('../service/permission.service');


router.post('/createNewPermission',bodyParser, async (req, res, next)=>{
  try{
  let data = await permissionService.createNewPermisson(req);
  let result = new Result();
  result.setData(data);
  res.status(200).json(result);
  }catch(error){
    console.log(error);
    next(error);
  }
});

module.exports = router;