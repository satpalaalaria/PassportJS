


// connect to database



require('dotenv').config()
const knex=require("knex")({
    client:'mysql',
    connection:{
        host:process.env.db_host,
        user:process.env.db_user,
        password:process.env.db_pass,
        database:process.env.db_base
    }
})

//create table

// knex.schema.createTable('user', (table) => {
//     table.increments('id')
//     table.string('name')
//     table.string('Google_Id')
    
//   })
//   .then(() => {

//   };
  
module.exports = knex;