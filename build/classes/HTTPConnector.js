var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import { EqCommand } from '../types';
import { db } from '../db';
export default class HTTPConnector {
    constructor(eq) {
        this.data = eq;
        const baseURL = `http://${this.data.ip}`;
        this.instance = axios.create({
            baseURL,
        });
    }
    powerOn(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ! раскоментить для прода
                const res = yield this.instance.get(request);
                // ! закоментить для прода
                //const res = { data: 'dsfsdf' };
                if (res.data) {
                    db === null || db === void 0 ? void 0 : db.run(`UPDATE expositions SET status = '${EqCommand.On}' WHERE id= ${this.data.id}`);
                    return true;
                }
            }
            catch (error) {
                console.error(error);
            }
            return false;
        });
    }
    powerOff(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ! раскоментить для прода
                const res = yield this.instance.get(request);
                // ! закоментить для прода
                //const res = { data: 'dsfsdf' };
                if (res.data) {
                    db === null || db === void 0 ? void 0 : db.run(`UPDATE expositions SET status = '${EqCommand.Off}' WHERE id= ${this.data.id}`);
                    return true;
                }
            }
            catch (error) {
                console.error(error);
            }
            return false;
        });
    }
}
