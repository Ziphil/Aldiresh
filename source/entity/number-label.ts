//

import {
  Actor,
  Engine,
  SpriteFont,
  Text
} from "excalibur";


export type NumberLabelConfigs = {
  x: number,
  y: number,
  font: SpriteFont,
  decimalLength?: number,
  align?: "left" | "right" | "center"
};


export class NumberLabel extends Actor {

  private font: SpriteFont;
  private decimalLength: number;
  private text!: Text;

  public constructor({x, y, ...configs}: NumberLabelConfigs) {
    super({x, y, z: -90});
    this.font = configs.font;
    this.decimalLength = configs.decimalLength ?? 0;
    this.anchor.x = (configs.align === "left") ? 0 : (configs.align === "right") ? 1 : 0.5;
  }

  public override onInitialize(engine: Engine): void {
    const text = new Text({text: "", font: this.font});
    this.text = text;
    this.graphics.use(text);
  }

  public setNumber(number: number): void {
    this.text.text = number.toFixed(this.decimalLength);
  }

}