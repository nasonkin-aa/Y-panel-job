import e, { Request, Response } from "express";
import AquaStadium from "../classes/AquaStadium";
import BarcoProjector from "../classes/BarcoProjector";
import ContinentalDrift from "../classes/ContinentalDrift";
import Cube from "../classes/Cube";
import HallScreen from "../classes/HallScreen";
import HTTPConnector from "../classes/HTTPConnector";
import InteractiveFloor from "../classes/InteractiveFloor";
import TCPConnector from "../classes/TCPConnector";
import WorldInDropWater from "../classes/WorldInDropWater";
import { db } from "../db";
import { CommandRequest, EqTypes, IEquipment, TEquipment } from "../types";
import EquipmnetInstance from "./EquipmnetInstance";

const EqClass: { [key in EqTypes]: new (eq: TEquipment) => IEquipment} = {
    [EqTypes.BarcoProjector]: BarcoProjector,
    [EqTypes.Cube]: Cube,
    [EqTypes.AquaStadium]: AquaStadium,
    [EqTypes.ContinentalDrift]:ContinentalDrift,
    [EqTypes.HallScreen]: HallScreen,
    [EqTypes.InteractiveFloor]: InteractiveFloor,
    [EqTypes.WorldInDropWater]: WorldInDropWater
}

class EquipmentHandler {
    async getEquipments(req: Request, res: Response) {
        const eqs = await db?.all<TEquipment[]>('SELECT * FROM expositions');

        eqs?.forEach((el) => {
          el.active = EquipmnetInstance.getInstance().isActive(el.id);
        })

        res.send({ eqs });
    }

    async runCommand(req: Request, res: Response) {
        const body: CommandRequest = req.body;

        const eqData = await db?.get<TEquipment>('SELECT * FROM expositions WHERE id=?', body.id);

        if (!eqData) {
          res.statusCode = 418;
          res.send({error: "Eq not found"});
          return;
        }
    
        const eq = new EqClass[eqData.type](eqData);
        
        if (eq[body.command] !== undefined) {
          const commandRes = await eq[body.command]();
          console.log(commandRes);
          res.send(commandRes);
        } else {
          res.statusCode = 418;
          res.send({error: "Command not found"});
        }
    }

    async runCommandAll(req: Request, res: Response) {
      const body: CommandRequest = req.body;
      const eqsData = await db?.all<TEquipment[]>('SELECT * FROM expositions WHERE id <> 2 AND id <> 1');
      console.log(eqsData?.length);
      console.log(eqsData?.map((el) => el.id));
      const eqs = eqsData?.map((el) => new EqClass[el.type](el));

      if (!eqs) {
        res.statusCode = 418;
        res.send({error: "Eqs error"});

        return null;
      }

      try {
        const turnedResult = await Promise.allSettled(eqs.map((e) => body.command === 'on' ? e.on() : e.off()));
        res.send(turnedResult);
      } catch {
        res.statusCode = 418;
        res.send('error for one of eqs');
      }
    }
}

export default new EquipmentHandler();