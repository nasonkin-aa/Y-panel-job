var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import HTTPConnector from './HTTPConnector';
export default class AquaStadium extends HTTPConnector {
    on() {
        const _super = Object.create(null, {
            powerOn: { get: () => super.powerOn }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.powerOn.call(this, '/cmd.cgi?cmd=REL,1,1');
        });
    }
    off() {
        const _super = Object.create(null, {
            powerOff: { get: () => super.powerOff }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.powerOff.call(this, '/cmd.cgi?cmd=REL,2,1');
        });
    }
}
