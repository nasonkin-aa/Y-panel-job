export var EqTypes;
(function (EqTypes) {
    EqTypes[EqTypes["BarcoProjector"] = 1] = "BarcoProjector";
    EqTypes[EqTypes["Cube"] = 2] = "Cube";
    EqTypes[EqTypes["AquaStadium"] = 3] = "AquaStadium";
    EqTypes[EqTypes["ContinentalDrift"] = 4] = "ContinentalDrift";
    EqTypes[EqTypes["HallScreen"] = 5] = "HallScreen";
    EqTypes[EqTypes["InteractiveFloor"] = 6] = "InteractiveFloor";
    EqTypes[EqTypes["WorldInDropWater"] = 7] = "WorldInDropWater";
})(EqTypes || (EqTypes = {}));
export var EqCommand;
(function (EqCommand) {
    // base commands
    EqCommand["Off"] = "off";
    EqCommand["On"] = "on";
    // Barco commands
    EqCommand["GetHumidity"] = "getHumidity";
})(EqCommand || (EqCommand = {}));
