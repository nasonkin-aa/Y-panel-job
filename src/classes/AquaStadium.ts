import { IEquipment, TEquipment } from '../types/index';
import HTTPConnector from './HTTPConnector';

export default class AquaStadium extends HTTPConnector implements IEquipment {
  async on() {
    return super.powerOn('/cmd.cgi?cmd=REL,1,1');
  }

  async off() {
    return super.powerOff('/cmd.cgi?cmd=REL,2,1');
  }
}