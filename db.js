const Pool  = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config();


const devConfig = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: "workflow-management-chat-app",
    port: process.env.PORT,
}

const productionConfig = {
    connectionString: process.env.DATABASE_URL,  //from heroku addon 
}
const pool = new Pool(process.env.NODE_ENV === "production"?productionConfig : devConfig);
//     connectionString: process.env.DATABASE_URL,
//     user: process.env.DATABASE_USER,
//     password:process.env.DATABASE_PASSWORD,
//     host: process.env.DATABASE_HOST,
//     port: 5432, 
//     database: "workflow-management-chat-app",
//     ssl:{
//         rejectUnauthorized:false
//     },
// });

module.exports = pool;

