
import mysql from 'mysql2/promise';
import Logger from "../Infrastructure/Logger/logger.js";


export async function connectToDatabase(){
    try{
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'user',
            password: 'pass',
            database: 'deviceDB',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        })

        console.log("Connected to Database");

        const [rows] = await connection.execute('SELECT COUNT(*) FROM device')
        console.log('Query result:', rows);

        await connection.end();

    } catch (err){
        Logger.error("Failed to connect to the database")
    }
}
