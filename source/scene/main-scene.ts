//

import {
  Engine,
  Scene
} from "excalibur";
import {
  RotatedSquareSystem
} from "/source/component/rotated-square";
import {
  FIELD_CONFIGS
} from "/source/constant";
import {
  EnemySpawner
} from "/source/entity/enemy-spawner";
import {
  Player
} from "/source/entity/player";
import {
  Status
} from "/source/entity/status";
import {
  Target
} from "/source/entity/target";


export class MainScene extends Scene {

  public constructor() {
    super();
  }

  public override onInitialize(engine: Engine): void {
    this.initializeSystems();
    this.initializeEntities();
  }

  private initializeSystems(): void {
    this.world.add(new RotatedSquareSystem());
  }

  private initializeEntities(): void {
    const player = new Player(FIELD_CONFIGS.width / 2, FIELD_CONFIGS.height / 2);
    const enemySpawner = new EnemySpawner();
    const target = new Target(FIELD_CONFIGS.width / 2, FIELD_CONFIGS.height / 2);
    const status = new Status();
    player.setTarget(target);
    player.setStatus(status);
    enemySpawner.setStatus(status);
    this.add(player);
    this.add(enemySpawner);
    this.add(target);
    this.add(status);
  }

}