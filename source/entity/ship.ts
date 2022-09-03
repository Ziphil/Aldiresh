//

import {
  Actor,
  ActorArgs,
  Color,
  Engine,
  ExcaliburGraphicsContext,
  vec
} from "excalibur";
import {
  tap
} from "/source/util/misc";


export const SHIP_SIZE = 21;
export const SHIP_OUTER_SIZE = 21;
export const SHIP_INNER_SIZE = 15;
export const SHIP_OUTER_ROTATION_VEL = 0.0018;
export const SHIP_INNER_ROTATION_VEL = -0.0024;


export class Ship extends Actor {

  private readonly outerColor: Color;
  private readonly innerColor: Color;
  private outerAngle: number;
  private innerAngle: number;

  public constructor(x: number, y: number, baseColor: Color, configs: ActorArgs) {
    super({pos: vec(x, y), radius: SHIP_SIZE / 2, ...configs});
    this.outerColor = tap(baseColor.clone(), (color) => color.a = 0.8);
    this.innerColor = tap(baseColor.clone(), (color) => color.a = 0.4);
    this.outerAngle = 0;
    this.innerAngle = 0;
    this.graphics.onPostDraw = this.onGraphicsPostDraw.bind(this);
  }

  private onGraphicsPostDraw(context: ExcaliburGraphicsContext): void {
    context.save();
    context.rotate(this.outerAngle);
    context.drawRectangle(vec(-SHIP_OUTER_SIZE / 2, -SHIP_OUTER_SIZE / 2), SHIP_OUTER_SIZE, SHIP_OUTER_SIZE, this.outerColor);
    context.rotate(-this.outerAngle + this.innerAngle);
    context.drawRectangle(vec(-SHIP_INNER_SIZE / 2, -SHIP_INNER_SIZE / 2), SHIP_INNER_SIZE, SHIP_INNER_SIZE, this.innerColor);
    context.restore();
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    this.outerAngle += SHIP_OUTER_ROTATION_VEL * delta;
    this.innerAngle += SHIP_INNER_ROTATION_VEL * delta;
  }

}