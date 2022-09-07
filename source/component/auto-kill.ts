//

import {
  Component,
  Entity,
  System,
  SystemType,
  TransformComponent
} from "excalibur";
import {
  FIELD_PROPS,
  SCREEN_PROPS
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

  private readonly range: "screen" | "field";
  public readonly types: any = AUTO_KILL_SYSTEM_TYPES;
  public readonly systemType: SystemType = SystemType["Update"];

  public constructor(range: "screen" | "field") {
    super();
    this.range = range;
  }

  public override update(entities: Array<Entity>, delta: number): void {
    for (const entity of entities) {
      this.autoKill(entity, delta);
    }
  }

  private autoKill(entity: Entity, delta: number): void {
    const component = entity.get(AutoKillComponent)!;
    const transformComponent = entity.get(TransformComponent)!;
    const props = (this.range === "screen") ? SCREEN_PROPS : FIELD_PROPS;
    const {x, y} = transformComponent.pos;
    if (x < -component.size || x > props.width + component.size || y < -component.size || y > props.height + component.size) {
      entity.kill();
      entity.emit("autokill", {});
    }
  }

}