//

import {
  Engine,
  Entity,
  Random
} from "excalibur";
import {
  TimerComponent
} from "/source/component/timer";
import {
  FIELD_PROPS,
  SCREEN_PROPS
} from "/source/core/constant";
import {
  ENEMY_PROPS,
  Enemy
} from "/source/entity/enemy";
import {
  Status
} from "/source/entity/status";
import {
  randomize
} from "/source/util/misc";


export type EnemySpawnerConfigs = {
  range: "screen" | "field"
};


export class EnemySpawner extends Entity {

  private readonly range: "screen" | "field";
  private readonly random: Random;
  public status!: Status;

  public constructor(configs: EnemySpawnerConfigs) {
    super();
    this.range = configs.range;
    this.random = new Random();
  }

  public override onInitialize(engine: Engine): void {
    this.initializeComponents(engine);
  }

  private initializeComponents(engine: Engine): void {
    const timerComponent = new TimerComponent();
    timerComponent.setOperation("spawn", () => this.spawn(engine), 0);
    this.addComponent(timerComponent);
  }

  private spawn(engine: Engine): number {
    const props = (this.range === "screen") ? SCREEN_PROPS : FIELD_PROPS;
    const x = this.random.floating(ENEMY_PROPS.size, props.width - ENEMY_PROPS.size);
    const y = this.random.floating(ENEMY_PROPS.size, props.height - ENEMY_PROPS.size);
    const enemy = new Enemy({x, y});
    enemy.status = this.status;
    engine.currentScene.add(enemy);
    const timeout = randomize(this.random, this.status.calcAverageSpawnTimeout());
    return timeout;
  }

}