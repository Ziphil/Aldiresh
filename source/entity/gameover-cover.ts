//

import {
  Actor,
  CollisionType,
  Color,
  Engine,
  Text,
  vec
} from "excalibur";
import {
  SPRITE_FONTS
} from "/source/core/asset";
import {
  DEPTHS,
  FIELD_PROPS
} from "/source/core/constant";
import {
  Image
} from "/source/entity/image";


export class GameoverCover extends Actor {

  public constructor() {
    super({
      pos: vec(0, 0),
      anchor: vec(0, 0),
      z: DEPTHS.gameoverCover,
      width: FIELD_PROPS.width,
      height: FIELD_PROPS.height,
      collisionType: CollisionType["PreventCollision"],
      color: Color.fromHSL(0, 0, 0, 0.5)
    });
  }

  public override onInitialize(engine: Engine): void {
    this.addLabel();
  }

  private addLabel(): void {
    const text = new Text({text: "Game Over", font: SPRITE_FONTS.char});
    const label = new Image({x: FIELD_PROPS.width / 2, y: FIELD_PROPS.height / 2, graphic: text});
    this.addChild(label);
  }

}