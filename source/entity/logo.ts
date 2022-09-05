//

import {
  Actor,
  CollisionType,
  vec
} from "excalibur";
import {
  ASSETS
} from "/source/core/asset";


export class Logo extends Actor {

  public constructor({x, y}: {x: number, y: number}) {
    super({
      pos: vec(x, y),
      collisionType: CollisionType["PreventCollision"]
    });
    this.graphics.use(ASSETS.logo.toSprite());
  }

}