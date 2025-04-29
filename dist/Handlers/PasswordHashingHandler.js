import { AbstractHandler } from "./Handler.js";
import bcrypt from 'bcryptjs';
export class PasswordHashingHandler extends AbstractHandler {
    async handle(request, response) {
        const saltRounds = 17;
        // Validate if the password exists in the request body
        if (!request.body.password) {
            return response.status(400).send({ message: "Password attribute is required" });
        }
        try {
            // Hash the password
            const hash = await bcrypt.hash(request.body.password, saltRounds);
            console.log("PasswordHashing handler returned: ", hash);
            request.body.password = hash;
            super.handle(request, response);
        }
        catch (err) {
            // Handle any errors
            console.error(err);
            return response.status(400).send({ message: "An error occurred, if this persist please contact an administrator" });
        }
    }
}
//# sourceMappingURL=PasswordHashingHandler.js.map