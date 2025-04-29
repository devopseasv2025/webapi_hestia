import { AbstractHandler } from "./Handler.js";
export class LoginHandler extends AbstractHandler {
    _userController;
    constructor(userController) {
        super();
        this._userController = userController;
    }
    handle(request, response) {
        return this._userController.loginUser(request, response);
    }
}
//# sourceMappingURL=LoginHandler.js.map