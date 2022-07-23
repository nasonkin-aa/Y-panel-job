import TCPConnector from './TCPConnector';
export default class BarcoProjector extends TCPConnector {
    on() {
        return super.powerOn("{\"jsonrpc\": \"2.0\",\"method\": \"system.poweron\"}");
    }
    off() {
        return super.powerOff("{\"jsonrpc\": \"2.0\", \"method\": \"system.poweroff\"}");
    }
}
