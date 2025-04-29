import { ERole } from "../Models/Enums/ERoles.js";
import bcrypt from "bcryptjs";
import { UserAlreadyExistsError } from "../Models/Errors/UserErrors.js";
export class UserController {
    _TokenProvider;
    _UserContext;
    constructor(TokenProvider, UserContext) {
        this._TokenProvider = TokenProvider;
        this._UserContext = UserContext;
    }
    async registerUser(request, response) {
        let user = request.body;
        user.role = ERole.USER;
        user.createdAt = Date.now().toString();
        try {
            await this._UserContext.createUser(user);
            delete user.password;
            delete user.createdAt;
            // Generate token
            const userToken = this._TokenProvider.generateToken(user);
            response.cookie("user", userToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            return response.status(201).json({
                message: "Created User",
                user,
            });
        }
        catch (error) {
            if (error instanceof UserAlreadyExistsError) {
                return response.status(409).json({ message: "Username is already in use" });
            }
            console.error("Error registering user:", error);
            return response.status(500).json({ message: "Internal Server Error" });
        }
    }
    async loginUser(request, response) {
        let { username, password } = request.body;
        try {
            const user = await this._UserContext.readUser(username);
            if (!user) {
                return response.status(400).json({ message: "User does not exist or password is incorrect" });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return response.status(400).json({ message: "User does not exist or password is incorrect" });
            }
            delete user.password;
            const userToken = this._TokenProvider.generateToken(user);
            response.cookie("user", userToken, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
            });
            return response.status(200).json({
                message: "Successfully logged in",
                user,
            });
        }
        catch (error) {
            console.error("Error logging in user:", error);
            return response.status(500).json({ message: "Internal Server Error" });
        }
    }
}
//# sourceMappingURL=userController.js.map