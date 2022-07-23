// синглтон оборудования (всегда будет дрежать массив уже включеных штук в turnedOnEq)

export default class EquipmnetInstance {
  private static instance: EquipmnetInstance;

  private turnedOnEq: number[] = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): EquipmnetInstance {
    if (!EquipmnetInstance.instance) {
      EquipmnetInstance.instance = new EquipmnetInstance();
    }

    return EquipmnetInstance.instance;
  }

  // получить по id обурудование
  public getEquipment(id: number) {
    return this.turnedOnEq.find((e) => e === id) || null;
  }

  public isActive(id: number) {
    return this.turnedOnEq.indexOf(id) !== -1;
  }

  // Добавить новое оборудование в список включенных
  public setEquipment(id: number) {
    if (this.getEquipment(id) !== null) return null;
    this.turnedOnEq.push(id);
    console.log(this.turnedOnEq);
  }
// Удаление выключенного оборудования 
  public delEquipment(id: number) {
    const index = this.turnedOnEq.findIndex((e) => e === id);
    if (index === -1) return;
    
    this.turnedOnEq.splice(index, 1);
    console.log(this.turnedOnEq);
  }
}
