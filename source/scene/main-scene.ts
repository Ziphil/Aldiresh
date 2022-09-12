//

import {
  Engine,
  Scene,
  SceneActivationContext
} from "excalibur";
import {
  AutoKillSystem,
  InputSystem,
  RotatingSquareSystem,
  TimerSystem
} from "/source/component";
import {
  FIELD_DIMENSION
} from "/source/core/constant";
import {
  EnemySpawner
} from "/source/entity/main/enemy-spawner";
import {
  Player
} from "/source/entity/main/player";
import {
  Status
} from "/source/entity/main/status";
import {
  Target
} from "/source/entity/main/target";
import {
  StatusPane
} from "/source/entity/status/status-pane";


export class MainScene extends Scene {

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
    this.world.add(new InputSystem());
    this.world.add(new TimerSystem());
    this.world.add(new AutoKillSystem("field"));
  }

  private addEntities(): void {
    const player = new Player({x: FIELD_DIMENSION.width / 2, y: FIELD_DIMENSION.height / 2});
    const enemySpawner = new EnemySpawner({range: "field"});
    const target = new Target({x: FIELD_DIMENSION.width / 2, y: FIELD_DIMENSION.height / 2, range: "field"});
    const statusPane = new StatusPane();
    const status = new Status();
    player.target = target;
    player.status = status;
    enemySpawner.status = status;
    statusPane.status = status;
    this.add(player);
    this.add(enemySpawner);
    this.add(target);
    this.add(statusPane);
    this.add(status);
  }

  private clearEntities(): void {
    this.world.clearEntities();
  }

}