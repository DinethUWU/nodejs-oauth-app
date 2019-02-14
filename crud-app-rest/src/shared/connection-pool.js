const mongoose = require('mongoose');

/*function initializeConnectionPool(){
    console.log("Initialize multiple connection pool");
    const tenant1Connection =mongoose.createConnection('mongodb://localhost:27017/tenant1_db',{useNewUrlParser: true}); // create a custom connection for tenant1
    const tenant2Connection =mongoose.createConnection('mongodb://localhost:27017/tenant2_db',{useNewUrlParser: true}); // create a custom connection for tenant2
    return {"tenant1":tenant1Connection,"tenant2":tenant2Connection};
}*/

function initializeConnection(){
    const connection =mongoose.createConnection('mongodb://localhost:27017/tenant1_db',{useNewUrlParser: true});
    return connection;
}


module.exports = {
    //initializeConnectionPool:initializeConnectionPool
    initializeConnection:initializeConnection
};