//

import {
  Engine,
  Scene
} from "excalibur";
import {
  AutoKillSystem,
  InputManagerSystem,
  RotatingSquareSystem,
  TimerSystem
} from "/source/component";
import {
  SCREEN_PROPS
} from "/source/core/constant";
import {
  EnemySpawner
} from "/source/entity/enemy-spawner";
import {
  RankingCover
} from "/source/entity/ranking/ranking-cover";
import {
  Status
} from "/source/entity/status";
import {
  Target
} from "/source/entity/target";


export class RankingScene extends Scene {

  public constructor() {
    super();
  }

  public override onInitialize(engine: Engine): void {
    this.initializeSystems();
    this.addEntities(engine);
  }

  private initializeSystems(): void {
    this.world.add(new RotatingSquareSystem());
    this.world.add(new InputManagerSystem());
    this.world.add(new TimerSystem());
    this.world.add(new AutoKillSystem("screen"));
  }

  private addEntities(engine: Engine): void {
    const cover = new RankingCover();
    const enemySpawner = new EnemySpawner({range: "screen"});
    const target = new Target({x: SCREEN_PROPS.width / 2, y: SCREEN_PROPS.height / 2, range: "screen"});
    const status = new Status();
    status.level = 10;
    enemySpawner.setStatus(status);
    this.add(cover);
    this.add(enemySpawner);
    this.add(target);
  }

}