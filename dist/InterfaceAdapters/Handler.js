/**
 * The Handler interface declares a method for building the chain of handlers.
 * It also declares a method for executing a request.
 * https://refactoring.guru/design-patterns/chain-of-responsibility/typescript/example
 */
/**
 * The default chaining behavior can be implemented inside a base handler class.
 */
export class AbstractHandler {
    nextHandler;
    setNext(handler) {
        this.nextHandler = handler;
        // Returning a handler from here will let us link handlers in a
        return handler;
    }
    handle(request, response) {
        if (this.nextHandler) {
            return this.nextHandler.handle(request, response);
        }
        return null;
    }
}
//# sourceMappingURL=Handler.js.map