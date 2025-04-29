import { CustomError } from "ts-custom-error";
class UserAlreadyExistsError extends CustomError {
    constructor(message) {
        super(message);
    }
}
class UserNotFoundOrPasswordWrongError extends CustomError {
    constructor(message) {
        super(message);
    }
}
export { UserAlreadyExistsError, UserNotFoundOrPasswordWrongError };
//# sourceMappingURL=UserErrors.js.map