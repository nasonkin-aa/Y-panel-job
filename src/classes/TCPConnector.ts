import net from 'net';
import { db } from '../db';
import { EqCommand, EqTypes, TEquipment } from '../types';

export default class TCPConnector {
  instance: net.Socket;

  data: TEquipment;


  constructor(eq: TEquipment) {
    this.data = eq;
    this.instance = new net.Socket();

    // this.connect();
  }


  connect() {
    try {
      this.instance.connect(Number(this.data.port), this.data.ip, () => {
          console.log("Client: Connected to server");
          console.log(this.instance.read());
      });
    } catch (error) {
      console.log(error);
    }
    
  }

  protected powerOn(request: string) {
    db?.run(`UPDATE expositions SET status = '${EqCommand.On}' WHERE id= ${this.data.id}`);
  
    // return new Promise<boolean>((resolve, reject) => {
    //   resolve(this.instance.write(request));
    // });

    return Promise.resolve(true);
  }

  protected powerOff(request: string) {
    db?.run(`UPDATE expositions SET status = '${EqCommand.Off}' WHERE id= ${this.data.id}`);

    // return new Promise<boolean>((resolve, reject) => {
    //   resolve(this.instance.write(request));
    // });

    return Promise.resolve(true);
  }
}
