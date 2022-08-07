import net from 'net';
import axios, { AxiosInstance, AxiosStatic } from 'axios';
import { EqTypes, TEquipment } from '../types';
import EquipmnetInstance from '../handlers/EquipmnetInstance';

export default class HTTPConnector {
  instance: AxiosInstance;

  ip: string;

  id: number;

  name: string;

  number: string;

  type: EqTypes;

  active?: boolean | undefined;

  constructor(eq: TEquipment) {
    this.ip = eq.ip;
    this.name = eq.name;
    this.id = eq.id;
    this.type = eq.type;
    this.number = eq.number;

    const isEmulatorMode = process.env.EMULATOR_MODE;
    const baseURL = isEmulatorMode ? `http://localhost:${process.env.EMULATOR_HTTP_PORT}` : `http://${this.ip}`;

    this.instance = axios.create({
      baseURL,
    });
  }
  async powerOn(request: string) {
    try {
      const res = await this.instance.get(request);

      if (res.data) {
        EquipmnetInstance.getInstance().setEquipment(this.id);
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async powerOff(request: string) {
    try {
      const res = await this.instance.get(request);

      if (res.data) {
        EquipmnetInstance.getInstance().delEquipment(this.id);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  connect() {}
}
