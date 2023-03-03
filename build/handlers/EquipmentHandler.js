var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EquipmentFabric } from "../classes/EquipmentFabric";
import { db } from "../db";
import { response } from "../utils";
class EquipmentHandler {
    getEquipments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const eqs = (yield (db === null || db === void 0 ? void 0 : db.all('SELECT * FROM expositions'))) || [];
            res.send(response(true, eqs));
        });
    }
    runCommand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const data = yield (db === null || db === void 0 ? void 0 : db.get('SELECT * FROM expositions WHERE id=?', body.id));
            if (!data) {
                res.statusCode = 418;
                return res.send({ error: "Eq not found" });
            }
            const result = yield EquipmentFabric.runCommand(data, body.command);
            res.send(result);
        });
    }
}
export default new EquipmentHandler();
