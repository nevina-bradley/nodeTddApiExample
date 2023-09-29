const env = require('dotenv');
const mysql = require("mysql2");

env.config();

const connection = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

const createComment = async (name, description) => {
    if (!name || !description) {
        throw new Error('Invalid input');
    }

    try {
        const result = await connection.promise().query(
            `INSERT INTO comments (name, description) 
            VALUES (?, ?)`,
            [name, description]
        )
        return result[0].insertId;
    } catch (err) {
        throw new Error('Database query failed');
    }
}

const getComments = async () => {
    try {
        const [rows] = await connection.promise().query(
            `SELECT * FROM comments 
            ORDER BY createdAt 
            DESC LIMIT 10;`
        );
        return rows;
    } catch (err) {
        throw new Error('Failed to fetch comments');
    }
}

module.exports ={
    createComment, 
    getComments
}