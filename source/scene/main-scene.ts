//

import {
  Engine,
  Scene
} from "excalibur";
import {
  FIELD_HEIGHT,
  FIELD_WIDTH
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


export class MainScene extends Scene {

  public constructor() {
    super();
  }

  public override onInitialize(engine: Engine): void {
    const player = new Player(FIELD_WIDTH / 2, FIELD_HEIGHT / 2);
    const enemySpawner = new EnemySpawner();
    const status = new Status();
    enemySpawner.setStatus(status);
    this.add(player);
    this.add(enemySpawner);
    this.add(status);
  }

}