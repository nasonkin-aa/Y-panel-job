import HTTPConnector from './HTTPConnector';
export default class HallScreen extends HTTPConnector {
    on() {
        this.onRGB();
        return super.powerOn('/cmd.cgi?cmd=REL,1,1');
    }
    onRGB() {
        this.instance.get(`http://${this.ip}` + '/cmd.cgi?cmd=REL,2,1');
    }
    off() {
        this.offRGB();
        return super.powerOff('/cmd.cgi?cmd=REL,1,0');
    }
    offRGB() {
        this.instance.get(`http://${this.ip}` + '/cmd.cgi?cmd=REL,2,0');
    }
}
