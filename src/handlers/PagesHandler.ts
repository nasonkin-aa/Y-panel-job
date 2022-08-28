import { Request, Response } from "express";
import { db } from "../db";
import { TEquipment } from "../types";

export default class PagesHandler {
  static async main(req: Request, res: Response) {
    const result = await db?.all<TEquipment[]>('SELECT * FROM expositions') || [];

    // im sorry for any type
    const eqs = result.reduce((prev, curr) => {
      const num = curr.number.trim();
      (prev[num] = prev[num] || []).push(curr);

      return prev;
  }, {} as any);

    console.log(eqs);
    
    res.render('main', { eqs });
  }
}