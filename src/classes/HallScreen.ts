import { EqCommand, IEquipment, TEquipment } from '../types/index';
import HTTPConnector from './HTTPConnector';

export default class HallScreen extends HTTPConnector implements IEquipment {
  on() {
    // ! раскоментить для прода
    // this.onRGB();
    return super.powerOn('/cmd.cgi?cmd=REL,1,1');
  }

  onRGB(){
    this.instance.get(`http://${this.data.ip}`+'/cmd.cgi?cmd=REL,2,1')
  }

  off() {
    // ! раскоментить для прода
    // this.offRGB();
    return super.powerOff('/cmd.cgi?cmd=REL,1,0');
  }
  offRGB(){
    this.instance.get(`http://${this.data.ip}`+'/cmd.cgi?cmd=REL,2,0')
  }
}