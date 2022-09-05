//

import {
  Engine,
  Scene
} from "excalibur";
import {
  Logo
} from "/source/entity/logo";


export class TitleScene extends Scene {

  public constructor() {
    super();
  }

  public override onInitialize(engine: Engine): void {
    this.initializeEntities();
  }

  private initializeEntities(): void {
    const logo = new Logo();
    this.add(logo);
  }

}