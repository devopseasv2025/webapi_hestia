import { BearerTokenSigningService } from "./BearerTokenSigningService.js";
export var EProviders;
(function (EProviders) {
    EProviders[EProviders["login_token"] = 0] = "login_token";
})(EProviders || (EProviders = {}));
export default class TokenProviderFactory {
    static loginTokenConfiguration = {
        "secretKey": process.env.JWT_SECRET_KEY || "super_secret_key",
        "issuer": process.env.JWT_ISSUER || "my_issuer",
        "audience": process.env.JWT_AUDIENCE || "my_audience",
        "expiresIn": 3600,
    };
    static CreateFactory(provider) {
        if (provider == EProviders.login_token) {
            return new BearerTokenSigningService(this.loginTokenConfiguration.secretKey, this.loginTokenConfiguration.expiresIn, "HS256", this.loginTokenConfiguration.issuer, this.loginTokenConfiguration.audience);
        }
        // fail safe...
        throw new Error(`Provider ${provider} is not supported.`);
    }
}
//# sourceMappingURL=TokenProviderFactory.js.map