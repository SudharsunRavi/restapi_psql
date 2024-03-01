const {Pool}=require('pg')
const dotenv=require('dotenv').config()

const pool=new Pool({
    user: "postgres",
    host: "localhost",
    database: "restapi",
    password: process.env.POSTGRES_PASSWORD,
    port: 5432
})

module.exports=pool;