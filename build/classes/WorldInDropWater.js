import HTTPConnector from './HTTPConnector';
export default class WorldInDropWater extends HTTPConnector {
    on() {
        return super.powerOn('/setMainCtrl.cgi?Type=9&SubType=274&Value=1');
    }
    off() {
        return super.powerOff('/setMainCtrl.cgi?Type=9&SubType=274&Value=0');
    }
}
