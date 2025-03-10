import { Server } from 'http';
import { WebSocketServer, WebSocket } from 'ws'

interface Options {

    server: Server,
    path?: string;

}

export class WssService {

    private static _instance: WssService;
    private wss: WebSocketServer;

    static get instance(): WssService {
        if (!WssService._instance) {
            throw 'WssService is not initialized';
        }
        return WssService._instance;
    }

    private constructor(options: Options) {

        const { server, path = '/ws' } = options;
        this.wss = new WebSocketServer({ server, path });
        this.start();
    }

    static initWss(options: Options) {
        WssService._instance = new WssService(options);
    }

    public start() {

        this.wss.on('connection', (ws: WebSocket) => {

            console.log('Client connected!');

            ws.on('error', console.error);

            ws.on('message', (data) => {
                console.log('received: %s', data);
            });

            ws.on('close', () => {
                console.log('Client disconnected!');
            });

        });


    }

}