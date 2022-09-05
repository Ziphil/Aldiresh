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
  DEPTHS
} from "/source/core/constant";


export class Logo extends Actor {

  public constructor({x, y}: {x: number, y: number}) {
    super({
      pos: vec(x, y),
      z: DEPTHS.logo,
      collisionType: CollisionType["PreventCollision"]
    });
    this.graphics.use(ASSETS.logo.toSprite());
  }

}