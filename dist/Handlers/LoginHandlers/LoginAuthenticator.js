import { AbstractHandler } from "../../InterfaceAdapters/Handler.js";
export default class LoginAuthenticator extends AbstractHandler {
    authenticator;
    constructor(authenticator) {
        super();
        this.authenticator = authenticator;
    }
    handle(request, response) {
        return this.authenticator.login(request, response);
    }
}
//# sourceMappingURL=LoginAuthenticator.js.map