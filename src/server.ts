import * as express from 'express';
import * as http from 'http';
import * as cors from "cors";
import { AppRouter } from './router';
import { config } from './envrironments/config';


export class Server {
    public app: express.Application;
    private server: http.Server;
    public static bootstrap(): Server {
        return new Server();
    }
    public constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.app.use(cors());
        this.app.use(AppRouter);
        this.server.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });
    }
    public close() {
        this.server.close();
    }
}

const server : Server = new Server();
