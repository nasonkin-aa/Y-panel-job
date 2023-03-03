import net from 'net';
import { db } from '../db';
import { EqCommand } from '../types';
export default class TCPConnector {
    constructor(eq) {
        this.data = eq;
        this.instance = new net.Socket();
        // ! раскоментить для прода
        this.connect();
    }
    connect() {
        try {
            this.instance.connect(Number(this.data.port), this.data.ip, () => {
                console.log("Client: Connected to server");
                console.log(this.instance.read());
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    powerOn(request) {
        db === null || db === void 0 ? void 0 : db.run(`UPDATE expositions SET status = '${EqCommand.On}' WHERE id= ${this.data.id}`);
        // ! раскоментить для прода
        return new Promise((resolve, reject) => {
            resolve(this.instance.write(request));
        });
        // ! закоментить для прода
        // return Promise.resolve(true);
    }
    powerOff(request) {
        db === null || db === void 0 ? void 0 : db.run(`UPDATE expositions SET status = '${EqCommand.Off}' WHERE id= ${this.data.id}`);
        // ! раскоментить для прода
        return new Promise((resolve, reject) => {
            resolve(this.instance.write(request));
        });
        // ! закоментить для прода
        //return Promise.resolve(true);
    }
    humidityCheck(request) {
        db === null || db === void 0 ? void 0 : db.run(`UPDATE expositions SET status = '${EqCommand.Off}' WHERE id= ${this.data.id}`);
        // ! раскоментить для прода
        return new Promise((resolve, reject) => {
            resolve(this.instance.write(request));
        });
        // ! закоментить для прода
        //return Promise.resolve(true);
    }
}
