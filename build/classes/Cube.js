import TCPConnector from './TCPConnector';
export default class Cube extends TCPConnector {
    on() {
        return super.powerOn('SET(0;Power;1)');
    }
    off() {
        return super.powerOff('SET(0;Power;0)');
    }
}
