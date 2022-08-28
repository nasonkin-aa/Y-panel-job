import { EqCommand, IEquipment } from '../types';
import HTTPConnector from './HTTPConnector';

export default class InteractiveFloor extends HTTPConnector implements IEquipment {
  on() {
    return super.powerOn('/cgi-bin/webctrl.cgi.elf?&t:26,c:5,p:7,v:1');
  }

  off() {
    return super.powerOff('/cgi-bin/webctrl.cgi.elf?&t:26,c:5,p:7,v:0');
  }
}