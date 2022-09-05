//

import {
  Actor,
  CollisionType,
  Engine,
  Text,
  vec
} from "excalibur";
import {
  SPRITE_FONTS
} from "/source/core/asset";


export type StatusNumberLabelConfigs = {
  x: number,
  y: number,
  decimalLength?: number
};


export class StatusNumberLabel extends Actor {

  private decimalLength: number;
  private text!: Text;

  public constructor({x, y, ...configs}: StatusNumberLabelConfigs) {
    super({
      pos: vec(x, y),
      anchor: vec(1, 0.5),
      collisionType: CollisionType["PreventCollision"]
    });
    this.decimalLength = configs.decimalLength ?? 0;
  }

  public override onInitialize(engine: Engine): void {
    this.initializeGraphics();
  }

  private initializeGraphics(): void {
    const text = new Text({text: "", font: SPRITE_FONTS.number});
    this.text = text;
    this.graphics.use(text);
  }

  public set number(number: number) {
    this.text.text = number.toFixed(this.decimalLength);
  }

}