//

import {
  Component,
  Entity,
  System,
  SystemType,
  TransformComponent
} from "excalibur";
import {
  FIELD_PROPS
} from "/source/core/constant";


const AUTO_KILL_COMPONENT_TYPE = "zp.autoKill" as const;
const AUTO_KILL_SYSTEM_TYPES = ["zp.autoKill", "ex.transform"] as const;


export class AutoKillComponent extends Component<typeof AUTO_KILL_COMPONENT_TYPE> {

  public readonly type: any = AUTO_KILL_COMPONENT_TYPE;
  public size: number;

  public constructor(size: number) {
    super();
    this.size = size;
  }

}


export class AutoKillSystem extends System<AutoKillComponent | TransformComponent> {

  public readonly types: any = AUTO_KILL_SYSTEM_TYPES;
  public readonly systemType: SystemType = SystemType["Update"];

  public override update(entities: Array<Entity>, delta: number): void {
    for (const entity of entities) {
      this.autoKill(entity, delta);
    }
  }

  private autoKill(entity: Entity, delta: number): void {
    const component = entity.get(AutoKillComponent)!;
    const transformComponent = entity.get(TransformComponent)!;
    const {x, y} = transformComponent.pos;
    if (x < -component.size || x > FIELD_PROPS.width + component.size || y < -component.size || y > FIELD_PROPS.height + component.size) {
      entity.kill();
      entity.emit("autokill", {});
    }
  }

}