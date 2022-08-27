var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { db } from "../db";
import BarcoProjector from "../classes/BarcoProjector";
class BarcoHandler {
    getHumidity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const eqData = yield (db === null || db === void 0 ? void 0 : db.get('SELECT * FROM expositions WHERE id=?', body.id));
            if (!eqData) {
                res.statusCode = 418;
                res.send({ error: "Eq not found" });
                return;
            }
            const eq = new BarcoProjector(eqData);
            const commandRes = eq.humidity();
            res.send(commandRes);
        });
    }
}
