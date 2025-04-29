export class AbstractGuard {
    nextHandler;
    setNext(handler) {
        this.nextHandler = handler;
        // Returning a handler from here will let us link handlers in a
        return handler;
    }
    handle(request, response, minRole) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=Guard.js.map