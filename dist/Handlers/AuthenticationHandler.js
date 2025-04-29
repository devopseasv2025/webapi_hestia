import { AbstractHandler } from "./Handler.js";
export class AuthenticationHandler extends AbstractHandler {
    TokenProvider;
    constructor(TokenProvider, requiredRole) {
        super();
        this.TokenProvider = TokenProvider;
    }
    handle(request, response) {
        // fetching the user token from request header.
        try {
            const { user } = request.cookies;
            console.log(user);
            if (!user) {
                return response.status(401).json({ "message": "Authentication failed, Login first." });
            }
            // ensure the validity of the token.
            const isValid = this.TokenProvider.verifyToken(user);
            console.log(isValid);
            if (isValid) {
                return response.status(201).json({ "message": "Authentication successful." });
            }
        }
        catch (err) {
            console.log(err);
            console.error(err.stack);
            return response.status(401).json({ "error": "Unauthorized" });
        }
        return response.status(204).json({ message: "user is not authenticated. JWT is invalid." });
    }
}
//# sourceMappingURL=AuthenticationHandler.js.map