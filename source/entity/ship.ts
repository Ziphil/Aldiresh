//

import {
  Actor,
  ActorArgs,
  Color,
  Engine,
  Graphic,
  Rectangle,
  vec
} from "excalibur";


export const SHIP_SIZE = 21;
export const SHIP_OUTER_SIZE = 21;
export const SHIP_INNER_SIZE = 15;
export const SHIP_OUTER_ROTATION_VEL = 0.0018;
export const SHIP_INNER_ROTATION_VEL = 0.0030;


export class Ship extends Actor {

  protected readonly outerGraphic: Graphic;
  protected readonly innerGraphic: Graphic;

  public constructor(x: number, y: number, baseColor: Color, configs: ActorArgs) {
    super({pos: vec(x, y), radius: SHIP_SIZE / 2, ...configs});
    this.outerGraphic = this.createOuterRect(baseColor);
    this.innerGraphic = this.createInnerRect(baseColor);
    this.setupGraphics();
  }

  private createOuterRect(baseColor: Color): Graphic {
    const color = baseColor.clone();
    color.a = 0.8;
    const rectangle = new Rectangle({width: SHIP_OUTER_SIZE, height: SHIP_OUTER_SIZE, color});
    return rectangle;
  }

  private createInnerRect(baseColor: Color): Graphic {
    const color = baseColor.clone();
    color.a = 0.4;
    const rect = new Rectangle({width: SHIP_INNER_SIZE, height: SHIP_INNER_SIZE, color});
    return rect;
  }

  private setupGraphics(): void {
    this.graphics.add(this.outerGraphic);
    this.graphics.add(this.innerGraphic);
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    this.outerGraphic.rotation += SHIP_OUTER_ROTATION_VEL * delta;
    this.innerGraphic.rotation -= SHIP_INNER_ROTATION_VEL * delta;
  }

}