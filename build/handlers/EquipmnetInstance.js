// синглтон оборудования (всегда будет дрежать массив уже включеных штук в turnedOnEq)
export default class EquipmnetInstance {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {
        this.turnedOnEq = [];
    }
    static getInstance() {
        if (!EquipmnetInstance.instance) {
            EquipmnetInstance.instance = new EquipmnetInstance();
        }
        return EquipmnetInstance.instance;
    }
    // получить по id обурудование
    getEquipment(id) {
        return this.turnedOnEq.find((e) => e === id) || null;
    }
    isActive(id) {
        return this.turnedOnEq.indexOf(id) !== -1;
    }
    // Добавить новое оборудование в список включенных
    setEquipment(id) {
        if (this.getEquipment(id) !== null)
            return null;
        this.turnedOnEq.push(id);
        console.log(this.turnedOnEq);
    }
    // Удаление выключенного оборудования 
    delEquipment(id) {
        const index = this.turnedOnEq.findIndex((e) => e === id);
        if (index === -1)
            return;
        this.turnedOnEq.splice(index, 1);
        console.log(this.turnedOnEq);
    }
}
