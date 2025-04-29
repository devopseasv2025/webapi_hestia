import jwt from "jsonwebtoken";
export class BearerTokenSigningService {
    _private_key;
    _exportation_time_seconds;
    _signing_algorithm;
    _issuer;
    _audience;
    constructor(private_key, exportation_time, algorithm, issuer, audience) {
        this._private_key = private_key;
        this._exportation_time_seconds = exportation_time;
        this._signing_algorithm = algorithm;
        this._issuer = issuer;
        this._audience = audience;
    }
    decodeToken(token) {
        return jwt.decode(token);
    }
    verifyToken(authHeader) {
        return BearerTokenSigningService.verifyBearerToken(authHeader, this._private_key);
    }
    generateToken(payload) {
        return jwt.sign(payload, this._private_key, { algorithm: this._signing_algorithm,
            expiresIn: this._exportation_time_seconds, issuer: this._issuer, audience: this._audience });
    }
    static verifyBearerToken(authorizationHeader, p_key) {
        let BearerToken = authorizationHeader.split(' ')[1];
        try {
            jwt.verify(BearerToken, p_key);
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
//# sourceMappingURL=BearerTokenSigningService.js.map