import net from 'net';
import EquipmnetInstance from '../handlers/EquipmnetInstance';
import { EqTypes, TEquipment } from '../types';

export default class TCPConnector {
  instance = new net.Socket();

  ip: string;

  port: number;

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

    // this.connect();
  }


  connect() {
    try {
      this.instance.connect(this.port, this.ip, () => {
          console.log("Client: Connected to server");
          console.log(this.instance.read());
      });
    } catch (error) {
      console.log(error);
    }
    
  }
  powerOn(request: string) {
    EquipmnetInstance.getInstance().setEquipment(this.id);

    return new Promise<boolean>((resolve, reject) => {
      resolve(this.instance.write(request));
      //console.log(this.instance.read());
      //! сверху вариант для реал лайф теста
      //! Ниже для домашнего
     // resolve(true);
    });
  }

  powerOff(request: string) {
    EquipmnetInstance.getInstance().delEquipment(this.id);

    return new Promise<boolean>((resolve, reject) => {
      resolve(this.instance.write(request));
      //! сверху вариант для реал лайф теста
      //! Ниже для домашнего
      //resolve(true);
    });
  }
}
