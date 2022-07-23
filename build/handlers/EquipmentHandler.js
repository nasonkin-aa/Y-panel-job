var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AquaStadium from "../classes/AquaStadium";
import BarcoProjector from "../classes/BarcoProjector";
import ContinentalDrift from "../classes/ContinentalDrift";
import Cube from "../classes/Cube";
import HallScreen from "../classes/HallScreen";
import InteractiveFloor from "../classes/InteractiveFloor";
import WorldInDropWater from "../classes/WorldInDropWater";
import { db } from "../db";
import { EqTypes } from "../types";
import EquipmnetInstance from "./EquipmnetInstance";
const EqClass = {
    [EqTypes.BarcoProjector]: BarcoProjector,
    [EqTypes.Cube]: Cube,
    [EqTypes.AquaStadium]: AquaStadium,
    [EqTypes.ContinentalDrift]: ContinentalDrift,
    [EqTypes.HallScreen]: HallScreen,
    [EqTypes.InteractiveFloor]: InteractiveFloor,
    [EqTypes.WorldInDropWater]: WorldInDropWater
};
class EquipmentHandler {
    getEquipments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const eqs = yield (db === null || db === void 0 ? void 0 : db.all('SELECT * FROM expositions'));
            eqs === null || eqs === void 0 ? void 0 : eqs.forEach((el) => {
                el.active = EquipmnetInstance.getInstance().isActive(el.id);
            });
            res.send({ eqs });
        });
    }
    runCommand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const eqData = yield (db === null || db === void 0 ? void 0 : db.get('SELECT * FROM expositions WHERE id=?', body.id));
            if (!eqData) {
                res.statusCode = 418;
                res.send({ error: "Eq not found" });
                return;
            }
            const eq = new EqClass[eqData.type](eqData);
            if (eq[body.command] !== undefined) {
                const commandRes = yield eq[body.command]();
                console.log(commandRes);
                res.send(commandRes);
            }
            else {
                res.statusCode = 418;
                res.send({ error: "Command not found" });
            }
        });
    }
    runCommandAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const eqsData = yield (db === null || db === void 0 ? void 0 : db.all('SELECT * FROM expositions WHERE id <> 2 AND id <> 1'));
            console.log(eqsData === null || eqsData === void 0 ? void 0 : eqsData.length);
            console.log(eqsData === null || eqsData === void 0 ? void 0 : eqsData.map((el) => el.id));
            const eqs = eqsData === null || eqsData === void 0 ? void 0 : eqsData.map((el) => new EqClass[el.type](el));
            if (!eqs) {
                res.statusCode = 418;
                res.send({ error: "Eqs error" });
                return null;
            }
            try {
                const turnedResult = yield Promise.allSettled(eqs.map((e) => body.command === 'on' ? e.on() : e.off()));
                res.send(turnedResult);
            }
            catch (_a) {
                res.statusCode = 418;
                res.send('error for one of eqs');
            }
        });
    }
}
export default new EquipmentHandler();
