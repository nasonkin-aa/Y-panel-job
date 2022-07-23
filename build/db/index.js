// Имитация базы данных
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
let db = null;
const openDB = () => __awaiter(void 0, void 0, void 0, function* () {
    db = yield open({
        filename: 'src/db/expositions.db',
        driver: sqlite3.Database,
    });
});
const Eq = [];
// eslint-disable-next-line import/prefer-default-export
export { openDB, db, };
