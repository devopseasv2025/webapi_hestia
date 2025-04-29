import { createClient } from 'redis';
export class RedisClient {
    client;
    constructor() {
        const REDIS_HOST = process.env.REDIS_HOST || 'cache';
        const REDIS_PORT = process.env.REDIS_PORT || '6379';
        const REDIS_PASSWORD = process.env.REDIS_PASSWORD || 'my_password';
        this.client = createClient({
            url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
            password: REDIS_PASSWORD,
        });
        this.client.on('error', (err) => console.error('Redis Client Error', err));
    }
    async connect() {
        try {
            await this.client.connect();
            console.log('Connected to Redis');
        }
        catch (err) {
            console.error('Redis connection error:', err);
        }
    }
    async setValue(key, value) {
        try {
            await this.client.set(key, value);
        }
        catch (error) {
            console.error('Error setting value in Redis:', error);
        }
    }
    async getValue(key) {
        try {
            return await this.client.get(key);
        }
        catch (error) {
            console.error('Error getting value from Redis:', error);
            return null;
        }
    }
}
//# sourceMappingURL=redis-client.js.map