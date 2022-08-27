import { db } from "../db";
import { CommandRequest, TEquipment } from "../types";
import { Request, Response } from "express";
import BarcoProjector from "../classes/BarcoProjector";

class BarcoHandler{
    async getHumidity(req: Request, res: Response){
        const body: CommandRequest = req.body;

        const eqData = await db?.get<TEquipment>('SELECT * FROM expositions WHERE id=?', body.id);

        if (!eqData) {
          res.statusCode = 418;
          res.send({error: "Eq not found"});
          return;
        }
    
        const eq = new BarcoProjector(eqData);
        const commandRes = eq.getHumidity();
        res.send(commandRes.toString()); 
    }
}

export default new BarcoHandler();