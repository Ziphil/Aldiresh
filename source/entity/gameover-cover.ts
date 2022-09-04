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
  FIELD_PROPS
} from "/source/core/constant";


export class GameoverCover extends Actor {

  public constructor() {
    super({
      pos: vec(0, 0),
      z: -100,
      width: FIELD_PROPS.width,
      height: FIELD_PROPS.height,
      color: Color.fromHSL(0, 0, 0, 0.5)
    });
    this.anchor = vec(0, 0);
  }

  public override onInitialize(engine: Engine): void {
    const label = new Actor({x: FIELD_PROPS.width / 2, y: FIELD_PROPS.height / 2});
    label.graphics.use(SPRITE_SHEETS.string.sprites[0]);
    this.addChild(label);
  }

}