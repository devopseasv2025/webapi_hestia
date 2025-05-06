import mariadb from "mariadb";
import Logger from "../Infrastructure/Logger/logger.js";

const pool = mariadb.createPool({
    host: "mariadb",
    port: 3306,
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "<PASSWORD>",
    database:process.env.MYSQL_DATABASE || "deviceDB",
    connectionLimit: 5
});

async function asyncFunction<T = any>(query: string, params?: any[]) {
    let conn;
    try {

        conn = await pool.getConnection();
        const rows = await conn.query(query, params);
        return rows as T;

    } catch(err){
        Logger.log(err);
        throw err;
    }finally {
        if (conn) conn.release();
    }
}

export {asyncFunction};

