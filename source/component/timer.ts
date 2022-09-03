//

import {
  Component, Entity, System, SystemType
} from "excalibur";


const TIMER_COMPONENT_TYPE = "zp.timer" as const;
const TIMER_SYSTEM_TYPES = ["zp.timer"] as const;


export class TimerComponent extends Component<typeof TIMER_COMPONENT_TYPE> {

  public readonly type: any = TIMER_COMPONENT_TYPE;
  public readonly operations: Map<string, () => number>;
  public readonly timers: Map<string, number>;
  public readonly actives: Map<string, boolean>;

  public constructor() {
    super();
    this.operations = new Map();
    this.timers = new Map();
    this.actives = new Map();
  }

  public setOperation(name: string, operation: () => number, initialTimeout: number): void {
    this.operations.set(name, operation);
    this.timers.set(name, initialTimeout);
    this.actives.set(name, true);
  }

  public activate(name: string): void {
    this.actives.set(name, true);
  }

  public deactivate(name: string): void {
    this.actives.set(name, false);
  }

}


export class TimerSystem extends System<TimerComponent> {

  public readonly types: any = TIMER_SYSTEM_TYPES;
  public readonly systemType: SystemType = SystemType["Update"];

  public override update(entities: Array<Entity>, delta: number): void {
    for (const entity of entities) {
      this.runOperations(entity, delta);
    }
  }

  private runOperations(entity: Entity, delta: number): void {
    const component = entity.get(TimerComponent)!;
    for (const [key, operation] of component.operations) {
      const active = component.actives.get(key)!;
      if (active) {
        let timer = component.timers.get(key)! - delta;
        if (timer < 0) {
          const timeout = operation();
          timer += timeout;
        }
        component.timers.set(key, timer);
      }
    }
  }

}