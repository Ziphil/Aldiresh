//

import {
  Actor,
  ActorArgs,
  CollisionType,
  Graphic
} from "excalibur";


export class Image extends Actor {

  public constructor(configs: ActorArgs & {graphic: Graphic}) {
    super({
      collisionType: CollisionType["PreventCollision"],
      ...configs
    });
    this.graphics.use(configs.graphic);
  }

}