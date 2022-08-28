import net from 'net';
import axios, { AxiosInstance, AxiosStatic } from 'axios';
import { EqCommand, TEquipment } from '../types';
import { db } from '../db';

export default class HTTPConnector {
  instance: AxiosInstance;

  data: TEquipment;

  constructor(eq: TEquipment) {
    this.data = eq;

    const baseURL = `http://${this.data.ip}`;

    this.instance = axios.create({
      baseURL,
    });
  }

  protected async powerOn(request: string) {
    try {
      // ! раскоментить для прода
      // const res = await this.instance.get(request);

      // ! закоментить для прода
      const res = { data: 'dsfsdf' };

      if (res.data) {
        db?.run(`UPDATE expositions SET status = '${EqCommand.On}' WHERE id= ${this.data.id}`);
        return true;
      }
    } catch (error) { 
      console.error(error); 
    }
    

    return false;
  }

  protected async powerOff(request: string) {
    try {
      // ! раскоментить для прода
      // const res = await this.instance.get(request);
      // ! закоментить для прода
      const res = { data: 'dsfsdf' };

      if (res.data) {
        db?.run(`UPDATE expositions SET status = '${EqCommand.Off}' WHERE id= ${this.data.id}`);
        return true;
      }
    } catch (error) {
      console.error(error);
    }

    return false;
  }
}
