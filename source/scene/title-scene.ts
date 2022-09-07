//

import {
  Engine,
  Scene
} from "excalibur";
import {
  InputManagerSystem,
  RotatingSquareSystem
} from "/source/component";
import {
  SCREEN_PROPS
} from "/source/core/constant";
import {
  Target
} from "/source/entity/target";
import {
  TitleCover
} from "/source/entity/title/title-cover";


export class TitleScene extends Scene {

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
  }

  private addEntities(engine: Engine): void {
    const cover = new TitleCover();
    const target = new Target({x: SCREEN_PROPS.width / 2, y: SCREEN_PROPS.height / 2, range: "screen"});
    this.add(cover);
    this.add(target);
  }

}