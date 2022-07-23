import HTTPConnector from './HTTPConnector';
export default class InteractiveFloor extends HTTPConnector {
    on() {
        console.log('on floor');
        return super.powerOn('/cgi-bin/webctrl.cgi.elf?&t:26,c:5,p:7,v:1');
    }
    off() {
        console.log('off floor');
        return super.powerOff('/cgi-bin/webctrl.cgi.elf?&t:26,c:5,p:7,v:0');
    }
}
