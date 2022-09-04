//

import {
  Actor,
  Color,
  Engine,
  vec
} from "excalibur";
import {
  SPRITE_SHEETS
} from "/source/core/asset";
import {
  DEPTHS,
  FIELD_PROPS
} from "/source/core/constant";


export class GameoverCover extends Actor {

  public constructor() {
    super({
      pos: vec(0, 0),
      anchor: vec(0, 0),
      z: DEPTHS.gameoverCover,
      width: FIELD_PROPS.width,
      height: FIELD_PROPS.height,
      color: Color.fromHSL(0, 0, 0, 0.5)
    });
  }

  public override onInitialize(engine: Engine): void {
    this.addLabel();
  }

  private addLabel(): void {
    const label = new Actor({x: FIELD_PROPS.width / 2, y: FIELD_PROPS.height / 2});
    label.graphics.use(SPRITE_SHEETS.string.sprites[0]);
    this.addChild(label);
  }

}