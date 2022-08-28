import { Request, Response } from "express";
import Cube from "../classes/Cube";
import { EquipmentFabric } from "../classes/EquipmentFabric";
import { db } from "../db";
import { CommandRequest, EqTypes, IEquipment, TEquipment } from "../types";
import { response } from "../utils";

class EquipmentHandler {
    async getEquipments(req: Request, res: Response) {
        const eqs = await db?.all<TEquipment[]>('SELECT * FROM expositions') || [];

        res.send(response(true, eqs));
    }

    async runCommand(req: Request, res: Response) {
        const body: CommandRequest = req.body;

        const data = await db?.get<TEquipment>('SELECT * FROM expositions WHERE id=?', body.id);

        if (!data) {
          res.statusCode = 418;
          return res.send({error: "Eq not found"});
        }

        const result = await EquipmentFabric.runCommand(data, body.command);
        res.send(result);
    }

    // async runCommandAll(req: Request, res: Response) {
    //   const body: CommandRequest = req.body;
    //   const eqsData = await db?.all<TEquipment[]>('SELECT * FROM expositions WHERE id <> 2 AND id <> 1');
    //   console.log(eqsData?.length);
    //   console.log(eqsData?.map((el) => el.id));
    //   const eqs = eqsData?.map((el) => new EqClass[el.type](el));

    //   if (!eqs) {
    //     res.statusCode = 418;
    //     res.send({error: "Eqs error"});

    //     return null;
    //   }

    //   try {
    //     const turnedResult = await Promise.allSettled(eqs.map((e) => body.command === 'on' ? e.on() : e.off()));
    //     res.send(turnedResult);
    //   } catch {
    //     res.statusCode = 418;
    //     res.send('error for one of eqs');
    //   }
    // }
}

export default new EquipmentHandler();