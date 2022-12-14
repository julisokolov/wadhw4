const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "web123", //add your password
    database: "hw4",
    host: "localhost",
    port: "5432"
});

const execute = async(query) => {
    try {
        await pool.connect(); // create a connection
        await pool.query(query); // executes a query
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

/* 
gen_random_uuid() A system function to generate a random Universally Unique IDentifier (UUID)
An example of generated uuid:  32165102-4866-4d2d-b90c-7a2fddbb6bc8
*/

const createUserTblQuery = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL 
    );`;

const createPostTblQuery = `
    CREATE TABLE IF NOT EXISTS "posts" (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    dateTime VARCHAR(200) DEFAULT CURRENT_TIMESTAMP,
    body VARCHAR(200) NOT NULL 
);`;

execute(createUserTblQuery).then(result => {
    if (result) {
        console.log('Table "users" is created');
    }
});

execute(createPostTblQuery).then(result => {
    if (result) {
        console.log('Table "posts" is created');
    }
});

module.exports = pool;