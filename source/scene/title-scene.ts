//

import {
  Engine,
  Scene
} from "excalibur";
import {
  RotatingSquareSystem
} from "/source/component/rotating-square";
import {
  SCREEN_PROPS
} from "/source/core/constant";
import {
  Button
} from "/source/entity/button";
import {
  Logo
} from "/source/entity/logo";
import {
  Target
} from "/source/entity/target";


export class TitleScene extends Scene {

  public constructor() {
    super();
  }

  public override onInitialize(engine: Engine): void {
    this.initializeSystems();
    this.initializeEntities();
  }

  private initializeSystems(): void {
    this.world.add(new RotatingSquareSystem());
  }

  private initializeEntities(): void {
    const logo = new Logo({x: SCREEN_PROPS.width / 2, y: SCREEN_PROPS.height / 2 - 30});
    const button = new Button({x: SCREEN_PROPS.width / 2, y: SCREEN_PROPS.height / 2 + 30, spriteIndex: 1});
    const target = new Target({x: SCREEN_PROPS.width / 2, y: SCREEN_PROPS.height / 2});
    this.add(logo);
    this.add(button);
    this.add(target);
  }

}