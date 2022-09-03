//

import {
  Actor,
  Color,
  Engine,
  ExcaliburGraphicsContext,
  vec
} from "excalibur";


export const SHIP_SIZE = 31;
export const POINTER_COLOR = Color.fromHSL(0.5, 0.8, 0.5, 0.8);
export const POINTER_ROTATION_VEL = 0.003;


export class Target extends Actor {

  private angle: number;

  public constructor(x: number, y: number) {
    super({pos: vec(x, y)});
    this.z = 15;
    this.angle = 0;
    this.graphics.onPostDraw = this.onGraphicsPostDraw.bind(this);
  }

  private onGraphicsPostDraw(context: ExcaliburGraphicsContext): void {
    context.save();
    context.rotate(this.angle);
    context.drawRectangle(vec(-SHIP_SIZE / 2, -SHIP_SIZE / 2), SHIP_SIZE, SHIP_SIZE, Color["Transparent"], POINTER_COLOR, 1);
    context.restore();
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    this.angle += POINTER_ROTATION_VEL * delta;
    this.pos = engine.input.pointers.primary.lastScreenPos.clone();
  }

}