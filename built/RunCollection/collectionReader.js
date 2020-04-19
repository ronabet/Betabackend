// import * as express from 'express';
// import * as http from 'http';
// import * as cors from "cors";
// import { config } from '../envrironments/config';
// import * as DbManager from '../utils/firebaseManager';
// export class Server {
//     public app: express.Application;
//     private server: http.Server;
//     public static bootstrap(): Server {
//         return new Server();
//     }
//     public constructor() {
//         this.server.listen(config.port, () => {
//             console.log(`Server running on port ${config.port}`);
//         });
//     }
//     async getMarker() {
//         const snapshot = await DbManager..collection('events').get()
//         return snapshot.docs.map(doc => doc.data());
//     }
//     public close() {
//         this.server.close();
//     }
// }
// const server : Server = new Server();
