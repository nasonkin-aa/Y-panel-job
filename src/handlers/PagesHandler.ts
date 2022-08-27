import { Request, Response } from "express";
import { db } from "../db";
import { TEquipment } from "../types";

export default class PagesHandler {
  static async main(req: Request, res: Response) {
    const eqs = await db?.all<TEquipment[]>('SELECT * FROM expositions') || [];
    
    res.render('main', { title: 'hui', eqs });
  }
}