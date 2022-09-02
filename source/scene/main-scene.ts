//

import {
  Engine,
  Scene
} from "excalibur";
import {
  Player
} from "/source/entity/player";


export class MainScene extends Scene {

  public constructor() {
    super();
  }

  public override onInitialize(engine: Engine): void {
    this.add(new Player(100, 100));
  }

}