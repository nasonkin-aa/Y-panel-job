import net from 'net';
import EquipmnetInstance from '../handlers/EquipmnetInstance';
export default class TCPConnector {
    constructor(eq) {
        this.instance = new net.Socket();
        this.ip = eq.ip;
        this.port = eq.port;
        this.name = eq.name;
        this.id = eq.id;
        this.type = eq.type;
        this.number = eq.number;
        this.connect();
    }
    connect() {
        try {
            this.instance.connect(this.port, this.ip, () => {
                console.log("Client: Connected to server");
                console.log(this.instance.read());
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    powerOn(request) {
        EquipmnetInstance.getInstance().setEquipment(this.id);
        return new Promise((resolve, reject) => {
            resolve(this.instance.write(request));
            //console.log(this.instance.read());
            //! сверху вариант для реал лайф теста
            //! Ниже для домашнего
            // resolve(true);
        });
    }
    powerOff(request) {
        EquipmnetInstance.getInstance().delEquipment(this.id);
        return new Promise((resolve, reject) => {
            resolve(this.instance.write(request));
            //! сверху вариант для реал лайф теста
            //! Ниже для домашнего
            //resolve(true);
        });
    }
}
