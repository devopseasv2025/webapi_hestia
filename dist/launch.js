import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import userRouter from "./Routes/userRoutes.js";
import cookieParser from 'cookie-parser';
import Logger from "./Infrastructure/Logger/logger.js";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/user', userRouter);
const server = app.listen(PORT, () => {
    Logger.info("Server service has started on port: " + PORT);
});
//# sourceMappingURL=launch.js.map