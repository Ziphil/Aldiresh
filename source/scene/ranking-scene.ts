//

import {
  Engine,
  Scene,
  SceneActivationContext
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
} from "/source/entity/main/enemy-spawner";
import {
  Status
} from "/source/entity/main/status";
import {
  Target
} from "/source/entity/main/target";
import {
  RankingCover
} from "/source/entity/ranking/ranking-cover";


export class RankingScene extends Scene {

  public constructor() {
    super();
  }

  public override onInitialize(engine: Engine): void {
    this.initializeSystems();
  }

  public override onActivate({engine}: SceneActivationContext<unknown>): void {
    this.addEntities();
  }

  public override onDeactivate({engine}: SceneActivationContext<unknown>): void {
    this.clearEntities();
  }

  private initializeSystems(): void {
    this.world.add(new RotatingSquareSystem());
    this.world.add(new InputManagerSystem());
    this.world.add(new TimerSystem());
    this.world.add(new AutoKillSystem("screen"));
  }

  private addEntities(): void {
    const cover = new RankingCover();
    const enemySpawner = new EnemySpawner({range: "screen"});
    const target = new Target({x: SCREEN_PROPS.width / 2, y: SCREEN_PROPS.height / 2, range: "screen"});
    const status = new Status();
    status.level = 10;
    enemySpawner.status = status;
    this.add(cover);
    this.add(enemySpawner);
    this.add(target);
  }

  private clearEntities(): void {
    this.world.clearEntities();
  }

}