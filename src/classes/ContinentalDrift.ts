import { EqCommand, IEquipment, TEquipment } from '../types/index';
import HTTPConnector from './HTTPConnector';

export default class ContinentalDrift extends HTTPConnector implements IEquipment {
  on() {
    return super.powerOn('/setMainCtrl.cgi?Type=9&SubType=274&Value=1');
  }

  off() {
    return super.powerOff('/setMainCtrl.cgi?Type=9&SubType=274&Value=0');
  }
}