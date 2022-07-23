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
import EquipmnetInstance from '../handlers/EquipmnetInstance';
export default class HTTPConnector {
    constructor(eq) {
        this.instance = axios;
        this.ip = '';
        this.port = 0;
        this.ip = eq.ip;
        this.port = eq.port;
        this.name = eq.name;
        this.id = eq.id;
        this.type = eq.type;
        this.number = eq.number;
        // this.instance.create({
        //   baseURL: this.port ? `http://${this.ip}:${this.port}` : `http://${this.ip}`,timeout: 1000,
        // });
    }
    powerOn(request) {
        return __awaiter(this, void 0, void 0, function* () {
            EquipmnetInstance.getInstance().setEquipment(this.id);
            const res = yield this.instance.get(`http://${this.ip}` + request);
            if (res.data)
                return true;
            return false;
            //! сверху вариант для реал лайф теста
            //! Ниже для домашнего
            // return new Promise<boolean>((resolve, reject) => {
            //   //! Ниже для домашнего
            //   //resolve(true);
            // });
        });
    }
    powerOff(request) {
        return __awaiter(this, void 0, void 0, function* () {
            EquipmnetInstance.getInstance().delEquipment(this.id);
            const res = yield this.instance.get(`http://${this.ip}` + request);
            if (res.data)
                return true;
            return false;
            //! сверху вариант для реал лайф теста
            //! Ниже для домашнего
            // return new Promise<boolean>((resolve, reject) => {
            //   //! Ниже для домашнего
            //  // resolve(true);
            // });
        });
    }
    connect() { }
}
