import winston from 'winston';
import { SeqTransport } from "@datalust/winston-seq";
const transports = [
    new winston.transports.Console(),
    new SeqTransport({
        serverUrl: "http://seq:5341",
        onError: (e => { console.error(e); }),
    })
];
const Logger = winston.createLogger({
    transports,
});
export default Logger;
//# sourceMappingURL=logger.js.map