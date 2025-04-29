import { AbstractHandler } from "./Handler.js";
export class RegistrationHandler extends AbstractHandler {
    _userController;
    constructor(userController) {
        super();
        this._userController = userController;
    }
    handle(request, response) {
        return this._userController.registerUser(request, response);
    }
}
//# sourceMappingURL=RegistrationHandler.js.map