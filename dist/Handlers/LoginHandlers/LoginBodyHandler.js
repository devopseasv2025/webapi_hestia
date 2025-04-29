import { AbstractHandler } from "../../InterfaceAdapters/Handler.js";
export class LoginBodyHandler extends AbstractHandler {
    handle(request, response) {
        const user = request.body;
        if (!user) {
            return response.status(400).send({ message: 'invalid structure of request.' });
        }
        return super.handle(request, response);
    }
}
//# sourceMappingURL=LoginBodyHandler.js.map