const Role = require('../model/Role.model');
//const role=roleModel.Role;
//var Role = mongooseConnection.model('Role',role);


async function create(req) {
   // const Role =mongooseConnection.model('Role',role);
    const roleInfo = {
        name : req.body.name,
        _permissions : req.body.permissions,
        description : req.body.description
    }

    // validate
    if (await Role.findOne({ name: roleInfo.name })) {
        throw 'Role "' + roleInfo.name + '" is already exist';
    }
    
    const role = new Role(roleInfo);

    // save role
    await role.save();
}

async function update(id, userParam) {
    const role = await Role.findById(id);

    // validate
    if (!role) throw 'Role not found';
    if (role.rolename !== roleInfo.name && await User.findOne({ rolename: roleInfo.name })) {
        throw 'Role "' + roleInfo.name + '" is already exist';
    }


    // copy userParam properties to user
    Object.assign(role, roleInfo);

    await role.save();
}

async function _delete(id) {
    await role.findByIdAndRemove(id);
}

async function getAll(){
    //const Role =mongooseConnection.model('Role',role);
    const data = await Role.find();
    console.log(data);
    return data;
}

async function getAllPermissions(){
   // const Role =mongooseConnection.model('Role',role);
    const data = await Role.find().select("name _permissions -_id");
    console.log(data);
    return data;
}

module.exports = {
    create,
    update,
    delete: _delete,
    getAll:getAll,
    getAllPermissions:getAllPermissions
};
