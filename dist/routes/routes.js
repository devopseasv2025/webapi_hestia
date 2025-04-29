import express from 'express';
import { RedisClient } from "../redis-client.js";
const redisClient = new RedisClient();
redisClient.connect();
const router = express.Router();
//# sourceMappingURL=routes.js.map