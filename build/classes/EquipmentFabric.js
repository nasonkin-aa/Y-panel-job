var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EqCommand, EqTypes } from '../types';
import { response } from '../utils';
import AquaStadium from './AquaStadium';
import BarcoProjector from './BarcoProjector';
import ContinentalDrift from './ContinentalDrift';
import Cube from './Cube';
import HallScreen from './HallScreen';
import InteractiveFloor from './InteractiveFloor';
import WorldInDropWater from './WorldInDropWater';
const EqClass = {
    [EqTypes.BarcoProjector]: BarcoProjector,
    [EqTypes.Cube]: Cube,
    [EqTypes.AquaStadium]: AquaStadium,
    [EqTypes.ContinentalDrift]: ContinentalDrift,
    [EqTypes.HallScreen]: HallScreen,
    [EqTypes.InteractiveFloor]: InteractiveFloor,
    [EqTypes.WorldInDropWater]: WorldInDropWater
};
export class EquipmentFabric {
    static create(data) {
        return new EqClass[data.type](data);
    }
    static runCommand(data, command) {
        return __awaiter(this, void 0, void 0, function* () {
            const eq = this.create(data);
            switch (command) {
                case EqCommand.On: return response(yield eq.on());
                case EqCommand.Off: return response(yield eq.off());
                case EqCommand.GetHumidity: return response(true, eq.getHumidity());
            }
        });
    }
}
