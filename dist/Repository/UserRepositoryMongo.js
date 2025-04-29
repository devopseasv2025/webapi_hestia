import { UserAlreadyExistsError, UserNotFoundOrPasswordWrongError } from "../Models/Errors/UserErrors.js";
export class UserRepositoryMongo {
    _client;
    constructor(client) {
        this._client = client;
        this.connect();
    }
    updateUser(username) {
        throw new Error("Method not implemented.");
    }
    async connect() {
        await this._client.connect();
    }
    // Create a new user in the database
    async createUser(user) {
        try {
            // Check if the user already exists
            const existingUser = await this._client.getCollection("users").findOne({ username: user.username });
            if (existingUser) {
                throw new UserAlreadyExistsError("The username is already in use.");
            }
            // Insert the new user
            console.log("Inserting user into database with username: " + user.username);
            await this._client.getCollection("users").insertOne(user);
            return user;
        }
        catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user");
        }
    }
    // Delete a user by username
    async deleteUser(username) {
        try {
            const result = await this._client.getCollection("users").deleteOne({ username });
            return result.deletedCount > 0;
        }
        catch (error) {
            console.error("Error deleting user:", error);
            throw new Error("Failed to delete user");
        }
    }
    // Retrieve all users from the database
    async readAllUsers() {
        try {
            return await this._client.getCollection("users").find().toArray();
        }
        catch (error) {
            console.error("Error reading users:", error);
            return [];
        }
    }
    // Find a user by username
    async readUser(username) {
        try {
            const user = await this._client.getCollection("users").findOne({ username });
            if (user === null)
                throw new UserNotFoundOrPasswordWrongError("User not found or the password is incorrect.");
            return user;
        }
        catch (error) {
            console.error("Error reading user:", error);
            return null;
        }
    }
}
//# sourceMappingURL=UserRepositoryMongo.js.map