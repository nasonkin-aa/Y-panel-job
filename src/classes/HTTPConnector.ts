import net from 'net';
import axios from 'axios';
import { EqTypes, TEquipment } from '../types';
import EquipmnetInstance from '../handlers/EquipmnetInstance';

export default class HTTPConnector {
  instance = axios;
  ip = '';
  
  port = 0;

  id: number;

  name: string;

  number: string;

  type: EqTypes;

  active?: boolean | undefined;

  constructor(eq: TEquipment) {
    this.ip = eq.ip;
    this.port = eq.port;
    this.name = eq.name;
    this.id = eq.id;
    this.type = eq.type;
    this.number = eq.number;

 
    // this.instance.create({
    //   baseURL: this.port ? `http://${this.ip}:${this.port}` : `http://${this.ip}`,timeout: 1000,
    // });
  }
  async powerOn(request: string) {
    EquipmnetInstance.getInstance().setEquipment(this.id);
    const res = await this.instance.get(`http://${this.ip}`+request);

    if (res.data) return true;
    return false;


    //! сверху вариант для реал лайф теста
    //! Ниже для домашнего
    
    // return new Promise<boolean>((resolve, reject) => {
    //   //! Ниже для домашнего
    //   //resolve(true);
    // });
  }

  async powerOff(request: string) {
    EquipmnetInstance.getInstance().delEquipment(this.id);
    const res = await this.instance.get(`http://${this.ip}`+ request);

    if (res.data) return true;
    return false;

    //! сверху вариант для реал лайф теста
    //! Ниже для домашнего
    // return new Promise<boolean>((resolve, reject) => {
    //   //! Ниже для домашнего
    //  // resolve(true);
    // });
  }
  connect() {}
}
