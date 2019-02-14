const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();



router.post('/login',(req,res)=>{
    const user = {
        roles: ['TDDA','TDA'],
        id: 1,
        username:'dineth',
        email:'dineth@gmail.com'
    }
    jwt.sign({user},'secretkey',(err,token)=>{
        res.json({
            token
        });
    });
});


module.exports = router;