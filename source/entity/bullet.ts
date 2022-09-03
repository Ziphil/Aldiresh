//

import {
  Actor,
  Color,
  Engine,
  ExcaliburGraphicsContext,
  Vector,
  vec
} from "excalibur";


export const BULLET_SIZE = 9;
export const BULLET_COLOR = Color.fromHSL(0.5, 0.8, 0.5, 0.8);
export const BULLET_ROTATION_VEL = 0.0042;
export const BULLET_VEL = 90;


export class Bullet extends Actor {

  private angle: number;

  public constructor(x: number, y: number, direction: number) {
    super({pos: vec(x, y)});
    this.z = 2;
    this.angle = 0;
    this.vel = Vector.fromAngle(direction).scale(BULLET_VEL);
    console.log(this.vel);
    this.graphics.onPostDraw = this.onGraphicsPostDraw.bind(this);
  }

  private onGraphicsPostDraw(context: ExcaliburGraphicsContext): void {
    context.save();
    context.rotate(this.angle);
    context.drawRectangle(vec(-BULLET_SIZE / 2, -BULLET_SIZE / 2), BULLET_SIZE, BULLET_SIZE, BULLET_COLOR);
    context.restore();
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    this.angle += BULLET_ROTATION_VEL * delta;
  }

}