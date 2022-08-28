import { EqCommand, IEquipment, TEquipment } from '../types/index';
import HTTPConnector from './HTTPConnector';

export default class AquaStadium extends HTTPConnector implements IEquipment {
  on() {
    return super.powerOn('/cmd.cgi?cmd=REL,1,1');
  }

  off() {
    return super.powerOff('/cmd.cgi?cmd=REL,2,1');
  }
}