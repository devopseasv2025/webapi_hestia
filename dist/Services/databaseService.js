import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
export class MongoDBClient {
    client;
    db;
    dbName;
    constructor(connectionString, dbName) {
        this.client = new MongoClient(connectionString);
        this.dbName = dbName;
    }
    async connect() {
        try {
            await this.client.connect();
            console.log("Connected to MongoDB");
            this.db = this.client.db(this.dbName);
        }
        catch (error) {
            console.error("MongoDB connection failed:", error);
        }
    }
    getCollection(collectionName) {
        if (!this.db) {
            throw new Error("Database not connected. Call connect() first.");
        }
        return this.db.collection(collectionName);
    }
    async disconnect() {
        await this.client.close();
        console.log("MongoDB disconnected");
    }
}
//# sourceMappingURL=databaseService.js.map