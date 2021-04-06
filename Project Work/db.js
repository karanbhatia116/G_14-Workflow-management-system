const Pool  = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config();


const devConfig = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: "workflow-management-app",
    port: process.env.PORT,
}

const productionConfig = {
    connectionString: process.env.DATABASE_URL,  //from heroku addon 
    ssl: {
        rejectUnauthorized: false
    }
}
<<<<<<< HEAD
// const pool = new Pool(process.env.NODE_ENV === "production"?productionConfig : devConfig);
=======
//const pool = new Pool(process.env.NODE_ENV === "production"?productionConfig : devConfig);
>>>>>>> 24d894a00998d53d20f2741f7ab6610f7efb6c21
const pool  = new Pool(productionConfig);
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

