import { EqCommand, IEquipment } from '../types';
import HTTPConnector from './HTTPConnector';

export default class WorldInDropWater extends HTTPConnector implements IEquipment {
  on() {
    return super.powerOn('/setMainCtrl.cgi?Type=9&SubType=274&Value=1');
  }

  off() {
    return super.powerOff('/setMainCtrl.cgi?Type=9&SubType=274&Value=0')
  }
}