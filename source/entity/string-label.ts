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
  string?: string | number,
  decimalLength?: number
};


export class StringLabel extends Actor {

  private initialString: string;
  private readonly decimalLength: number;
  private text!: Text;

  public constructor({x, y, ...configs}: StatusNumberLabelConfigs) {
    super({
      pos: vec(x, y),
      anchor: vec(1, 0.5),
      collisionType: CollisionType["PreventCollision"]
    });
    this.decimalLength = configs.decimalLength ?? 0;
    this.initialString = formatString(configs.string ?? "", configs.decimalLength);
  }

  public override onInitialize(engine: Engine): void {
    this.initializeGraphics();
  }

  private initializeGraphics(): void {
    const text = new Text({text: this.initialString, font: SPRITE_FONTS.char});
    this.text = text;
    this.graphics.use(text);
  }

  public set string(string: string | number) {
    const formattedString = formatString(string, this.decimalLength);
    this.text.text = formattedString;
  }

}


function formatString(string: string | number, decimalLength?: number): string {
  if (typeof string === "number") {
    return string.toFixed(decimalLength ?? 0);
  } else {
    return string;
  }
}