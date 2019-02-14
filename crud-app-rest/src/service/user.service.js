const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/User.model');


async function authenticate({ username, password }) {
    const userData = await User.findOne({ username });
    if (userData && bcrypt.compareSync(password, userData.hash)) {
        const user = {
            roles: userData._roles,
            username:userData.firstName,
            firstName:userData.firstName,
            lastName:userData.lastName,

        }
        const token = jwt.sign({ user }, 'secretKey');
        let data = {
            user:user,
            token:token
        }
        return {
           data
        };
    }else{
        throw 'Invalid , username or password'
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username ' + userParam.username + ' is already taken';
    }

    const user = new User(userParam);

    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    return await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        const errorMessage = 'Username'  + userParam.username + 'is already taken';
        throw errorMessage;
    }

    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }
    
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
