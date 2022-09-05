//

import {
  Actor,
  CollisionType,
  vec
} from "excalibur";
import {
  ASSETS
} from "/source/core/asset";
import {
  SCREEN_PROPS
} from "/source/core/constant";


export class Logo extends Actor {

  public constructor() {
    super({
      pos: vec(SCREEN_PROPS.width / 2, SCREEN_PROPS.height / 2 - 20),
      collisionType: CollisionType["PreventCollision"]
    });
    this.graphics.use(ASSETS.logo.toSprite());
  }

}