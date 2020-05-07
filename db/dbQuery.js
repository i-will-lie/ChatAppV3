const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const db = require("../db/dbInterface");

// need DB_CONN as DATABASE_URL fom heroku is undefined

// console.log("db", process.env.DATABASE_URL, process.env.PORT)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || process.env.DB_CONN,
    ssl: {
        rejectUnauthorized: false
    }
});
// "postgres://ukhvkoqwlbdqoy:0d58896f6d70668133324b1f7f157d8720005972ab177fa4502e696a0a200162@ec2-52-71-231-180.compute-1.amazonaws.com:5432/d2n7fq3tvjrsc"


// const { parse } = require('pg-connection-string')

// const config = parse(process.env.DATABASE_URL)

// config.ssl = {
//   rejectUnauthorized: false
// }
// const pool = new Pool(config)

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
// pool.on('error', (err, client) => {
//     console.error('Unexpected error on idle client', err)
//     process.exit(-1)
// })





async function registerUser(email, username, password) {
    console.log("q reg", email, username, password)
    const text = "select registerUser($1::email, $2::varchar(20), $3::varchar(50))";
    const values = [email, username, password];

    const client = await pool.connect();

    return client.query(text, values)
        .then(res => {
            console.log("dbQ", res);
            return res
        })
        .catch(err => {
            console.log("dbq", err);
            return err
        });


}

module.exports = { registerUser }