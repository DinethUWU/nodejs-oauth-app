var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
const productRouter = require('./src/routes/product.routes');
const authRouter = require('./src/routes/auth.routes');
const mongoose = require('mongoose');
var connectionPool = require('./src/shared/connection-pool');
var veryfyToken = require('./src/middleware/check-token');
var userRouter = require('./src/routes/user.routes');
var permissionRouter = require('./src/routes/permission.routes');
var roleRouter = require('./src/routes/role.routes');
var roleService = require('./src/service/role.service');
var errorHandler = require('./src/shared/error-handler');
var passport = require('passport');
global.mongooseConnection=connectionPool.initializeConnection();
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/tenant1_db', {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

require('./src/middleware/passport-setup');

let permissions = [{"key":"/product/createNewProduct","roles":["Super Admin","guest"]}]


const perm = [{"role":"user","apis":["/product/createNewProduct","/abc/cde"]}]


const app = express();
//global.mongoConnctionPool=connectionPool.initializeConnection();

// parse requests

async function getPermission(){  
    permissions = await roleService.getAllPermissions();
}
getPermission();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(function(req,res,next){
    req.permissionMatrix= permissions;
    next();
});
app.use('/oauth',authRouter);
app.use(veryfyToken);
app.use('/user',userRouter);

app.use('/permission',permissionRouter);
app.use('/product',productRouter);
app.use('/role',roleRouter);
//app.use('/user',userRouter);


app.use(errorHandler);

// default route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Product app"});
});



// catch 404 and forward to error handler

module.exports = app;
