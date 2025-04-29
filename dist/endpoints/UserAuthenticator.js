export class UserAuthenticator {
    _userRepo;
    loginTokenProvider;
    refreshTokenProvider;
    constructor(login_token_provider, refresh_token_provider, userReposetory) {
        this.loginTokenProvider = login_token_provider;
        this.refreshTokenProvider = refresh_token_provider;
        this._userRepo = userReposetory;
    }
    login(req, res) {
        try {
            const user = req.body;
            if (!this._userRepo.authenticateUser(user)) {
                return res.status(401).json({ message: "Invalid user" });
            }
            const loginToken = this.loginTokenProvider.generateToken(user);
            const refreshToken = this.refreshTokenProvider.generateToken(user);
            return res.status(201).json({
                message: "Login success",
                token: loginToken,
                refreshToken: refreshToken
            });
        }
        catch (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    register(req, res) {
        try {
            const user = req.body;
            // Reuse validation helper
            const validationError = UserAuthenticator.validateUserInput(user);
            if (validationError) {
                return res.status(400).json({ message: validationError });
            }
            if (this._userRepo.userExists(user)) {
                return res.status(409).json({ message: "User already exists" });
            }
            this._userRepo.addUser(user);
            return res.status(201).json({
                message: "User created successfully",
                user: user
            });
        }
        catch (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    static validateUserInput(user) {
        if (!user || !user.username) {
            return "Malformed user attributes, username is missing";
        }
        if (!user.password) {
            return "Malformed user attributes, password is missing";
        }
        return null;
    }
}
//# sourceMappingURL=UserAuthenticator.js.map