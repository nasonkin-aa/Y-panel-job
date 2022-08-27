import EquipmnetInstance from '../handlers/EquipmnetInstance';
import { IEquipment, TEquipment } from '../types/index';
import TCPConnector from './TCPConnector';

export default class BarcoProjector extends TCPConnector implements IEquipment {
  on() {
    return super.powerOn("{\"jsonrpc\": \"2.0\",\"method\": \"system.poweron\"}");
  }

  off() {
    return super.powerOff("{\"jsonrpc\": \"2.0\", \"method\": \"system.poweroff\"}");
  }
  getHumidity() {
    return Math.random() * 100;
    return this.instance.write("{\"jsonrpc\": \"2.0\",\"method\": \"environment.getcontrolblocks\",\"id\": 2,\"params\": {\"type\": \"Sensor\",\"valuetype\": \"Humidity\"}}");
  }

}
