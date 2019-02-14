const jwt = require('jsonwebtoken');


module.exports =(req,res,next) => {
  
  const url = req.originalUrl.split('/*/*');
  console.log(url);
  if(url=="/user/authenticate" || url=="/user/register"){
    next();
  }

    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      jwt.verify(req.token, 'secretKey', async (err,decodeToken)=>{
        if(err){
          res.sendStatus(403);
        }
        req.userData = decodeToken.user;
        next();
      });
    } else {
      // Forbidden
      
    }
}
