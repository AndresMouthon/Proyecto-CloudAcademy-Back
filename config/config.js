const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const { HOST, USER, DATABASE, PASSWORD } = process.env;

module.exports = {
    development: {
        username: USER,
        password: PASSWORD,
        database: DATABASE,
        host: HOST,
        dialect: "mysql",
    }
};
