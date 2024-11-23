const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { Pool } = require('pg');
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
// Функция для проверки подключения к базе данных
const Connection = async () => {
    try {
        const client = await pool.connect();
        console.log('База данных подключена');
    } catch (error) {
        console.error('Ошибка подключения базы данных:', error.message);
        process.exit(1); 
    }
};
Connection();
module.exports = pool;