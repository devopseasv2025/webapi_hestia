import { AbstractHandler } from "./Handler";
export class AuthorizationHandler extends AbstractHandler {
    requiredRole;
    constructor(requiredRole) {
        super();
        this.requiredRole = requiredRole;
    }
    handle(request, response) {
        if (!request.user || request.user.role !== this.requiredRole) {
            return response.status(403).json({ message: "Forbidden" });
        }
        return super.handle(request, response);
    }
}
//# sourceMappingURL=AuthorizationHandler.js.map