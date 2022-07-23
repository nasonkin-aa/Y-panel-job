var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import { db } from '../../db';
const router = Router();
// обработчик проекторов
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eqs = yield (db === null || db === void 0 ? void 0 : db.all('SELECT * FROM expositions'));
    res.send({ eqs });
}));
export default router;
