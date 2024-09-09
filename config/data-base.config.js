require('dotenv').config({ path: '../.env' });

const mysql = require("mysql2/promise");
const { HOST, USER, DATABASE, PASSWORD } = process.env;

async function connect() {
    const connection = await mysql.createConnection({
        host: HOST,
        database: DATABASE,
        user: USER,
        password: PASSWORD,
        port: 3306,
    });
    return connection;
};

async function executeQuery(query = "", params = []) {
    try {
        const connection = await connect();
        const [result] = await connection.execute(query, params);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = executeQuery;