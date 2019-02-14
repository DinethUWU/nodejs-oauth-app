const Permission = require('../model/Permission.model');
//const permission = permissionModel.Permission;

async function createNewPermisson(req){
    const permissionInfo = {
        name:req.body.name,
        description:req.body.description
    }

    let permission = new Permission(permissionInfo);
    console.log(permissionInfo);
    let  data =await permission.save();
    return data;
}

module.exports = {
    createNewPermisson:createNewPermisson
}