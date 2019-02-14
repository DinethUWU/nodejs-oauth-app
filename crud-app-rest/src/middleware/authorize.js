module.exports = (req,res,next) =>{
try{
let permissionMatrix = req.permissionMatrix;
let fullUrl =req.originalUrl;
let userRoles=req.userData.roles
const key = fullUrl.split('/*/*');

if(key[0]=="/user/authenticate" || key[0]=="/user/register"){
next();
}

let permittedUrl = getPermittedRoles(key,userRoles,permissionMatrix);
        if (permittedUrl.length === 0) {
            res.status(403).json("No Permission");
        } else {
            next();
        }
    }catch(error){

    }
}

function getPermittedRoles(key,userRoles,permissionMatrix) {
    let authUrl=[]; 
    userRoles.forEach(element => {
       let tempObj = permissionMatrix.filter(obj => obj.name==element && obj._permissions.includes(key[0]));
       if(tempObj.length!==0){
        return authUrl.push(tempObj);
       }
    });
    return authUrl;
}

