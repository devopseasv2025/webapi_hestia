import { ZodError } from 'zod';
import { AbstractHandler } from "./Handler.js";
export default class RequestBodyHandler extends AbstractHandler {
    schema;
    constructor(schema) {
        super();
        this.schema = schema;
    }
    handle(request, response) {
        try {
            this.schema.parse(request.body);
            return super.handle(request, response);
        }
        catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }));
                response.status(400).json({ error: 'Invalid data', details: errorMessages });
            }
            else {
                response.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }
}
//# sourceMappingURL=RequestBodyHandler.js.map