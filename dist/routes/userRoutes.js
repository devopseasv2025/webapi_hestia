import express from 'express';
import RequestBodyHandler from "../Handlers/RequestBodyHandler.js";
import { userLoginSchema, userRegistrationSchema } from "../Schemas/userSchemas.js";
import { PasswordHashingHandler } from "../Handlers/PasswordHashingHandler.js";
import TokenProviderFactory, { EProviders } from "../Infrastructure/TokenService/TokenProviderFactory.js";
import { UserController } from "../Controller/userController.js";
import { RegistrationHandler } from "../Handlers/RegistrationHandler.js";
import { MongoDBClient } from "../Services/databaseService.js";
import { UserRepositoryMongo } from "../Repository/UserRepositoryMongo.js";
import { LoginHandler } from "../Handlers/LoginHandler.js";
const userRouter = express.Router();
const tokenProvider = TokenProviderFactory.CreateFactory(EProviders.login_token);
const mongoDBClient = new MongoDBClient(process.env.MONGO_DB_CONNECTION_STRING || "", "user");
const userProvider = new UserRepositoryMongo(mongoDBClient);
const userController = new UserController(tokenProvider, userProvider);
userRouter.post("/register", (req, res) => {
    const registerBodyValidator = new RequestBodyHandler(userRegistrationSchema);
    const passwordHarsher = new PasswordHashingHandler();
    const registrationHandler = new RegistrationHandler(userController);
    registerBodyValidator.setNext(passwordHarsher);
    passwordHarsher.setNext(registrationHandler);
    return registerBodyValidator.handle(req, res);
});
userRouter.post("/login", (req, res) => {
    const loginBodyValidator = new RequestBodyHandler(userLoginSchema);
    const loginHandler = new LoginHandler(userController);
    loginBodyValidator.setNext(loginHandler);
    return loginBodyValidator.handle(req, res);
});
userRouter.get('*', (req, res) => {
    return res.status(404).send('no such route');
});
export default userRouter;
//# sourceMappingURL=userRoutes.js.map