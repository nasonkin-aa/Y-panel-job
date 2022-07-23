import { IEquipment, TEquipment } from '../types/index';
import HTTPConnector from './HTTPConnector';

export default class ContinentalDrift extends HTTPConnector implements IEquipment {
  on() {
    console.log('on hall');
    return super.powerOn('/setMainCtrl.cgi?Type=9&SubType=274&Value=1');
  }

  off() {
    console.log('off hall');
    return super.powerOff('/setMainCtrl.cgi?Type=9&SubType=274&Value=0');
  }
}