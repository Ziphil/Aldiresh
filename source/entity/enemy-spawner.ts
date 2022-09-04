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
  FIELD_PROPS
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


export class EnemySpawner extends Entity {

  private readonly random: Random;
  private status!: Status;

  public constructor() {
    super();
    this.random = new Random();
  }

  public override onInitialize(engine: Engine): void {
    const timerComponent = new TimerComponent();
    timerComponent.setOperation("spawn", () => this.spawn(engine), this.status.averageSpawnTimeout);
    this.addComponent(timerComponent);
  }

  private spawn(engine: Engine): number {
    const x = this.random.floating(ENEMY_PROPS.size, FIELD_PROPS.width - ENEMY_PROPS.size);
    const y = this.random.floating(ENEMY_PROPS.size, FIELD_PROPS.height - ENEMY_PROPS.size);
    const enemy = new Enemy({x, y});
    const timeout = randomize(this.random, this.status.averageSpawnTimeout);
    enemy.setStatus(this.status);
    engine.currentScene.add(enemy);
    return timeout;
  }

  public setStatus(status: Status): void {
    this.status = status;
  }

}