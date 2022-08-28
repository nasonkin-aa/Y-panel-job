import { EqCommand, EqTypes, IEquipment, TEquipment } from '../types';
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
  [EqTypes.ContinentalDrift]:ContinentalDrift,
  [EqTypes.HallScreen]: HallScreen,
  [EqTypes.InteractiveFloor]: InteractiveFloor,
  [EqTypes.WorldInDropWater]: WorldInDropWater
}

export class EquipmentFabric {
  static create(data: TEquipment) {
    return new EqClass[data.type](data);
  }

  static runCommand(data: TEquipment, command: EqCommand) {
    const eq = this.create(data);
    
    switch (command) {
      case EqCommand.On: return eq.on();
      case EqCommand.Off: return eq.off();
      case EqCommand.GetHumidity: return (eq as BarcoProjector).getHumidity();
    }
  }
}